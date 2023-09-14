import { Component } from 'react';
import { Button } from 'components/Button/Button';
import css from './Searchbar.module.css'
import { Notify } from 'notiflix';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleInput = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return Notify.warning('Plese enter what you are looking for');
    }

    this.props.onSubmit(this.state.searchQuery);

    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <Button text="Search" onBtnClick={this.handleSubmit}/>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            onInput={this.handleInput}
            value={this.state.searchQuery}
            placeholder="Search for images and photos"
          />
        </form>
      </header>
    );
  }
};
