// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = this.querySelectorAll('.hamburger span');
            this.classList.toggle('active');
        });
    }

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        // Function to show slide
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        // Next slide
        function nextSlide() {
            let next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }

        // Previous slide
        function prevSlide() {
            let prev = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prev);
        }

        // Event listeners
        if (prevBtn) prevBtn.addEventListener('click', function() {
            prevSlide();
            resetInterval();
        });

        if (nextBtn) nextBtn.addEventListener('click', function() {
            nextSlide();
            resetInterval();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
                resetInterval();
            });
        });

        // Auto slide
        function startInterval() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        startInterval();
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== "#") {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });

    // Form submission
    const programForm = document.getElementById('programApplication');
    if (programForm) {
        programForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your application! We will contact you soon.');
            this.reset();
        });
    }

    // Active nav link based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.includes(href) && href !== '#') {
            link.classList.add('active');
        }
    });
});