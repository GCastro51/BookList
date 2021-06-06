// Book Class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class
class UI {
  addBookToList(book){
    const list = document.getElementById('book-list');

    // create tr element
    const row = document.createElement('tr');

    // insert cols 
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);

    //console.log(row);
  }

  showAlert(message, className){
    //create div
    const div = document.createElement('div');

    //add class name
    div.className = `alert ${className}`;

    //add text
    div.appendChild(document.createTextNode(message));

    // Get parent for insertion
    const container = document.querySelector('.container');

    // get form
    const form = document.querySelector('#book-form');

    // insert new div
    container.insertBefore(div, form);

    // timeout after 3 seconds
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

}

// Local Storage Class
class Store {
  // display books in UI
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI;

      // add book to UI
      ui.addBookToList(book);
    })
  }

  // add book to local storage
  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));

  }

  // fetch books from local storage
  static getBooks() {
    let books;
    
    //determine if tasks empty in local storage
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}


// Event Listeners

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);


// Event Listener to add new book
document.getElementById('book-form').addEventListener('submit', function(e){
  //get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // instantiating new book object
  const book = new Book(title, author, isbn);

  // instantiate UI object
  const ui = new UI();

  // validate
  if(title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error')

  } else {
    // add book to list
    ui.addBookToList(book);

    // add to local storage
    Store.addBook(book);

    // success alert
    ui.showAlert('Book Added!', 'success')

    // Clear Fields
    ui.clearFields();
  }

  

  //console.log(book);
  e.preventDefault();
});

// Event Listener to Delete book
document.getElementById('book-list').addEventListener('click', function (e) {

  // instantiate UI object
  const ui = new UI();

  // delete book
  ui.deleteBook(e.target);

  // Remove from local storage - get ISBN with DOM traversal
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // show alert
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});
