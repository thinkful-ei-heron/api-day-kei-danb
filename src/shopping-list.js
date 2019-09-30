import $ from 'jquery';
import store from './store';
import api from './api';

const generateItemElement = function (item) {
  let itemTitle = `<span class="shopping-item shopping-item__checked">${item.name}</span>`;
  if (!item.checked) {
    itemTitle = `
      <form class="js-edit-item">
        <input class="shopping-item" type="text" value="${item.name}" />
      </form>
    `;
  }

  return `
    <li class="js-item-element" data-item-id="${item.id}">
      ${itemTitle}
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
};

const generateShoppingItemsString = function (shoppingList) {
  const items = shoppingList.map((item) => generateItemElement(item));
  return items.join('');
};

const renderData = function () {
  store.error = false;
  $('.js-error-space').html('');
  let items = [...store.items];
  if (store.hideCheckedItems) {
    items = items.filter(item => !item.checked);
  }
  const shoppingListItemsString = generateShoppingItemsString(items);
  $('.js-shopping-list').html(shoppingListItemsString);
};

const renderError = function (str) {
  if (store.error){
    $('.js-error-space').html(`<p class="popuptext" id="myPopup">ERROR: ${str}</p>`);
  }
};

const handleNewItemSubmit = function () {
  $('#js-shopping-list-form').submit(function (event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    api.createItem(newItemName)
      .then(newItem => {
        store.addItem(newItem);
        renderData();
      })
      .catch(err => {
        store.error = true;
        renderError(err.message);
      });
  });
};

const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.js-item-element')
    .data('item-id');
};

const handleDeleteItemClicked = function () {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const id = getItemIdFromElement(event.currentTarget);
    api.deleteItem(id)
      .then(() => {
        store.findAndDelete(id);
        renderData();
      })
      .catch(err => {
        store.error = true;
        renderError(err.message);
      });
  });
};

const handleEditShoppingItemSubmit = function () {
  $('.js-shopping-list').on('submit', '.js-edit-item', event => {
    event.preventDefault();
    const id = getItemIdFromElement(event.currentTarget);
    const itemName = $(event.currentTarget).find('.shopping-item').val();
    api.updateItem(id, {name: itemName})
      .then(() => {
        store.findAndUpdate(id, {name: itemName});
        renderData();
      })
      .catch(err => {
        store.error = true;
        renderError(err.message);
      });

  });
};

const handleItemCheckClicked = function () {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    const id = getItemIdFromElement(event.currentTarget);
    const newItem = store.findById(id);
    api.updateItem(id, {checked: !newItem.checked})
      .then(() => {
        store.findAndUpdate(id, {checked: !newItem.checked});
        renderData();
      })
      .catch(err => {
        store.error = true;
        renderError(err.message);
      });

  });
};

const handleToggleFilterClick = function () {
  $('.js-filter-checked').click(() => {
    store.toggleCheckedFilter();
    renderData();
  });
};

const bindEventListeners = function () {
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleEditShoppingItemSubmit();
  handleToggleFilterClick();
};

export default {
  renderData,
  renderError,
  bindEventListeners
};