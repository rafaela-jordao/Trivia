import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  componentDidMount() {
    this.Salvar();
  }

  Salvar = () => {
    const { correctAnswer, score } = this.props;
    localStorage.setItem('correctAnswer', `${correctAnswer}`);
    localStorage.setItem('score', `${score}`);
  };

  render() {
    const { correctAnswer, score } = this.props;
    const TRES = 3;
    return (
      <div>
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
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  correctAnswer: state.player.answer,
  score: state.player.score,
});

Feedback.propTypes = {
  correctAnswer: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
