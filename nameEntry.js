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

    // Extract cupId and token from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const cupId = urlParams.get('cupId');
    const token = urlParams.get('token');  // Assuming token is also passed in the URL

    if (!cupId || !token) {
        document.getElementById('error').innerText = "Invalid cupId or token.";
        submitButton.disabled = false;
        return;
    }

    // Send the name, cupId, and token to the Google Apps Script
    fetch(`https://script.google.com/macros/s/AKfycbxMCXIXqy58CgcMuMYVclEZTvUDWSDGU01sF-uBozShmeK2XbR3dWi9CGNKSIrdm_JDzg/exec?name=${encodeURIComponent(capitalizedName)}&cupId=${cupId}&token=${token}`)
        .then(response => response.text()) // Ensure you are processing the response correctly
        .then(data => {
            console.log(data); // Log success message or handle response

            // Update history to prevent going back to name entry page
            window.history.replaceState(null, '', `index.html?customer=${encodeURIComponent(capitalizedName)}&quote=Qoute${cupId}&wallpaper=Wallpaper${cupId}`);

            // Redirect to the thank-you page
            window.location.href = `index.html?customer=${encodeURIComponent(capitalizedName)}&quote=Quote${cupId}&wallpaper=Wallpaper${cupId}`;
        })
        .catch(error => {
            console.error('Error:', error);
            submitButton.disabled = false; // Re-enable button if there's an error
        });
});
