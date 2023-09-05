import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({
  text, onBtnClick
}) => {
  return (
    <button type="submit" onClick={onBtnClick} className={css.button}>
      {text}
    </button>
  )
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onBtnClick: PropTypes.func,
};
