document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    let captchaExpirationTimeout;

    // Function to generate a random CAPTCHA
    function generateCaptcha() {
        const captchaLength = 6;
        let captcha = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < captchaLength; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        document.getElementById('generated-captcha').innerText = captcha;
        document.getElementById('captcha-message').innerText = ''; // Reset message

        clearTimeout(captchaExpirationTimeout); // Clear any previous timeout
        captchaExpirationTimeout = setTimeout(() => {
            alert("CAPTCHA has expired. Please refresh.");
            generateCaptcha(); // Auto-refresh CAPTCHA after expiration
        }, 2 * 60 * 1000); // 2 minutes expiration
    }

    // Call the generateCaptcha function when the page loads
    generateCaptcha();

    // Form submission event listener
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const usernameEmail = document.getElementById('username-email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;
        const enteredCaptcha = document.getElementById('captcha-input').value;
        const generatedCaptcha = document.getElementById('generated-captcha').innerText;

        // Validate CAPTCHA
        if (enteredCaptcha !== generatedCaptcha) {
            document.getElementById('captcha-message').innerText = 'Incorrect CAPTCHA. Please try again.';
            document.getElementById('captcha-message').style.color = 'red';
            generateCaptcha(); // Regenerate CAPTCHA on failure
            return; // Stop form submission
        }

        // Check if all fields are filled out
        if (usernameEmail && password && role) {
            const user = {
                usernameEmail,
                password,
                role
            };

            // Save user data to localStorage (or handle it with backend logic)
            localStorage.setItem('user', JSON.stringify(user));

            // Show a success message with an alert
            alert('Registration successful!'); // This shows the alert

            // Redirect based on the selected role
            if (role === "Farmer") {
                window.location.href = "http://127.0.0.1:3000/farmer.html"; // Redirect to Farmer's Dashboard
            } else {
                window.location.href = "http://127.0.0.1:3000/index.html"; // Redirect to another page for other rols
            }
        } else {
            alert('Please fill out all the fields.');
        }
    });

    // CAPTCHA refresh button event listener
    document.querySelector('.captcha-box button').addEventListener('click', function() {
        generateCaptcha();
    });
});
