let myLibrary = [];

function Book(title, author, pages, read) {
  this.Title = title;
  this.Author = author;
  this.Pages = pages;
  this.Status = read;
  // // this.bookInfo = function () {
  //   return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`;
  // };
}

// Button selection
const submit_button = document.getElementById("submit_button");
const add_book_button = document.querySelector(".add_book_button");
const form_close_button = document.querySelector(".close_button");

//Function to collet user input data
const intakeFormData = () => {
  const Book_Title = document.getElementById("title").value;
  const Book_Author = document.getElementById("author").value;
  const Book_Pages = document.getElementById("pages").value;
  const Book_read_status = document.getElementById("read_status").value;

  if (
    Book_Title === "" ||
    Book_Author === "" ||
    Book_Pages === "" ||
    Book_read_status === ""
  )
    return;

  addBookToLibrary(Book_Title, Book_Author, Book_Pages, Book_read_status);
  const form_content = document.getElementById("form_details");
  form_content.reset();
};

// Function for adding a newbook to the library array.
function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBooksOnPage();
  hideForm();
}

//Function to display library arrays to cards
function displayBooksOnPage() {
  const books = document.querySelector(".main");

  const removeDivs = document.querySelectorAll(".card");
  for (let i = 0; i < removeDivs.length; i++) {
    removeDivs[i].remove();
  }
  //Loop over the library array and display to the cards
  let index = 0;
  myLibrary.forEach((library) => {
    const card = document.createElement("div");
    card.classList.add("card");
    for (let key in library) {
      const p = document.createElement("p");
      p.textContent = `${key} : ${library[key]}`;
      card.append(p);
    }

    books.appendChild(card);
    const button = document.createElement("button");
    button.innerText = "Delete";
    button.classList.add("card_button");
    button.style.marginLeft = "25px";
    button.dataset.linkedArray = index;
    card.appendChild(button);
    const deleteBook = () => {
      let findBook = button.dataset.linkedArray;
      myLibrary.splice(parseInt(findBook), 1);
      card.remove();
      displayBooksOnPage();
    };
    button.addEventListener("click", deleteBook);

    const updateBookButton = document.createElement("button");
    updateBookButton.classList.add("update_button");
    updateBookButton.innerText = "Update";
    updateBookButton.dataset.linkedArray = index;
    card.appendChild(updateBookButton);

    // Function updates the status of the book
    const readStatus = () => {
      let findBookUpdate = updateBookButton.dataset.linkedArray;
      Book.prototype = Object.create(Book.prototype);
      const selectBook = new Book();
      if (myLibrary[parseInt(findBookUpdate)].Status == "Read") {
        selectBook.Status = "Unread";
        myLibrary[parseInt(findBookUpdate)].Status = selectBook.Status;
      } else if (myLibrary[parseInt(findBookUpdate)].Status == "Unread") {
        selectBook.Status = "Read";
        myLibrary[parseInt(findBookUpdate)].Status = selectBook.Status;
      }
      displayBooksOnPage();
    };
    updateBookButton.addEventListener("click", readStatus);

    index++;
  });
}

// Displays the book details on the dashboard once the user clicks submit
submit_button.addEventListener("click", intakeFormData);

//Function hides form
const hideForm = () => {
  const form = (document.querySelector(".form").style.display = "none");
};

// Function Displays form
const displayForm = () => {
  const form = (document.querySelector(".form").style.display = "");
};

add_book_button.addEventListener("click", displayForm);
form_close_button.addEventListener("click", hideForm);

hideForm();
