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
    showModal: false,
    loadMore: null,
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
    const {pageNumber, imgName, loadMore} = this.state;
    try {
      this.setState({isLoading: true})
      const response = await imagesAPI.fetchImages(pageNumber, imgName);
      const totalHits = response.data.totalHits;
      const fetchedImages = response.data.hits;
      this.setState((prevState) => ({images: [...prevState.images, ...fetchedImages], 
          loadMore: pageNumber < Math.ceil(totalHits / 12)}))
    console.log(loadMore);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({isLoading: false})
    }
  }

  onLoadMore = () => {
    this.setState((prevState) => {
      if (prevState.images.length !== 0) {
        return ({pageNumber: prevState.pageNumber + 1})
      }
    })
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
    const {images, isLoading, showModal, id, largeImageURL, loadMore} = this.state;
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
      {loadMore? <Button onClick={this.onLoadMore}/> : ''}
      </div>
    );
  }
};
