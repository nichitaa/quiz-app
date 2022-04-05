import type { NextApiRequest, NextApiResponse } from 'next';
import QuizApiService from '../../services/quizApi';

export default async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
  if (req.method === 'POST') {
    const response = await QuizApiService.getInstance().createQuiz(JSON.parse(req.body));
    return res.status(200).json(response);
  } else {
    return res.status(400).json({ error: 'method does not exists' });
  }
};
