import PlaceModel from "../models/placeModel.js";
import express from "express";
import UserModel from "../models/userModel.js";
export const placeRouter = express.Router();
// get all places endpoint
placeRouter.get("/all-places", async (req, res) => {
  try {
    const places = await PlaceModel.find().populate("owner", "name email");
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// create place endpoint
placeRouter.post("/create-place", async (req, res) => {
  const {
    title,
    description,
    address,
    photos,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    userId
  } = req.body;
  if (!title || !description || !address || !photos || !perks || !extraInfo || !checkIn || !checkOut || !maxGuests || !userId) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }
  
  const newPlace = await PlaceModel.create({
    title,
    description,
    address,
    photos,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    owner: userId,
  });
  // add place to user's places
  const user = await UserModel.findById(userId);
  // add "accommadation" field to user's places if it doesn't exist
  if (!user.accommodations) {
    user.accommodations = [];
    user.accommodations.push(newPlace._id);
    await user.save();
    return res.json({
      message: "Place created successfully",
      place: newPlace,
    });
  }
  // add place to user's places
  user.accommodations.push(newPlace._id);
  await user.save();
  res.json({
    message: "Place created successfully",
    place: newPlace,
  });
});

// get user's places endpoint
placeRouter.get("/user-places", async (req, res) => {
  const {userId} = req.query;
  if (!userId) {
    return res.status(400).json({
      message: "Please provide user ID",
    });
  }
  const user = await UserModel.findById(userId);
  const places = await PlaceModel.find({ owner: userId });
  res.json({message: `${user.name}'s places fetched successfuly`,counts: places.length ,places});
});