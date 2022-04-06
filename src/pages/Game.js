import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { fetchToken } from '../actions/index';
import { getQuestions } from '../helpers/api';

class Game extends React.Component {
  constructor() {
    super();
    this.state = ({
      gameQuestions: [],
    });
  }

  componentDidMount() {
    this.handleQuestions();
  }

   handleQuestions = async () => {
     const { token, getPlayerToken } = this.props;
     const TOKEN_NOT_FOUND = 3;
     const fetchQuestions = await getQuestions(token);
     if (fetchQuestions.code === TOKEN_NOT_FOUND) {
       getPlayerToken();
       this.handleQuestions();
       return;
     }
     console.log(fetchQuestions);
     this.setState({
       gameQuestions: fetchQuestions.results,
     });
   }

   render() {
     const { gameQuestions } = this.state;
     console.log(gameQuestions);
     return (
       <div>
         {gameQuestions
           ? (
             <>
               <p>asdqaw</p>
               <p>resposta1</p>
               <p>resposta2</p>
             </>
           )
           : null }
         <p>teste</p>
       </div>

     );
   }
}
const mapDispatchToProps = (dispatch) => ({
  getPlayerToken: () => dispatch(fetchToken()),
});

const mapStateToProps = (state) => ({
  token: state.token,
});

// Game.propTypes = {
// };
export default connect(mapStateToProps, mapDispatchToProps)(Game);
