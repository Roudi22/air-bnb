import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConnect } from './db.js';
import {userRouter} from './routes/userRoutes.js';
import { placeRouter } from './routes/placeRoutes.js';
import cookieParser from 'cookie-parser';
// display images in the browser
import path from 'path';
import fs from 'fs';
import imageDownloader from 'image-downloader';

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
// serve static files
app.use("/uploads/place-photos", express.static(path.join(path.resolve(), "/uploads/place-photos")));

// use cors
app.use(cors());

// register user with name, email and password endpoint
app.use(userRouter, placeRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // connect to mongodb database
  dbConnect();

});