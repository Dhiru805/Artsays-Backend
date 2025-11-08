const Purchase = require('../../../Models/BuyerProductPurchased');

const getPurchaseDetails = async (req, res) => {
    try {
        const purchases = await Purchase.find({ buyer: { $ne: null } }) 

            .populate('buyer', 'name lastName email phone')

            .populate({
                path: 'product',
                model: 'Product',
                select: 'ProductName finalPrice paymentMethod category description BuyerImage otherImages'
            })
            .populate({
                path: 'customProduct',
                model: 'BuyerRequest',
                select: 'ProductName MaxBudget paymentMethod category BuyerImage'
            });
        res.status(200).json({ purchases });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = getPurchaseDetails;
