const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

function play(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'PLAYER':
    return {
      ...state, player: action.player,
    };
  default:
    return state;
  }
}
export default play;
