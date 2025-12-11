// models/FeeStructure.js

const mongoose = require('mongoose');

const FeeStructureSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true,
        unique: true // Ek course ka structure ek hi baar define hoga
    },
    academicYear: {
        type: String,
        default: new Date().getFullYear().toString() + '-' + (new Date().getFullYear() + 1).toString(),
        required: true
    },
    totalFee: {
        type: Number,
        required: true
    },
    details: {
        type: String, // Fee ka pura breakdown
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const FeeStructure = mongoose.model('FeeStructure', FeeStructureSchema);
module.exports = FeeStructure;