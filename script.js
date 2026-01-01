// Elements
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
const errorMessage = document.querySelector(".error-message");

// API Data
const API_KEY = "8198d3e30961c9df4165a740202792c3";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=`;

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (searchInput.value.trim()) {
    getWeather(API_URL + searchInput.value);
  }
});

const getWeather = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  if (data.cod === "404") {
    displayErroe(data.message);
  }
  console.log(data);
};

const displayErroe = (error) => {
  errorMessage.style.display = "block";
  errorMessage.textContent = error;
};
