const BASE_URL = 'https://thinkful-list-api.herokuapp.com/kisobe';

const getItems = function() {
  return fetch(`${BASE_URL}/items`).then(function(response) {
    return response;
  });
};

const createItem = function(name) {
  let newItem = JSON.stringify({
    'name': name,
  });
  return fetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newItem
  }).then( function(response) {
    return response;
  });
};

const updateItem = function(id, updateData){
  fetch(`${BASE_URL}/items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  }).then( function(response) {
    return response;
  });
};

export default {
  getItems,
  createItem,
  updateItem
};