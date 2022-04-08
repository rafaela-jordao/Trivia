import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  componentDidMount() {
    this.Salvar();
  }

    handleClickPlayAgain = () => {
      const { history } = this.props;
      history.push('/');
    }

  redirectRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  Salvar = () => {
    const { score, gravatarEmail, name } = this.props;
    const gravatarURL = 'https://www.gravatar.com/avatar/';
    const currentRecords = localStorage.getItem('ranking');
    let recordArray = JSON.parse(currentRecords);
    if (recordArray !== null) {
      recordArray.push({ name, score, picture: gravatarURL + gravatarEmail });
    } else {
      recordArray = [{ name, score, picture: gravatarURL + gravatarEmail }];
    }
    const newRecord = JSON.stringify(recordArray);
    localStorage.setItem('ranking', newRecord);
  };

  render() {
    const { correctAnswer, score } = this.props;
    const TRES = 3;
    return (

      <>
        <Header />
        {
          correctAnswer >= TRES
            ? (
              <p data-testid="feedback-text">
                Well Done!
              </p>)
            : (
              <p data-testid="feedback-text">
                Could be better...
              </p>)
        }
        <p data-testid="feedback-total-score">
          { score }
        </p>
        <p data-testid="feedback-total-question">
          { correctAnswer }
        </p>

        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.redirectRanking }
        >
          Ranking
        </button>
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
  correctAnswer: state.player.answer,
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

Feedback.propTypes = {
  // answer: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  correctAnswer: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

};

export default connect(mapStateToProps)(Feedback);
