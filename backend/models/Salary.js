// models/Salary.js
import mongoose from 'mongoose';

const SalarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  baseSalary: { type: Number, required: true },
  bonus: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  netSalary: { type: Number, required: true }
}, { timestamps: true });

export const SalaryModel = mongoose.model('Salary', SalarySchema);
