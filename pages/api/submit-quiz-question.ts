import type { NextApiRequest, NextApiResponse } from 'next';
import QuizApiService from '../../services/quizApi';

export default async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
  if (req.method === 'POST') {
    const parsed = JSON.parse(req.body);
    const response = await QuizApiService.getInstance().submitQuizQuestion(parsed.quizId, { data: parsed.data });
    return res.status(200).json(response);
  } else {
    return res.status(400).json({ error: 'method does not exists' });
  }
};
