import { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem/Item';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';


export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    gallery: [],
    error: null,
    status: 'idle',
    showModal: false,
    clickedImg: {},
    showButton: false,
  };


  render() {

    return(
      <ImageGalleryItem/>,
      <Searchbar/>
    )
  };
};
