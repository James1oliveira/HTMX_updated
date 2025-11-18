/**
 * This Express.js server provides a simple user search feature.
 *
 * Features:
 * 1. Serves static files (HTML, CSS, JS, images) from the "public" directory.
 * 2. Parses both URL-encoded form submissions and JSON request bodies.
 * 3. Defines a POST route at "/search" that:
 *    - Extracts a search term from the request body.
 *    - Fetches a list of users from the JSONPlaceholder API.
 *    - Filters users whose name or email contains the search term (case-insensitive).
 *    - Returns matching results as HTML <tr> elements for use in a table.
 *    - If no search term is provided, returns an empty row.
 * 4. Starts the server on port 3000 and logs a confirmation message.
 *
 * Goal:
 * To demonstrate how an Express server can handle form submissions,
 * fetch and filter external API data, and return dynamic HTML for rendering
 * in the client’s UI (such as updating a search results table).
 */

import express from 'express';

const app = express();

// ----------------------
// Middleware
// ----------------------

// Serve static files (CSS, JS, HTML, images) from the "public" folder
app.use(express.static('public'));

// Parse URL-encoded bodies (data submitted via HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON request bodies (useful when clients send JSON)
app.use(express.json());

// ----------------------
// Handle POST request to search and display users
// ----------------------
app.post('/search', async (req, res) => {
    // Get the search term from the request body and convert to lowercase
    const searchTerm = req.body.search.toLowerCase();

    // If search term is empty, return an empty table row
    if (!searchTerm) {
        return res.send('<tr></tr>');
    }

    // Fetch all users from JSONPlaceholder API
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const users = await response.json();

    // Filter users by name or email that contains the search term
    const searchResults = users.filter((user) => {
        const name = user.name.toLowerCase();
        const email = user.email.toLowerCase();
        return name.includes(searchTerm) || email.includes(searchTerm);
    });

    // Convert matching users into HTML table rows
    const searchResultHtml = searchResults
        .map((user) => `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
            </tr>
        `)
        .join('');

    // Send back the generated HTML as the response
    res.send(searchResultHtml);
});

// ----------------------
// Start the server
// ----------------------
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
