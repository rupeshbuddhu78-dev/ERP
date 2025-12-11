// ====================================================
// 1. SETUP & IMPORTS
// ====================================================
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer'); 
const fs = require('fs'); // Folder creation ke liye zaroori hai

// Models Import
const User = require('./models/User'); 
const FeeStructure = require('./models/FeeStructure'); 
const Notice = require('./models/Notice'); 
const FeePayment = require('./models/FeePayment'); 

const app = express();
const PORT = 3000;

// ====================================================
// 2. MIDDLEWARE
// ====================================================
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile); 
app.set('view engine', 'html'); 

// --- Helper: Get Admin User ---
async function getAdminUser(username = null) {
    if(username) return await User.findOne({ username, role: 'admin' });
    return await User.findOne({ role: 'admin' }) || { fullName: 'Admin User', username: 'admin' };
}

// ====================================================
// 3. DATABASE CONNECTION
// ====================================================
mongoose.connect('mongodb://localhost:27017/collegeERP')
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch(err => console.log('❌ DB Error:', err));

// ====================================================
// ✅ AUTO-CREATE FOLDERS (Important Fix)
// ====================================================
const uploadDirs = [
    path.join(__dirname, 'public/uploads/notices'),
    path.join(__dirname, 'public/uploads/students')
];

