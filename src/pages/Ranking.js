import PropTypes from 'prop-types';
import React from 'react';
import './Ranking.css';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      records: [],
    };
  }

  componentDidMount() {
    this.sortRecordsArray();
  }

    redirectLogin = () => {
      const { history } = this.props;
      history.push('/');
    }

    sortRecordsArray = () => {
      const currentRecords = localStorage.getItem('ranking');
      const currentRecordsArray = JSON.parse(currentRecords);
      if (currentRecords !== null) {
        currentRecordsArray.sort((record1, record2) => record2.score - record1.score);
        this.setState({
          records: currentRecordsArray,
        });
      }
    }

    render() {
      const { records } = this.state;
      return (
        <div className="bodyRanking">
          <h1 id="titulo" data-testid="ranking-title">Ranking</h1>
          <div className="container-points">
            <ul>
              {records.length > 0
                ? records.map((record, index) => (
                  <div key={ index }>
                    <li className="pontos">
                      <img className="image" src={ record.picture } alt="player icon" />
                      <p data-testid={ `player-name-${index}` }>{record.name}</p>
                      <p data-testid={ `player-score-${index}` }>{record.score}</p>
                    </li>
                  </div>))
                : null}
            </ul>
          </div>
          <button
            id="button"
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
