// ====================================================
// 1. SETUP & IMPORTS
// ====================================================
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer'); 
const fs = require('fs');

// Models Import (Ensure ye files models folder mein hon)
const User = require('./models/User'); 
const FeeStructure = require('./models/FeeStructure'); 
const Notice = require('./models/Notice'); 
const FeePayment = require('./models/FeePayment'); 

const app = express();
// Render ka Port lega, warna 3000
const PORT = process.env.PORT || 3000; 

// ====================================================
// 2. MIDDLEWARE
// ====================================================
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// View Engine Setup (HTML use kar rahe ho EJS ke sath)
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile); 
app.set('view engine', 'html'); 

// --- Helper: Get Admin User ---
async function getAdminUser(username = null) {
    if(username) return await User.findOne({ username, role: 'admin' });
    return await User.findOne({ role: 'admin' }) || { fullName: 'Admin User', username: 'admin' };
}

// ====================================================
// 3. DATABASE CONNECTION (UPDATED FOR RENDER) 🟢
// ====================================================
// Localhost hata diya hai. Ab ye Render ke "Environment Variable" se link uthayega.
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas Connected!'))
  .catch(err => console.log('❌ DB Error:', err));

// ====================================================
// ✅ AUTO-CREATE FOLDERS (Render Crash Fix)
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
        
        // Simple password check (Security Note: Production me bcrypt use karna chahiye)
        if (!user || user.password !== password) {
            return res.send('<h3>Login Failed! Incorrect Username or Password.</h3><a href="/">Try Again</a>');
        }
        
        if (user.role === 'admin') res.redirect(`/admin/dashboard?user=${user.username}`);
        else res.redirect(`/student/dashboard?user=${user.username}`);
        
    } catch (err) { 
        console.log(err);
        res.status(500).send('Server Error: ' + err.message); 
    }
});

// --- Admin Dashboard ---
app.get('/admin/dashboard', async (req, res) => {
    try {
        const user = await getAdminUser(req.query.user);
        
        // Stats
        const studentCount = await User.countDocuments({ role: 'student' });
        const noticeCount = await Notice.countDocuments({});
        const facultyCount = await User.countDocuments({ role: 'faculty' }); 
        
        // Pending Fees Calculation
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

// --- Upload Notices ---
app.get('/admin/upload-notices', async (req, res) => {
    const user = await getAdminUser();
    const notices = await Notice.find({}).sort({ date: -1 }); 
    res.render('upload_notices.html', { user, notices, page: 'notices' });
});

app.post('/admin/upload-notice', uploadNotice.single('uploadedFile'), async (req, res) => {
    let fileName = req.file ? req.file.filename : null; 
    await Notice.create({ 
        title: req.body.title, 
        fileName: fileName, 
        date: new Date() 
    });
    res.redirect('/admin/upload-notices');
});

// --- Student Dashboard ---
app.get('/student/dashboard', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.query.user, role: 'student' });
        if(!user) return res.redirect('/');

        const notices = await Notice.find({}).sort({ date: -1 });

        res.render('student_dashboard.html', { 
            user: user,
            notices: notices 
        });

    } catch(e) { 
        console.log(e);
        res.redirect('/'); 
    }
});

app.get('/logout', (req, res) => res.redirect('/'));

// ==========================================
// 🛠️ ADMIN SETUP ROUTE (Ek baar run karein)
// ==========================================
// Is link ko browser me kholna: https://your-site.onrender.com/setup-admin
app.get('/setup-admin', async (req, res) => {
    try {
        const existingAdmin = await User.findOne({ username: 'admin' });
        if (existingAdmin) {
            return res.send('<h3>Admin pehle se hai!</h3><a href="/">Login Karein</a>');
        }
        await User.create({
            username: 'admin',
            password: 'admin123', // Password
            fullName: 'Super Admin',
            role: 'admin',
            email: 'admin@college.com',
            mobileNumber: '9999999999',
            // ✅ Niche wali line add kar di hai:
            dateOfAdmission: new Date(), 
            feesPaid: 0,
            totalFees: 0
        });
        res.send('<h3>✅ Admin Ban Gaya!</h3><p>User: admin</p><p>Pass: admin123</p><a href="/">Login</a>');
    } catch (err) {
        res.send("Error: " + err.message);
    }
});

// --- Server Start ---
app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});
