import he from 'he';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addAnswer, addScore, fetchToken, resetScore } from '../actions/index';
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
      answersTimer: 30,
      answersWithOrder: [],
      nextButton: false,
      correctAnswers: 0,
    });
  }

  componentDidMount() {
    const { setScoreToZero } = this.props;
    this.handleQuestions();
    this.questionsTimeOut();
    setScoreToZero();
    this.setState({ correctAnswers: 0 });
    const oneSecond = 1000;
    this.timer = setInterval(this.questionsTimeOut, oneSecond);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
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
     }, this.handleAnswersOrder);
   }

   handleClickAnswer = (isCorrectAnswer, difficulty) => {
     const { answersTimer, correctAnswers } = this.state;
     this.setState({
       isBtnDisabled: true,
       answerBorder: 'border',
     });

     if (isCorrectAnswer) {
       this.handleScore(answersTimer, difficulty);
       this.setState({ correctAnswers: correctAnswers + 1 });
     }

     this.setState({ nextButton: true, answersTimer: 0 });
   }

   handleAnswersOrder = () => {
     const { gameQuestions } = this.state;
     const answersWithOrder = [];

     gameQuestions.map((question, index) => {
       const randomOrder = this.randomizeArray([...gameQuestions[index].incorrect_answers,
         gameQuestions[index].correct_answer]);
       answersWithOrder.push(randomOrder);
       return null;
     });
     this.setState({ answersWithOrder });
   }

   handleScore = (answerTimer, difficulty) => {
     const { updateScore } = this.props;
     const BASE_POINTS = 10;
     const EASY_POINTS = 1;
     const MEDIUM_POINTS = 2;
     const HARD_POINTS = 3;

     let difficultyPoints = 1;
     switch (difficulty) {
     case 'medium':
       difficultyPoints = MEDIUM_POINTS;
       break;
     case 'hard':
       difficultyPoints = HARD_POINTS;
       break;
     default:
       difficultyPoints = EASY_POINTS;
     }

     const scoreToAdd = BASE_POINTS + (answerTimer * difficultyPoints);

     updateScore(scoreToAdd);
   }

   randomizeArray = (arrayToRandomize) => {
     const randomizeIndex = 0.5;
     return arrayToRandomize.sort(() => Math.random() - randomizeIndex);
   }

   questionsTimeOut = () => {
     const { answersTimer } = this.state;

     if (answersTimer > 0) {
       this.setState({ answersTimer: answersTimer - 1 });
     }
     if (answersTimer === 0) {
       this.setState({
         isBtnDisabled: true,
         answerBorder: 'border',
         nextButton: true,
         answersTimer: 0,
       });
     }
   }

   handleNextButtonClick = () => {
     const { currentQuestion, correctAnswers } = this.state;
     const { history, updateAnswer } = this.props;
     this.setState({
       currentQuestion: currentQuestion + 1,
       nextButton: false,
       answersTimer: 30,
       answerBorder: '',
       isBtnDisabled: false,
     });
     const LASTQUESTION = 4;
     if (currentQuestion === LASTQUESTION) {
       updateAnswer(correctAnswers);
       history.push('/feedback');
     }
   }

   render() {
     const { gameQuestions,
       currentQuestion,
       isBtnDisabled,
       answerBorder,
       answersTimer,
       answersWithOrder,
       nextButton } = this.state;
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
                     {he.decode(gameQuestions[currentQuestion].question) }
                   </p>
                 </div>
                 <p>{answersTimer}</p>
                 <div data-testid="answer-options" className="answer-container">
                   { answersWithOrder.length > 0
                     ? answersWithOrder[currentQuestion]
                       .map((answer, answerIndex) => (
                         answer === gameQuestions[currentQuestion].correct_answer
                           ? (
                             <button
                               className={ `${answerBorder}-correct answer` }
                               type="button"
                               data-testid="correct-answer"
                               key={ `answer${answerIndex}` }
                               onClick={ () => this.handleClickAnswer(
                                 true,
                                 gameQuestions[currentQuestion].difficulty,
                               ) }
                               disabled={ isBtnDisabled }
                             >
                               {he.decode(answer)}

                             </button>)
                           : (
                             <button
                               key={ `incorrect${answerIndex}` }
                               className={ `${answerBorder}-wrong answer` }
                               type="button"
                               data-testid={ `wrong-answer-${answerIndex}` }
                               disabled={ isBtnDisabled }
                               onClick={ () => this.handleClickAnswer(false, null) }
                             >
                               {he.decode(answer)}

                             </button>)))
                     : null}
                   <div>
                     {nextButton
                       ? (
                         <button
                           className="nextButton"
                           type="button"
                           data-testid="btn-next"
                           onClick={ this.handleNextButtonClick }
                         >
                           Próxima
                         </button>)
                       : null}
                   </div>
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
  setScoreToZero: () => dispatch(resetScore()),
  updateScore: (newScore) => dispatch(addScore(newScore)),
  updateAnswer: (newAnswer) => dispatch(addAnswer(newAnswer)),
});

const mapStateToProps = (state) => ({
  token: state.token,
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  getPlayerToken: PropTypes.func.isRequired,
  updateAnswer: PropTypes.func.isRequired,
  setScoreToZero: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
