import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
  {
   username: { type: String, required: true, unique: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
    role: {
      type: String,
      default: "visitor",
    },
  },
  
);

export const UserModel = mongoose.model('users', UserSchema);