import path from 'path';
import dotenv from 'dotenv';
import { startDBConnection } from '.';
import { getAnswersId, getQuestions } from './data';
import { Quiz } from '../../model/question';
dotenv.config({ path: path.resolve(__dirname, '../../../', '.env') });

startDBConnection()
  .then(() => {
    console.log('connected');
  })
  .then(() => Quiz.deleteMany())
  .then(() =>
    Quiz.insertMany([{ questions: getQuestions(), answers: getAnswersId() }])
  )
  .then(() => {
    console.log('successfully populate DB with data');
  });
