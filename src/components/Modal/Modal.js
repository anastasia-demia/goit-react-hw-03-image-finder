import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
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

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.switchModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.largePic;

    return createPortal(
      <div className={css.overlay} onClick={this.handleBackdpropClick}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tags}/>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};
