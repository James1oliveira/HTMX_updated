/**
 * This Express.js server provides email validation functionality.
 *
 * Features:
 * 1. Serves static files (HTML, CSS, JS, images) from the "public" directory.
 * 2. Parses both URL-encoded form submissions and JSON request bodies.
 * 3. Defines a POST route at "/email" that:
 *    - Extracts an email from the request body.
 *    - Validates the email using a regular expression for standard formats.
 *    - If valid: responds with an HTML form field showing a success alert.
 *    - If invalid: responds with an HTML form field showing an error alert.
 *    - Uses HTMX attributes (`hx-target`, `hx-swap`, `hx-post`) so the
 *      response replaces the form field dynamically without reloading the page.
 * 4. Starts the server on port 3000 and logs a confirmation message.
 *
 * Goal:
 * To demonstrate how an Express server can handle form submissions,
 * perform server-side validation, and return dynamic HTML fragments
 * for immediate client-side updates.
 */

import express from 'express';

const app = express();

// ----------------------
// Middleware
// ----------------------

// Serve static files (CSS, JS, HTML, images) from the "public" folder
app.use(express.static('public'));

// Parse URL-encoded bodies (form submissions, e.g., from <form>)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (API clients that send JSON data)
app.use(express.json());

// ----------------------
// Handle POST request for email validation
// ----------------------
app.post('/email', (req, res) => {
    // Extract the submitted email value from the request body
    const submittedEmail = req.body.email;

    // Regular expression to validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // If email matches the regex -> valid email
    if (emailRegex.test(submittedEmail)) {
        return res.send(`
            <div class="mb-3" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    name="email"
                    hx-post="/email"
                    value="${submittedEmail}"
                >
                <div class="alert alert-success" role="alert">
                    That email is valid
                </div>
            </div>
        `);
    }
    // Otherwise -> invalid email
    else {
        return res.send(`
            <div class="mb-3" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    name="email"
                    hx-post="/email"
                    value="${submittedEmail}"
                >
                <div class="alert alert-danger" role="alert">
                    Please enter a valid email address
                </div>
            </div>
        `);
    }
});

// ----------------------
// Start the server
// ----------------------
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
