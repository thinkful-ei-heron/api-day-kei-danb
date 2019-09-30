const BASE_URL = 'https://thinkful-list-api.herokuapp.com/kisobe';

const listApiFetch = function(url, method, newData){
  let error = false;
  return fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: newData
  })
    .then(res => {
      if(!res.ok) {
        error = {code: res.status};
      }
      return res.json();
    })
    .then( data => {
      if (error){
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};

const getItems = function() {
  return listApiFetch(`${BASE_URL}/items`);

};

const createItem = function(name) {
  return listApiFetch(`${BASE_URL}/items`, 'POST', JSON.stringify({
    'name': name,
  }));
};

const updateItem = function(id, updateData){
  return listApiFetch(`${BASE_URL}/items/${id}`, 'PATCH', JSON.stringify(updateData));
};

const deleteItem = function(id){
  return listApiFetch(`${BASE_URL}/items/${id}`, 'DELETE');
};

export default {
  getItems,
  createItem,
  updateItem,
  deleteItem
};