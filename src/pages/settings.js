import React from 'react';
import './settings.css';

class Settings extends React.Component {
  constructor() {
    super();

    this.state = {
      category: 'default',
      difficulty: 'default',
      type: 'default',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { category, difficulty, type } = this.state;
    return (
      <div className="bodySettings">
        <form className="container">
          <h3
            data-testid="settings-title"
          >
            Configurações!!
          </h3>
          <label htmlFor="category-input">
            Categoria
            <select
              id="category-input"
              onChange={ this.handleChange }
              value={ category }
              name="category"
            >
              <option value="default">default</option>
              <option value="category2">category2</option>
              <option value="category3">category3</option>
            </select>
          </label>
          <label htmlFor="difficulty-input">
            Dificuldade
            <select
              id="difficulty-input"
              onChange={ this.handleChange }
              value={ difficulty }
              name="difficulty"
            >
              <option value="default">default</option>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </label>
          <label htmlFor="type-input">
            Tipo
            <select
              id="type-input"
              onChange={ this.handleChange }
              value={ type }
              name="type"
            >
              <option value="default">default</option>
              <option value="multiple">multiple</option>
              <option value="boolean">boolean</option>
            </select>
          </label>
        </form>
      </div>);
  }
}

export default Settings;
