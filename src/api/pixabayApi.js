import axios from "axios";

const MY_KEY = '39267965-ae1307b829d06e13d01f53801';
const BASE_URL = 'https://pixabay.com/api/';

export const getImages = async (searchQuery, page) => {
  const url = `${BASE_URL}/?key=${MY_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`;
  try {
    const response = await axios.get(url);
    return response.data.hits;
  } catch (error) {
    return new Error(`No images for ${searchQuery}. Please try something else`);
  }
};
