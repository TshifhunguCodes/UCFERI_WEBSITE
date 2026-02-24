// Mobile Menu Functionality - Standardized Solution
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu elements
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    const breakpoint = 992; // Consistent with CSS

    // Only run if mobile toggle exists
    if (mobileToggle && navMenu) {

        // Create overlay if it doesn't exist
        let overlay = document.querySelector('.nav-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
        }

        // Toggle menu function
        function toggleMenu() {
            const isActive = mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('menu-open');

            // Accessibility
            mobileToggle.setAttribute('aria-expanded', isActive);
        }

        // Mobile toggle click
        mobileToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking overlay
        overlay.addEventListener('click', function () {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });

        // Handle nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                const isDropdown = this.parentElement.classList.contains('dropdown');

                // On mobile, dropdown links should toggle the dropdown
                if (window.innerWidth <= breakpoint && isDropdown) {
                    e.preventDefault();
                    e.stopPropagation();
                    const parent = this.parentElement;
                    const wasActive = parent.classList.contains('active');

                    // Close other dropdowns
                    document.querySelectorAll('.dropdown.active').forEach(other => {
                        if (other !== parent) {
                            other.classList.remove('active');
                        }
                    });

                    parent.classList.toggle('active');
                } else if (window.innerWidth <= breakpoint && !isDropdown) {
                    // Close menu on normal link click
                    toggleMenu();
                }
            });
        });

        // Close menu on window resize if switching to desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth > breakpoint) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('menu-open');
                mobileToggle.setAttribute('aria-expanded', 'false');

                // Close all dropdowns
                document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });

        // Close menu with Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });

        // Initial state cleanup
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.querySelectorAll('.dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }

    // Touch swipe for hero slider
    let touchStartX = 0;
    let touchEndX = 0;
    const heroSlider = document.querySelector('.hero-images');

    if (heroSlider) {
        heroSlider.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        heroSlider.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const difference = touchStartX - touchEndX;

            if (Math.abs(difference) > swipeThreshold) {
                if (difference > 0) {
                    // Swipe left - next slide
                    triggerSlide('next');
                } else {
                    // Swipe right - previous slide
                    triggerSlide('prev');
                }
            }
        }

        function triggerSlide(direction) {
            const event = new CustomEvent('slide' + direction);
            document.dispatchEvent(event);
        }
    }
});

// Countdown timer for deadlines
function updateCountdown() {
    const incubationDeadline = new Date('2024-02-29').getTime();
    const sweepDeadline = new Date('2025-12-02').getTime();
    const now = new Date().getTime();

    // Incubation countdown
    const incubationElement = document.getElementById('incubation-countdown');
    if (incubationElement) {
        const incubationDiff = incubationDeadline - now;
        if (incubationDiff > 0) {
            const days = Math.floor(incubationDiff / (1000 * 60 * 60 * 24));
            incubationElement.textContent = `${days} days remaining`;
        } else {
            incubationElement.textContent = 'Application closed';
        }
    }

    // SWEEP countdown
    const sweepElement = document.getElementById('sweep-countdown');
    if (sweepElement) {
        const sweepDiff = sweepDeadline - now;
        if (sweepDiff > 0) {
            const days = Math.floor(sweepDiff / (1000 * 60 * 60 * 24));
            sweepElement.textContent = `${days} days remaining`;
        } else {
            sweepElement.textContent = 'Application closed';
        }
    }
}

// Initialize countdown
document.addEventListener('DOMContentLoaded', function () {
    updateCountdown();
    setInterval(updateCountdown, 86400000); // Update daily
});

// Form validation for mobile
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');

            // Add error message
            if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                const error = document.createElement('span');
                error.className = 'error-message';
                error.textContent = 'This field is required';
                error.style.cssText = 'color: #dc3545; font-size: 0.8rem; display: block; margin-top: 5px;';
                input.parentNode.insertBefore(error, input.nextSibling);
            }
        } else {
            input.classList.remove('error');
            const error = input.nextElementSibling;
            if (error && error.classList.contains('error-message')) {
                error.remove();
            }
        }
    });

    return isValid;
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function () {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(function (img) {
            imageObserver.observe(img);
        });
    }
});