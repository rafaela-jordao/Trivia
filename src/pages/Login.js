import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken, PLAYER } from '../actions/index';
// import getToken from '../helpers/api';

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

  handleClickSubmit = () => {
    const { history } = this.props;
    history.push('/settings');
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

  handleClick = async () => {
    const { getPlayerToken } = this.props;
    await getPlayerToken();
    this.redirect();
  }

  redirect = () => {
    const { history, playerMap } = this.props;
    playerMap(this.state);
    history.push('/game');
  }

  render() {
    const { playerBtn, name, email } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="name">
            <input
              placeholder="Digite seu Nome"
              value={ name }
              name="name"
              type="text"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            <input
              placeholder="Digite seu Email"
              value={ email }
              name="email"
              type="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>

          <button
            name="btnPlay"
            type="button"
            data-testid="btn-play"
            disabled={ !playerBtn }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </form>
        <button
          type="submit"
          onClick={ this.handleClickSubmit }
          data-testid="btn-settings"
        >
          Configurações
        </button>
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

