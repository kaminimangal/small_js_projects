const movieInput = document.getElementById("inputMovie");
const searchBtn = document.getElementById("search");
const actionBtn = document.getElementById("action");
const comedyBtn = document.getElementById("comedy");
const scifiBtn = document.getElementById("sci-fi");
const numFound = document.getElementById("found");
const movieBoard = document.querySelector(".movieSection");
const results = document.getElementById("results");
const apiKey = import.meta.env.VITE_API_KEY; // ✅ Correct way// Just the short code
const baseUrl = "https://www.omdbapi.com/"; // The place we send the request
let currPage = 0;
const searchMovies = () => {
  const query = movieInput.value.trim();
  if (!query) {
    alert("Please enter a movie title");
    return;
  }
  currPage = 1;
  fetchMovies(query, currPage);
};

const fetchMovies = async (query, currPage) => {
  const btn = searchBtn;
  btn.disabled = true;
  btn.textContent = "Searching...";
  // Add &page=${currPage} to the end
  const url = `${baseUrl}?apikey=${apiKey}&s=${query}&page=${currPage}`;
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error("Search failed");
    }
    const data = await resp.json();
    if (data.Response === "False") {
      results.innerHTML = "<p>No movies found. Try another search.</p>";
      return;
    }
    console.log(data)
    displayResults(data.Search, data.totalResults)
  } catch (error) {
    results.innerHTML = `<p style="color:red;">Error:${error.message}</p>`
  } finally {
    btn.disabled = false;
    btn.textContent = '🔍 Search';
  }
};

// 1. Select the new elements
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageCount = document.getElementById('pageCount');
const paginationDiv = document.getElementById('pagination-controls');

let totalPages = 0; // New global variable

// 2. Update displayResults to handle pagination setup
const displayResults = (movies, numResults) => {
  const resultSpan = document.getElementById("results");
  resultSpan.textContent = `${numResults} movies found`;

  // Calculate Total Pages
  totalPages = Math.ceil(numResults / 10);

  // Show/Hide Pagination Div
  if (numResults > 0) {
    paginationDiv.style.display = 'flex';
    updatePaginationButtons();
  } else {
    paginationDiv.style.display = 'none';
  }

  // Render Grid (Same as before)
  movieBoard.innerHTML = movies.map(movie => `
    <div class="movie-card">
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}" alt="${movie.Title}">
      <div class="movie-info">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      </div>
    </div>
  `).join('');
}

// 3. Helper to Enable/Disable Buttons
const updatePaginationButtons = () => {
  pageCount.textContent = `Page ${currPage} of ${totalPages}`;

  // Disable Prev if on Page 1
  prevBtn.disabled = (currPage === 1);

  // Disable Next if on Last Page
  nextBtn.disabled = (currPage === totalPages);
}

// 4. Button Listeners
nextBtn.addEventListener('click', () => {
  if (currPage < totalPages) {
    currPage++;
    // Use the text currently in the input for the search
    fetchMovies(movieInput.value, currPage);
  }
});

prevBtn.addEventListener('click', () => {
  if (currPage > 1) {
    currPage--;
    fetchMovies(movieInput.value, currPage);
  }
});

// Add this at the bottom of your script.js

const quickSearch = (genre) => {
  movieInput.value = genre; // Visual feedback: put text in box
  currPage = 1;             // Reset to page 1
  fetchMovies(genre, currPage);
};

actionBtn.addEventListener('click', () => quickSearch('Action'));
comedyBtn.addEventListener('click', () => quickSearch('Comedy'));
scifiBtn.addEventListener('click', () => quickSearch('Sci-Fi'));

searchBtn.addEventListener("click", searchMovies);
movieInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchMovies();
});
