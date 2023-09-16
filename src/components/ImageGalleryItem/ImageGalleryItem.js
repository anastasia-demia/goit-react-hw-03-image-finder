import PropTypes from 'prop-types'
import css from './Item.module.css'

export const ImageGalleryItem = ({ pic, onImgClick }) => {
  return (
        <li className={css.item}>
          <img src={pic.webformatURL} alt={pic.tags} onClick={() => onImgClick(pic)} className={css.image}/>
        </li>
  );
};

ImageGalleryItem.propTypes = {
  pic: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  })
};
