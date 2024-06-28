import mongoose from "mongoose";

const leaveRequestSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
  },
);


export const LeaveRequestModel = mongoose.model('LeaveRequest', leaveRequestSchema);
