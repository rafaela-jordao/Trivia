import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { fetchToken } from '../actions/index';
import Header from '../components/Header';

class Game extends React.Component {
  render() {
    return (
      <Header />

    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  getPlayerToken: () => dispatch(fetchToken()),
});

// Game.propTypes = {
// };
export default connect(null, mapDispatchToProps)(Game);
