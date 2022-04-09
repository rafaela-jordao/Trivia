import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PLAYER } from '../actions/index';
import './Header.css';

class Header extends Component {
  componentDidMount() {
    this.createGravatarEmail();
  }

  createGravatarEmail = () => {
    const { email, playerMap } = this.props;
    const gravatarEmail = md5(email).toString();
    playerMap({ gravatarEmail });
  }

  render() {
    const { player, score, gravatarEmail } = this.props;
    const gravatarSrc = `https://www.gravatar.com/avatar/${gravatarEmail}`;
    return (
      <header className="header">
        <img
          data-testid="header-profile-picture"
          src={ gravatarSrc }
          alt="Gravatar"
          id="imagem"
        />
        <p data-testid="header-player-name">{player}</p>
        <p data-testid="header-score">{score}</p>

      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  player: store.player.name,
  score: store.player.score,
  email: store.player.email,
  gravatarEmail: store.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  playerMap: (player) => dispatch(PLAYER(player)),
});

Header.propTypes = {
  player: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string,
  gravatarEmail: PropTypes.string.isRequired,
  playerMap: PropTypes.func.isRequired,
};

Header.defaultProps = {
  email: PropTypes.null,
};

// teste
export default connect(mapStateToProps, mapDispatchToProps)(Header);
