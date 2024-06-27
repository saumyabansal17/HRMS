import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'visitor'], default: 'visitor' },
    designation: { type: String },
    contactNo: { type: String },
    address: { type: String },
    dob: { type: Date },
    department: { type: String },
    bloodGroup: { type: String }
  },
  { timestamps: true }
);

// Remove the uniqueness constraint from the 'name' field
UserSchema.index({ name: 1 }, { unique: false });

export const UserModel = mongoose.model('users', UserSchema);
