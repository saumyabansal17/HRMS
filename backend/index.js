import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { UserModel } from './models/User.js';
import {LeaveRequestModel} from './models/LeaveRequest.js'
import {AttendanceModel} from './models/Attendance.js'

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;
const mongoDBURL = process.env.DB;

app.use(express.json());
app.use(cookieParser());

// app.use(cors())

app.use(
  cors({
    origin: ['http://localhost:5173'], // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    
  })
);


app.get('/', (req, res) => {
  return res.status(200).send('Hello SAUMYA here');
});

// Register endpoint with username uniqueness check
// app.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     // Check if username or email already exists
//     const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//       return res.status(400).json({ error: 'Username or Email already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await UserModel.create({ username, email, password: hashedPassword });

//     res.status(201).json({ status: 'Success', user: newUser });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

app.post('/addemp', async (req, res) => {
  const { name,email, password, designation, contactNo, address, dob, department, bloodGroup } = req.body;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  try {
    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Generate the next username
    const lastUser = await UserModel.findOne().sort({ username: -1 });
    let username = 10001; // default starting username
    if (lastUser) {
      username = parseInt(lastUser.username) + 1;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const formattedDob = formatDate(dob);
    const newUser = await UserModel.create({
      username: username.toString(),
      name,
      email,
      password: hashedPassword,
      designation,
      contactNo,
      address,
      dob: formattedDob,
      department,
      bloodGroup
    });

    res.status(201).json({ status: 'Success', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/register', async (req, res) => {
  const { name,email, password, designation, contactNo, address, dob, department, bloodGroup } = req.body;
  
  if (!name || !email || !designation || !contactNo || !address || !dob || !department || !bloodGroup) {
    return res.status(400).json({ error: 'All fields must be filled' });
  }

  try {
    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Generate the next username
    const lastUser = await UserModel.findOne().sort({ username: -1 });
    let username = 10001; // default starting username
    if (lastUser) {
      username = parseInt(lastUser.username) + 1;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username: username.toString(),
      name,
      email,
      password: hashedPassword,
      designation,
      contactNo,
      address,
      dob,
      department,
      bloodGroup
    });

    res.status(201).json({ status: 'Success', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await UserModel.findOne({ username });

    if (!user) {
      // User not found
      return res.status(404).json({ error: "User not found" });
    }

    // Compare passwords
    bcrypt.compare(password, user.password, (err, response) => {
      if (response) {
        // Passwords match, generate token    
      const token = jwt.sign({ username: user.username,name:user.name, role: user.role,id: user._id }, "jwt-secret-key", { expiresIn: '1d' });
      console.log("backend Token : ",token);
      res.cookie('token', token, { httpOnly: true }); // Secure flag should be set in production
        return res.json({ Status: "Success", role: user.role, id: user._id });
      } else {
        // Incorrect password
        return res.status(401).json({ error: "Incorrect password" });
      }
    });

  } catch (err) {
    // Handle server errors
    return res.status(500).json({ error: err.message });
  }
});


const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Admin Token : ",token)
  if (!token) {
    console.log("Token is missing");
    return res.status(401).json({ error: 'Token is missing' });
  } else {
    console.log("Token is not missing");
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        // console.log("Error with token");
        console.error("Error with token verification:", err);
        return res.status(401).json({ error: 'Error with token' });
      } else {
        // console.log("Decoded token:", decoded);
        req.user = decoded; // Attach decoded token payload to request object
        next();
        // if (decoded.role === "admin") {
        //   console.log("admin");
        //   next();
        // } else {
        //   console.log("not admin");
        //   return res.json("not admin");
        // }
      }
    });
  }
};

const verifyUsers = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("Admin Token : ",token)
  if (!token) {
    console.log("Token is missing");
      return res.status(401).json({ error: 'No token provided' });
  }

  try {
      const decoded = jwt.verify(token, 'jwt-secret-key');
      console.log("Decoded token:", decoded);
      console.log("Decoded id:", decoded.id); // Use your actual secret key
      const user = await UserModel.findById(decoded.id);
      if (!user) {
        console.log("Token invalid inside");
          return res.status(401).json({ error: 'Invalid token' });
      }
      req.user = user; // Attach user information to req.user
      next();
  } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
  }
};


app.get('/adash',verifyUser,(req,res)=>{
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  console.log("adash get here");
  res.json({Status:"Success",isloggedin:true})
})

app.get('/udash', verifyUser, (req, res) => {
  // Proceed with user dashboard logic
  res.json({ message: 'Welcome to User Dashboard' });
});

