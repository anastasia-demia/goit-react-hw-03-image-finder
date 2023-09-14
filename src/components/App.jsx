import { Component } from 'react';
import { ImageGallery } from './ImageGallery/Gallery';
import { Searchbar } from './Searchbar/Searchbar';



export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {

    return(
      <div>
        <Searchbar onSubmit={this.handleFormSubmit}/>,
        <ImageGallery searchQuery={this.state.searchQuery}/>
      </div>
      )
  };
};
