/**
 * This Express.js server provides a simple BMI (Body Mass Index) calculator.
 *
 * Features:
 * 1. Serves static files (HTML, CSS, JS, images) from the "public" folder.
 * 2. Parses both URL-encoded form data and JSON request bodies.
 * 3. Defines a POST route at "/calculate" that:
 *    - Accepts height (in meters) and weight (in kilograms) from a form submission.
 *    - Validates inputs to ensure both values are provided.
 *    - Calculates BMI using the formula: weight / (height * height).
 *    - Determines the BMI category (Underweight, Healthy Weight, Overweight, Obese).
 *    - Responds with an HTML message displaying the BMI and its category.
 * 4. Starts the server on port 3000 and logs a confirmation message.
 *
 * Goal:
 * To demonstrate how an Express server can process form submissions,
 * perform calculations, and return dynamic responses to the client.
 */

import express from 'express';

const app = express();

// ----------------------
// Middleware
// ----------------------

// Serve static files (CSS, JS, images, HTML) from the "public" folder
app.use(express.static('public'));

// Parse URL-encoded bodies (form submissions)
// Example: <form method="POST"> height=1.7&weight=65 </form>
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (useful for API requests with JSON payloads)
app.use(express.json());

// ----------------------
// Handle POST request for BMI calculation
// ----------------------
app.post('/calculate', (req, res) => {
    // Convert height and weight values from form input into floating-point numbers
    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);

    // Validate input: both values must be provided and valid numbers
    if (!height || !weight) {
        return res.send("<p>Please provide both height and weight.</p>");
    }

    // Calculate BMI using formula: weight (kg) / height² (m²)
    const bmi = weight / (height * height);

    // Determine BMI category based on standard ranges
    let category;
    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Healthy Weight";
    } else if (bmi >= 25.0 && bmi <= 29.9) {
        category = "Overweight";
    } else {
        category = "Obese";
    }

    // Send back an HTML response with BMI value and category
    res.send(`
        <p>Your BMI is <strong>${bmi.toFixed(1)}</strong> therefore you are <strong>${category}</strong>.</p>
    `);
});

// ----------------------
// Start the server
// ----------------------
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
