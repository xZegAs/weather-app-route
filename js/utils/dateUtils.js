"use strict";

// Handles date formatting operations
export class DateFormatter {
  constructor(locale = "en-US") {
    this.locale = locale;
  }

  // Format date string to day name and date
  formatDate(dateString) {
    const date = new Date(dateString);
    return {
      dayName: date.toLocaleDateString(this.locale, { weekday: "long" }),
      formattedDate: date.toLocaleDateString(this.locale, {
        month: "long",
        day: "numeric",
      }),
    };
  }
}
