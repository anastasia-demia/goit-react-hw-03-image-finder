import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Notify } from "notiflix";
import { Loader } from "components/Loader/Loader";
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";
import { getImages } from "api/pixabayApi";


export class App extends Component {
  state = {
    searchQuery: '',
    error: null,
    status: 'idle',
    showModal: false,
    largePic: null,
    showButton: false,
    pics: [],
    page: 1,
  };

  componentDidUpdate(_, prevState) {
  if (prevState.searchQuery !== this.state.searchQuery || prevState.page !== this.state.page) {
  this.getPage()}
  };

  getPage = async () => {
    const { searchQuery, page } = this.state;
    this.setState({status: 'pending'})

    try {
      const pic = await getImages(searchQuery, page)

      this.setState(prevState => ({
        pics: [...prevState.pics, ...pic.hits],
        status: 'resolved',
        showButton: page < Math.ceil(pic.totalHits / 12),
      }));
    } catch (error) {
      this.setState({status: 'rejected'})
      Notify.warning(
        `Sorry, there are no images matching your search query. Please try again.`
      );
    } finally {
      this.setState({status: 'resolved'})
    }
  }

  changePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  switchModal = pic => {
    this.setState({ largePic: pic });
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, pics:[] });
  };

  render() {
    const {
      status,
      error,
      pics,
      showButton,
      showModal,
      largePic,
    } = this.state;

    return(
      <div>
        <Searchbar onSubmit={this.handleFormSubmit}/>
        {status === 'pending' && <Loader/>}
        {status === 'rejected' && (<h1>Whoops, something went wrong: {error.message}</h1>)}
        <ImageGallery pics={pics} onImgClick={this.switchModal}/>
        {showButton && <Button text="Load More" onBtnClick={this.changePage}/>}
        {showModal && (<Modal switchModal={this.switchModal} largePic={largePic}/>)}
      </div>
      )
  };
};
