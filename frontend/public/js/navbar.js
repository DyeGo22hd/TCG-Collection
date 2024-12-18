document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.getElementById('nav-links');
    const userId = localStorage.getItem('userId'); // Check if user is logged in

    if (userId) {
        // User is logged in, update navbar
        navLinks.innerHTML = `
            <a href="#" id="logout">Log Off</a>
            <a href="collection.html">My Collection</a>
        `;

        // Handle Log Off
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.clear();
            alert('Logged out successfully!');
            window.location.href = 'index.html';
        });
    } else {
        // User is not logged in, show Login/Sign Up
        navLinks.innerHTML = `
            <a href="login.html">Login / Sign Up</a>
        `;
    }
});
