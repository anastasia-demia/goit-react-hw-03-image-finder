import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import PropTypes from 'prop-types'
import css from './Gallery.module.css'

export const ImageGallery = ({ pics, onImgClick }) => {
  return(
    <ul className={css.gallery}>
      {/* if (pics) { */}
        {pics.map((pic) => {
          return (
            <ImageGalleryItem
              key={pic.id}
              pic={pic}
              onImgClick={onImgClick}
            />
          );
        })}
      {/* } */}
    </ul>
  )
};

ImageGallery.propTypes = {
  pics: PropTypes.array.isRequired,
}
