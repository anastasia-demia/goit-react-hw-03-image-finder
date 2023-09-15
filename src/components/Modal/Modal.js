import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root');


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
    return createPortal(
      <div className={css.overlay} onClick={this.handleBackdpropClick}>
        <div className={css.modal}>
          <img src={this.props.largePic.largeImageURL} alt={this.props.largePic.tags}/>
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  switchModal: PropTypes.func.isRequired,
};
