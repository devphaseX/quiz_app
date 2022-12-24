import { RequestHandler } from 'express';
import { Quiz } from '../model/question';
import { Result } from '../model/result';

const getQuestions: RequestHandler = async (_, res) => {
  try {
    const qs = await Quiz.find({});

    qs.forEach((q) => {
      //@ts-ignore
      q.answers = undefined;
    });
    res.json({
      status: 'sucess',
      data: qs,
    });
  } catch (e) {
    res.json({ status: 'failed', error: e });
  }
};

const getQuestionAnswers: RequestHandler = async (req, res) => {
  try {
    const qs = await Quiz.findById(req.params.questionId);
    res.json({
      status: 'success',
      data: qs,
    });
  } catch (e) {
    res.json({ status: 'failed', error: JSON.stringify(e), me: true });
  }
};

const insertQuestions: RequestHandler = async (req, res) => {
  try {
    await Quiz.create({
      questions: req.body.questions,
      answers: req.body.answers,
    });
    res.json({ status: 'sucess' });
  } catch (error) {
    res.json({ status: 'failed' });
  }
};

const dropQuestions: RequestHandler = async (_, res) => {
  try {
    await Quiz.deleteMany();
    res.json({ status: 'sucesss' });
  } catch (error) {
    res.json({ status: 'failed', error });
  }
};

const getResults: RequestHandler = async (_, res) => {
  try {
    const qs = await Result.find();
    res.json({ status: 'sucess', data: qs });
  } catch (e) {
    res.json({ status: 'failed', error: e });
  }
};
const insertResults: RequestHandler = async (req, res) => {
  try {
    const { username, result, attempts, point, archieved } = req.body;

    console.log(req.body);
    if (!(username && result)) throw 'missing property {username},{result}';
    await Result.create({
      username,
      result,
      attempts,
      point,
      archieved,
    });
    res.json({ status: 'sucess' });
  } catch (error) {
    res.json({ status: 'failed' });
  }
};

const dropResults: RequestHandler = async (_, res) => {
  try {
    await Result.deleteMany();
    res.json({ status: 'sucesss' });
  } catch (error) {
    res.json({ status: 'failed', error });
  }
};

export {
  getQuestions,
  insertQuestions,
  dropQuestions,
  getResults,
  insertResults,
  dropResults,
  getQuestionAnswers,
};
