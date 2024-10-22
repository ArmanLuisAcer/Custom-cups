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

// Initialize the first slide
showSlide(slideIndex);