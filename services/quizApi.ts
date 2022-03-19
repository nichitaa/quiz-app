import {
  IQuestionApiResponse,
  Index,
  ISubmitQuestionBody,
  ISubmitQuestionResponse,
  IUser,
} from '../types';
import qs from 'qs';

export default class QuizApiService {
  private static instance: QuizApiService;
  // TODO: move to .env
  private quizApiBaseUrl = 'https://pure-caverns-82881.herokuapp.com/api';
  private developerKey =
    '15b50095c9a5d0d8787ae19f03c5db840428997fa1e220d22900762362cffdf4';
  private developerSecret =
    '9f2da0e705273f49b622258dbb529061453f0cc30f9f851fdfa3c824c69d1197';

  private constructor() {}

  public static getInstance(): QuizApiService {
    if (!QuizApiService.instance) {
      QuizApiService.instance = new QuizApiService();
    }
    return QuizApiService.instance;
  }

  private getAccessToken = async (): Promise<string> => {
    const response = await fetch(
      `${this.quizApiBaseUrl}/developers/v72/tokens`,
      {
        method: 'POST',
        headers: {
          'X-Developer-Key': this.developerKey,
          'X-Developer-Secret': this.developerSecret,
        },
      }
    )
      .then((res) => res.json())
    return response.token;
  };

  public createPlayer = async (body): Promise<IUser> => {
    const token = await this.getAccessToken();
    return await fetch(`${this.quizApiBaseUrl}/v54/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  };

  public getAllQuizzes = async (): Promise<Index[]> => {
    const token = await this.getAccessToken();
    return await fetch(`${this.quizApiBaseUrl}/v54/quizzes`, {
      headers: { 'X-Access-Token': token },
    }).then((res) => res.json());
  };

  public getQuizById = async (
    quizId: string,
    user_id?: string
  ): Promise<IQuestionApiResponse> => {
    const token = await this.getAccessToken();
    const url = `${this.quizApiBaseUrl}/v54/quizzes/${quizId}?${qs.stringify({
      user_id,
    })}`;
    return await fetch(url, {
      headers: { 'X-Access-Token': token },
    }).then((res) => res.json());
  };

  public submitQuiz = async (
    quizId: string,
    body: ISubmitQuestionBody
  ): Promise<ISubmitQuestionResponse> => {
    const token = await this.getAccessToken();
    const url = `${this.quizApiBaseUrl}/v54/quizzes/${quizId}/submit`;
    const quizApiResponse = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'X-Access-Token': token },
    }).then((res) => res.json());

    if (quizApiResponse.message?.length) {
      return { error: quizApiResponse.message[0] };
    }
    return quizApiResponse;
  };
}
