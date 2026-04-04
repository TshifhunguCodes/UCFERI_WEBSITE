// Complete JavaScript for UCfERI Website - Clean Version

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded - initializing all components');
    
    // Initialize all components
    initHeroSlider();
    initMobileMenu();
    initDropdowns();
    initNewsletterForm();
    initActiveNavigation();
    initPartnersCarousel();
    initSmoothScrolling();
    initPopupHandlers();
    initAnnouncementBar();
});

// =============================================
// HERO SLIDER - WITH MOBILE VIDEO SUPPORT & CENTERED CONTENT
// =============================================

function initHeroSlider() {
    const heroSlides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    
    if (!heroSlides.length) return;
    
    let currentSlide = 0;
    let autoSlideInterval;
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    let userInteracted = false;

    // Track user interaction for mobile
    function handleUserInteraction() {
        if (!userInteracted) {
            userInteracted = true;
            playCurrentVideo(currentSlide);
        }
    }

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    
    function prepareVideos() {
        const videos = document.querySelectorAll('.slide-video');
        videos.forEach(video => {
            if (!video) return;
            video.muted = true;
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.preload = 'auto';
            video.load();
            
            video.addEventListener('error', function() {
                this.style.display = 'none';
                const container = this.closest('.slide-video-container');
                if (container) {
                    container.style.background = "#03224d url('assets/images/hero-banner-image3.jpeg') center/cover no-repeat";
                }
            });
        });
    }
    
    function pauseAllVideos() {
        const videos = document.querySelectorAll('.slide-video');
        videos.forEach(video => { 
            if (video && typeof video.pause === 'function') {
                video.pause();
            }
        });
    }
    
    function playCurrentVideo(index) {
        const currentSlideElement = heroSlides[index];
        if (!currentSlideElement) return;
        
        const currentVideo = currentSlideElement.querySelector('.slide-video');
        if (!currentVideo) return;
        
        if (isMobile && !userInteracted) {
            return;
        }
        
        try {
            currentVideo.muted = true;
            currentVideo.currentTime = 0;
            const playPromise = currentVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    const container = currentVideo.closest('.slide-video-container');
                    if (container) {
                        container.style.background = "#03224d url('assets/images/hero-banner-image3.jpeg') center/cover no-repeat";
                    }
                });
            }
        } catch (e) {
            console.log('Video error:', e);
        }
    }
    
    function showSlide(n) {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + heroSlides.length) % heroSlides.length;
        
        heroSlides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        
        pauseAllVideos();
        
        setTimeout(() => {
            playCurrentVideo(currentSlide);
        }, 100);
    }
    
    function nextSlide() { 
        showSlide(currentSlide + 1); 
        resetInterval();
    }
    
    function prevSlide() { 
        showSlide(currentSlide - 1); 
        resetInterval();
    }
    
    function resetInterval() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 6000);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            prevSlide(); 
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            nextSlide(); 
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => { 
            e.preventDefault(); 
            showSlide(index); 
            resetInterval();
        });
    });
    
    prepareVideos();
    showSlide(0);
    autoSlideInterval = setInterval(nextSlide, 6000);
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        heroSection.addEventListener('mouseleave', () => { 
            autoSlideInterval = setInterval(nextSlide, 6000);
        });
    }
    
    // Ensure content stays centered on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Re-apply center positioning
            const activeSlide = document.querySelector('.hero-slide.active');
            if (activeSlide) {
                const content = activeSlide.querySelector('.slide-content');
                if (content) {
                    content.style.transform = 'translate(-50%, -50%)';
                }
            }
        }, 100);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initHeroSlider();
});

// =============================================
// MOBILE MENU - SIMPLE AND CLEAN
// =============================================

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuBtn || !mobileMenu) {
        console.log('Mobile menu not found');
        return;
    }
    
    // Check if header already exists
    const existingHeader = mobileMenu.querySelector('.mobile-menu-header');
    if (!existingHeader) {
        // Create header with logo
        const header = document.createElement('div');
        header.className = 'mobile-menu-header';
        header.innerHTML = `
            <div class="mobile-logo-container">
                <img src="assets/images/logo.png" alt="Logo" class="mobile-logo-img" onerror="this.style.display='none'">
                <div class="mobile-logo-text">
                    <span class="mobile-logo-title">CEEIIC</span>
                    <span class="mobile-logo-subtitle">Student Network</span>
                </div>
            </div>
            <button class="mobile-close-btn">
                <i class="fas fa-times"></i>
            </button>
        `;
        mobileMenu.insertBefore(header, mobileMenu.firstChild);
    }
    
    // Get close button
    const closeBtn = mobileMenu.querySelector('.mobile-close-btn');
    
    // Function to open menu
    function openMenu() {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
        menuBtn.setAttribute('aria-expanded', 'true');
    }
    
    // Function to close menu
    function closeMenu() {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        menuBtn.setAttribute('aria-expanded', 'false');
        
        // Close all dropdowns
        document.querySelectorAll('.mobile-dropdown-toggle.active').forEach(toggle => {
            toggle.classList.remove('active');
            const content = toggle.nextElementSibling;
            if (content) content.classList.remove('show');
        });
    }
    
    // Toggle menu on button click
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (mobileMenu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Close menu on close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }
    
    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            closeMenu();
        }
    });
    
    // Close menu when clicking on links (optional)
    const links = mobileMenu.querySelectorAll('.header-modern__mobile-link');
    links.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(closeMenu, 300);
        });
    });
}

