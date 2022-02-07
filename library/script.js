function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  refreshBookList();
}

function refreshBookList() {
  document.getElementById("bookList").innerHTML = "";
  myLibrary.map(book => {  
    const newDiv = document.createElement("div");
    newDiv.classList.add(myLibrary.indexOf(book));
    const newContent = document.createTextNode("Title: " + book.title + ", Author: " + book.author + ", Pages: " + book.pages + ", Read?: " + book.read);
    newDiv.appendChild(newContent);
    document.getElementById("bookList").appendChild(newDiv);
  });
  console.log("Refreshed Book List")
}

function newBook() {
  
}

let myLibrary = [];




addBookToLibrary("Book1", "T.Yip", 10, true);
addBookToLibrary("Book2", "T.Yip", 20, false);
addBookToLibrary("Book3", "T.Yip", 30, false);



