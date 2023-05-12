import axios from "axios";
import PropTypes from 'prop-types';

async function fetchImages (pageNumber, imgName) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '34772880-f6f31822e5151a683868d32ba';
    const searchParams = new URLSearchParams({
        q: imgName,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: pageNumber,
        per_page: 12,
    })

    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&${searchParams}`);
    return response;
}

const api = {fetchImages};

export default api;

fetchImages.propTypes = {
    pageNumber: PropTypes.number.isRequired,
    imgName: PropTypes.string.isRequired,
}