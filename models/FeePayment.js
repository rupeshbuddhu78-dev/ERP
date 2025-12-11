// models/FeePayment.js
const mongoose = require('mongoose');

const FeePaymentSchema = new mongoose.Schema({
    studentId: { // Kis student ne pay kiya
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    regNo: { // Reference ke liye Registration No.
        type: String,
        required: true
    },
    amountPaid: { // Kitna amount pay hua
        type: Number,
        required: true
    },
    paymentDate: { // Kab pay hua
        type: Date,
        default: Date.now
    },
    paymentMethod: { // Kaise pay kiya (e.g., Cash, UPI, Card)
        type: String,
        enum: ['Cash', 'UPI', 'Card', 'Bank Transfer'],
        default: 'Cash'
    },
    semester: { // Kis semester ke liye pay kiya
        type: String,
        required: false // Optional, agar poore course ki fees ek saath ho
    }
});

const FeePayment = mongoose.model('FeePayment', FeePaymentSchema);
module.exports = FeePayment;