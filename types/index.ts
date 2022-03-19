/**
 * The app has few simple interfaces/types that does not require splitting it over multiple files
 */

export interface Index {
  id: number;
  title: string;
  questions_count: number;
  questions?: IQuestion[];
}

export interface IQuestion {
  id: number;
  question: string;
  answers: string[];
  answered_correctly?: boolean;
  submitted_answer?: string;
}

export interface IQuestionApiResponse {
  id: number;
  title: string;
  questions: IQuestion[];
}

export interface ISubmitQuestionBody {
  data: {
    question_id: number;
    answer: string;
    user_id: number;
  };
}

export type ISubmitQuestionResponse =
  | {
      id: number;
      correct_answer: string;
      correct: boolean;
    }
  | {
      error: string;
    };

export interface IUser {
  id: number;
  name: string;
  surname: string;
}
