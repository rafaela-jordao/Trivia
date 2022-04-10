import { getToken } from '../helpers/api';

export const PLAYER = (player) => ({ type: 'PLAYER', player });

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const REQUEST_TOKEN_FAILURE = 'REQUEST_TOKEN_FAILURE';
export const ADD_SCORE = 'ADD_SCORE';
export const ADD_ANSWER = 'ADD_ANSWER';
export const RESET_SCORE = 'RESET_SCORE';
export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_DIFFICULTY = 'GET_DIFFICULTY';
export const GET_TYPE = 'GET_TYPE';

export const addScore = (score) => ({
  type: ADD_SCORE,
  score,
});

export const addAnswer = (answer) => ({
  type: ADD_ANSWER,
  answer,
});

export const resetScore = () => ({
  type: RESET_SCORE,
});

export const getCategory = (category) => ({
  type: GET_CATEGORY,
  category,
});

export const getDifficulty = (difficulty) => ({
  type: GET_DIFFICULTY,
  difficulty,
});

export const getType = (typeOfQuestion) => ({
  type: GET_TYPE,
  typeOfQuestion,
});

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const requestCurrencySuccess = (token) => ({
  type: REQUEST_TOKEN_SUCCESS,
  token,
});

export const requestTokenFailure = (error) => ({
  type: REQUEST_TOKEN_FAILURE,
  error,
});

export function fetchToken() {
  return async (dispatch) => {
    dispatch(requestToken());
    try {
      const response = await getToken();
      dispatch(requestCurrencySuccess(response));
    } catch (error) {
      dispatch(requestTokenFailure(error));
    }
  };
}
