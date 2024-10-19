document.getElementById('nameForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    const submitButton = document.querySelector('button[type="submit"]');
    const nameInput = document.getElementById('customerName').value.trim();

    // Disable the button to prevent multiple submissions
    submitButton.disabled = true;

    // Capitalize the first letter and check length
    if (nameInput.length > 15) {
        document.getElementById('error').innerText = "Name must be 15 characters or less.";
        submitButton.disabled = false; // Re-enable button if there's an error
        return;
    }

    const capitalizedName = nameInput.charAt(0).toUpperCase() + nameInput.slice(1).toLowerCase();

    // Send the name to the Google Apps Script
    fetch(`https://script.google.com/macros/s/AKfycbxXmHwT7BRsW1kHgjOutAVpiR7zwyL_pK5yemq6lA-zGBx2QYSYfMzqFG7Dqf3iBhHsXw/exec?name=${encodeURIComponent(capitalizedName)}`)
        .then(response => response.text())
        .then(data => {
            console.log(data); // Log success message or handle response
            // Redirect to the thank-you page
            window.location.href = `index.html?customer=${encodeURIComponent(capitalizedName)}&quote=Qoute2&wallpaper=Wallpaper2`;
        .catch(error => {
            console.error('Error:', error);
            submitButton.disabled = false; // Re-enable button if there's an error
        });
});
