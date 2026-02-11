// Complete JavaScript for UCfERI Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Mobile Navigation
    initMobileNavigation();
    
    // Initialize Hero Slider if exists
    initHeroSlider();
    
    // Initialize Dropdowns
    initDropdowns();
    
    // Initialize Newsletter Form
    initNewsletterForm();
    
    // Initialize Countdown Timers
    initCountdownTimers();
    
    // Initialize Stats Counter
    initStatsCounter();
    
    // Initialize Active Navigation
    initActiveNavigation();
});

// function initMobileNavigation() {
//     const mobileToggle = document.querySelector('.mobile-toggle');
//     const navMenu = document.querySelector('.nav-menu');
//     const hamburger = document.querySelector('.hamburger');
    
//     if (mobileToggle && navMenu) {
//         mobileToggle.addEventListener('click', function() {
//             navMenu.classList.toggle('active');
//             hamburger.classList.toggle('active');
            
//             // Animate hamburger to X
//             const spans = hamburger.querySelectorAll('span');
//             if (navMenu.classList.contains('active')) {
//                 spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
//                 spans[1].style.opacity = '0';
//                 spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
//             } else {
//                 spans[0].style.transform = 'none';
//                 spans[1].style.opacity = '1';
//                 spans[2].style.transform = 'none';
//             }
//         });
        
//         // Close menu when clicking outside
//         document.addEventListener('click', function(e) {
//             if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
//                 navMenu.classList.remove('active');
//                 hamburger.classList.remove('active');
//                 const spans = hamburger.querySelectorAll('span');
//                 spans[0].style.transform = 'none';
//                 spans[1].style.opacity = '1';
//                 spans[2].style.transform = 'none';
//             }
//         });
//     }
// }

// Hero Slider with 3 Images
function initHeroSlider() {
    const heroSlides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    
    if (heroSlides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = heroSlides.length;
    let slideInterval;
    
    // Function to show a specific slide
    function showSlide(n) {
        // Hide all slides
        heroSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Calculate new slide index
        currentSlide = (n + totalSlides) % totalSlides;
        
        // Show current slide
        heroSlides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Function to go to next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Function to go to previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Start automatic slideshow
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    // Stop automatic slideshow
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    // Event Listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopSlider();
            prevSlide();
            startSlider();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopSlider();
            nextSlide();
            startSlider();
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopSlider();
            showSlide(index);
            startSlider();
        });
    });
    
    // Pause on hover
    const heroImages = document.querySelector('.hero-images');
    if (heroImages) {
        heroImages.addEventListener('mouseenter', stopSlider);
        heroImages.addEventListener('mouseleave', startSlider);
    }
    
    // Start the slider
    startSlider();
}

// Dropdown Menus
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth > 992) {
                const content = this.querySelector('.dropdown-content');
                if (content) content.style.display = 'block';
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 992) {
                const content = this.querySelector('.dropdown-content');
                if (content) content.style.display = 'none';
            }
        });
        
        // Mobile dropdown toggle
        const trigger = dropdown.querySelector('.nav-link');
        if (trigger) {
            trigger.addEventListener('click', function(e) {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    const content = dropdown.querySelector('.dropdown-content');
                    if (content) {
                        content.style.display = content.style.display === 'block' ? 'none' : 'block';
                    }
                }
            });
        }
    });
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Show success message
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
                emailInput.focus();
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 16px 24px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                animation: slideIn 0.3s ease;
                max-width: 400px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            
            .notification.success {
                background: var(--accent, #57CC99);
            }
            
            .notification.error {
                background: #E53E3E;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Countdown Timers
function initCountdownTimers() {
    const incubationDeadline = new Date('2024-02-29T23:59:59').getTime();
    const sweepDeadline = new Date('2025-12-02T23:59:59').getTime();
    
    // Update countdowns every second
    setInterval(() => {
        updateCountdown('incubation-countdown', incubationDeadline);
        updateCountdown('sweep-countdown', sweepDeadline);
    }, 1000);
}

function updateCountdown(elementId, deadline) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const now = new Date().getTime();
    const timeLeft = deadline - now;
    
    if (timeLeft < 0) {
        element.textContent = "Application Closed";
        return;
    }
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 30) {
        element.textContent = `${days} days remaining`;
    } else if (days > 0) {
        element.textContent = `${days}d ${hours}h remaining`;
    } else {
        element.textContent = `${hours} hours remaining`;
    }
}

// Stats Counter
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number[data-count]');
    
    if (stats.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-count'));
                const suffix = stat.textContent.includes('%') ? '%' : '';
                
                animateCounter(stat, target, suffix);
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 60; // 60 frames for animation
    const duration = 1500; // 1.5 seconds
    const frameDuration = duration / 60;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, frameDuration);
}

// Active Navigation
function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // Handle active state for current page
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
        
        // Handle dropdown parent active state
        if (linkPage === 'programs.html' && 
            (currentPage === 'incubation.html' || currentPage === 'sweep.html')) {
            link.classList.add('active');
        }
    });
}


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only handle anchor links on same page
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Partners Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.partners-carousel');
    const slides = document.querySelectorAll('.partner-slide');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();
    let totalSlides = slides.length;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'dot';
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.carousel-dots .dot');
    updateDots();
    
    // Navigation functions
    function getSlidesPerView() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1200) return 2;
        return 3;
    }
    
    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth + 30; // width + gap
        const translateX = -currentIndex * slideWidth;
        carousel.style.transform = `translateX(${translateX}px)`;
        updateDots();
    }
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        const maxIndex = totalSlides - slidesPerView;
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateCarousel();
    }
    
    function nextSlide() {
        const maxIndex = totalSlides - slidesPerView;
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        } else {
            // Loop back to start
            currentIndex = 0;
            updateCarousel();
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else {
            // Loop to end
            const maxIndex = totalSlides - slidesPerView;
            currentIndex = maxIndex;
            updateCarousel();
        }
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Auto slide
    let autoSlideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-slide on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            slidesPerView = getSlidesPerView();
            goToSlide(Math.min(currentIndex, totalSlides - slidesPerView));
        }, 250);
    });
    
    // Swipe support for touch devices
    let startX = 0;
    let endX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left
            } else {
                prevSlide(); // Swipe right
            }
        }
    }
});