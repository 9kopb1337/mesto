export class Section {
  constructor({ items, rendered}, containerSelector) {
    this._renderedItems = items;
    this._renderer = rendered;
    this._container = document.querySelector(containerSelector);
  }
  renderer(items) {
    items.forEach(item => this._renderer(item));
  }
  addItem(element) {
    this._container.prepend(element);
  }
}
