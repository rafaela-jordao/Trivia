import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken } from '../actions/index';

class Game extends React.Component {
  async componentDidMount() {
    const { getPlayerToken } = this.props;
    await getPlayerToken();
  }

  render() {
    return (
      <p>oi</p>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  getPlayerToken: () => dispatch(fetchToken()),
});

// const mapStateToProps = (state) => ({
//   token: state.token.token,
// });

Game.propTypes = {
  getPlayerToken: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Game);
