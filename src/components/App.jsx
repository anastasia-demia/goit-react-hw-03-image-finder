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
    loading: false,
    largePic: null,
    showButton: false,
    pics: [],
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const searchQuery = this.state.searchQuery;

    if (prevProps.searchQuery !== this.state.searchQuery || prevState.page !== this.state.page) {
      await this.getNewPage(searchQuery);
    }
  };

  getNewPage = async searchQuery => {
    try {
      const pic = await getImages(
        searchQuery,
        this.state.page
      );
      if (pic.data.total === 0) {
        Notify.warning(
          `Sorry, there are no images matching your search query. Please try again.`
        );
        this.setState({ showButton: false, status: 'idle' });
        return;
      }
      if (pic.data.hits.length < 12) {
        Notify.warning(`Sorry, there are no more images.`);
        this.setState({
          pics: [...this.state.pics, ...pic.data.hits],
          status: 'resolved',
          showButton: false,
        });
        return;
      }
      this.setState({
        pics: pic.data.hits,
        status: 'resolved',
        showButton: true,
      });
    } catch (error) {
      this.setState({ error, status: 'rejected' });
      Notify.failure(`Sorry, there was an error. Try a different word.`);
    }
  };

  changePage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  switchModal = pic => {
    this.setState({ largePic: pic });
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
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
        {status === 'resolved' && ( <ImageGallery pics={pics} onImgClick={this.switchModal}/>)}
        {showButton && <Button text="Load More" onBtnClick={this.changePage}/>}
        {showModal && (<Modal switchModal={this.switchModal} largePic={largePic}/>)}
      </div>
      )
  };
};
