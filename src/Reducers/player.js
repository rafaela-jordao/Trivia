const INITIAL_STATE = {

  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',

};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'PLAYER':
    return {
      ...state,
      ...action.player,
    };
  case 'ADD_SCORE':
    return {
      ...state,
      score: action.score,
    };
  case 'ADD_ANSWER':
    return {
      ...state,
      assertions: action.answer,
    };
  default:
    return state;
  }
}
export default player;
