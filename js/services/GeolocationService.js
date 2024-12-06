"use strict";

// Handles geolocation functionality
export class GeolocationService {
  constructor() {
    this.geolocation = navigator.geolocation;
  }

  // Get user's location
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!this.geolocation) {
        reject(new Error("Geolocation is not supported"));
        return;
      }

      this.geolocation.getCurrentPosition(resolve, reject);
    });
  }
}
