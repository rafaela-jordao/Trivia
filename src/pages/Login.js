import PropTypes from 'prop-types';
import React from 'react';

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
            type="submit"
            data-testid="btn-play"
            disabled={ !playerBtn }
          >
            Play
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

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Login;
