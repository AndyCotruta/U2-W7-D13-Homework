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
    <p class="card-text">Price: ${list.price} $</p>
    <div class="card-buttons">
    <button class="btn btn-primary add-button">Add To Cart</button>
    <button class="btn skip-button">Skip</button>
  </div>
  </div>
  </div>
</div>`;

  const addButtons = document.querySelectorAll(".add-button"); //getting the array of all buttons
  for (let addButton of addButtons) {
    //looping and adding event listener to each button
    addButton.addEventListener("click", () => {
      //when the button is clicked do the following
      const currentCard = addButton.closest(".card-body"); //get the closest card-body
      const currentTitle = currentCard.querySelector("h5").innerText; //get the innerText of the h5 from the card-body
      const modalBody = document.querySelector(".modal-body"); //get the modal that we want to change
      const ul = document.createElement("ul"); //create ul and li
      const newLi = document.createElement("li");
      newLi.innerText = currentTitle; //pass the li the currentTitle
      ul.appendChild(newLi); //append everything
      modalBody.appendChild(ul);
      addButton.disabled = "true"; //change the add button to disabled
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
fetchAndCreate();

const searchAndCreate = async () => {
  const response = await fetch("https://striveschool-api.herokuapp.com/books");
  const list = await response.json();
  const filteredList = list.filter((list) =>
    list.title.includes(searchedValue)
  );
  filteredList.forEach(createBookCard);
};
