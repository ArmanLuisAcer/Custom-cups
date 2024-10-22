// Quotes based on cupId
const quotes = {
    1: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    2: "Believe you can and you're halfway there.",
    3: "The only limit to our realization of tomorrow is our doubts of today.",
    4: "Do not watch the clock. Do what it does. Keep going.",
    9: "You are never too old to set another goal or to dream a new dream." // Add more quotes as needed
};

// Function to extract the cupId from the wallpaper parameter
function getCupIdFromWallpaper(wallpaper) {
    return wallpaper ? wallpaper.replace('Wallpaper', '') : null; // Extract the numeric part
}

// URL Parameters for Dynamic Content
const urlParams = new URLSearchParams(window.location.search);
const customer = urlParams.get('customer');
const wallpaper = urlParams.get('wallpaper');

// Extract cupId from wallpaper
const cupId = getCupIdFromWallpaper(wallpaper);

// Set customer name dynamically
if (customer) {
    document.getElementById('greeting').innerText = `Thank you, ${customer}!`;
}

// Function to set the dynamic quote for slide 2
function setDynamicQuote(cupId) {
    const selectedQuote = quotes[cupId] || "Stay motivated!"; // Fallback quote if cupId doesn't match
    document.getElementById('dynamicQuote').innerText = selectedQuote;
}

// Set the dynamic quote based on cupId when the page loads
if (cupId) {
    setDynamicQuote(cupId);
}

// Initialize with the first slide (this handles your existing slides logic)
let slideIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
const prevButton = document.querySelector('.prev-button'); // Reference for the previous button

function showSlide(index) {
    const offset = -index * 100; // Each slide is 100% width
    slides.style.transform = `translateX(${offset}%)`;

    // Hide prev button on the first slide
    if (index === 0) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = 'block';
    }
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % totalSlides;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    showSlide(slideIndex);
}

// Initialize the first slide and set visibility for the prev button
showSlide(slideIndex);

// Handle touch/swipe events for mobile
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
}

function handleTouchMove(event) {
    touchEndX = event.changedTouches[0].screenX;
}

function handleTouchEnd() {
    // Check if we're on the first slide
    if (slideIndex === 0) {
        if (touchEndX > touchStartX) {
            // Swiped right on the first slide - do nothing
            return;
        }
    }

    if (touchEndX < touchStartX) {
        nextSlide(); // Swiped left, go to the next slide
    } else if (touchEndX > touchStartX) {
        prevSlide(); // Swiped right, go to the previous slide
    }
}

// Attach touch event listeners
slides.addEventListener('touchstart', handleTouchStart);
slides.addEventListener('touchmove', handleTouchMove);
slides.addEventListener('touchend', handleTouchEnd);