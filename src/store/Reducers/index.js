export const SET_SCORE = 'snake/SET_SCORE';
export const RESET_GAME = 'snake/RESET_GAME';
export const SEND_SCORE_START = 'snake/SEND_SCORE_START';
export const SEND_SCORE_DONE = 'snake/SEND_SCORE_DONE';
export const SEND_SCORE_FAIL = 'snake/SEND_SCORE_FAIL';
export const GET_HIGHSCORE_START = 'snake/GET_HIGHSCORE_START';
export const GET_HIGHSCORE_DONE = 'snake/GET_HIGHSCORE_DONE';
export const GET_HIGHSCORE_FAIL = 'snake/GET_HIGHSCORE_FAIL';

const initialState = {
  score: 0,
};

function rootReducer(state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case SET_SCORE:
      return {
        ...state,
        score: payload,
      };
    case SEND_SCORE_START:
      return {
        ...state,
        sendScore: 'pending',
      };
    case SEND_SCORE_DONE:
      return {
        ...state,
        sendScore: 'done',
      };
    case SEND_SCORE_FAIL:
      return {
        ...state,
        sendScore: 'fail',
      };
    case RESET_GAME:
      return {
        ...initialState,
      };
    case GET_HIGHSCORE_START:
      return {
        ...state,
        getHighScore: 'pending',
      };
    case GET_HIGHSCORE_DONE:
      return {
        ...state,
        getHighScore: 'done',
        highScore: payload,
      };
    case GET_HIGHSCORE_FAIL:
      return {
        ...state,
        getHighScore: 'fail',
      };
    default:
      return state;
  }
}

export function setScore(payload) {
  return dispatch => {
    return dispatch({type: SET_SCORE, payload});
  };
}

export function sendScore({name}) {
  return async (dispatch, getState, api) => {
    dispatch({type: SEND_SCORE_START});
    try {
      const {score} = getState();

      await api.post('/score', {name, score});

      return dispatch({type: SEND_SCORE_DONE});
    } catch (error) {
      return dispatch({type: SEND_SCORE_FAIL});
    }
  };
}

export function resetGame() {
  return dispatch => {
    return dispatch({type: RESET_GAME});
  };
}

export function getHighScore() {
  return async (dispatch, getState, api) => {
    dispatch({type: GET_HIGHSCORE_START});
    try {
      const {highScore: payload} = (await api.get('/score')).data;

      return dispatch({type: GET_HIGHSCORE_DONE, payload});
    } catch (error) {
      return dispatch({type: GET_HIGHSCORE_FAIL});
    }
  };
}

export default rootReducer;
