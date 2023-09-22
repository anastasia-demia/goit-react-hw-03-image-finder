import axios from "axios";

const myKey = '39267965-ae1307b829d06e13d01f53801';
const base = 'https://pixabay.com/api/';

export const getImages = async (searchQuery, page) => {
  const url = `${base}/?key=${myKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`;
  const {data} = await axios.get(url);
  return data;
};
