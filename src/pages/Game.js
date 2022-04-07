import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken } from '../actions/index';
import Header from '../components/Header';
import { getQuestions } from '../helpers/api';
import './Game.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = ({
      gameQuestions: [],
      currentQuestion: 0,
      isBtnDisabled: false,
      answerBorder: '',
      answersTimer: 5,
    });
  }

  componentDidMount() {
    this.handleQuestions();
    this.questionsTimeOut();
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

     this.setState({
       gameQuestions: fetchQuestions.results,
     });
   }

   handleClickAnswer = (isCorrectAnswer) => {
     this.setState({
       isBtnDisabled: true,
       answerBorder: 'border',
     });
     console.log(isCorrectAnswer);
   }

   randomizeQuestions = (arrayToRandomize) => {
     const randomizeIndex = 0.5;
     return arrayToRandomize.sort(() => Math.random() - randomizeIndex);
   }

   questionsTimeOut = () => {
     const oneSecond = 1000;
     const { answersTimer } = this.state;
     const timeToAnswer = setTimeout(() => {
       if (answersTimer > 0) {
         this.setState({ answersTimer: answersTimer - 1 });
         this.questionsTimeOut();
       } else {
         clearTimeout(timeToAnswer);
         this.setState({
           isBtnDisabled: true,
           answerBorder: 'border',
         });
       }
     }, oneSecond);
   }

   render() {
     const { gameQuestions,
       currentQuestion,
       isBtnDisabled,
       answerBorder,
       answersTimer } = this.state;
     return (
       <>
         <Header />
         {

           gameQuestions.length > 0
             ? (
               <>
                 <div>
                   <h2 data-testid="question-category">
                     {gameQuestions[currentQuestion].category}

                   </h2>
                   <p data-testid="question-text">
                     {gameQuestions[currentQuestion].question}

                   </p>
                 </div>
                 {/* <p>{answersTimer}</p> */}
                 <div data-testid="answer-options" className="answer-container">
                   { this.randomizeQuestions(
                     [...gameQuestions[currentQuestion].incorrect_answers,
                       gameQuestions[currentQuestion].correct_answer],
                   )
                     .map((answer, answerIndex) => (
                       answer === gameQuestions[currentQuestion].correct_answer
                         ? (
                           <button
                             className={ `${answerBorder}-correct answer` }
                             type="button"
                             data-testid="correct-answer"
                             key={ `answer${answerIndex}` }
                             onClick={ () => this.handleClickAnswer(true) }
                             disabled={ isBtnDisabled }
                           >
                             {gameQuestions[currentQuestion].correct_answer}

                           </button>)
                         : (
                           <button
                             key={ `incorrect${answerIndex}` }
                             className={ `${answerBorder}-wrong answer` }
                             type="button"
                             data-testid={ `wrong-answer-${answerIndex}` }
                             disabled={ isBtnDisabled }
                             onClick={ () => this.handleClickAnswer(false) }
                           >
                             {answer}

                           </button>)))}
                 </div>

               </>
             )
             : null
         }
       </>
     );
   }
}

const mapDispatchToProps = (dispatch) => ({
  getPlayerToken: () => dispatch(fetchToken()),
});

const mapStateToProps = (state) => ({
  token: state.token,
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  getPlayerToken: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
