/* eslint-disable no-console */
import $ from 'jquery';

import 'normalize.css';
import './index.css';
import api from './api';
import shoppingList from './shopping-list';
import store from './store';

const main = function () {
  api.getItems()
    .then(res => res.json())
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      shoppingList.render();
    });
  shoppingList.bindEventListeners();
  shoppingList.render();
};

$(main);