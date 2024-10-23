document.getElementById('nameForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    const submitButton = document.querySelector('button[type="submit"]');
    const loader = document.getElementById('loader');
    const submitText = document.querySelector('.submit-text');
    const nameInput = document.getElementById('customerName').value.trim();

    // Show loader and hide the submit text
    loader.style.display = 'inline-block';
    submitText.style.display = 'none';

    // Disable the button to prevent multiple submissions
    submitButton.disabled = true;

    // Capitalize the first letter and check length
    if (nameInput.length > 15) {
        document.getElementById('error').innerText = "Name must be 15 characters or less.";
        submitButton.disabled = false; // Re-enable button if there's an error
        loader.style.display = 'none';
        submitText.style.display = 'inline-block'; // Show submit text again
        return;
    }

    const capitalizedName = nameInput.charAt(0).toUpperCase() + nameInput.slice(1).toLowerCase();

    // Send the name to the Google Apps Script
    fetch(`https://script.google.com/macros/s/AKfycbxXmHwT7BRsW1kHgjOutAVpiR7zwyL_pK5yemq6lA-zGBx2QYSYfMzqFG7Dqf3iBhHsXw/exec?name=${encodeURIComponent(capitalizedName)}`)
        .then(response => response.text()) 
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
            loader.style.display = 'none'; // Hide loader on error
            submitText.style.display = 'inline-block'; // Show submit text again
        });
});