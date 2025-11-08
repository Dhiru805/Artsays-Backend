const BuyerRequest = require("../../../Models/Buyercustomrequest");
const User = require("../../../Models/usermode");
const nodemailer = require("nodemailer");
const EmailSetting = require("../../../Models/EmailSetting");
const path = require("path");
const fs = require("fs");

const updateBuyerStatus = async (req, res) => {
    try {
        const requestId = req.params.id;

        const existingRequest = await BuyerRequest.findById(requestId)
            .populate("Buyer.id", "name email")
            .populate("Artist.id", "name email");

        if (!existingRequest) {
            return res.status(404).json({
                message: "No buyer request found with the provided ID.",
            });
        }

        const { RequestStatus } = req.body;
        const finalStatus = RequestStatus || "Approved";
        const updatedRequest = await BuyerRequest.findByIdAndUpdate(
            requestId,
            { $set: { RequestStatus: finalStatus } },
            { new: true }
        )
            .populate("Buyer.id", "name email")
            .populate("Artist.id", "name email");

        try {
            const emailSettings = await EmailSetting.findOne();
            if (emailSettings) {
                const transporter = nodemailer.createTransport({
                    host: emailSettings.mailHost,
                    port: emailSettings.mailPort,
                    secure: emailSettings.mailEncryption === "SSL",
                    auth: {
                        user: emailSettings.mailUsername,
                        pass: emailSettings.mailPassword,
                    },
                });

                const imagePath = path.join(
                    __dirname,
                    "../../../controllers/Email/Artsays.png"
                );
                let attachments = [];
                if (fs.existsSync(imagePath)) {
                    attachments.push({
                        filename: "artsays-logo.png",
                        path: imagePath,
                        cid: "artsays_logo",
                    });
                }

                if (updatedRequest?.Buyer?.id?.email) {
                    await transporter.sendMail({
                        from: `${emailSettings.mailFromName} <${emailSettings.mailFromAddress}>`,
                        to: updatedRequest.Buyer.id.email,
                        subject: `Your Art Request Approved: ${updatedRequest.ProductName}`,
                        html: generateStatusUpdateEmail(updatedRequest, "buyer", attachments),
                        attachments,
                    });
                }

                if (updatedRequest?.Artist?.id?.email) {
                    await transporter.sendMail({
                        from: `${emailSettings.mailFromName} <${emailSettings.mailFromAddress}>`,
                        to: updatedRequest.Artist.id.email,
                        subject: `Art Request Approved: ${updatedRequest.ProductName}`,
                        html: generateStatusUpdateEmail(updatedRequest, "artist", attachments),
                        attachments,
                    });
                }

                const superAdmins = await User.find({ role: "super-admin" });
                if (superAdmins.length > 0) {
                    await transporter.sendMail({
                        from: `${emailSettings.mailFromName} <${emailSettings.mailFromAddress}>`,
                        to: superAdmins.map((admin) => admin.email).join(","),
                        subject: `Art Request Approved: ${updatedRequest.ProductName}`,
                        html: generateStatusUpdateEmail(updatedRequest, "admin", attachments),
                        attachments,
                    });
                }
            }
        } catch (emailError) {
            console.error("Failed to send status update emails:", emailError);
        }

        res.status(200).json({
            message: `Request status updated to ${finalStatus} successfully`,
            updatedRequest,
        });
    } catch (error) {
        console.error("Error updating request status:", error);
        res.status(500).json({
            message: "Error updating the request status",
            error: error.message,
        });
    }
};

function generateStatusUpdateEmail(request, recipientType, attachments) {
    const buyerName = request.Buyer?.id?.name || "Customer";
    const artistName = request.Artist?.id?.name || "the Artist";
    const isBuyerEmail = recipientType === "buyer";
    const isArtistEmail = recipientType === "artist";

    return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; background:#F8F1EE; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; overflow:hidden; border:1px solid #ddd;">
        <div style="background:#AD6449; padding:20px; text-align:center; color:#fff;">
            ${attachments.length > 0 ? `<img src="cid:artsays_logo" style="width:200px;">` : ""}
            <h2>Request Approved</h2>
        </div>
        <div style="padding:20px;">
            <p>Dear ${isBuyerEmail ? buyerName : isArtistEmail ? artistName : "Admin"},</p>
            <p>The custom art request <strong>"${request.ProductName}"</strong> has been <strong>${request.RequestStatus}</strong>.</p>
            <div style="background:#f4f4f4; padding:15px; border-left:4px solid #AD6449; margin:20px 0;">
                <p><strong>Request ID:</strong> ${request._id}</p>
                <p><strong>Request Status:</strong> ${request.RequestStatus}</p>
            </div>
            <p style="margin-top:20px;">Best Regards,<br><strong>The Artsays Team</strong></p>
        </div>
        <div style="background:#F4ECE9; text-align:center; padding:10px; font-size:12px; color:#555;">
            <p>© ${new Date().getFullYear()} Artsays. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
}

module.exports = updateBuyerStatus;
