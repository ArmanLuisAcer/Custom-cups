document.getElementById('nameForm').

addEventListener('submit', function (event) { event.preventDefault();

// Prevent the default form submission

+ const submitButton = document.querySelector( 'button[type="submit"]');

const nameInput = document.getElementById( 'customerName').value.trim();

+ // Disable the button to prevent multiple sub missions

+ submitButton.disabled = true;

+

// Capitalize the first letter and check length

if (nameInput.length > 15) { document.getElementById('error').

innerText = "Name must be 15 characters or less.";

+ submitButton.disabled = false;

// Re-enable button if there's an error return;

}