import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({id, webformatURL, largeImageURL, onClick}) => (
<li className={css.imageGalleryItem} onClick={() => onClick(id, largeImageURL)}>
  <img src={webformatURL} alt={id} className={css.imageGalleryItemImage}/>
</li>
)

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired, 
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}