// =============================================
// MOBILE DROPDOWN TOGGLE
// =============================================

function initDropdowns() {
    const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        // Remove any existing onclick to prevent conflicts
        toggle.removeAttribute('onclick');
        
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle active class
            this.classList.toggle('active');
            
            // Find and toggle the dropdown content
            const content = this.nextElementSibling;
            if (content && content.classList.contains('mobile-dropdown-content')) {
                content.classList.toggle('show');
            }
        });
    });
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
    
    if (!carousel || !slides.length || !prevBtn || !nextBtn || !dotsContainer) return;
    
    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();
    let totalSlides = slides.length;
    let autoSlideInterval;
    
    function getSlidesPerView() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    }
    
    function getSlideWidth() {
        const firstSlide = slides[0];
        const style = window.getComputedStyle(firstSlide);
        const marginRight = parseFloat(style.marginRight) || 30;
        return firstSlide.offsetWidth + marginRight;
    }
    
    function updateCarousel() {
        const slideWidth = getSlideWidth();
        const translateX = -currentIndex * slideWidth;
        carousel.style.transform = `translateX(${translateX}px)`;
        updateDots();
    }
    
    function updateDots() {
        const maxIndex = Math.max(0, totalSlides - slidesPerView);
        const activeIndex = Math.min(currentIndex, maxIndex);
        const dots = document.querySelectorAll('.carousel-dots .dot');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === activeIndex);
        });
    }
    
    function goToSlide(index) {
        const maxIndex = Math.max(0, totalSlides - slidesPerView);
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateCarousel();
        resetAutoSlide();
    }
    
    function nextSlide() {
        const maxIndex = totalSlides - slidesPerView;
        currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
        updateCarousel();
        resetAutoSlide();
    }
    
    function prevSlide() {
        const maxIndex = totalSlides - slidesPerView;
        currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
        updateCarousel();
        resetAutoSlide();
    }
    
    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 8000);
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    // Create dots
    dotsContainer.innerHTML = '';
    const numberOfDots = Math.max(1, totalSlides - slidesPerView + 1);
    for (let i = 0; i < numberOfDots; i++) {
        const dot = document.createElement('button');
        dot.className = 'dot';
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', (e) => { e.preventDefault(); prevSlide(); });
    nextBtn.addEventListener('click', (e) => { e.preventDefault(); nextSlide(); });
    
    const container = document.querySelector('.partners-carousel-container');
    if (container) {
        container.addEventListener('mouseenter', stopAutoSlide);
        container.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Touch swipe
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    });
    carousel.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
        startAutoSlide();
    });
    
    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newSlidesPerView = getSlidesPerView();
            if (newSlidesPerView !== slidesPerView) {
                slidesPerView = newSlidesPerView;
                const newDotsCount = Math.max(1, totalSlides - slidesPerView + 1);
                dotsContainer.innerHTML = '';
                for (let i = 0; i < newDotsCount; i++) {
                    const dot = document.createElement('button');
                    dot.className = 'dot';
                    dot.addEventListener('click', () => goToSlide(i));
                    dotsContainer.appendChild(dot);
                }
                currentIndex = 0;
                updateCarousel();
            }
        }, 250);
    });
    
    updateCarousel();
    startAutoSlide();
}

// =============================================
// NEWSLETTER FORM
// =============================================

function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput && emailInput.value.trim()) {
            showNotification('Thank you for subscribing!', 'success');
            emailInput.value = '';
        }
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `<div class="notification-content"><i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i><span>${message}</span></div>`;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 20px;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        border-radius: 8px;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// =============================================
// ACTIVE NAVIGATION
// =============================================

function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === 'index.html' && linkPage === 'index.html')) {
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
            if (href && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// =============================================
// POPUP HANDLERS
// =============================================

function initPopupHandlers() {
    window.openPopup = function(id) {
        const popup = document.getElementById(id);
        if (popup) popup.classList.add('show');
    };
    
    window.closePopup = function(id) {
        const popup = document.getElementById(id);
        if (popup) popup.classList.remove('show');
    };
}

// =============================================
// ANNOUNCEMENT BAR
// =============================================

function initAnnouncementBar() {
    const bar = document.querySelector('.announcement-bar');
    if (!bar) return;
    
    const allowedPages = ['blog.html', 'events.html', 'news.html', 'story.html'];
    const currentPage = window.location.pathname.split('/').pop();
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && !allowedPages.includes(currentPage)) {
        bar.style.display = 'none';
    } else {
        bar.style.display = 'block';
    }
    
    window.addEventListener('resize', function() {
        const isMobileNow = window.innerWidth <= 768;
        if (isMobileNow && !allowedPages.includes(currentPage)) {
            bar.style.display = 'none';
        } else {
            bar.style.display = 'block';
        }
    });
}
