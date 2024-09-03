document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const usernameEmail = document.getElementById('username-email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        if (usernameEmail && password && role) {
            const user = {
                usernameEmail,
                password,
                role
            };

            // Save user data to localStorage (or handle it with backend logic)
            localStorage.setItem('user', JSON.stringify(user));

            // Show a success message
            alert('Registration successful!');
            
            // Redirect to a different page if needed
            window.location.href = "index.html"; // Change to your desired page
        } else {
            alert('Please fill out all the fields.');
        }
    });
});
