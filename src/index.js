import $ from 'jquery';

import 'normalize.css';
import './index.css';
import api from './api';
import shoppingList from './shopping-list';

const main = function () {
  api.getItems()
    .then(res => res.json())
    .then(res => console.log(res));
  console.log(api.BASE_URL);
  shoppingList.bindEventListeners();
  shoppingList.render();
};

$(main);