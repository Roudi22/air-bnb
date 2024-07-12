import mongoose, {Schema, model} from 'mongoose';
// user model
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accommodations: {
    type: [Schema.Types.ObjectId],
    ref: 'Place',
    default: [],
  },
  bookings: {
    type: [Schema.Types.ObjectId],
    ref: 'Place',
    default: [],
  },
}, {timestamps: true});
// create user model
const UserModel = model('User', userSchema);
export default UserModel;
