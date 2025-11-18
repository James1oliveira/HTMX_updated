/**
 * This Express.js server simulates a simple dynamic price API.
 *
 * Features:
 * 1. Serves static files (HTML, CSS, JS, images) from the "public" directory.
 * 2. Parses both URL-encoded form data and JSON request bodies.
 * 3. Defines a GET route at "/get-price" that:
 *    - Keeps track of a variable `currentPrice` (starting at 60).
 *    - Randomly adjusts the price by up to ±1 each time the endpoint is called.
 *    - Responds with the updated price formatted as a string (e.g., "$59.8").
 * 4. Starts the server on port 3000 and logs a confirmation message.
 *
 * Goal:
 * To demonstrate how an Express server can handle requests,
 * update server-side data, and return dynamic values to clients.
 */

import express from 'express';

const app = express();

// ----------------------
// Middleware
// ----------------------

// Serve static files (CSS, JS, images, HTML) from the "public" folder
app.use(express.static('public'));

// Parse URL-encoded bodies (form submissions, e.g. from <form> tags)
app.use(express.urlencoded({ extended: true }));

// Parse JSON request bodies (useful for APIs)
app.use(express.json());

// ----------------------
// Handle GET request for simulated stock/price updates
// ----------------------

// Start with a base price of 60
let currentPrice = 60;

app.get('/get-price', (req, res) => {
    // Randomly adjust price between -1 and +1
    currentPrice = currentPrice + Math.random() * 2 - 1;

    // Send back the updated price formatted to 1 decimal place
    res.send('$' + currentPrice.toFixed(1));
});

// ----------------------
// Start the server
// ----------------------
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
