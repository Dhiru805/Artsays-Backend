// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   port: process.env.MAIL_PORT,
//   secure: process.env.MAIL_ENCRYPTION === 'ssl', 
//   auth: {
//     user: process.env.MAIL_USERNAME,
//     pass: process.env.MAIL_PASSWORD,
//   },
//   tls: {

//     rejectUnauthorized: false
//   }
// });

// const sendEmailOTP = async (email, otp) => {
//   try {
//     const mailOptions = {
//       from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
//       to: email,
//       subject: 'Your Password Reset OTP',
//       html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <h2 style="color: #6b4f36;">Password Reset Request</h2>
//         <p>We received a request to reset your password. Use the following OTP to proceed:</p>
//         <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; text-align: center; font-size: 24px; letter-spacing: 2px; color: #6b4f36; font-weight: bold;">
//           ${otp}
//         </div>
//         <p>This OTP is valid for 10 minutes. If you didn't request this, please ignore this email.</p>
//         <p style="margin-top: 30px; color: #777;">The ${process.env.APP_NAME} Team</p>
//       </div>
//     `,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log(`Message sent: ${info.messageId}`);
//     return true;
//   } catch (error) {
//     console.error('Full error details:', error);
//     throw new Error(`Failed to send OTP email: ${error.message}`);
//   }
// };

// module.exports =  sendEmailOTP ;


const nodemailer = require('nodemailer');
const EmailSetting = require('../../Models/EmailSetting'); 

const sendEmailOTP = async (email, otp) => {
  try {

    const emailSettings = await EmailSetting.findOne({ isActive: true });
    
    if (!emailSettings) {
      throw new Error('No active email settings found in the database');
    }


    const transporter = nodemailer.createTransport({
     host: emailSettings.mailHost,
      port: emailSettings.mailPort,
      secure: emailSettings.mailEncryption === "SSL", 
      auth: {
        user: emailSettings.mailUsername,
        pass: emailSettings.mailPassword,
      },
      tls: {
        rejectUnauthorized: false, 
      },
    });

    // Define email options
    const mailOptions = {
      from: `"${emailSettings.mailFromName}" <${emailSettings.mailFromAddress}>`,
      to: email,
      subject: 'Your Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6b4f36;">Password Reset Request</h2>
          <p>We received a request to reset your password. Use the following OTP to proceed:</p>
          <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; text-align: center; font-size: 24px; letter-spacing: 2px; color: #6b4f36; font-weight: bold;">
            ${otp}
          </div>
          <p>This OTP is valid for 10 minutes. If you didn't request this, please ignore this email.</p>
          <p style="margin-top: 30px; color: #777;">The ${process.env.APP_NAME || 'Your App'} Team</p>
        </div>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Message sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('Full error details:', error);
    throw new Error(`Failed to send OTP email: ${error.message}`);
  }
};

module.exports = sendEmailOTP;



