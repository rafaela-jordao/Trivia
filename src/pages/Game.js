import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { fetchToken } from '../actions/index';

class Game extends React.Component {
  render() {
    return (
      <p>oi</p>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  getPlayerToken: () => dispatch(fetchToken()),
});

// Game.propTypes = {
// };
export default connect(null, mapDispatchToProps)(Game);
