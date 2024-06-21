import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { UserModel } from './models/User.js';

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
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if username or email already exists
    const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({ username, email, password: hashedPassword });

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
        const token = jwt.sign({ username: user.username, role: user.role }, "jwt-secret-key", { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true }); // Secure flag should be set in production
        return res.json({ Status: "Success", role: user.role });
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


const verifyUser=(req,res,next)=>{
  const token=req.cookies.token;
  if(!token){
    return res.json("Token is missing")
  }
  else{
    jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
      if(err){
        return res.json("Error with token")
      }else{
        if(decoded.role==="admin"){
          next()
        }else{
          return res.json("not admin")
        }
      }
    })
  }
}

app.get('/adash',verifyUser,(req,res)=>{
  res.json({Status:"Success"})
})

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
