export interface IQuiz {
  id: number;
  title: string;
  questions_count: number;
}

export interface IQuestion {
  id: number;
  question: string;
  answers: string;
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