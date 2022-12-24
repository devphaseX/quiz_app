import express from 'express';
import * as controller from '../controller';

const route = express.Router();

/* Question route */
route.get('/questions/answer/:questionId', controller.getQuestionAnswers);
route
  .route('/questions')
  .get(controller.getQuestions)
  .post(controller.insertQuestions)
  .delete(controller.dropQuestions);

/* Result route */

route
  .route('/results')
  .get(controller.getResults)
  .post(controller.insertResults)
  .delete(controller.dropResults);
export { route as allHandleRoute };
