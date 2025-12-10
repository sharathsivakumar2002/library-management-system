let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

// API URL
let url = "https://apis.ccbp.in/book-store?title=";

// Function to create each book result
function createBookResult(book) {
    let resultItem = document.createElement("div");
    resultItem.classList.add("d-flex", "flex-row", "m-3");

    let bookImage = document.createElement("img");
    bookImage.src = book.imageLink;
    bookImage.classList.add("image", "mr-3");
    resultItem.appendChild(bookImage);

    let textContainer = document.createElement("div");

    let titleEl = document.createElement("h1");
    titleEl.classList.add("popularBook");
    titleEl.textContent = book.title;
    textContainer.appendChild(titleEl);

    let authorEl = document.createElement("p");
    authorEl.classList.add("authorPara");
    authorEl.textContent = "Author: " + book.author;
    textContainer.appendChild(authorEl);

    resultItem.appendChild(textContainer);

    searchResultsEl.appendChild(resultItem);
}

// Function to handle search results
function displayResults(searchResults) {
    spinnerEl.classList.add("d-none"); // hide spinner
    searchResultsEl.textContent = ""; // clear old results

    if (searchResults.length === 0) {
        let errorEl = document.createElement("h1");
        errorEl.classList.add("errorHeading");
        errorEl.textContent = "No Books Found!";
        searchResultsEl.appendChild(errorEl);
        return;
    }

    let headingEl = document.createElement("h1");
    headingEl.textContent = "Search Results";
    headingEl.classList.add("searchResults-heading", "ml-3");
    searchResultsEl.appendChild(headingEl);

    for (let item of searchResults) {
        createBookResult(item);
    }
}

// Search handler
function searchBooks(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";

        let searchValue = searchInputEl.value;
        let finalUrl = url + searchValue;

        fetch(finalUrl)
            .then(response => response.json())
            .then(jsonData => {
                displayResults(jsonData.search_results);
            })
            .catch(() => {
                spinnerEl.classList.add("d-none");
                searchResultsEl.textContent = "";
                let errorEl = document.createElement("h1");
                errorEl.classList.add("errorHeading");
                errorEl.textContent = "Something went wrong!";
                searchResultsEl.appendChild(errorEl);
            });
    }
}

searchInputEl.addEventListener("keydown", searchBooks);
