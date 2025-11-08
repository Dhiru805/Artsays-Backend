const Purchase = require('../../../Models/BuyerProductPurchased');
const Crop = require('../../../Models/Products');
const BuyerResellProduct = require('../../../Models/BuyerResellProductrequest');
const BuyerRequest = require('../../../Models/Buyercustomrequest');

const getPurchaseDetails = async (req, res) => {
    try {
        const purchases = await Purchase.find({})
            .populate({
                path: 'buyer',
                select: 'name lastName email phone'
            })
            .populate({
                path: 'product',
                model: 'Product', 
                select: 'productName finalPrice category description mainImage otherImages'
            })
            .populate({
                path: 'resellProduct',
                model: 'BuyerResellProduct',
                select: 'productName price category description mainImage otherImages'
            })
            .populate({
                path: 'customProduct',
                model: 'BuyerRequest',
                select: 'ProductName MinBudget MaxBudget Description BuyerImage ArtType Size ColourPreferences IsFramed ExpectedDeadline mainImage otherImages'
            });

        const filteredPurchases = purchases.filter(purchase => purchase.buyer);
        res.status(200).json({ purchases: filteredPurchases });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = getPurchaseDetails;
