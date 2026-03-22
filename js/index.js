// Complete JavaScript for UCfERI Website - Clean Version

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
    initAnnouncementBar();
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
// MOBILE MENU - Centered Panel with Overlay
// =============================================

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuBtn || !mobileMenu) return;
    
    // Create overlay element if not exists
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
    }
    
    // Add close button to mobile menu if not exists
    if (!mobileMenu.querySelector('.menu-close-btn')) {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'menu-close-btn';
        closeBtn.setAttribute('aria-label', 'Close menu');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        mobileMenu.insertBefore(closeBtn, mobileMenu.firstChild);
        
        closeBtn.addEventListener('click', function() {
            closeMenu();
        });
    }
    
    function openMenu() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        menuBtn.setAttribute('aria-expanded', 'true');
    }
    
    function closeMenu() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        menuBtn.setAttribute('aria-expanded', 'false');
        
        // Close all open dropdowns when closing menu
        document.querySelectorAll('.mobile-dropdown-toggle.active').forEach(toggle => {
            toggle.classList.remove('active');
            const content = toggle.nextElementSibling;
            if (content) {
                content.classList.remove('show');
            }
        });
    }
    
    // Toggle menu on button click
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = mobileMenu.classList.contains('active');
        isOpen ? closeMenu() : openMenu();
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', closeMenu);
    
    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Close menu on window resize if desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024 && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Close menu when clicking on a link (optional)
    const mobileLinks = document.querySelectorAll('.header-modern__mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                setTimeout(closeMenu, 300);
            }
        });
    });
}

// =============================================
// DROPDOWN MENUS
// =============================================
// Mobile Menu JavaScript - Fixed Menu, Stays Open When Clicking Options

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
});

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuBtn || !mobileMenu) return;
    
    // Add header with close button if not exists
    if (!mobileMenu.querySelector('.mobile-menu-header')) {
        const menuHeader = document.createElement('div');
        menuHeader.className = 'mobile-menu-header';
        menuHeader.innerHTML = `
            <h3>MENU</h3>
            <button class="mobile-close-btn" aria-label="Close menu">
                <i class="fas fa-times"></i>
            </button>
        `;
        mobileMenu.insertBefore(menuHeader, mobileMenu.firstChild);
        
        const closeBtn = menuHeader.querySelector('.mobile-close-btn');
        closeBtn.addEventListener('click', closeMenu);
    }
    
    function openMenu() {
        mobileMenu.classList.add('open');
        menuBtn.setAttribute('aria-expanded', 'true');
    }
    
    function closeMenu() {
        mobileMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        
        // Close all open dropdowns when closing menu
        document.querySelectorAll('.mobile-dropdown-toggle.active').forEach(toggle => {
            toggle.classList.remove('active');
            const content = toggle.nextElementSibling;
            if (content) {
                content.classList.remove('show');
            }
        });
    }
    
    // Toggle menu on button click
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = mobileMenu.classList.contains('open');
        isOpen ? closeMenu() : openMenu();
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            closeMenu();
        }
    });
    
    // Close menu on window resize if desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && mobileMenu.classList.contains('open')) {
            closeMenu();
        }
    });
}

// Mobile Dropdown Toggle Function - Does NOT close menu
window.toggleMobileDropdown = function(button) {
    button.classList.toggle('active');
    const content = button.nextElementSibling;
    if (content) {
        content.classList.toggle('show');
    }
};

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
            <span>${escapeHtml(message)}</span>
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
            .notification.success { background: #27ae60; }
            .notification.error { background: #e74c3c; }
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

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const offset = 100;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: targetPosition - offset,
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
        if (popup) {
            popup.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    };
    
    window.closePopup = function(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.remove('show');
            document.body.style.overflow = '';
        }
    };
    
    window.onclick = function(event) {
        if (event.target.classList && event.target.classList.contains('popup')) {
            event.target.classList.remove('show');
            document.body.style.overflow = '';
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

// =============================================
// ANNOUNCEMENT BAR - Mobile Visibility Control
// =============================================

function initAnnouncementBar() {
    const allowedPages = ['blog.html', 'events.html', 'news.html', 'story.html'];
    const currentPage = window.location.pathname.split('/').pop();
    const announcementBar = document.querySelector('.announcement-bar');
    
    if (!announcementBar) return;
    
    function updateAnnouncementVisibility() {
        const isMobile = window.innerWidth <= 768;
        
        if (!isMobile) {
            // Desktop - always show
            announcementBar.style.display = 'block';
        } else {
            // Mobile - only show on allowed pages
            if (allowedPages.includes(currentPage)) {
                announcementBar.style.display = 'block';
            } else {
                announcementBar.style.display = 'none';
            }
        }
    }
    
    // Initial update
    updateAnnouncementVisibility();
    
    // Handle window resize
    window.addEventListener('resize', updateAnnouncementVisibility);
}