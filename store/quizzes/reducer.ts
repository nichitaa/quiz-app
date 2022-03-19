import { quizzesActionTypes } from './actions';

export interface QuizzesState {
  userId: number | undefined;
  name: string | undefined;
  surname: string | undefined;
}

const initialState: QuizzesState = {
  userId: undefined,
  name: undefined,
  surname: undefined,
};

export default function reducer(
  state = initialState,
  action: { type: quizzesActionTypes; payload: any }
) {
  switch (action.type) {
    case quizzesActionTypes.CREATE_PLAYER:
      return {
        ...state,
        name: action.payload.name,
        surname: action.payload.surname,
        userId: action.payload.id,
      };
    default:
      return state;
  }
}
