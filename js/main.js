"use strict";

import { config } from "./config.js";
import { WeatherAPI } from "./api/weatherApi.js";
import { SearchBar } from "./components/SearchBar.js";
import { WeatherDisplay } from "./components/WeatherDisplay.js";
import { GeolocationService } from "./services/GeolocationService.js";

// Main Weather Application
class WeatherApp {
  constructor() {
    this.weatherApi = new WeatherAPI();
    this.geolocationService = new GeolocationService();
    this.weatherDisplay = new WeatherDisplay();
    this.searchBar = new SearchBar(
      (query) => this.searchWeather(query),
      (location) => this.handleLocationSelect(location)
    );
    this.searchTimeout = null;
    this.init();
  }

  // Initialize app
  async init() {
    this.setupSearchSuggestions();
    await this.setupGeolocation();
  }

  // Set up search with debouncing
  setupSearchSuggestions() {
    this.searchBar.searchInput.addEventListener("input", () => {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(
        () => this.getSuggestions(),
        config.searchDebounceTime
      );
    });
  }

  // Set up location detection
  async setupGeolocation() {
    try {
      const position = await this.geolocationService.getCurrentPosition();
      await this.getWeatherByCoords(
        position.coords.latitude,
        position.coords.longitude
      );
    } catch (error) {
      await this.loadDefaultWeather();
    }
  }

  // Load default city weather
  async loadDefaultWeather() {
    await this.getWeatherByCity(config.defaultCity);
  }

  // Get location suggestions
  async getSuggestions() {
    const query = this.searchBar.searchInput.value.trim();
    if (query.length < 3) {
      this.searchBar.hideSuggestions();
      return;
    }

    try {
      const data = await this.weatherApi.searchLocations(query);
      if (data.length > 0) {
        this.searchBar.displaySuggestions(data);
      } else {
        this.searchBar.hideSuggestions();
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }

  // Get weather by city name
  async getWeatherByCity(city) {
    try {
      const data = await this.weatherApi.getForecast(city);
      this.weatherDisplay.displayWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
      this.weatherDisplay.showError();
    }
  }

  // Get weather by coordinates
  async getWeatherByCoords(lat, lon) {
    try {
      const data = await this.weatherApi.getForecastByCoords(lat, lon);
      this.weatherDisplay.displayWeather(data);
      this.searchBar.updateInputValue(
        `${data.location.name}, ${data.location.country}`
      );
    } catch (error) {
      console.error("Error fetching weather:", error);
      this.weatherDisplay.showError();
    }
  }

  // Handle weather search
  searchWeather(query) {
    if (query) {
      this.getWeatherByCity(query);
    }
  }

  // Handle location selection
  handleLocationSelect(location) {
    this.getWeatherByCity(location.name);
  }
}

// Start application
new WeatherApp();