app.get('/editemp', async (req, res) => {
  try {
    const employees = await UserModel.find({ role: { $ne: 'admin' } });
    res.status(200).json({ data: employees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.delete('/employee/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ status: 'Success', message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/udash/employee/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await UserModel.findById(id).select('-password'); // Exclude password field
    if (!employee) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT request to update user details
app.put('/udash/update/:id', async (req, res) => {
  const { id } = req.params;
  const { bloodGroup, address, contactNumber, email } = req.body;

  try {
    // Check if the email is already in use by another user
    const existingUser = await UserModel.findOne({ email, _id: { $ne: id } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Update the user's details
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { bloodGroup, address, contactNumber, email },
      { new: true, runValidators: true, context: 'query' } // Return the updated document
    ).select('-password'); // Exclude password field

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/employee/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await UserModel.findById(id).select('-password'); // Exclude password field
    if (!employee) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.put('/employee/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password, designation, contactNo, address, dob, department, bloodGroup } = req.body;

  // Validate that no field is empty
  if (!name || !email || !designation || !contactNo || !address || !dob || !department || !bloodGroup) {
    return res.status(400).json({ error: 'All fields must be filled' });
  }

  try {
    // Find the user by ID
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if email or name already exists (excluding current user's email and name)
    const existingEmailUser = await UserModel.findOne({ email, _id: { $ne: id } });
    if (existingEmailUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }


    // Update the user fields except for the username
    user.name = name;
    user.email = email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    user.designation = designation;
    user.contactNo = contactNo;
    user.address = address;
    user.dob = dob;
    user.department = department;
    user.bloodGroup = bloodGroup;

    // Save the updated user
    await user.save();

    res.status(200).json({ status: 'Success', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to submit a leave request
app.post('/api/leave/request', verifyUser, async (req, res) => {
  const { username,name } = req.user;
  const { startDate, endDate, reason } = req.body;

  try {
    const newLeaveRequest = await LeaveRequestModel.create({
      username,
      name,
      startDate,
      endDate,
      reason,
    });

    res.status(201).json({ status: 'Success', leaveRequest: newLeaveRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to fetch all leave requests for a user
app.get('/api/leave/requests', verifyUser, async (req, res) => {
  const { username } = req.user;

  try {
    const userLeaveRequests = await LeaveRequestModel.find({ username });
    res.status(200).json(userLeaveRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/leave/requests/pending', verifyUser, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    const pendingRequests = await LeaveRequestModel.find({ status: 'Pending' });
    res.status(200).json(pendingRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to fetch all leave requests (admin view)
app.get('/api/leave/requests/all', verifyUser, async (req, res) => {
  try {
    const allLeaveRequests = await LeaveRequestModel.find();
    res.status(200).json(allLeaveRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to update the status of a leave request by admin
app.put('/api/leave/manage/:id', verifyUser, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedLeaveRequest = await LeaveRequestModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedLeaveRequest) {
      return res.status(404).json({ error: 'Leave request not found' });
    }

    res.status(200).json({ status: 'Success', leaveRequest: updatedLeaveRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Mark attendance for all users
app.post('/api/attendance/mark', verifyUser, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    const { date, attendances } = req.body; // { date: '2023-06-30', attendances: [{ userId: '123', status: 'Present', leaveType: 'None' }, ...] }

    try {
        const attendancePromises = attendances.map(att => 
            AttendanceModel.findOneAndUpdate(
                { userId: att.userId, date },
                { ...att, date },
                { upsert: true, new: true }
            )
        );
        const results = await Promise.all(attendancePromises);
        res.status(200).json({ status: 'Success', results });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update attendance for a user
app.put('/api/attendance/update/:id', verifyUser, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    const { id } = req.params;
    const { date, status, leaveType } = req.body;

    try {
        const updatedAttendance = await AttendanceModel.findOneAndUpdate(
            { userId: id, date },
            { status, leaveType },
            { new: true }
        );
        res.status(200).json({ status: 'Success', updatedAttendance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/users', async (req, res) => {
  try {
    const employees = await UserModel.find({ role: { $ne: 'admin' } });
    res.status(200).json({ data: employees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get attendance for a user
app.get('/api/attendance/user/:id', verifyUsers, async (req, res) => {
  console.log("user: ",req.user._id);
  console.log("params: ",req.params.id);
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    const { id } = req.params;

    try {
        const attendance = await AttendanceModel.find({ userId: id });
        console.log(attendance);
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Check authentication endpoint
app.get('/api/check-auth', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    const user = jwt.verify(token, 'jwt-secret-key');
    return res.json(user);
  } catch (error) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'Logged out' });
});


// Connect to MongoDB and start the server
mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB connected successfully');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('DB connection error:', error);
  });