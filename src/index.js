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
  store.items[0] = api.createItem('chicken')
    .then(res => res.json())
    .then((newItem) => {
      store.addItem(newItem);
      shoppingList.render();
    });
  const newItem = store.items[0];
  console.log('current name: ' + newItem.name);
  store.findAndUpdate(newItem.id, { name: 'foobar' });
  console.log('new name: ' + newItem.name); 
  shoppingList.bindEventListeners();
  shoppingList.render();
};

$(main);