import { Notify } from "notiflix";
import { Component } from "react";
import { Loader } from "components/Loader/Loader";
import { ImageGalleryItem } from "components/ImageGalleryItem/Item";
import css from './Gallery.module.css'
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";
import { getImages } from "api/pixabayApi";

export class ImageGallery extends Component {
  state = {
    error: null,
    status: 'idle',
    showModal: false,
    showLoader: false,
    largePic: null,
    showButton: true,
    pics: [],
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const searchQuery = this.props.searchQuery;

    if (prevProps.searchQuery !== this.props.searchQuery) {
      await this.getNewPage(searchQuery);
    }

    if (
      prevState.page !== this.state.page &&
      prevProps.searchQuery === this.props.searchQuery
    ) {
      await this.getMorePages(searchQuery);
    }
  }

  getNewPage = async searchQuery => {
    this.setState({
      status: 'pending',
      showButton: true,
      pics: [],
      page: 1,
    });

    if (this.state.page === 1) {
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
            showLoader: false,
            showButton: false,
          });
          return;
        }
        this.setState({
          pics: pic.data.hits,
          status: 'resolved',
        });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
        Notify.failure(`Sorry, there was an error. Try a different word.`);
      }
    }
  };


  getMorePages = async searchQuery => {
    this.setState({ showLoader: true, showButton: false });

    try {
      const pic = await getImages(
        searchQuery,
        this.state.page
      );
      if (pic.data.hits.length < 12) {
        Notify.warning(`Sorry, there are no more images.`);
        this.setState({
          pics: [...this.state.pics, ...pic.data.hits],
          status: 'resolved',
          showLoader: false,
          showButton: false,
        });
      } else {
        this.setState({
          pics: [...this.state.pics, ...pic.data.hits],
          status: 'resolved',
          showLoader: false,
          showButton: true,
        });
      }
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

  render () {
    const {
      status,
      error,
      pics,
      showButton,
      showLoader,
      showModal,
      largePic,
    } = this.state;

    return(
      <>
      {status === 'pending' && <Loader />}
      {status === 'rejected' && (<h1>Whoops, something went wrong: {error.message}</h1>)}
      {status === 'resolved' && (
          <div>
            <ul className={css.gallery}>
              {pics.map((pic) => {
                return (
                  <ImageGalleryItem
                    key={pic.id}
                    pic={pic}
                    onImgClick={this.switchModal}
                  />
                );
              })}
            </ul>
            {showModal && (
              <Modal switchModal={this.switchModal} largePic={largePic} />
            )}
            {showButton && <Button text="Load More" onBtnClick={this.changePage} />}
            {showLoader && <Loader />}
          </div>
        )}
      </>
    )
  }
}
