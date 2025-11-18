/**
 * This Express.js server provides a simple user profile editor with HTMX integration.
 *
 * Features:
 * 1. Serves static files (HTML, CSS, JS, images) from the "public" directory.
 * 2. Parses both URL-encoded form submissions and JSON request bodies.
 * 3. Defines a GET route at "/user/:id/edit" that:
 *    - Returns an editable HTML form pre-filled with a user's info.
 *    - Uses HTMX attributes so the form submits via PUT and can replace itself dynamically.
 * 4. Defines a PUT route at "/user/:id" that:
 *    - Accepts updated user values (name, bio) from the request body.
 *    - Returns an updated "profile card" showing the new info.
 *    - Includes a button with HTMX attributes to fetch the edit form again, enabling
 *      seamless toggling between view and edit states.
 * 5. Starts the server on port 3000 and logs a confirmation message.
 *
 * Goal:
 * To demonstrate how an Express server can handle GET/PUT requests,
 * work with form submissions, and return dynamic HTML fragments
 * that HTMX uses to create an interactive, in-place editing experience.
 */

import express from 'express';

const app = express();

// ----------------------
// Middleware
// ----------------------

// Serve static files (CSS, JS, HTML, images) from the "public" folder
app.use(express.static('public'));

// Parse URL-encoded bodies (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

// Parse JSON request bodies (useful for API clients)
app.use(express.json());

// ----------------------
// Handle GET request to display profile edit form
// ----------------------
app.get('/user/:id/edit', (req, res) => {
    // Respond with an HTML form that allows editing a user's profile
    // HTMX attributes (hx-put, hx-target, hx-swap) are used to
    // submit the form via AJAX and update only the form section dynamically.
    res.send(`
        <form hx-put="/user/1" hx-target="this" hx-swap="outerHTML">
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="name" 
                    name="name" 
                    value="Greg Lim">
            </div>
            <div class="mb-3">
                <label for="bio" class="form-label">Bio</label>
                <textarea 
                    type="text" 
                    class="form-control" 
                    id="bio" 
                    name="bio">Follower of Christ | Author of Best-selling Amazon Tech Books and Creator of Coding Courses
                </textarea>
            </div>
            <button type="submit" class="btn btn-primary">
                Save Changes
            </button>
        </form>
    `);
});

// ----------------------
// Handle PUT request for updating profile
// ----------------------
app.put('/user/:id', (req, res) => {
    // Extract submitted values from request body
    const name = req.body.name;
    const bio = req.body.bio;

    // Respond with updated profile card
    // HTMX attributes (hx-get, hx-target, hx-swap) allow inline editing
    // when the "Click To Edit" button is clicked again.
    res.send(`
        <div class="card" style="width: 18rem;"
             hx-target="this"
             hx-swap="outerHTML">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">
                    ${bio}
                </p>
                <button href="#" 
                        class="btn btn-primary"
                        hx-get="/user/1/edit">
                    Click To Edit
                </button>
            </div>
        </div>
    `);
});

// ----------------------
// Start the server
// ----------------------
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
