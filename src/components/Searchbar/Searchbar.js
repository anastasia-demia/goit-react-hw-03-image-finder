import PropTypes from 'prop-types';
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
    event.currentTarget.reset();
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <Button text="Search"/>

          <input
            className={css.input}
            type="text"
            autocomplete="off"
            autofocus
            onInput={this.handleInput}
            placeholder="Search for images and photos"
          />
        </form>
      </header>
    );
  }
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
