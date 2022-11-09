const bookTitlesArray = [];

const createBookCard = function (list) {
  const rowContainer = document.querySelector(".row");
  rowContainer.innerHTML += `
  <div class="col-sm-6 col-md-4 col-xl-3 mt-2"
  <div class="card">
  <img src=${list.img} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${list.title}</h5>
    <p class="card-text">Category: ${list.category}</p>
    <div class="card-buttons">
    <button class="btn btn-primary add-button">Add To Cart</button>
    <button class="btn skip-button">Skip</button>
  </div>
  </div>
  </div>
</div>`;
  bookTitlesArray.push(list.title);
  const addButtons = document.querySelectorAll(".add-button"); //getting the array of all buttons
  for (let addButton of addButtons) {
    //looping and adding event listener to each button
    addButton.addEventListener("click", () => {
      console.log("The add button was clicked");
      const modalBody = document.querySelector(".modal-body");
      const ul = document.createElement("ul");
      const newLi = document.createElement("li");
      const bookTitle = document.querySelector(".card-title").innerText;
      newLi.innerText = bookTitle;
      ul.appendChild(newLi);
      modalBody.appendChild(ul);
      addButton.disabled = "true";
    });
  }
  const skipButtons = document.querySelectorAll(".skip-button");
  for (let skipButton of skipButtons) {
    skipButton.addEventListener("click", () => {
      skipButton.parentNode.parentNode.parentNode.remove();
    });
  }
};

const fetchAndCreate = async () => {
  const response = await fetch("https://striveschool-api.herokuapp.com/books");
  const list = await response.json();
  list.forEach(createBookCard);
};

const showBooksButton = document.querySelector(".show-books");
showBooksButton.addEventListener("click", fetchAndCreate);

const searchAndCreate = async () => {
  const response = await fetch("https://striveschool-api.herokuapp.com/books");
  const list = await response.json();
  const filteredList = list.filter((list) => list.title === searchedBooks);
  filteredList.forEach(createBookCard);
};
