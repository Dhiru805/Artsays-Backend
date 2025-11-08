
const express = require("express");
const router = express.Router();
const Wallet = require("../Models/Wallet/Wallet");
const Transaction = require("../Models/Wallet/Transaction");
const User = require("../Models/Wallet/User");
const WithdrawalRequest = require("../Models/Wallet/WithdrawalRequest");
const crypto = require("crypto");

router.post("/ensure/:userId", async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ userId: req.params.userId });
    if (!wallet) {
      wallet = new Wallet({ userId: req.params.userId });
      await wallet.save();
    }
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/create/:userId", async (req, res) => {
  try {
    const existing = await Wallet.findOne({ userId: req.params.userId });
    if (existing) return res.status(400).json({ message: "Wallet already exists" });

    const wallet = new Wallet({ userId: req.params.userId });
    await wallet.save();
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/transactions/:userId", async (req, res) => {
  try {
    const { type, status, limit = 50, skip = 0 } = req.query;
    const filter = { userId: req.params.userId };
    if (type) filter.type = type;
    if (status) filter.status = status;
    const txns = await Transaction.find(filter)
      .sort({ createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    res.json(txns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// router.get("/:userId", async (req, res) => {
//   try {
//     const wallet = await Wallet.findOne({ userId: req.params.userId });
//     if (!wallet) return res.status(404).json({ message: "Wallet not found" });
//     res.json(wallet);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
router.get("/:userId", async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.params.userId })
      .populate("userId", "name lastName");

    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    res.json({
      ...wallet.toObject(),
      name: wallet.userId?.name || "",
      lastName: wallet.userId?.lastName || "",
      userId: wallet.userId?._id || wallet.userId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/add-money/:userId", async (req, res) => {
  try {
    const { amount } = req.body;
    const wallet = await Wallet.findOne({ userId: req.params.userId });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    wallet.balance += amount;
    wallet.artCoins += 10; // ART coins per transaction
    wallet.totalCredited += amount;
    wallet.lastActivityAt = new Date();
    await wallet.save();

    const txn = new Transaction({
      userId: req.params.userId,
      type: "credit",
      amount,
      purpose: "Add Money",
      artCoinsEarned: 10,
      source: "wallet",
      balanceAfter: wallet.balance,
    });
    await txn.save();

    res.json({ wallet, transaction: txn });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/add-money-initiate/:userId", async (req, res) => {
  try {
    const { amount } = req.body;
    const wallet = await Wallet.findOne({ userId: req.params.userId });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    const orderId = `order_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    const txn = new Transaction({
      userId: req.params.userId,
      type: "credit",
      amount,
      purpose: "Add Money via Razorpay",
      artCoinsEarned: 10,
      status: "pending",
      source: "payment_gateway",
      referenceId: orderId,
    });
    await txn.save();

    res.json({
      id: orderId,
      amount: amount * 100, // Razorpay expects amount in paise
      currency: wallet.currency || "INR",
      receipt: orderId,
      status: "created"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Razorpay Webhook to verify and credit wallet
router.post("/razorpay/webhook", async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];
    const payload = JSON.stringify(req.body);
    const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
    if (expected !== signature) return res.status(400).json({ message: "Invalid signature" });

    const event = req.body;
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const orderId = payment.order_id;
      const amount = payment.amount / 100;
      const txn = await Transaction.findOne({ referenceId: orderId, status: "pending", source: "payment_gateway" });
      if (!txn) return res.status(200).json({ ok: true });

      const wallet = await Wallet.findOne({ userId: txn.userId });
      if (!wallet) return res.status(200).json({ ok: true });

      wallet.balance += amount;
      wallet.artCoins += 10;
      wallet.totalCredited += amount;
      wallet.lastActivityAt = new Date();
      await wallet.save();

      txn.status = "success";
      txn.balanceAfter = wallet.balance;
      txn.metadata = { paymentId: payment.id };
      await txn.save();
    }
    return res.json({ received: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Spend money (purchase, bid, subscription)
router.post("/spend/:userId", async (req, res) => {
  try {
    const { amount, purpose } = req.body;
    const wallet = await Wallet.findOne({ userId: req.params.userId });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    if (wallet.balance < amount) return res.status(400).json({ message: "Insufficient balance" });

    wallet.balance -= amount;
    wallet.artCoins += 10;
    wallet.totalDebited += amount;
    wallet.lastActivityAt = new Date();
    await wallet.save();

    const txn = new Transaction({
      userId: req.params.userId,
      type: "debit",
      amount,
      purpose,
      artCoinsEarned: 10,
      source: "wallet",
      balanceAfter: wallet.balance,
    });
    await txn.save();

    res.json({ wallet, transaction: txn });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Refund handling for failed bids/cancelled orders
router.post("/refund/:userId", async (req, res) => {
  try {
    const { amount, reason, orderId } = req.body;
    const wallet = await Wallet.findOne({ userId: req.params.userId });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    wallet.balance += amount;
    wallet.artCoins += 10;
    wallet.totalCredited += amount;
    wallet.lastActivityAt = new Date();
    await wallet.save();

    const txn = new Transaction({
      userId: req.params.userId,
      type: "credit",
      amount,
      purpose: reason || "Refund",
      artCoinsEarned: 10,
      source: "refund",
      balanceAfter: wallet.balance,
      referenceId: orderId,
    });
    await txn.save();

    res.json({ wallet, transaction: txn });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Process refund for failed bid
router.post("/refund-bid/:userId", async (req, res) => {
  try {
    const { bidAmount, bidId } = req.body;
    const wallet = await Wallet.findOne({ userId: req.params.userId });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    wallet.balance += bidAmount;
    wallet.totalCredited += bidAmount;
    wallet.lastActivityAt = new Date();
    await wallet.save();

    const txn = new Transaction({
      userId: req.params.userId,
      type: "credit",
      amount: bidAmount,
      purpose: `Bid Refund - ${bidId}`,
      artCoinsEarned: 10,
      source: "refund",
      balanceAfter: wallet.balance,
      referenceId: bidId,
    });
    await txn.save();

    res.json({ wallet, transaction: txn });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Process refund for cancelled order
router.post("/refund-order/:userId", async (req, res) => {
  try {
    const { orderAmount, orderId } = req.body;
    const wallet = await Wallet.findOne({ userId: req.params.userId });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    wallet.balance += orderAmount;
    wallet.totalCredited += orderAmount;
    wallet.lastActivityAt = new Date();
    await wallet.save();

    const txn = new Transaction({
      userId: req.params.userId,
      type: "credit",
      amount: orderAmount,
      purpose: `Order Refund - ${orderId}`,
      artCoinsEarned: 10,
      source: "refund",
      balanceAfter: wallet.balance,
      referenceId: orderId,
    });
    await txn.save();

    res.json({ wallet, transaction: txn });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Withdraw request (for Artist/Seller)
router.post("/withdraw/:userId", async (req, res) => {
  try {
    const { amount } = req.body;
    const wallet = await Wallet.findOne({ userId: req.params.userId });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    if (wallet.balance < amount) return res.status(400).json({ message: "Insufficient balance" });

    wallet.balance -= amount;
    wallet.pendingWithdrawal += amount;
    wallet.totalDebited += amount;
    wallet.lastActivityAt = new Date();
    await wallet.save();

    const txn = new Transaction({
      userId: req.params.userId,
      type: "debit",
      amount,
      purpose: "Withdrawal Request",
      artCoinsEarned: 10,
      status: "pending",
      source: "wallet",
      balanceAfter: wallet.balance,
    });
    await txn.save();

    const wr = new WithdrawalRequest({ userId: req.params.userId, amount, method: req.body.method || "upi", destination: req.body.destination });
    await wr.save();

    res.json({ wallet, transaction: txn, withdrawal: wr });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: list withdrawals
router.get("/withdrawals", async (req, res) => {
  try {
    const { status, limit = 50, skip = 0 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const list = await WithdrawalRequest.find(filter).sort({ createdAt: -1 }).skip(parseInt(skip)).limit(parseInt(limit));
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: approve withdrawal
router.post("/withdrawals/:id/approve", async (req, res) => {
  try {
    const wr = await WithdrawalRequest.findById(req.params.id);
    if (!wr) return res.status(404).json({ message: "Request not found" });
    if (wr.status !== "pending") return res.status(400).json({ message: "Invalid status" });
    wr.status = "approved";
    wr.adminNote = req.body.note;
    await wr.save();
    res.json(wr);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: decline withdrawal (revert funds)
router.post("/withdrawals/:id/decline", async (req, res) => {
  try {
    const wr = await WithdrawalRequest.findById(req.params.id);
    if (!wr) return res.status(404).json({ message: "Request not found" });
    if (wr.status !== "pending") return res.status(400).json({ message: "Invalid status" });
    const wallet = await Wallet.findOne({ userId: wr.userId });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    wallet.balance += wr.amount;
    wallet.pendingWithdrawal -= wr.amount;
    wallet.totalCredited += wr.amount;
    wallet.lastActivityAt = new Date();
    await wallet.save();
    const txn = new Transaction({ userId: wr.userId, type: "credit", amount: wr.amount, purpose: "Withdrawal Declined Reversal", source: "wallet", balanceAfter: wallet.balance });
    await txn.save();
    wr.status = "declined";
    wr.adminNote = req.body.note;
    await wr.save();
    res.json({ wallet, withdrawal: wr });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: mark paid
router.post("/withdrawals/:id/mark-paid", async (req, res) => {
  try {
    const wr = await WithdrawalRequest.findById(req.params.id);
    if (!wr) return res.status(404).json({ message: "Request not found" });
    if (wr.status !== "approved") return res.status(400).json({ message: "Invalid status" });
    const wallet = await Wallet.findOne({ userId: wr.userId });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    wallet.pendingWithdrawal -= wr.amount;
    wallet.lastActivityAt = new Date();
    await wallet.save();
    const txn = new Transaction({ userId: wr.userId, type: "debit", amount: wr.amount, purpose: "Withdrawal Paid", status: "success", source: "wallet", balanceAfter: wallet.balance });
    await txn.save();
    wr.status = "paid";
    wr.referenceId = req.body.referenceId;
    wr.processedAt = new Date();
    wr.adminNote = req.body.note;
    await wr.save();
    res.json({ wallet, withdrawal: wr });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// // Escrow: hold funds from buyer wallet
// router.post("/escrow/hold", async (req, res) => {
//   try {
//     const { buyerId, amount, orderId } = req.body;
//     const wallet = await Wallet.findOne({ userId: buyerId });
//     if (!wallet) return res.status(404).json({ message: "Wallet not found" });
//     if (wallet.balance < amount) return res.status(400).json({ message: "Insufficient balance" });
//     wallet.balance -= amount;
//     wallet.escrowHeld += amount;
//     wallet.totalDebited += amount;
//     wallet.lastActivityAt = new Date();
//     await wallet.save();
//     const txn = new Transaction({ userId: buyerId, type: "debit", amount, purpose: `Escrow Hold ${orderId || ''}`.trim(), source: "escrow", balanceAfter: wallet.balance });
//     await txn.save();
//     res.json({ wallet, transaction: txn });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Process seller earnings after successful sale
router.post("/seller-earnings/:sellerId", async (req, res) => {
  try {
    const { amount, orderId, platformFee = 0 } = req.body;
    const sellerWallet = await Wallet.findOne({ userId: req.params.sellerId });
    if (!sellerWallet) return res.status(404).json({ message: "Seller wallet not found" });

    const netAmount = amount - platformFee;

    sellerWallet.balance += netAmount;
    sellerWallet.totalCredited += netAmount;
    sellerWallet.lastActivityAt = new Date();
    await sellerWallet.save();

    const txn = new Transaction({
      userId: req.params.sellerId,
      type: "credit",
      amount: netAmount,
      purpose: `Sale Earnings - ${orderId}`,
      artCoinsEarned: 10,
      source: "escrow",
      balanceAfter: sellerWallet.balance,
      referenceId: orderId,
      metadata: {
        grossAmount: amount,
        platformFee,
        netAmount
      }
    });
    await txn.save();

    res.json({ wallet: sellerWallet, transaction: txn });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get seller earnings summary
router.get("/seller-earnings-summary/:sellerId", async (req, res) => {
  try {
    const { sellerId } = req.params;
    const { startDate, endDate } = req.query;

    const filter = {
      userId: sellerId,
      type: "credit",
      source: "escrow"
    };

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const earnings = await Transaction.find(filter).sort({ createdAt: -1 });
    const totalEarnings = earnings.reduce((sum, txn) => sum + txn.amount, 0);

    res.json({
      totalEarnings,
      transactionCount: earnings.length,
      transactions: earnings
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: manual adjust
router.post("/admin/adjust/:userId", async (req, res) => {
  try {
    const { amount, type, reason } = req.body;
    const wallet = await Wallet.findOne({ userId: req.params.userId });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    if (type === "credit") {
      wallet.balance += amount;
      wallet.totalCredited += amount;
    } else if (type === "debit") {
      if (wallet.balance < amount) return res.status(400).json({ message: "Insufficient balance" });
      wallet.balance -= amount;
      wallet.totalDebited += amount;
    } else {
      return res.status(400).json({ message: "Invalid type" });
    }
    wallet.lastActivityAt = new Date();
    await wallet.save();
    const txn = new Transaction({ userId: req.params.userId, type: type === "credit" ? "credit" : "debit", amount, purpose: reason || "Admin Adjustment", source: "admin_adjustment", balanceAfter: wallet.balance });
    await txn.save();
    res.json({ wallet, transaction: txn });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: get all wallets
// router.get("/admin/all-wallets", async (req, res) => {
//   try {
//     const wallets = await Wallet.find({}).sort({ createdAt: -1 });
//     res.json(wallets);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
router.get("/admin/all-wallets", async (req, res) => {
  try {
    const wallets = await Wallet.find({})
      .sort({ createdAt: -1 })
      .populate("userId", "name lastName")
      .lean();

    const formattedWallets = wallets.map(w => ({
      ...w,
      name: w.userId?.name || "",
      lastName: w.userId?.lastName || "",
      userId: w.userId?._id || w.userId,
    }));

    res.json(formattedWallets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all destination & method records for a user
router.get("/admin/user/:userId/destination", async (req, res) => {
  try {
    const records = await WithdrawalRequest.find({ userId: req.params.userId })
      .populate("userId", "name lastName")
      .sort({ createdAt: -1 });

    if (!records.length) return res.status(404).json({ message: "No destination data found" });

    const formatted = records.map((r, index) => ({
      serialNo: index + 1,
      name: r.userId ? `${r.userId.name} ${r.userId.lastName}` : "",
      method: r.method,
      destination: r.destination
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Admin: get all transactions
// router.get("/admin/all-transactions", async (req, res) => {
//   try {
//     const { limit = 100, skip = 0 } = req.query;
//     const transactions = await Transaction.find({})
//       .sort({ createdAt: -1 })
//       .skip(parseInt(skip))
//       .limit(parseInt(limit));
//     res.json(transactions);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
router.get("/admin/all-transactions", async (req, res) => {
  try {
    const { limit = 100, skip = 0 } = req.query;
    const transactions = await Transaction.find({})
      .sort({ createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate("userId", "name lastName")
      .lean();

    const formattedTxns = transactions.map(txn => ({
      ...txn,
      name: txn.userId?.name || "",
      lastName: txn.userId?.lastName || "",
      userId: txn.userId?._id || txn.userId,
    }));

    res.json(formattedTxns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;