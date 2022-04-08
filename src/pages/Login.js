import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchToken, PLAYER } from '../actions/index';
// import getToken from '../helpers/api';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      playerBtn: false,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    }, this.isLoginValid);
  }

  isLoginValid = () => {
    // Utilizei a validacao e o codigo regex apresentados no aulao ao vivo do dia 25/02/2022 Com Thiago Braddock, Felipe Nunes e Luanderson Santos
    const nameMinLength = 2;
    const { name, email } = this.state;

    const nameValid = name.length > nameMinLength;

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailValidator = regexEmail.test(email);

    const isValid = (nameValid && mailValidator);
    if (!isValid) {
      this.setState({
        playerBtn: false,
      });
    } else {
      this.setState({
        playerBtn: true,
      });
    }
  };

  handleClickPlay = async () => {
    const { getPlayerToken, history, playerMap } = this.props;
    await getPlayerToken();
    playerMap(this.state);
    history.push('/game');
  }

  handleClickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { playerBtn, name, email } = this.state;
    return (
      <div>
        <form className="form-login">
          <h1>Trivia Game</h1>
          <label htmlFor="name">
            <input
              placeholder="Name"
              value={ name }
              name="name"
              type="text"
              id="name"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            <input
              placeholder="E-mail"
              value={ email }
              id="email"
              name="email"
              type="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>

          <button
            name="btnPlay"
            id="btnplay"
            type="button"
            data-testid="btn-play"
            disabled={ !playerBtn }
            onClick={ this.handleClickPlay }
          >
            Play
          </button>
          <button
            type="button"
            id="btnconfiguracoes"
            onClick={ this.handleClickSettings }
            data-testid="btn-settings"
          >
            Settings
          </button>
        </form>
      </div>

    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  playerMap: (player) => dispatch(PLAYER(player)),
  getPlayerToken: () => dispatch(fetchToken()),
});

const mapStateToProps = (state) => ({
  token: state.token.token,
});

Login.propTypes = {

  playerMap: PropTypes.func.isRequired,
  getPlayerToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
