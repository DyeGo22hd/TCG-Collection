// Handle Signup
async function handleSignup(event) {
    event.preventDefault();

    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    if (!email || !password) {
        alert('Please enter a valid email and password.');
        return;
    }

    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Account created successfully! Please log in.');
            document.getElementById('signup-form').reset();
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Signup Error:', error);
        alert('Failed to sign up.');
    }
}

// Handle Login
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Store user ID and email in localStorage
            localStorage.setItem('userId', data.user.id);
            localStorage.setItem('email', data.user.email);
            alert('Login successful! Redirecting to homepage...');
            window.location.href = 'index.html';
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Login Error:', error);
        alert('Failed to log in.');
    }
}

// Show the Sign-Up Form
document.getElementById('show-signup').addEventListener('click', () => {
    const signupForm = document.getElementById('signup-form-container');
    signupForm.classList.toggle('hidden');
});

// Add Event Listeners
document.getElementById('signup-form').addEventListener('submit', handleSignup);
document.getElementById('login-form').addEventListener('submit', handleLogin);
