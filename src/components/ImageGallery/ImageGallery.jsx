import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';


const ImageGallery = ({images, onClick}) => (
    <ul className={css.imageGallery}>
      {images && images.map(({id, webformatURL, largeImageURL}) => (<ImageGalleryItem
      key={id}
      id={id}
      webformatURL={webformatURL}
      largeImageURL={largeImageURL}
      onClick={onClick}
      />))}
    </ul>
  )


export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number.isRequired, 
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  })),
  onClick: PropTypes.func,
}
