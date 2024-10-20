document.getElementById('nameForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
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

    // Extract cupId and token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const cupId = urlParams.get('cupId');
    const token = urlParams.get('token');

    if (!cupId || !token) {
        document.getElementById('error').innerText = "Invalid cupId or token.";
        submitButton.disabled = false;
        return;
    }

    // Send the name, cupId, and token to the Google Apps Script for recording the name
    fetch(`https://script.google.com/macros/s/AKfycbySysKfUwFs9SCTTyMrAns5s_X_YZxs-_8aEh6Gh66MJeQOZRVyYJ179qBgJe1CD4xqkw/exec?name=${encodeURIComponent(capitalizedName)}&cupId=${cupId}&token=${token}`)
        .then(response => response.text()) 
        .then(data => {
            console.log(data); // Log success message

            // Update the history to prevent going back to nameEntry.html
            window.history.replaceState(null, '', `index.html?customer=${encodeURIComponent(capitalizedName)}&quote=Quotes(${cupId})&wallpaper=Wallpaper${cupId}`);

            // Redirect to the thank you page
            window.location.href = `index.html?customer=${encodeURIComponent(capitalizedName)}&quote=Quotes(${cupId})&wallpaper=Wallpaper${cupId}`;
        })
        .catch(error => {
            console.error('Error:', error);
            submitButton.disabled = false; // Re-enable button if there's an error
        });
});

// Check if the name has already been submitted when the page loads
window.addEventListener('load', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const nameSubmitted = urlParams.get('customer'); // Assuming the "customer" parameter is used in the thank-you page

    if (nameSubmitted) {
        // Redirect to thank-you page if the name has already been submitted
        window.location.href = `index.html?customer=${encodeURIComponent(nameSubmitted)}`;
    }
});
