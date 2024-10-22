document.getElementById('nameForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    const submitButton = document.getElementById('submitButton');
    const loader = document.getElementById('loader');
    const submitText = document.querySelector('.submit-text');
    const nameInput = document.getElementById('customerName').value.trim();

    // Disable the button to prevent multiple submissions
    submitButton.disabled = true;

    // Show the loader and hide the submit text
    loader.style.display = 'block'; // Show the loader
    submitText.style.visibility = 'hidden'; // Hide the submit text
    submitText.style.opacity = '0'; // Fade out submit text

    // Capitalize the first letter and check length
    if (nameInput.length > 15) {
        document.getElementById('error').innerText = "Name must be 15 characters or less.";
        submitButton.disabled = false; // Re-enable button if there's an error
        submitText.style.visibility = 'visible'; // Show the submit text again
        submitText.style.opacity = '1'; // Reset opacity
        loader.style.display = 'none'; // Hide the loader
        return;
    }

    const capitalizedName = nameInput.charAt(0).toUpperCase() + nameInput.slice(1).toLowerCase();

    // Send the name to the Google Apps Script
    fetch(`https://script.google.com/macros/s/AKfycbxXmHwT7BRsW1kHgjOutAVpiR7zwyL_pK5yemq6lA-zGBx2QYSYfMzqFG7Dqf3iBhHsXw/exec?name=${encodeURIComponent(capitalizedName)}`)
        .then(response => response.text()) // Ensure you are processing the response correctly
        .then(data => {
            console.log(data); // Log success message or handle response

            // Assuming the cupId is passed as a URL parameter
            const urlParams = new URLSearchParams(window.location.search);
            const cupId = urlParams.get('cupId');

            // Update history to prevent going back to name entry page
            window.history.replaceState(null, '', `index.html?customer=${encodeURIComponent(capitalizedName)}&wallpaper=Wallpaper${cupId}`);

            // Redirect to the thank-you page
            window.location.href = `index.html?customer=${encodeURIComponent(capitalizedName)}&wallpaper=Wallpaper${cupId}`;
        })
        .catch(error => {
            console.error('Error:', error);
            submitButton.disabled = false; // Re-enable button if there's an error
            submitText.style.visibility = 'visible'; // Show the submit text again
            submitText.style.opacity = '1'; // Reset opacity
            loader.style.display = 'none'; // Hide the loader
        });
});