uploadDirs.forEach(dir => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📂 Created missing folder: ${dir}`);
    }
});

// ====================================================
// 4. FILE UPLOAD CONFIGURATION
// ====================================================

// A. Notice Uploads
const noticeStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/notices'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const uploadNotice = multer({ storage: noticeStorage });

// B. Student Photo Uploads
const studentStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/students'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const uploadStudentPhoto = multer({ storage: studentStorage });


// ====================================================
// 5. ROUTES
// ====================================================

// --- Login ---
app.get('/', (req, res) => res.render('login.html'));

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.send('<h3>Login Failed!</h3><a href="/">Try Again</a>');
        }
        if (user.role === 'admin') res.redirect(`/admin/dashboard?user=${user.username}`);
        else res.redirect(`/student/dashboard?user=${user.username}`);
    } catch (err) { res.status(500).send('Server Error'); }
});

// --- Admin Dashboard ---
app.get('/admin/dashboard', async (req, res) => {
    try {
        const user = await getAdminUser(req.query.user);
        
        // Stats
        const studentCount = await User.countDocuments({ role: 'student' });
        const noticeCount = await Notice.countDocuments({});
        const facultyCount = await User.countDocuments({ role: 'faculty' }); 
        
        // Pending Fees
        const allStudents = await User.find({ role: 'student' });
        let totalPendingFees = 0;
        allStudents.forEach(stu => {
            const total = stu.totalFees || 0;
            const paid = stu.feesPaid || 0;
            if (total > paid) totalPendingFees += (total - paid);
        });

        res.render('admin_dashboard.html', { 
            user: user, 
            page: 'dashboard',
            stats: {
                students: studentCount,
                pendingFees: totalPendingFees,
                notices: noticeCount,
                faculty: facultyCount
            }
        });
    } catch(e) { res.redirect('/'); }
});

// --- Add Student ---
app.get('/admin/add-student', async (req, res) => {
    const user = await getAdminUser();
    res.render('add-student.html', { user, page: 'add-student' });
});

app.post('/admin/add-student', uploadStudentPhoto.single('studentPhoto'), async (req, res) => {
    try {
        const { 
            username, password, course, semester, dateOfAdmission, 
            fullName, dateOfBirth, email, mobileNumber,           
            guardianName, guardianMobile, address, city, state, pincode, 
            totalFees, feesPaid                                   
        } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if(existingUser) {
            return res.send("<h3>Error: Student Exists!</h3><a href='/admin/add-student'>Back</a>");
        }

        // Photo Path
        let photoPath = "https://i.ibb.co/6P0qXy2/dummy-profile.png"; 
        if (req.file) {
            photoPath = "/uploads/students/" + req.file.filename;
        }

        await User.create({
            username, password, role: 'student', fullName, email, mobileNumber,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
            guardianName, guardianMobile, address, city, state, pincode,
            regNo: username, course, semester,
            dateOfAdmission: new Date(dateOfAdmission),
            totalFees: Number(totalFees), feesPaid: Number(feesPaid),
            photoUrl: photoPath
        });
        
        console.log(`✅ Student Added: ${fullName}`);
        res.redirect('/admin/dashboard');

    } catch (err) { res.send(`Error: ${err.message}`); }
});

// --- Manage Students ---
app.get('/admin/manage-students', async (req, res) => {
    try {
        const user = await getAdminUser();
        const searchQuery = req.query.search || ''; 
        let dbQuery = { role: 'student' }; 

        if (searchQuery) {
            dbQuery = {
                role: 'student',
                $or: [
                    { fullName: { $regex: searchQuery, $options: 'i' } }, 
                    { username: { $regex: searchQuery, $options: 'i' } }  
                ]
            };
        }
        const students = await User.find(dbQuery);
        res.render('manage_students.html', { user, students, page: 'manage-students', searchQuery });
    } catch (err) { res.send("Error loading students"); }
});

// --- Edit & Update ---
app.get('/admin/edit-student/:id', async (req, res) => {
    try {
        const user = await getAdminUser();
        const studentToEdit = await User.findById(req.params.id);
        if(!studentToEdit) return res.send("Student not found");
        res.render('edit_student.html', { user, student: studentToEdit, page: 'manage-students' });
    } catch (err) { res.send("Error: " + err.message); }
});

app.post('/admin/update-student/:id', async (req, res) => {
    try {
        const { 
            fullName, email, mobileNumber, password,
            dateOfBirth, gender, guardianName, guardianMobile, 
            address, city, state, pincode,
            course, semester, dateOfAdmission,
            totalFees, feesPaid 
        } = req.body;

        await User.findByIdAndUpdate(req.params.id, {
            fullName, email, mobileNumber, password,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
            gender, guardianName, guardianMobile, address, city, state, pincode,
            course, semester, dateOfAdmission: dateOfAdmission ? new Date(dateOfAdmission) : null,
            totalFees: Number(totalFees), feesPaid: Number(feesPaid)
        });

        res.redirect('/admin/manage-students'); 
    } catch(err) { res.send("Update Failed: " + err.message); }
});

// --- Manage Fees ---
app.get('/admin/manage-fees', async (req, res) => {
    try {
        const user = await getAdminUser();
        const rawStudents = await User.find({ role: 'student' });
        const structures = await FeeStructure.find({}); 
        const students = rawStudents.map(stu => {
            const studentData = stu.toObject(); 
            const total = studentData.totalFees || 0;
            const paid = studentData.feesPaid || 0;
            studentData.balance = total - paid; 
            return studentData;
        });
        res.render('manage_fees.html', { user, feeStructures: structures, students: students, page: 'fees' }); 
    } catch (err) { res.send('Error loading fees'); }
});

app.post('/admin/record-payment', async (req, res) => {
    try {
        const { studentId, amountPaid, paymentMethod } = req.body;
        await FeePayment.create({ studentId, amountPaid: Number(amountPaid), paymentMethod, date: new Date() });
        await User.findByIdAndUpdate(studentId, { $inc: { feesPaid: Number(amountPaid) } });
        res.redirect('/admin/manage-fees');
    } catch (err) { res.send("Error: " + err.message); }
});

// --- Upload Notices (File Optional Logic) ---
app.get('/admin/upload-notices', async (req, res) => {
    const user = await getAdminUser();
    const notices = await Notice.find({}).sort({ date: -1 }); 
    res.render('upload_notices.html', { user, notices, page: 'notices' });
});

app.post('/admin/upload-notice', uploadNotice.single('uploadedFile'), async (req, res) => {
    let fileName = req.file ? req.file.filename : null; // File optional handling
    await Notice.create({ 
        title: req.body.title, 
        fileName: fileName, 
        date: new Date() 
    });
    res.redirect('/admin/upload-notices');
});

// ==========================================
// 🎓 STUDENT DASHBOARD (FIXED: Notices Passed)
// ==========================================
app.get('/student/dashboard', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.query.user, role: 'student' });
        if(!user) return res.redirect('/');

        // 1. Notices Fetch karo
        const notices = await Notice.find({}).sort({ date: -1 });

        // 2. User + Notices dono bhejo
        res.render('student_dashboard.html', { 
            user: user,
            notices: notices // <--- Yeh zaroori hai error hatane ke liye
        });

    } catch(e) { 
        console.log(e);
        res.redirect('/'); 
    }
});

app.get('/logout', (req, res) => res.redirect('/'));

// --- Server Start ---
app.listen(PORT, () => {
    console.log(`🚀 Server Running on http://localhost:${PORT}`);
});