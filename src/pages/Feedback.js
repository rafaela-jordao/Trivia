import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  handleClickPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { answer } = this.props;
    const TRES = 3;
    return (
      <>
        <div>
          <Header />
          {
            answer >= TRES
              ? (
                <p data-testid="feedback-text">
                  Well Done!
                </p>)
              : (
                <p data-testid="feedback-text">
                  Could be better...
                </p>)
          }

        </div>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handleClickPlayAgain }
        >
          Play Again

        </button>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  answer: state.player.answer,
});

Feedback.propTypes = {
  answer: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
