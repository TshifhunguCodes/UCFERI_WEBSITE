// Mobile Menu Functionality - Complete Solution
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu elements
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    // Only run if mobile toggle exists
    if (mobileToggle && navMenu) {
        // Create overlay for mobile menu
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
        
        // Toggle menu function
        function toggleMenu() {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Accessibility
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
        }
        
        // Mobile toggle click
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', function() {
            toggleMenu();
        });
        
        // Close menu when clicking a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 992) {
                    toggleMenu();
                }
            });
        });
        
        // Handle dropdowns on mobile
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            
            if (link) {
                link.addEventListener('click', function(e) {
                    if (window.innerWidth <= 992) {
                        e.preventDefault();
                        e.stopPropagation();
                        dropdown.classList.toggle('active');
                        
                        // Close other dropdowns
                        dropdowns.forEach(other => {
                            if (other !== dropdown) {
                                other.classList.remove('active');
                            }
                        });
                    }
                });
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 992) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('menu-open');
                mobileToggle.setAttribute('aria-expanded', 'false');
                
                // Close all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
        
        // Close menu with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
        
        // Close menu when clicking outside (for mobile)
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 992 && 
                navMenu.classList.contains('active') &&
                !e.target.closest('.nav-menu') && 
                !e.target.closest('.mobile-toggle')) {
                toggleMenu();
            }
        });
        
        // Ensure all dropdowns are closed on page load
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    // Touch swipe for hero slider
    let touchStartX = 0;
    let touchEndX = 0;
    const heroSlider = document.querySelector('.hero-images');
    
    if (heroSlider) {
        heroSlider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        heroSlider.addEventListener('touchend', function(e) {
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
document.addEventListener('DOMContentLoaded', function() {
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
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
});