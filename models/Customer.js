import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dob: { type: Date, required: true },            // Date of Birth
    memberNumber: { type: Number, required: true }, // 1,2,3,...
    interests: { type: String, default: '' }        // e.g., movies, gym
  },
  { timestamps: true }
);

export default mongoose.models.Customer ||
  mongoose.model('Customer', CustomerSchema);

