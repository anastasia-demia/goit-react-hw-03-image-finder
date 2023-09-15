import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Modal.module.css'



export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.switchModal();
    }
  };

  handleClick = event => {
    if (event.currentTarget === event.target) {
      this.props.switchModal();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.handleClick}>
        <div className={css.modal}>
          <img src={this.props.largePic.largeImageURL} alt={this.props.largePic.tags}/>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  switchModal: PropTypes.func.isRequired,
};
