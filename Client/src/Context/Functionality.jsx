import React from "react";

export const dateFormat = (dateString) => {
    if (!dateString) return 'N/A';  // Handle missing dates

    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};
