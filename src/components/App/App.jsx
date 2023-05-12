import React from 'react';
import { Audio } from 'react-loader-spinner';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import imagesAPI from '../services/images-api';
import Modal from '../Modal/Modal'

export class App extends React.Component {
  state = {
    imgName: '',
    images: [],
    pageNumber: 1,
    id: null, 
    largeImageURL: null,
    isLoading: false,
    showModal: false
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.imgName !== this.state.imgName || prevState.pageNumber !== this.state.pageNumber) {
     try {
        this.onUpdate();
     } catch (error) {
        console.log(error);
     } 
  } 
}

   onUpdate = async () => {
    const {pageNumber, imgName} = this.state;
    try {
      this.setState({images: [], isLoading: true})
      const fetchedImages = await imagesAPI.fetchImages(pageNumber, imgName);
      this.setState((prevState) => ({images: [...prevState.images, ...fetchedImages]})
  )
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({isLoading: false})
    }
  }

  onLoadMore = () => {
    this.setState((prevState) => ({pageNumber: prevState.pageNumber + 1}))
  }

  // reset = () => {
  //   this.setState({
  //   imgName: '',
  //   })
  // }

  toggleModal = () => {
    this.setState(({showModal}) => ({showModal: !showModal}))
  }

  formSubmitHendler = name => {
    this.setState({imgName: name})
    // this.reset();
  }

  openModal = (id, largeImageURL) => {
    this.setState({id: id, largeImageURL: largeImageURL})
    this.toggleModal();
  }


  render() {
    const {images, isLoading, showModal, id, largeImageURL} = this.state;
    return (
      <div>
      <Searchbar onSubmit={this.formSubmitHendler}/>
      {isLoading && <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
      />}
      <ImageGallery images={images} onClick={this.openModal}/>
      {showModal && (<Modal onClose={this.toggleModal}><img src={largeImageURL} alt={id} width="600"/></Modal>)}
      {images.length !== 0? <Button onClick={this.onLoadMore}/> : ''}
      </div>
    );
  }
};
