import { quizzesActionTypes } from './actions';

export interface IQuestionAnswer {
  correct: boolean;
  correct_answer: string;
  id: number;
}

export interface QuizzesState {
  userId: number | undefined;
  name: string | undefined;
  surname: string | undefined;
  answers: {
    [key: string]: IQuestionAnswer[]
  } | {};
}

const initialState: QuizzesState = {
  userId: undefined,
  name: undefined,
  surname: undefined,
  answers: {},
};

export default function reducer(
  state = initialState,
  action: { type: quizzesActionTypes; payload: any },
) {
  switch (action.type) {
    case quizzesActionTypes.CREATE_PLAYER:
      return {
        ...state,
        name: action.payload.name,
        surname: action.payload.surname,
        userId: action.payload.id,
      };
    case quizzesActionTypes.ADD_QUIZ_QUESTION:
      const { quizId, answer } = action.payload;
      const { answers } = state;
      const previousQuizAnswers = answers[quizId] ?? [];
      return {
        ...state,
        answers: { ...answers, [quizId]: [...previousQuizAnswers, answer] },
      };
    default:
      return state;
  }
}
