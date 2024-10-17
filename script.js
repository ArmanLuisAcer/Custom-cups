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
