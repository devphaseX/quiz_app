import mongoose, { Schema } from 'mongoose';

const quizModel = new Schema({
  questions: { type: Array, default: [] },
  answers: { type: Object, default: {} },
  created: { type: Date, default: Date.now },
});

const Quiz = mongoose.model('question', quizModel);

export { Quiz };
