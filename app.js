const newLibrary = [];

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
    for (let i = 0; i < book.length; i++) {
      //creates 3 tables elements to add to newTr 
      let newTd = document.createElement(`td`);
      newTd.textContent = book[i];
      newTr.appendChild(newTd);
      if(i == book.length - 1) { // add check box to last table row
        let checkButton = document.createElement(`input`);
        checkButton.type = `checkbox`;
        checkButton.name = `read`;
        checkButton.id = `readLibraryCheckbox`
        checkButton.checked = readYesNo.checked;
        checkButton.disabled = true;
        newTd.appendChild(checkButton);
        checkButton.previousSibling.remove(); //removes true/false from display
      }
    }
    tableBody.appendChild(newTr);
    
    titleInput.value = ""; //resets input fields
    authorInput.value = "";
    readYesNo.checked = false; 
    submitButton.disabled = true;
  };
}

let chrisLibrary = new Library();
const tableBody = document.querySelector(`tbody`);
const titleInput = document.querySelector(`#titleInput`);
const authorInput = document.querySelector(`#authorInput`);
const readYesNo = document.querySelector(`#readYesNo`);
const submitButton = document.querySelector(`#submitButton`);

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
