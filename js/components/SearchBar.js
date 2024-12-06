"use strict";

// Manages search functionality and suggestions
export class SearchBar {
  constructor(onSearch, onLocationSelect) {
    this.searchInput = document.getElementById("searchInput");
    this.searchBtn = document.getElementById("searchBtn");
    this.searchSuggestions = document.getElementById("searchSuggestions");
    this.onSearch = onSearch;
    this.onLocationSelect = onLocationSelect;
    this.setupEventListeners();
  }

  // Set up search event listeners
  setupEventListeners() {
    this.searchBtn.addEventListener("click", () => this.handleSearch());
    this.searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleSearch();
    });

    document.addEventListener("click", (e) => {
      if (
        !this.searchInput.contains(e.target) &&
        !this.searchSuggestions.contains(e.target)
      ) {
        this.hideSuggestions();
      }
    });
  }

  // Execute search
  handleSearch() {
    const query = this.searchInput.value.trim();
    if (query) {
      this.onSearch(query);
    }
  }

  // Update search input
  updateInputValue(value) {
    this.searchInput.value = value;
  }

  // Show location suggestions
  displaySuggestions(suggestions) {
    this.searchSuggestions.innerHTML = "";
    suggestions.forEach((location) => {
      const div = document.createElement("div");
      div.className = "suggestion-item";
      div.textContent = `${location.name}, ${location.country}`;
      div.addEventListener("click", () => {
        this.updateInputValue(`${location.name}, ${location.country}`);
        this.hideSuggestions();
        this.onLocationSelect(location);
      });
      this.searchSuggestions.appendChild(div);
    });
    this.showSuggestions();
  }

  showSuggestions() {
    this.searchSuggestions.classList.add("active");
  }

  hideSuggestions() {
    this.searchSuggestions.classList.remove("active");
  }
}
