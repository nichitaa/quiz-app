import { IUser } from '../../types';
import { nextServerAPI } from '../../config/constants';

export enum quizzesActionTypes {
  CREATE_PLAYER = 'CREATE_PLAYER',
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
