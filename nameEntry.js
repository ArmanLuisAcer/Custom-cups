document.getElementById('nameForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    const nameInput = document.getElementById('customerName').value.trim();

    // Capitalize the first letter and check length
    if (nameInput.length > 15) {
        document.getElementById('error').innerText = "Name must be 15 characters or less.";
        return;
    }

    const capitalizedName = nameInput.charAt(0).toUpperCase() + nameInput.slice(1).toLowerCase();
    
    // Redirect to the thank-you page with the name as a URL parameter
    window.location.href = `index.html?customer=${encodeURIComponent(capitalizedName)}`;
});