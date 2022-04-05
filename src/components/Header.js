import md5 from 'crypto-js/md5';
import React, { Component } from 'react';

class Header extends Component {
  render() {
    // const { player } = this.props;
    console.log(md5);
    return (
      <header className="header">
        <img
          data-testid="header-profile-picture"
          src=""
          alt="Gravatar"
        />
        <p data-testid="header-player-name">Nome</p>
        <p data-testid="header-score">0</p>

      </header>
    );
  }
}

/* Header.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
}; */

export default Header;
