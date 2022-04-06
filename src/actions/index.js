import { getToken } from '../helpers/api';

export const PLAYER = (player) => ({ type: 'PLAYER', player });

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const REQUEST_TOKEN_FAILURE = 'REQUEST_TOKEN_FAILURE';

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
