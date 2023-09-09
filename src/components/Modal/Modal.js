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
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { url, alt } = this.props;
    return (
      <div className={css.overlay} onClick={this.handleBackdpropClick}>
        <div className={css.modal}>
          <img src={url} alt={alt}/>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  handleBackdpropClick: PropTypes.func,
};
