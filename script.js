/* eslint-disable */
// Book class: to represent a book
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Store Class: Handle storage - local storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(index) {
    const books = Store.getBooks();
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// UI class: Handle UI tasks e.g. when a book displays on the list or removes from the list

class UI {
  static displayBooks() {
    const books = Store.getBooks();

    // Loop through all of the books in local storage and then add method addBookToList

    books.forEach((book) => {
      UI.addBookToList(book);
    });
  }
  // Adding row to the <tbody>

  static addBookToList(book) {
    const list = document.getElementById('book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
        <td>"${book.title}" by ${book.author}</td>
        <td><a href="#" class="btn btn-danger btn-md delete">Remove</a></td>
        `;

    list.appendChild(row);
  }

  static deleteBook(element) {
    if (element.classList.contains('delete')) {
      element.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

// Display book events
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Add a book event
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent submit action of form
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  // Instatiate book
  const book = new Book(title, author);

  // Add book to UI
  UI.addBookToList(book);

  // Add book to local Storage
  Store.addBook(book);

  // Clear fields
  UI.clearFields();
});

// Event: Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
  //    Remove book from UI by attaching it to a method
  UI.deleteBook(e.target);

  //  Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});

// ======= Date and time functionality =======
function formatDate(dateObject) {
    const sections = {
        date: dateObject.getDate(),
        month: dateObject.getMonth() + 1,
        year: dateObject.getFullYear(),
        hour: (dateObject.getHours() % 12) || 12,
        minute: dateObject.getMinutes().toString().padStart(2, "0"),
        amORpm: dateObject.getHours() < 12 ? "AM" : "PM"
    };
    return `${sections.date}/${sections.month}/${sections.year} ${sections.hour}:${sections.minute} ${sections.amORpm}`;
}

const myDate = new Date();
const formattedDate = formatDate(myDate);
const time = document.getElementById('showDate');
time.append(formattedDate);

// ======= Dynamic page switcher Javascript =======

function show(shown, hidden, hiddenToo) {
    document.getElementById(shown).style.display = 'block';
    document.getElementById(hidden).style.display = 'none';
    document.getElementById(hiddenToo).style.display = 'none';
    return false;
}