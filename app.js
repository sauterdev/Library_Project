class Book {
  constructor(shelfId, title, author, read) {
    this.shelfId = shelfId;
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

class Library {
  bookList = [];
  bookCount = 0;
  bookPosition = 0; //identifies position when modals are created

  addBook = () => {
    this.bookCount++;
    let newBook = new Book(
      this.bookList.length + 1,
      titleInput.value,
      authorInput.value,
      readYesNo.checked
    );
    this.bookList.push(newBook);

    titleInput.value = ""; //resets input fields
    authorInput.value = "";
    readYesNo.checked = false;
    submitButton.disabled = true;

    this.putBookOnShelf(newBook);
  };

  //creates new row with 4 data cells for the book information. Adds listener on the the index cell to create a modal
  putBookOnShelf = (book) => {
    let newTr = document.createElement(`tr`);
    let new4Tds = [];
    let td1 = document.createElement(`td`);
    td1.textContent = book.shelfId;
    td1.className = "text-hover";
    new4Tds.push(td1);
    let td2 = document.createElement(`td`);
    td2.textContent = book.title;
    new4Tds.push(td2);
    let td3 = document.createElement(`td`);
    td3.textContent = book.author;
    new4Tds.push(td3);
    let td4 = document.createElement(`td`);
    td4.textContent = book.read;
    new4Tds.push(td4);

    new4Tds[0].addEventListener(`click`, this.buildModal); //sets listener to build modal when index is clicked on table

    new4Tds.forEach((ele) => newTr.appendChild(ele));
    tableBody.appendChild(newTr);
  };

  //removes table data and reconstructs. Reindexes books on shelf when items are removed
  reorgBookshelf = () => {
    tableBody.innerHTML = "";
    this.bookCount = this.bookList.length;
    // while (tableBody.firstChild) {
    //   tableBody.removeChild(tableBody.firstChild);
    // }
    for (let i = 0; i < this.bookList.length; i++) {
      this.bookList[i].shelfId = i + 1;
      this.putBookOnShelf(this.bookList[i]);
    }
  };

  buildModal = () => {
    this.bookPosition = event.target.textContent;
    const modalDiv = document.createElement(`div`);
    modalDiv.id = `modal`;
    const modalCard = document.createElement(`div`);
    modalCard.className = `modal-card`;
    const removeModal = document.createElement(`button`);
    removeModal.id = `removeModal`;
    removeModal.innerHTML = `<span>Put Back</span>`; //span has button animation css styles
    const removeBook = document.createElement(`button`);
    removeBook.id = `removeBook`;
    removeBook.innerHTML = `<span>Remove Book</span>`; 
    const markRead = document.createElement(`button`);
    markRead.id = `markRead`;
    if (this.bookList[this.bookPosition - 1].read) {
      markRead.disabled = true;
    }
    markRead.innerHTML = `<span>Mark Read</span>`;
    const modalPara = document.createElement(`p`);
    modalPara.textContent = `${
      this.bookList[this.bookPosition - 1].title
    }, by ${this.bookList[this.bookPosition - 1].author}`;

    contentDiv.appendChild(modalDiv);
    modalDiv.appendChild(modalCard);
    modalCard.appendChild(removeModal);
    modalCard.appendChild(removeBook);
    modalCard.appendChild(markRead);
    modalCard.appendChild(modalPara);

    //sets listeners on 3 created buttons
    removeModal.addEventListener(`click`, this.hideModal);
    removeBook.addEventListener(`click`, this.discardBook);
    markRead.addEventListener(`click`, this.changeReadStatus);
  };

  hideModal = () => {
    const removeThisModal = document.querySelector(`#modal`);
    contentDiv.removeChild(removeThisModal);
  };

  changeReadStatus = () => {
    this.bookList[this.bookPosition - 1].read = true;
    this.reorgBookshelf();
    this.hideModal();
  };

  discardBook = () => {
    this.bookList.splice(this.bookPosition - 1, 1);
    this.reorgBookshelf();
    this.hideModal();
  };
}

let chrisLibrary = new Library();
const tableBody = document.querySelector(`tbody`);
const titleInput = document.querySelector(`#titleInput`);
const authorInput = document.querySelector(`#authorInput`);
const readYesNo = document.querySelector(`#readYesNo`);
const submitButton = document.querySelector(`#submitButton`);
const bookInfoInput = document.querySelector(`.book-info-input`);
const contentDiv = document.querySelector(`.content`);
let removeModalAction;
let modalDiv;

submitButton.addEventListener(`click`, chrisLibrary.addBook);

//function runs on key up events for two input fields. If either is empty, the `add-book` button is disabled
function enableSubmit() {
  let inputs = document.getElementsByClassName(`required-input`);
  let isValid = true;
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() === "" || inputs[i].value === null) {
      isValid = false;
      break;
    }
  }
  submitButton.disabled = !isValid;
}
