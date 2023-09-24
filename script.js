let showDialogElement = document.querySelector('#show-dialog');
let dialogElement = document.querySelector('dialog');
let titleInputElement = document.querySelector('#title-input');
let authorInputElement = document.querySelector('#author-input');
let pageInputElement = document.querySelector('#page-input');
let readInputElement = document.querySelector('#read-input');
let cancelButtonElement = document.querySelector('#cancel-button');
let addButtonElement = document.querySelector('#add-button');

showDialogElement.addEventListener("click", (event) => {
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
  let read = readInputElement.value === "on" ? true : false;
  addBookToLibrary(title, author, pages, read);
  displayBooks();
  dialogElement.close();
});

const myLibrary = [];

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

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks() {
  let articleElement = document.querySelector("article");

  for (let i=0; i<myLibrary.length; i++) {
    let unorderedList = document.createElement('ul');
    let titleListItem = document.createElement('li');
    titleListItem.innerHTML = myLibrary[i].title;
    let authorListItem = document.createElement('li');
    authorListItem.innerHTML = myLibrary[i].author;
    let pagesListItem = document.createElement('li');
    pagesListItem.innerHTML = myLibrary[i].pages;
    let readBtnListItem = document.createElement('li');
    readBtnListItem.innerHTML = myLibrary[i].getReadString();
    let removeBtnListItem = document.createElement('li');
    removeBtnListItem.innerHTML = 'Remove';

    unorderedList.appendChild(titleListItem);
    unorderedList.appendChild(authorListItem);
    unorderedList.appendChild(pagesListItem);
    unorderedList.appendChild(readBtnListItem);
    unorderedList.appendChild(removeBtnListItem);
    articleElement.appendChild(unorderedList);
  }
}

addBookToLibrary("The Count of Monte Cristo", "Alexandre Dumas", 1024, false);

addBookToLibrary("A Short History of Nearly Everything", "Bill Bryson", 324, false);

displayBooks();