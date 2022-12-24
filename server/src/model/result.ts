import mongoose, { Schema } from 'mongoose';

const result = new Schema({
  username: { type: String },
  result: { type: Object },
  attempts: { type: Number, default: 0 },
  point: { type: Number, default: 0 },
  archieved: { type: String, default: '' },
  createAt: { type: Date, default: Date.now },
});

const Result = mongoose.model('result', result);
export { Result };
