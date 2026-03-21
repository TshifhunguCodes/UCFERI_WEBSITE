// CEEIIC Programs Page - Clean JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Mobile Menu Toggle
    // =============================================
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.setAttribute('aria-hidden', isExpanded);
            mobileMenu.style.display = isExpanded ? 'none' : 'block';
        });
    }

    // Mobile Dropdown Toggle (Exposed globally for inline onclick)
    window.toggleMobileDropdown = function(button) {
        button.classList.toggle('active');
        const content = button.nextElementSibling;
        if (content) {
            content.classList.toggle('show');
        }
    };

    // =============================================
    // Hero Slider (if exists on page)
    // =============================================
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
            currentSlide = index;
        }

        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }

        function prevSlide() {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prev);
        }

        function startInterval() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        // Event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlide();
                resetInterval();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlide();
                resetInterval();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
                resetInterval();
            });
        });

        // Start auto-slide
        startInterval();

        // Pause on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
            heroSection.addEventListener('mouseleave', startInterval);
        }
    }

    // =============================================
    // Smooth Scroll for Anchor Links
    // =============================================
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offset = 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - offset,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.style.display === 'block') {
                    mobileMenu.style.display = 'none';
                    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // =============================================
    // Form Submission
    // =============================================
    const programForm = document.getElementById('programApplication');
    if (programForm) {
        programForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success notification
            showNotification('Thank you for your application! We will contact you soon.', 'success');
            this.reset();
        });
    }

    // =============================================
    // Newsletter Form (if exists)
    // =============================================
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput ? emailInput.value.trim() : '';
            
            if (email && /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email)) {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
            } else {
                showNotification('Please enter a valid email address.', 'error');
                emailInput?.focus();
            }
        });
    }

    // =============================================
    // Notification System
    // =============================================
    function showNotification(message, type) {
        // Remove existing notification
        const existing = document.querySelector('.form-notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${escapeHtml(message)}</span>
            </div>
        `;
        
        // Add styles if not exists
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .form-notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    padding: 16px 24px;
                    border-radius: 12px;
                    color: white;
                    font-weight: 500;
                    z-index: 10000;
                    animation: slideInRight 0.3s ease;
                    max-width: 400px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
                .form-notification.success {
                    background: linear-gradient(135deg, #27ae60, #2ecc71);
                }
                .form-notification.error {
                    background: linear-gradient(135deg, #e74c3c, #c0392b);
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
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
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // =============================================
    // Active Nav Link Based on Current Page
    // =============================================
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || 
            (currentPath === 'index.html' && href === 'index.html') ||
            (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // =============================================
    // Animate elements on scroll
    // =============================================
    const animateElements = document.querySelectorAll('.open-card, .program-detailed, .activities-card, .outcomes-card, .sustainability-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
    
    animateElements.forEach(el => animationObserver.observe(el));
    
    // =============================================
    // Program Card Toggle (for mobile collapsible details)
    // =============================================
    const programHeaders = document.querySelectorAll('.program-header-compact');
    
    programHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const parent = this.closest('.program-detailed');
            if (window.innerWidth <= 768) {
                parent.classList.toggle('expanded');
            }
        });
    });
});

// =============================================
// Helper Functions (Exposed globally)
// =============================================

// Close popup if exists
window.closePopup = function(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
};

// Open popup if exists
window.openPopup = function(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
};