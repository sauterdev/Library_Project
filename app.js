// to do list
// mark read method on library class
// remove book method on library class
// reindex when book is removed
// check box for read/not read

class Book {
  constructor(id, title, author, read) {
    this.id = "";
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

class Library {
  bookList = [];
  bookCount = 0;
  bookPosition = 0; //identifies position when modals are created

  markRead(param) {}

  addBook = () => {
    this.bookCount++;
    //build array to easier create table elements with loop
    let book = [
      this.bookCount,
      titleInput.value,
      authorInput.value,
      readYesNo.checked,
    ];
    let newBook = new Book(book[0], book[1], book[2], book[3]);
    this.bookList.push(newBook);

    let newTr = document.createElement(`tr`);
    newTr.className = `bookLineItem`;
    newTr.setAttribute(`whichBook`, `${book[0]}`); //add attribute to pull ID number off html TR event listener
    for (let i = 0; i < book.length; i++) {
      //creates 3 tables elements to add to newTr
      let newTd = document.createElement(`td`);
      newTd.textContent = book[i];
      newTr.appendChild(newTd);
      if (i == book.length - 1) {
        // add check box to last table row
        let checkButton = document.createElement(`input`);
        checkButton.type = `checkbox`;
        checkButton.name = `read`;
        checkButton.id = `readLibraryCheckbox`;
        checkButton.checked = readYesNo.checked;
        checkButton.disabled = true;
        newTd.appendChild(checkButton);
        checkButton.previousSibling.remove(); //removes true/false from display
      }
    }
    tableBody.appendChild(newTr);

    newTr.addEventListener(`click`, chrisLibrary.buildModal); //creates a listener on the book list table row

    titleInput.value = ""; //resets input fields
    authorInput.value = "";
    readYesNo.checked = false;
    submitButton.disabled = true;
  };

  buildModal = () => {
    this.bookPosition = event.target.parentNode.getAttribute(`whichBook`);
    const modalDiv = document.createElement(`div`);
    modalDiv.id = `modal`;
    const modalCard = document.createElement(`div`);
    modalCard.className = `modal-card`;
    const removeModal = document.createElement(`button`);
    removeModal.id = `removeModal`;
    removeModal.textContent = "Put Back";
    const removeBook = document.createElement(`button`);
    removeBook.id = `removeBook`;
    removeBook.textContent = "Remove Book";
    const markRead = document.createElement(`button`);
    markRead.id = `markRead`;
    markRead.textContent = "Mark Read";
    const modalPara = document.createElement(`p`);
    modalPara.textContent = `${this.bookList[this.bookPosition - 1].title}, by ${
      this.bookList[this.bookPosition - 1].author //displays the name of the book and the author in the paragraph tab
    }`; 

    contentDiv.appendChild(modalDiv);
    modalDiv.appendChild(modalCard);
    modalCard.appendChild(removeModal);
    modalCard.appendChild(removeBook);
    modalCard.appendChild(markRead);
    modalCard.appendChild(modalPara);

    //should this be its own method? YES to remove when hitting other buttons
    const removeModalAction = document.querySelector(`#removeModal`);
    removeModalAction.addEventListener(`click`, hideModal);

    function hideModal(event) {
      contentDiv.removeChild(modalDiv);
    }

    removeBook.addEventListener(`click`, chrisLibrary.discardBook)
  };


  discardBook = () => {
    console.log(this.bookList)
    console.log(this.bookCount)
    console.log(this.bookPosition)
    this.bookList.splice((this.bookPosition - 1), 1);
    console.log(this.bookList)
    console.log(this.bookCount)
    console.log(this.bookPosition)


  }    

}

let chrisLibrary = new Library();
const tableBody = document.querySelector(`tbody`);
const titleInput = document.querySelector(`#titleInput`);
const authorInput = document.querySelector(`#authorInput`);
const readYesNo = document.querySelector(`#readYesNo`);
const submitButton = document.querySelector(`#submitButton`);
const bookInfoInput = document.querySelector(`.book-info-input`);
const contentDiv = document.querySelector(`.content`);

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
