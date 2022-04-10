const INITIAL_STATE = {

  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  category: '',
  difficulty: '',
  typeOfQuestion: '',
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
  case 'RESET_SCORE':
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  case 'GET_CATEGORY':
    return {
      ...state,
      category: action.category,
    };
  case 'GET_DIFFICULTY':
    return {
      ...state,
      difficulty: action.difficulty,
    };
  case 'GET_TYPE':
    return {
      ...state,
      typeOfQuestion: action.typeOfQuestion,
    };
  default:
    return state;
  }
}
export default player;
