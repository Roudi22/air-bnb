import { Schema, model } from "mongoose";
// place model
const placeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
  perks: {
    type: [String],
    required: true,
  },
  extraInfo: {
    type: String,
    required: true,
  },
  checkIn: {
    type: String,
    required: true,
  },
    checkOut: {
        type: String,
        required: true,
    },
    maxGuests: {
        type: Number,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    bookings: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, { timestamps: true });
// create place model
const PlaceModel = model("Place", placeSchema);
export default PlaceModel;