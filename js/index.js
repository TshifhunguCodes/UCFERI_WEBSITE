// Complete JavaScript for UCfERI Website

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded - initializing all components');

    // Initialize Mobile Navigation (commented out - uncomment if needed)
    // initMobileNavigation();

    // Initialize Hero Slider
    initHeroSlider();

    // Initialize Stats Counter
    initStatsCounter();

    // Initialize Active Navigation
    initActiveNavigation();

    // Initialize Partners Carousel (only on pages where it exists)
    initPartnersCarousel();
});

// =============================================
// HERO SLIDER - FULLY FUNCTIONAL
// =============================================

// =============================================
// NEWSLETTER FORM
// =============================================

function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            if (!emailInput) return;

            const email = emailInput.value.trim();

            if (validateEmail(email)) {
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

// =============================================
// NOTIFICATION SYSTEM
// =============================================

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

// =============================================
// COUNTDOWN TIMERS
// =============================================

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

// =============================================
// STATS COUNTER
// =============================================

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
    const increment = target / 60;
    const frameDuration = 1500 / 60;

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

// =============================================
// ACTIVE NAVIGATION
// =============================================

function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (!linkPage) return;

        // Handle active state for current page
        if (linkPage === currentPage ||
            (currentPage === 'index.html' && linkPage === 'index.html') ||
            (currentPage === '' && linkPage === 'index.html')) {
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

// =============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// =============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Only handle anchor links on same page
        if (href && href.startsWith('#') && href.length > 1) {
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

// =============================================
// PARTNERS CAROUSEL - FIXED (SINGLE INSTANCE)
// =============================================

function initPartnersCarousel() {
    const carousel = document.querySelector('.partners-carousel');
    const slides = document.querySelectorAll('.partner-slide');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    // CHECK IF CAROUSEL EXISTS ON THIS PAGE
    if (!carousel || !slides.length || !prevBtn || !nextBtn || !dotsContainer) {
        console.log('Partners carousel not found on this page - skipping');
        return;
    }

    console.log('Initializing Partners Carousel...');

    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();
    let totalSlides = slides.length;

    // Clear existing dots
    dotsContainer.innerHTML = '';

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'dot';
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dots .dot');

    // Navigation functions
    function getSlidesPerView() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1200) return 2;
        return 3;
    }

    function updateCarousel() {
        if (!slides.length) return;
        const slideWidth = slides[0].offsetWidth + 30;
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
        const maxIndex = Math.max(0, totalSlides - slidesPerView);
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateCarousel();
    }

    function nextSlide() {
        const maxIndex = totalSlides - slidesPerView;
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            const maxIndex = totalSlides - slidesPerView;
            currentIndex = maxIndex;
        }
        updateCarousel();
    }

    // Event listeners
    prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        prevSlide();
    });

    nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        nextSlide();
    });

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
            goToSlide(currentIndex);
        }, 250);
    });

    // Swipe support for touch devices
    let startX = 0;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });

    // Initialize first slide
    goToSlide(0);
}

// =============================================
// END OF JAVASCRIPT
// =============================================