document.getElementById('nameForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    const submitButton = document.querySelector('button[type="submit"]');
    const loader = document.getElementById('loader');
    const submitText = document.querySelector('.submit-text');
    
    const firstNameInput = document.getElementById('customerName').value.trim();
    const lastNameInput = document.getElementById('customerLastname').value.trim();
    const timestamp = new Date().toISOString(); // Get the current timestamp in ISO format

    // Show loader and hide the submit text
    loader.style.display = 'inline-block';
    submitText.style.display = 'none';

    // Disable the button to prevent multiple submissions
    submitButton.disabled = true;

    // Capitalize the first letter of both first and last names
    const capitalizedFirstName = firstNameInput.charAt(0).toUpperCase() + firstNameInput.slice(1).toLowerCase();
    const capitalizedLastName = lastNameInput.charAt(0).toUpperCase() + lastNameInput.slice(1).toLowerCase();

    // Regular expression to check for alphabetic characters only
    const nameRegex = /^[a-zA-Z]+$/;

    // Check input lengths and content
    if (capitalizedFirstName.length > 15 || capitalizedLastName.length > 15) {
        alert("Each name must be 15 characters or less.");
        submitButton.disabled = false; // Re-enable button if there's an error
        loader.style.display = 'none';
        submitText.style.display = 'inline-block'; // Show submit text again
        return;
    }

    // Validate that names contain only alphabetic characters
    if (!nameRegex.test(capitalizedFirstName) || !nameRegex.test(capitalizedLastName)) {
        alert("Names can only contain letters."); // Change from innerText to alert
        submitButton.disabled = false; // Re-enable button if there's an error
        loader.style.display = 'none';
        submitText.style.display = 'inline-block'; // Show submit text again
        return;
    }

    // Send the first name, last name, and timestamp to the Google Apps Script
    fetch(`https://script.google.com/macros/s/AKfycbysWRyazMUfbqa-rdEtkSDdwfJo9CJnWak-QieMm7ULPxl9zANb_ulXn5WVDqAeLghl8A/exec?firstName=${encodeURIComponent(capitalizedFirstName)}&lastName=${encodeURIComponent(capitalizedLastName)}&timestamp=${encodeURIComponent(timestamp)}`)
        .then(response => response.text()) 
        .then(data => {
            console.log(data); // Log success message or handle response

            // Handle successful submission, e.g., redirect or show a message
            window.history.replaceState(null, '', `index.html?customer=${encodeURIComponent(capitalizedName)}&wallpaper=Wallpaper${cupId}`);

            // Redirect to the thank-you page
            window.location.href = `index.html?customer=${encodeURIComponent(capitalizedName)}&lastName=${encodeURIComponent(capitalizedLastName)}&wallpaper=Wallpaper${cupId}`;
        })
        .catch(error => {
            console.error('Error:', error);
            submitButton.disabled = false; // Re-enable button if there's an error
            loader.style.display = 'none'; // Hide loader on error
            submitText.style.display = 'inline-block'; // Show submit text again
        });
});