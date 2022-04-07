import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
    redirectLogin = () => {
      const { history } = this.props;
      history.push('/');
    }

    render() {
      return (
        <div>
          <h1 data-testid="ranking-title">Ranking</h1>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.redirectLogin }
          >
            Login
          </button>
        </div>
      );
    }
}
Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
