//ES5 JS file for practice

// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;

}

// UI Constructor
function UI() {}

// Prototype functions
// - Add book to list
UI.prototype.addBookToList = function (book) {
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

// - delete book
UI.prototype.deletebook = function(target) {
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

// - show alert
UI.prototype.showAlert = function(message, className) {
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

// - Clear fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}


// Event Listeners

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
  ui.deletebook(e.target);

  // show alert
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});
