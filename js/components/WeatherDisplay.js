"use strict";

import { DateFormatter } from "../utils/dateUtils.js";

// Handles weather information display
export class WeatherDisplay {
  constructor() {
    this.weatherCards = document.getElementById("weatherCards");
    this.cityHeader = document.getElementById("cityHeader");
    this.dateFormatter = new DateFormatter();
  }

  // Display weather data
  displayWeather(data) {
    this.displayCityHeader(data.location);
    this.displayForecast(data.forecast.forecastday);
  }

  // Show city header
  displayCityHeader(location) {
    this.cityHeader.innerHTML = `
            <h1 class="city-header">
                <i class="fas fa-location-dot"></i> 
                ${location.name}, ${location.country}
            </h1>
        `;
  }

  // Show forecast cards
  displayForecast(forecastDays) {
    this.weatherCards.innerHTML = "";
    forecastDays.forEach((day, index) => {
      const { dayName, formattedDate } = this.dateFormatter.formatDate(
        day.date
      );
      this.weatherCards.innerHTML += this.createWeatherCard(
        day,
        index,
        dayName,
        formattedDate
      );
    });
  }

  // Create weather card HTML
  createWeatherCard(day, index, dayName, formattedDate) {
    return `
            <div class="col-md-4 mb-4">
                <div class="weather-card text-center ${
                  index === 0 ? "current-day" : ""
                }">
                    <div class="date">
                        ${index === 0 ? "Today" : dayName}<br>${formattedDate}
                    </div>
                    <img src="${day.day.condition.icon}" alt="${
      day.day.condition.text
    }" class="weather-icon">
                    <div class="temperature">${Math.round(
                      day.day.avgtemp_c
                    )}°C</div>
                    <div class="condition">${day.day.condition.text}</div>
                    <div class="min-max">
                        <span><i class="fas fa-temperature-low"></i> ${Math.round(
                          day.day.mintemp_c
                        )}°C</span>
                        <span><i class="fas fa-temperature-high"></i> ${Math.round(
                          day.day.maxtemp_c
                        )}°C</span>
                    </div>
                    <div class="weather-info">
                        <div class="weather-info-item">
                            <i class="fas fa-wind"></i>
                            <div>${day.day.maxwind_kph} km/h</div>
                        </div>
                        <div class="weather-info-item">
                            <i class="fas fa-tint"></i>
                            <div>${day.day.avghumidity}%</div>
                        </div>
                        <div class="weather-info-item">
                            <i class="fas fa-cloud-rain"></i>
                            <div>${day.day.daily_chance_of_rain}%</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  // Show error message
  showError() {
    this.cityHeader.innerHTML = "";
    this.weatherCards.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger">
                    Unable to fetch weather data. Please try again later.
                </div>
            </div>
        `;
  }
}
