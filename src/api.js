const BASE_URL = 'https://thinkful-list-api.herokuapp.com/kisobe';

const getItems = function() {
  return fetch(`${BASE_URL}/items`).then(function(response) {
    return response;
  });
};



export default {
  getItems,
};