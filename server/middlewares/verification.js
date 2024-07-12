import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Your're not logged in!" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
        return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;
        console.log(user.id);
        next();
    });
}
export default verifyToken;