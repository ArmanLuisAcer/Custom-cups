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

    // Get 'quote' and 'wallpaper' parameters from the current URL
    const urlParams = new URLSearchParams(window.location.search);
    const quote = urlParams.get('quote') || 1;  // Default to 1 if not provided
    const wallpaper = urlParams.get('wallpaper') || 1;  // Default to 1 if not provided

    // Redirect to the thank-you page, passing the customer name, quote, and wallpaper
    window.location.href = `index.html?customer=${encodeURIComponent(capitalizedName)}&quote=${quote}&wallpaper=${wallpaper}`;
});
