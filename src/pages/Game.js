import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken } from '../actions/index';
import Header from '../components/Header';
import { getQuestions } from '../helpers/api';

class Game extends React.Component {
  constructor() {
    super();
    this.state = ({
      gameQuestions: [],
      currentQuestion: 0,
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

     this.setState({
       gameQuestions: fetchQuestions.results,
     });
   }

   randomizeQuestions = (arrayToRandomize) => {
     const randomizeIndex = 0.5;
     return arrayToRandomize.sort(() => Math.random() - randomizeIndex);
   }

   //  render() {
   //    const { gameQuestions } = this.state;
   //    return (
   //      <>
   //        <Header />
   //        {
   //          gameQuestions.map((question, index) => {
   //            const allAnswers = [...question.incorrect_answers, question.correct_answer];
   //            const randomAnswers = this.randomizeQuestions(allAnswers);
   //            return (
   //              <div key={ `question${index}` }>
   //                <div>
   //                  <h2 data-testid="question-category">{question.category}</h2>
   //                  <p data-testid="question-text">{question.question}</p>
   //                </div>

   //                <div data-testid="answer-options">

   // {randomAnswers.map((answer, answerIndex) => (
   //   answer === question.correct_answer
   //     ? (
   //       <button
   //         type="button"
   //         data-testid="correct-answer"
   //         key={ `answer${answerIndex}` }
   //       >
   //         {question.correct_answer}

   //       </button>)
   //     : (
   //       <button
   //         key={ `incorrect${answerIndex}` }
   //         type="button"
   //         data-testid={ `wrong-answer-${answerIndex}` }
   //       >
   //         {answer}

   //       </button>)))}
   //                </div>
   //              </div>);
   //          })
   //        }
   //      </>
   //    );
   //  }
   render() {
     const { gameQuestions, currentQuestion } = this.state;
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

                 <div data-testid="answer-options">
                   { this.randomizeQuestions(
                     [...gameQuestions[currentQuestion].incorrect_answers,
                       gameQuestions[currentQuestion].correct_answer],
                   )
                     .map((answer, answerIndex) => (
                       answer === gameQuestions[currentQuestion].correct_answer
                         ? (
                           <button
                             type="button"
                             data-testid="correct-answer"
                             key={ `answer${answerIndex}` }
                           >
                             {gameQuestions[currentQuestion].correct_answer}

                           </button>)
                         : (
                           <button
                             key={ `incorrect${answerIndex}` }
                             type="button"
                             data-testid={ `wrong-answer-${answerIndex}` }
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
