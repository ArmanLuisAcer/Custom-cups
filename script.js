// Quotes based on cupId 
const quotes = {
    1: "Hey! Remember, every step you take, no matter how small, is progress. Keep moving forward, and don’t underestimate your power to create change.",
    2: "You are capable of so much more than you realize. Trust yourself, embrace your uniqueness, and let your light shine brightly.",
    // (Other quotes omitted for brevity)
    20: "The world needs your unique gifts and talents. Don’t hold back—share them with confidence, and watch the positive impact you can make!"
};

// Function to extract the cupId from the wallpaper parameter
function getCupIdFromWallpaper(wallpaper) {
    return wallpaper ? wallpaper.replace('Wallpaper', '') : null; // Extract the numeric part
}

// URL Parameters for Dynamic Content
const urlParams = new URLSearchParams(window.location.search);
const customer = urlParams.get('customer') || "Valued Customer"; // Default to "Valued Customer" if no parameter
const wallpaper = urlParams.get('wallpaper') || "Wallpaper1"; // Default to Wallpaper1 if no parameter

// Extract cupId from wallpaper
const cupId = getCupIdFromWallpaper(wallpaper);

// Set customer name dynamically
if (customer) {
    document.getElementById('greeting').innerText = `Thank you, ${customer}!`;
}

// Function to set the dynamic quote for slide 2
function setDynamicQuote(cupId) {
    const selectedQuote = quotes[cupId] || "Stay motivated!"; // Fallback quote if cupId doesn't match
    document.getElementById('dynamicquote').innerText = selectedQuote;
}

// Set the dynamic quote based on cupId when the page loads
if (cupId) {
    setDynamicQuote(cupId);
}

// Initialize with the first slide
let slideIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

function showSlide(index) {
    const offset = -index * 100; // Each slide is 100% width
    slides.style.transform = `translateX(${offset}%)`;
}

// Function to navigate to the next slide
function nextSlide() {
    slideIndex = (slideIndex + 1) % totalSlides; // Cycle to next slide
    showSlide(slideIndex);
}

// Function to navigate to the previous slide
function prevSlide() {
    if (slideIndex === 0) {
        slideIndex = totalSlides - 1; // Go to the last slide if on the first slide
    } else {
        slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    }
    showSlide(slideIndex);
}

// Initialize the first slide
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