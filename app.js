function createBook(title, author, isbn) {
  return {
    title,
    author,
    isbn
  };
}

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const isbn = document.querySelector('#isbn');
const form = document.querySelector('form');
const bookList = document.querySelector('#book-list');
const deleteBtn = document.querySelector('.btn-danger');
const searchBox = document.querySelector('.search');

//Local Storage
let books;
if (localStorage.getItem('books')) {
  books = JSON.parse(localStorage.getItem('books'))
  books.forEach((book) => {
    bookList.innerHTML += `<tr>
    <td>${book.title}</td>  
    <td>${book.author}</td>  
    <td>${book.isbn}</td>
    <td><button type="button" class="btn btn-danger">Delete</button></td>    
</tr>`
  })
} else {
  books = []
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const bookTitle = title.value;
  const bookAuthor = author.value;
  const bookIsbn = isbn.value;
  const book = createBook(bookTitle, bookAuthor, bookIsbn);
  if (!(book.title && book.author && book.isbn)) {
    alert('Check The form fields');
  } else {
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))
    // Add book Object to table
    bookList.innerHTML += `<tr>
                              <td>${book.title}</td>
                              <td>${book.author}</td>
                              <td>${book.isbn}</td>
                              <td><button type="button" class="btn btn-danger">Delete</button></td>


            </tr>
    `;
  }

  // bookList.querySelectorAll('button').forEach(button => {
  //   button.addEventListener('click', e => {
  //     e.target.closest('tr').remove();
  //   });
  // });


  // title.value = '';
  // bookTitle = '';

  form.reset();
});
bookList.addEventListener('click', e => {
  if (e.target.classList.contains('btn-danger')) {
    // remove from localstorage
    const isbn = e.target.closest('tr').children[2].innerText;
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1)
        localStorage.setItem('books', JSON.stringify(books))
      }
    })
    // remove from ui
    e.target.closest('tr').remove();
  }
});

searchBox.addEventListener('keyup', () => {
  const searchKey = searchBox.value.toLowerCase();
  searchBook(searchKey);
});

const searchBook = key => {
  const allBooks = bookList.querySelectorAll('tr');
  console.log(allBooks);

  allBooks.forEach(book => {
    console.log(!book.children[0].innerText.toLowerCase().includes(key));
    if (!book.children[0].innerText.includes(key)) {
      book.classList.add('hide');
    }
  });
  allBooks.forEach(book => {
    console.log(book.children[0].innerText.toLowerCase().includes(key));
    if (book.children[0].innerText.includes(key)) {
      book.classList.remove('hide');
    }
  });
};
