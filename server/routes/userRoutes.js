import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import imageDownloader from 'image-downloader';
import multer from 'multer';

dotenv.config();
export const userRouter = express.Router();
// register user with name, email and password endpoint
userRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    // hash password
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Please enter all fields',
      });
    }
    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }
    const salt = bcrypt.genSaltSync(10); // 10 is the number of rounds to generate the salt
    const hashedPassword = bcrypt.hashSync(password, salt);
  
    // create new user
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
  
    res.json({
      message: 'User created successfully',
      user: newUser,
    });
  });
    // login user with email and password endpoint
userRouter.post('/login', async (req, res) => { 
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please enter all fields',
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist',
      });
    }
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: 'Invalid password',
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    if (!token) {
      return res.status(400).json({
        message: 'Error generating token',
      });
    }
    res.json({
      message: 'User logged in successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  });

  // profile endpoint to get user profile
userRouter.get('/profile', async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const user = await UserModel.findById(decoded.id);
      res.json({
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
        token: token,
      });
    } catch (error) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
  });

  // logout endpoint
userRouter.post('/logout', async (req, res) => {
  res.cookie('token', '').json({
    message: 'User logged out successfully',
  }); // clear the token cookie
  });
  // uplaod photo by link endpoint
  userRouter.post('/upload-photo', async (req, res) => {
    const { link } = req.body;

    if (!link) {
      return res.status(400).json({
        message: 'Please enter a photo link',
      });
    }
    const newName = Date.now() + '.jpg';
    const dest = path.join(process.cwd(), 'uploads/place-photos');
    await fs.mkdir(dest, { recursive: true });

    await imageDownloader.image({
      url: link,
      dest: dest+'/'+newName,
    });

    res.json({
      message: 'Photo uploaded successfully',
      photo: newName,
    });
});

// upload functionality using multer
const photoMiddleware = multer({ dest: 'uploads/place-photos' });

// upload photo by file endpoint
userRouter.post('/uploads/place-photo', photoMiddleware.array("photos", 100), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path, originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.rename(path, newPath);
    uploadedFiles.push(newPath.replace('uploads\\place-photos\\', ''));    
  }
  res.json(uploadedFiles)
});