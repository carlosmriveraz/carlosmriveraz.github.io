document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const sliderTrack = document.querySelector('.slider-track');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentSlide = 0;
    const slideWidth = slides[0].clientWidth;
    let autoSlideInterval;

    function showSlide(index) {
        const offset = -(slideWidth * index);
        sliderTrack.style.transform = `translateX(${offset}px)`;
        currentSlide = index;
    }

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            showSlide(currentSlide + 1);
        } else {
            showSlide(0);
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        } else {
            showSlide(slides.length - 1);
        }
    }

    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        nextSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        prevSlide();
        startAutoSlide();
    });

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000);
    }

    // Initialize the slider
    showSlide(currentSlide);
    startAutoSlide();
});


const frontendContainer = document.getElementById('frontend-container');

frontendContainer.addEventListener('mouseenter', function () {
    this.classList.add('flipped');
});

frontendContainer.addEventListener('mouseleave', function () {
    this.classList.remove('flipped');
});
