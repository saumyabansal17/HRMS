// models/Attendance.js
import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent', 'Leave'], required: true },
  leaveType: { type: String, enum: ['Sick', 'Casual', 'Paid', 'None'], default: 'None' }
});

export const AttendanceModel = mongoose.model('Attendance', AttendanceSchema);

