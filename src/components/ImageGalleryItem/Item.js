import PropTypes from 'prop-types'
import css from './Item.module.css'

export const ImageGalleryItem = ({ src, alt, id, onImgClick }) => {
  return (
    <li className={css.item}>
      <img src={src} alt={alt} onClick={onImgClick} id={id} className={css.image}/>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
