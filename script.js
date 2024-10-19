let slideIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

// Fetch the token based on cupId
const urlParams = new URLSearchParams(window.location.search);
const cupId = urlParams.get('cupId');

if (cupId) {
    fetch(`https://script.google.com/macros/s/AKfycbxxML_1M8H9BviayDgVSOaRKpZ6iYaPcG9yqhe4HBX1Te8mZF7DJDIrb6NAD2R0siTY/exec?cupId=${encodeURIComponent(cupId)}`)
        .then(response => response.json())
        .then(data => {
            const { token, wallpaper, quote } = data; // Adjust according to your API response

            // Set the URL parameters
            if (token) {
                // Use the token as needed
            }
            if (quote) {
                document.getElementById('quoteImage').src = `images/${quote}.jpg`;
            }
            if (wallpaper) {
                document.getElementById('wallpaperImage').src = `images/${wallpaper}.jpg`;
            }

            const customer = urlParams.get('customer');
            if (customer) {
                document.getElementById('greeting').innerText = `Thank you, ${customer}!`;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function showSlide(index) {
    const offset = -index * 100; // Each slide is 100% width
    slides.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % totalSlides;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    showSlide(slideIndex);
}

// Initialize with the first slide
showSlide(slideIndex);
