import type { NextApiRequest, NextApiResponse } from 'next';
import QuizApiService from '../../services/quizApi';

export default async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
  if (req.method === 'GET') {
    const { quizId, userId } = req.query;
    if (!quizId || !userId) {
      return res.status(400).json({ error: 'missing userId or quizId' });
    }
    const response = await QuizApiService.getInstance().getQuizById(quizId as string, userId as string);
    return res.status(200).json(response);
  } else {
    return res.status(400).json({ error: 'method does not exists' });
  }
};
