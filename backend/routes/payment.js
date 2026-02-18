// routes/payment.js
const express = require("express");
const razorpay = require("../utils/razorpay");
const router = express.Router();

router.post("/create-order", async (req, res) => {
    try {
        const { amount } = req.body; // amount in rupees

        const order = await razorpay.orders.create({
            amount: amount * 100, // convert to paise
            currency: "INR",
            receipt: "order_rcptid_" + Date.now()
        });

        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: "Order creation failed" });
    }
});

module.exports = router;