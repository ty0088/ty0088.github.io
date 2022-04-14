class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  refreshBookList();
}

function refreshBookList() {
  document.getElementById("bookList").innerHTML = "";
  myLibrary.map(book => {  
    const newDiv = document.createElement("div");
    const remBtn = document.createElement("button");
    const readBtn = document.createElement("button");
    newDiv.setAttribute("id",myLibrary.indexOf(book));
    remBtn.setAttribute("type","button");
    remBtn.setAttribute("onclick","removeBook(this)");
    readBtn.setAttribute("type","button");
    readBtn.setAttribute("onclick","isRead(this)");
    const newContent = document.createTextNode("Title: " + book.title + ", Author: " + book.author + ", No. of Pages: " + book.pages + ", Read?: " + book.read);
    remBtn.innerText = "Remove Book";
    readBtn.innerText = "Read/Not Read";
    newDiv.appendChild(newContent);
    newDiv.appendChild(readBtn);
    newDiv.appendChild(remBtn);

    document.getElementById("bookList").appendChild(newDiv);
  });
}

function newBook() {
  document.getElementById("form").style.display = "block";
}

function removeBook(e) {
  let index = parseInt(e.parentNode.getAttribute("id"));
  myLibrary.splice(index, 1);
  refreshBookList();
}

function isRead(e) {
  let index = parseInt(e.parentNode.getAttribute("id"));
  if (myLibrary[index].read === true) {
    myLibrary[index].read = false;
  } else {
    myLibrary[index].read = true;
  }
  refreshBookList();
}

function validation() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      input.setCustomValidity('');
      input.checkValidity();
    });
    input.addEventListener('invalid', () => {
      input.setCustomValidity('Please fill in this field!')
    });
  });
  
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.reportValidity()) {
      let title = document.getElementById("title").value;
      let author = document.getElementById("author").value;
      let pages = document.getElementById("pages").value;
      let read = document.getElementById("read").checked;
      addBookToLibrary(title, author, pages, read);
      document.getElementById("form").reset();
      document.getElementById("form").style.display = "none";
    }
  });
}

let myLibrary = [];

validation();

addBookToLibrary("Example Book", "J.Blogs", 10, true);



