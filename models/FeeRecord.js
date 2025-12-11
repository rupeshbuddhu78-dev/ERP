const mongoose = require('mongoose');
const FeeRecordSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalFees: { type: Number, default: 0 },
    feesPaid: { type: Number, default: 0 },
    balance: { type: Number, default: 0 }
});
const FeeRecord = mongoose.model('FeeRecord', FeeRecordSchema);
module.exports = FeeRecord;