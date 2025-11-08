const express = require('express');
const router = express.Router();

const passes = require('../controllers/BiddingPass/passes');
const orders = require('../controllers/BiddingPass/orders');

// Pass types
router.get('/bidding/passes', passes.list);
router.post('/bidding/passes', passes.create);
router.get('/bidding/passes/:id', passes.getOne);
router.put('/bidding/passes/:id/status', passes.updateStatus);
router.delete('/bidding/passes/:id', passes.remove);

// Pass orders
router.get('/bidding/pass-orders', orders.list);
router.get('/bidding/pass-orders/my', orders.listMy);
router.post('/bidding/pass-orders', orders.create);
router.put('/bidding/pass-orders/:id/status', orders.updateStatus);
router.delete('/bidding/pass-orders/:id', orders.remove);

module.exports = router;



