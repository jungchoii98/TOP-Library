class Library {
  constructor() {
    this.books = [];
  }

  addBook(
    title = 'N/A',
    author = 'N/A',
    pages = 'N/A',
    read = false
  ) {
    let book = new Book(title, author, pages, read);
    this.books.push(book);
  }

  removeBook(index) {
    this.books.splice(index, 1);
  }

  updateReadStatus(index, read) {
    this.books[index].read = read;
  }

  getNumberOfBooks() {
    return this.books.length;
  }

  getBookAt(index) {
    return this.books[index];
  }
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.getReadString = () => {
    if (this.read) { return "Read"; }
    return "Not Read";
  }
}

const library = new Library();

let showDialogElement = document.querySelector('#show-dialog');
let dialogElement = document.querySelector('dialog');
let titleInputElement = document.querySelector('#title-input');
let authorInputElement = document.querySelector('#author-input');
let pageInputElement = document.querySelector('#page-input');
let readInputElement = document.querySelector('#read-input');
let cancelButtonElement = document.querySelector('#cancel-button');
let addButtonElement = document.querySelector('#add-button');

showDialogElement.addEventListener("click", (event) => {
  refreshModalInputs();
  dialogElement.showModal();
});

cancelButtonElement.addEventListener("click", (event) => {
  event.preventDefault();
  dialogElement.close();
});

addButtonElement.addEventListener("click", (event) => {
  event.preventDefault();
  let title = titleInputElement.value;
  let author = authorInputElement.value;
  let pages = parseInt(pageInputElement.value);
  let read = readInputElement.checked ? true : false;
  library.addBook(title, author, pages, read);
  displayBooks();
  dialogElement.close();
});

function refreshModalInputs() {
  titleInputElement.value = '';
  authorInputElement.value = '';
  pageInputElement.value = '';
  readInputElement.checked = false;
}

function displayBooks() {
  let articleElement = document.querySelector("article");
  articleElement.innerHTML = ``;

  for (let i=0; i<library.getNumberOfBooks(); i++) {
    let bookCard = document.createElement('div');
    let titleElement = document.createElement('p');
    titleElement.innerHTML = library.getBookAt(i).title;
    let authorElement = document.createElement('p');
    authorElement.innerHTML = library.getBookAt(i).author;
    let pagesElement = document.createElement('p');
    pagesElement.innerHTML = library.getBookAt(i).pages + ' pages';
    let readBtn = document.createElement('button');
    readBtn.innerHTML = library.getBookAt(i).getReadString();
    readBtn.addEventListener("click", toggleRead);
    if (library.getBookAt(i).read) {
      readBtn.classList.add('read-btn');
    }
    let removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'Remove';
    removeBtn.addEventListener("click", removeBook);

    bookCard.appendChild(titleElement);
    bookCard.appendChild(authorElement);
    bookCard.appendChild(pagesElement);
    bookCard.appendChild(readBtn);
    bookCard.appendChild(removeBtn);
    articleElement.appendChild(bookCard);
  }
}

function toggleRead(event) {
  let card = event.target.parentNode;
  let index = Array.from(card.parentNode.children).indexOf(card);
  let newReadStatus = !library.getBookAt(index).read;
  library.updateReadStatus(index, newReadStatus);
  displayBooks();
}

function removeBook(event) {
  let card = event.target.parentNode;
  let index = Array.from(card.parentNode.children).indexOf(card);
  library.removeBook(index);
  displayBooks();
}

library.addBook("The Count of Monte Cristo", "Alexandre Dumas", 1024, false);

library.addBook("A Short History of Nearly Everything", "Bill Bryson", 324, false);

displayBooks();