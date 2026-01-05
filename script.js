// Elements
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
const errorMessage = document.querySelector(".error-message");
const searchBoxContainer = document.querySelector(".search-box-container");
const resultContainer = document.querySelector(".result-container");
const backButton = document.querySelector(".back-btn");
const weatherIcon = document.querySelector(".weather-icon");
const textTemperature = document.querySelector(".text-temperature");
const textDescription = document.querySelector(".text-description");
const textLocation = document.querySelector(".text-location");
const feelsLikeText = document.querySelector(".feels-like-text");
const humadityText = document.querySelector(".humadity-text");
const locationButton = document.querySelector(".device-loc-btn");

// API Data
const API_KEY = "8198d3e30961c9df4165a740202792c3";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  errorMessage.style.display = "none";
  if (searchInput.value.trim()) {
    getWeather(API_URL + searchInput.value);
  }
});

// Get weather from API
const getWeather = async (url) => {
  searchForm.classList.add("loading");
  try {
    const response = await fetch(url);
    const data = await response.json();
    // if city not found
    if (data.cod === "404") {
      displayErroe(data.message);
    } else {
      errorMessage.style.display = "none";
      searchBoxContainer.style.display = "none";
      resultContainer.style.display = "flex";
      backButton.style.display = "flex";
      displayWeather(data);
    }
  } catch (err) {
    displayErroe("An error occurred while fetching the weather data.");
  } finally {
    searchForm.classList.remove("loading");
  }
};

const displayWeather = (data) => {
  const { feels_like, humidity, temp } = data.main;
  const { id, description } = data.weather[0];

  if (id == 800) {
    weatherIcon.src = "./assets/suny.png";
  } else if (id >= 801 && id <= 804) {
    weatherIcon.src = "./assets/cloudy.png";
  } else if (id >= 701 && id <= 781) {
    weatherIcon.src = "./assets/windy.png";
  } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
    weatherIcon.src = "./assets/rainy.png";
  } else if (id >= 600 && id <= 622) {
    weatherIcon.src = "./assets/snowy.png";
  } else if (id >= 200 && id <= 232) {
    weatherIcon.src = "./assets/thunder-stormy.png";
  }

  textTemperature.innerHTML = `${temp} °C`;
  textDescription.innerHTML = description;
  textLocation.innerHTML = `${data.name}, ${data.sys.country}`;
  feelsLikeText.innerHTML = `${feels_like} °C`;
  humadityText.innerHTML = `${humidity}%`;
};

// set input direction dynamicly
searchInput.addEventListener("input", () => {
  isPersian(searchInput.value);
});

// see if input content is persian or not
const isPersian = (text) => {
  const persianRegex = /[\u0600-\u06FF\u0750-\u077F]/;
  const inputDirection = persianRegex.test(text) ? "rtl" : "ltr";
  searchInput.style.direction = inputDirection;
};

// function to back to previous section
backButton.addEventListener("click", () => {
  errorMessage.style.display = "none";
  searchBoxContainer.style.display = "flex";
  resultContainer.style.display = "none";
  backButton.style.display = "none";
  searchInput.value = "";
});

// function to show error
const displayErroe = (error) => {
  searchForm.classList.remove("loading");
  errorMessage.style.display = "block";
  errorMessage.textContent = error;
};

// get lat & lon from use device
locationButton.addEventListener("click", () => {
  searchForm.classList.add("loading");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSucess, onError);
  } else {
    alert("Your browser not support geolocation api");
  }
});

// when geolocation works succesfully
const onSucess = (position) => {
  const { latitude, longitude } = position.coords;
  getWeather(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );
};

// when geolocation had error
const onError = (error) => {
  displayErroe(error.message);
};
