import { Schema, model } from "mongoose";
// booking model
const bookingSchema = new Schema({
  place: {
    type: Schema.Types.ObjectId,
    ref: "Place",
    required: true,
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    nights : {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const BookingModel =  model("Booking", bookingSchema);
export default BookingModel;