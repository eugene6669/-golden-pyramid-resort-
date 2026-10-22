document.addEventListener('DOMContentLoaded', function() {
    showForm('login'); // Show login form by default
});

function showForm(form) {
    // Remove the active class from both forms
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('signup-form').classList.remove('active');
    
    // Add the active class to the specified form
    if (form === 'login') {
        document.getElementById('login-form').classList.add('active');
    } else if (form === 'signup') {
        document.getElementById('signup-form').classList.add('active');
    }
}

function handleSubmit(event, action) {
    event.preventDefault(); // Prevent form submission for now

    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password'); // Get confirm password field
    const userType = formData.get('user-type');

    if (action === 'signup') {
        if (!userType) {
            // Display an error message or alert for missing user type
            alert('Please select a user type.');
            return;
        }
        if (password.length < 4) {
            // Display an error message or alert for minimum password length
            alert('Password must be 4 or more characters.');
            return;
        }
        if (password !== confirmPassword) {
            // Display an error message if passwords do not match
            alert('Passwords do not match.');
            return;
        }

        // Simulate signup process
        alert('Sign Up form submitted');

        // Redirect to appropriate page based on user type
        if (userType === 'customer') {
            window.location.href = '../Homepage/homepage.html';
        } else if (userType === 'employee') {
            window.location.href = '../Homepage-Employees/homepage-employees.html';
        }
    } else if (action === 'login') {
        if (!userType) {
            // Display an error message or alert for missing user type
            alert('Please select a user type.');
            return;
        }

        // Simulate login process
        alert('Login form submitted');

        // Redirect to appropriate page based on user type
        if (userType === 'customer') {
            window.location.href = '../Homepage/homepage.html';
        } else if (userType === 'employee') {
            window.location.href = '../Homepage-Employees/homepage-employees.html';
        }
    }
}
