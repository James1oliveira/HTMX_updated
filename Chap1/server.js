/**
 * This Express.js server demonstrates how to:
 * 1. Serve static files from the "public" directory.
 * 2. Parse incoming request data (URL-encoded form data and JSON).
 * 3. Define a GET route at "/users" that:
 *    - Accepts an optional "limit" query parameter (?limit=5), defaulting to 10.
 *    - Simulates network delay with a 2-second timeout.
 *    - Fetches user data from the JSONPlaceholder API.
 *    - Sends back an HTML response listing the fetched user names.
 * 4. Start the server on port 3000 and log a message when it is running.
 *
 * Goal:
 * To illustrate how an Express server can handle static files, process requests,
 * fetch external data, and return dynamic content — serving as a foundation
 * for learning and building web applications.
 */


import express from 'express';

const app = express();

// Serve static files (like CSS, JS, images) from the "public" folder
app.use(express.static('public'));

// Middleware to parse data from HTML form submissions (URL-encoded)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON request bodies (e.g., from API clients)
app.use(express.json());

// Route to handle GET request at /users
app.get('/users', async (req, res) => {
    // Simulate a delay (2 seconds) to mimic slow server response
    setTimeout(async () => {
        // Get "limit" from query string (default to 10 if not provided)
        const limit = +req.query.limit || 10;

        // Fetch users from external API with the given limit
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
        );

        // Parse JSON response into JavaScript array/object
        const users = await response.json();

        // Send back an HTML response showing the user names in a list
        res.send(`
            <h2>Users</h2>
            <ul class="list-group">
                ${users.map((user) => `<li class="list-group-item">${user.name}</li>`).join('')}
            </ul>
        `);
    }, 2000); // 2000ms = 2 seconds delay
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
