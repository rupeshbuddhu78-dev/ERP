// models/User.js

const mongoose = require('mongoose');

// --- User Schema Define Karna (Database structure) ---
const UserSchema = new mongoose.Schema({
    // =======================================================
    // I. AUTHENTICATION & ROLE (Login aur Access Control)
    // =======================================================
    username: {
        type: String,
        required: true,
        unique: true
    },
    // Real-world practice: Password ko hamesha 'bcrypt' se hash karte hain
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'student', 'faculty'],
        default: 'student'
    },
    
    // =======================================================
    // II. PERSONAL & CONTACT DETAILS
    // =======================================================
    fullName: {
        type: String,
        required: true
    },
    // Naya: Email ID
    email: { 
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        sparse: true 
    },
    // Naya: Mobile Number
    mobileNumber: String,
    
    // Guardian Info
    guardianName: String,
    guardianMobile: String, // Naya: Guardian ka contact number
    
    // Address Details
    address: String,
    city: String,
    state: String, // Naya field
    pincode: String,
    
    // Naya: Date of Birth
    dateOfBirth: Date, 
    
    // =======================================================
    // III. ACADEMIC & INSTITUTIONAL STATUS
    // =======================================================
    regNo: String,
    course: String,
    semester: String,
    
    // Naya: Admission Date (Date type mein store hoga)
    dateOfAdmission: {
        type: Date, 
        required: true
    },
    
    // Financial Status (Basic tracking)
    totalFees: { // Naya: Course ki total fees
        type: Number,
        default: 0
    },
    feesPaid: { // Naya: Ab tak kitni fees pay ho chuki hai
        type: Number,
        default: 0
    },
    libraryFine: { // Pehle se use ho raha tha
        type: Number,
        default: 0
    },

    // Status fields
    photoUrl: String,
    isActive: { 
        type: Boolean,
        default: true
    },
    
}, {
    timestamps: true 
});

// --- Schema se Model Banana ---
const User = mongoose.model('User', UserSchema);

module.exports = User;