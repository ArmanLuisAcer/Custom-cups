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
    updateDownloadLink(); // Update the download link when sliding
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    showSlide(slideIndex);
    updateDownloadLink(); // Update the download link when sliding
}

// Function to update the download link based on the current slide
function updateDownloadLink() {
    const wallpaperImage = document.getElementById('wallpaperImage');
    const downloadLink = document.getElementById('wallpaperDownloadLink');

    // Update the download link with the current wallpaper image source
    downloadLink.href = wallpaperImage.src;
    downloadLink.download = "ICT players from TVL5"; // Set the custom filename for download
}

// Initialize with the first slide
showSlide(slideIndex);

// URL Parameters for Dynamic Content
const urlParams = new URLSearchParams(window.location.search);
const customer = urlParams.get('customer');

// Set customer name dynamically
if (customer) {
    document.getElementById('greeting').innerText = `Thank you, ${customer}!`;
}

// Set quote image dynamically
const quote = urlParams.get('quote');
if (quote) {
    document.getElementById('quoteImage').src = `images/${quote}.jpg`;
}

// Set wallpaper image dynamically
const wallpaper = urlParams.get('wallpaper');
if (wallpaper) {
    document.getElementById('wallpaperImage').src = `images/${wallpaper}.jpg`;
    updateDownloadLink(); // Update the download link for the initial wallpaper
}
