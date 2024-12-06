"use strict";

import { config } from "../config.js";

// Handles WeatherAPI service interactions
export class WeatherAPI {
  constructor() {
    this.baseUrl = "https://api.weatherapi.com/v1";
  }

  // Search locations by query
  async searchLocations(query) {
    const response = await fetch(
      `${this.baseUrl}/search.json?key=${config.apiKey}&q=${query}`
    );
    return await response.json();
  }

  // Get weather forecast for city
  async getForecast(city) {
    const response = await fetch(
      `${this.baseUrl}/forecast.json?key=${config.apiKey}&q=${city}&days=${config.forecastDays}`
    );
    return await response.json();
  }

  // Get weather forecast by coordinates
  async getForecastByCoords(lat, lon) {
    const response = await fetch(
      `${this.baseUrl}/forecast.json?key=${config.apiKey}&q=${lat},${lon}&days=${config.forecastDays}`
    );
    return await response.json();
  }
}
