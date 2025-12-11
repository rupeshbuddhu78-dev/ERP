// models/Notice.js
const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    fileType: String,
    fileName: String,
    isStudyMaterial: { type: Boolean, default: false },
    uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notice', NoticeSchema);