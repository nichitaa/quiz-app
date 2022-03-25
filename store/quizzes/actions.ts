import { IUser } from '../../types';
import { nextServerAPI } from '../../config/constants';
import { IQuestionAnswer } from './reducer';

export enum quizzesActionTypes {
  CREATE_PLAYER = 'CREATE_PLAYER',
  ADD_QUIZ_QUESTION = 'ADD_QUIZ_QUESTION',
}

export const createPlayer =
  (player: { surname: string; name: string }) => async (dispatch) => {
    const createdPlayer = await fetch(`${nextServerAPI}/create-player`, {
      method: 'POST',
      body: JSON.stringify({ data: player }),
    }).then((res) => res.json());
    return dispatch({
      type: quizzesActionTypes.CREATE_PLAYER,
      payload: createdPlayer,
    });
  };

export interface IAddQuizQuestionAnswerActionPayload {
  quizId: number,
  answer: IQuestionAnswer
}

export const addQuizQuestionAnswerAction = (response: IAddQuizQuestionAnswerActionPayload) => async dispatch => {
  return dispatch({
    type: quizzesActionTypes.ADD_QUIZ_QUESTION,
    payload: response,
  });
};
