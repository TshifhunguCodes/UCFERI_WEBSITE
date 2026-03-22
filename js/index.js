// Complete JavaScript for UCfERI Website

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded - initializing all components');
    
    // Initialize all components
    initHeroSlider();
    initDropdowns();
    initMobileMenu();
    initNewsletterForm();
    initActiveNavigation();
    initPartnersCarousel();
    initNestedDropdowns();
    initSmoothScrolling();
    initPopupHandlers();
});

// =============================================
// HERO SLIDER - WITH VIDEO SUPPORT
// =============================================

function initHeroSlider() {
    console.log('Initializing Hero Slider...');
    
    const heroSlides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    const videos = document.querySelectorAll('.slide-video');
    
    if (!heroSlides.length) {
        console.log('No hero slides found - skipping');
        return;
    }
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    function pauseAllVideos() {
        videos.forEach(video => {
            if (video) video.pause();
        });
    }
    
    function playCurrentVideo(index) {
        const currentVideo = heroSlides[index]?.querySelector('.slide-video');
        if (currentVideo) {
            currentVideo.play().catch(e => console.log('Video autoplay failed:', e));
        }
    }
    
    function showSlide(n) {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + heroSlides.length) % heroSlides.length;
        
        heroSlides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        
        pauseAllVideos();
        playCurrentVideo(currentSlide);
        
        console.log('Showing slide:', currentSlide + 1);
    }
    
    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }
    
    function resetInterval() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
            resetInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
            resetInterval();
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            showSlide(index);
            resetInterval();
        });
    });
    
    // Auto slide
    autoSlideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        heroSection.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Touch swipe for mobile
    let touchStartX = 0;
    heroSection?.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
    heroSection?.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) { nextSlide(); resetInterval(); }
        if (touchEndX > touchStartX + threshold) { prevSlide(); resetInterval(); }
    });
    
    showSlide(0);
}

// =============================================
// MOBILE MENU
// =============================================

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuBtn || !mobileMenu) return;
    
    menuBtn.addEventListener('click', function() {
        const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !expanded);
        mobileMenu.setAttribute('aria-hidden', expanded);
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            menuBtn.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
        }
    });
    
    document.addEventListener('click', function(event) {
        if (!menuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
            menuBtn.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
        }
    });
}

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
// NESTED DROPDOWNS (Mobile)
// =============================================

function initNestedDropdowns() {
    const nestedDropdowns = document.querySelectorAll('.nested-dropdown');
    
    if (window.innerWidth <= 768) {
        nestedDropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.nested-dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropdown.classList.toggle('active');
                });
            }
        });
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nestedDropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
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
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
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
            .notification.success { background: #57CC99; }
            .notification.error { background: #E53E3E; }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
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
        
        if (linkPage === currentPage || 
            (currentPage === 'index.html' && linkPage === 'index.html') ||
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
        
        if (linkPage === 'programs.html' && 
            (currentPage === 'incubation.html' || currentPage === 'sweep.html')) {
            link.classList.add('active');
        }
    });
}

// =============================================
// SMOOTH SCROLLING
// =============================================

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
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
}

// =============================================
// POPUP HANDLERS
// =============================================

function initPopupHandlers() {
    window.openPopup = function(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) popup.classList.add('show');
    };
    
    window.closePopup = function(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) popup.classList.remove('show');
    };
    
    window.onclick = function(event) {
        if (event.target.classList.contains('popup')) {
            event.target.classList.remove('show');
        }
    };
}

// =============================================
// PARTNERS CAROUSEL
// =============================================

function initPartnersCarousel() {
    const carousel = document.querySelector('.partners-carousel');
    const slides = document.querySelectorAll('.partner-slide');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (!carousel || !slides.length || !prevBtn || !nextBtn || !dotsContainer) {
        console.log('Partners carousel not found - skipping');
        return;
    }
    
    console.log('Initializing Partners Carousel...');
    
    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();
    let totalSlides = slides.length;
    
    dotsContainer.innerHTML = '';
    
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'dot';
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.carousel-dots .dot');
    
    function getSlidesPerView() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1200) return 2;
        return 3;
    }
    
    function updateCarousel() {
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
        currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
        updateCarousel();
    }
    
    function prevSlide() {
        const maxIndex = totalSlides - slidesPerView;
        currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', (e) => { e.preventDefault(); prevSlide(); });
    nextBtn.addEventListener('click', (e) => { e.preventDefault(); nextSlide(); });
    
    let autoSlideInterval = setInterval(nextSlide, 5000);
    
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carousel.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            slidesPerView = getSlidesPerView();
            goToSlide(currentIndex);
        }, 250);
    });
    
    let startX = 0;
    carousel.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
    carousel.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? nextSlide() : prevSlide();
        }
    });
    
    goToSlide(0);
}

document.addEventListener('DOMContentLoaded', function() {
    // Pages where announcement bar should show on mobile
    const allowedPages = ['blog.html', 'events.html', 'news.html', 'story.html'];
    
    const currentPage = window.location.pathname.split('/').pop();
    const isMobile = window.innerWidth <= 768;
    
    // On mobile, show only on allowed pages
    if (isMobile && allowedPages.includes(currentPage)) {
        const announcementBar = document.querySelector('.announcement-bar');
        if (announcementBar) {
            announcementBar.style.display = 'block';
        }
    }
    
    // Handle window resize (if user rotates device)
    window.addEventListener('resize', function() {
        const isNowMobile = window.innerWidth <= 768;
        const announcementBar = document.querySelector('.announcement-bar');
        
        if (announcementBar) {
            if (!isNowMobile) {
                // On desktop - always show
                announcementBar.style.display = 'block';
            } else {
                // On mobile - only show on allowed pages
                if (allowedPages.includes(currentPage)) {
                    announcementBar.style.display = 'block';
                } else {
                    announcementBar.style.display = 'none';
                }
            }
        }
    });
});