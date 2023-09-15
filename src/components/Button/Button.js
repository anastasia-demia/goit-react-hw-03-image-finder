import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ text, onBtnClick }) => {
  return (
    <button type="button" onClick={onBtnClick} className={css.button}>
      {text}
    </button>
  )
};

Button.propTypes = {
  onBtnClick: PropTypes.func.isRequired,
};


