import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { answer } = this.props;
    const TRES = 3;
    return (
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
    );
  }
}
const mapStateToProps = (state) => ({
  answer: state.player.answer,
});

Feedback.propTypes = {
  answer: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
