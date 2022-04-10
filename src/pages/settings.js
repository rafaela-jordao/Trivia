import React from 'react';
import PropTypes from 'prop-types';
import './settings.css';
import { connect } from 'react-redux';
import { getCategorys } from '../helpers/api';
import { getCategory, getDifficulty, getType } from '../actions/index';

class Settings extends React.Component {
  constructor() {
    super();

    this.state = {
      category: 'default',
      difficulty: 'default',
      type: 'default',
      listOfCategories: [],
    };
  }

  async componentDidMount() {
    const categoryList = await getCategorys();
    this.setState({
      listOfCategories: Object.values(categoryList),
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({ [name]: value });
  }

  handleCategory = (category) => {
    const { dispatchCategory } = this.props;
    dispatchCategory(category);
  }

  handleDifficulty = (difficulty) => {
    const { dispatchDifficulty } = this.props;
    dispatchDifficulty(difficulty);
  }

  handleType = (typeOfQuestion) => {
    const { dispatchType } = this.props;
    dispatchType(typeOfQuestion);
  }

  handleClickReturnMenu = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { category, difficulty, type, listOfCategories } = this.state;
    return (
      <div className="bodySettings">
        <form className="container">
          <h3
            data-testid="settings-title"
          >
            Settings!!
          </h3>
          <label htmlFor="category-input">
            Categories:
            <select
              id="category-input"
              onChange={ this.handleChange }
              value={ category }
              name="category"
              onClick={ (event) => this.handleCategory(event.target.value) }
            >
              <option value="">default</option>
              {listOfCategories.length > 0
                ? listOfCategories[0]
                  .map((currCategory) => (
                    <option
                      key={ currCategory.id }
                      value={ currCategory.id }
                    >
                      {currCategory.name}
                    </option>))
                : null}
            </select>
          </label>
          <label htmlFor="difficulty-input">
            Difficulty:
            <select
              id="difficulty-input"
              onChange={ this.handleChange }
              value={ difficulty }
              name="difficulty"
              onClick={ (event) => this.handleDifficulty(event.target.value) }
            >
              <option value="">Any difficulty</option>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </label>
          <label htmlFor="type-input">
            Type of questions:
            <select
              id="type-input"
              onChange={ this.handleChange }
              value={ type }
              name="type"
              onClick={ (event) => this.handleType(event.target.value) }
            >
              <option value="">Any type</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / false</option>
            </select>
          </label>
          <button
            id="btnReturn"
            type="button"
            onClick={ this.handleClickReturnMenu }
          >
            Return to Main Menu

          </button>
        </form>

      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchCategory: (category) => dispatch(getCategory(category)),
  dispatchDifficulty: (difficulty) => dispatch(getDifficulty(difficulty)),
  dispatchType: (typeOfQuestion) => dispatch(getType(typeOfQuestion)),
});

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatchCategory: PropTypes.func.isRequired,
  dispatchDifficulty: PropTypes.func.isRequired,
  dispatchType: PropTypes.func.isRequired,

};

export default connect(null, mapDispatchToProps)(Settings);
