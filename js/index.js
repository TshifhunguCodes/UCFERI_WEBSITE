// Complete JavaScript for UCfERI Website

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded - initializing all components');
    
    // Initialize Mobile Navigation (commented out - uncomment if needed)
    // initMobileNavigation();
    
    // Initialize Hero Slider
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
    
    // Initialize Partners Carousel (only on pages where it exists)
    initPartnersCarousel();
});

// =============================================
// HERO SLIDER - FULLY FUNCTIONAL
// =============================================

function initHeroSlider() {
    console.log('Initializing Hero Slider...');
    
    const heroSlides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    
    // Exit if no slides found
    if (!heroSlides.length) {
        console.log('No hero slides found - skipping');
        return;
    }
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    // Function to show specific slide
    function showSlide(n) {
        // Remove active class from all slides and dots
        heroSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Calculate new index (wrap around)
        currentSlide = (n + heroSlides.length) % heroSlides.length;
        
        // Add active class to current slide and dot
        heroSlides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
        
        console.log('Showing slide:', currentSlide + 1);
    }
    
    // Next slide function
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Previous slide function
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Event listeners for buttons
    if (prevBtn) {
        prevBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            prevSlide();
        };
    }
    
    if (nextBtn) {
        nextBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
        };
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            showSlide(index);
        };
    });
    
    // Clear any existing interval
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    
    // Auto slide every 3 seconds
    autoSlideInterval = setInterval(nextSlide, 3000);
    
    // Pause on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', function() {
            clearInterval(autoSlideInterval);
        });
        
        heroSection.addEventListener('mouseleave', function() {
            autoSlideInterval = setInterval(nextSlide, 3000);
        });
    }
    
    // Show first slide
    showSlide(0);
}

// =============================================
// MOBILE NAVIGATION - COMMENTED OUT (UNCOMMENT IF NEEDED)
// =============================================

/*
function initMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (mobileToggle && navMenu && hamburger) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            const spans = hamburger.querySelectorAll('span');
            if (spans.length >= 3) {
                if (navMenu.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                if (spans.length >= 3) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    }
}
*/

// =============================================
// DROPDOWN MENUS
// =============================================

function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        // Desktop hover
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

// =============================================
// NEWSLETTER FORM
// =============================================

function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
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
    anchor.addEventListener('click', function(e) {
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
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        prevSlide();
    });
    
    nextBtn.addEventListener('click', function(e) {
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