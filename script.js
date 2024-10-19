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

// Initialize with the first slide
showSlide(slideIndex);

// URL Parameters for Dynamic Content
const urlParams = new URLSearchParams(window.location.search);
const customer = urlParams.get('customer');
const quote = urlParams.get('quote');
const wallpaper = urlParams.get('wallpaper');

// Set customer name dynamically
if (customer) {
    document.getElementById('greeting').innerText = `Thank you, ${customer}!`;
}

// Set quote image dynamically
if (quote) {
    document.getElementById('quoteImage').src = `images/Quote${quote}.jpg`;
    document.getElementById('quoteDownloadLink').href = `images/Quote${quote}.jpg`;
}

// Set wallpaper image dynamically
if (wallpaper) {
    document.getElementById('wallpaperImage').src = `images/Wallpaper${wallpaper}.jpg`;
    document.getElementById('wallpaperDownloadLink').href = `images/Wallpaper${wallpaper}.jpg`;
}