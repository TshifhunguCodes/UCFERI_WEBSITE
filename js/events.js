// events.js - Updated for restructured events page

(function() {
    // Hero Video Handling
    const heroVideo = document.querySelector('.hero-video');
    const heroContainer = document.querySelector('.hero-video-container');

    if (heroVideo && heroContainer) {
        const markReady = function() {
            heroContainer.classList.add('is-video-ready');
        };

        const attemptPlay = function() {
            heroVideo.muted = true;
            heroVideo.defaultMuted = true;
            heroVideo.setAttribute('playsinline', '');
            heroVideo.setAttribute('webkit-playsinline', '');

            const playPromise = heroVideo.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(function() {});
            }
        };

        heroVideo.addEventListener('playing', markReady);
        window.addEventListener('load', attemptPlay, { once: true });
        
        ['touchstart', 'click', 'scroll'].forEach(function(eventName) {
            window.addEventListener(eventName, attemptPlay, { once: true, passive: true });
        });

        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) attemptPlay();
        });
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    console.log('Events page initialized');

    // =============================================
    // Register Button Handler for Upcoming Events
    // =============================================
    const registerBtns = document.querySelectorAll('.upcoming-event-card .btn-primary');
    registerBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const eventCard = this.closest('.upcoming-event-card');
            const eventTitle = eventCard?.querySelector('h3')?.textContent || 'Event';
            showNotification(`📝 Registration for "${eventTitle}" would open`, 'success');
        });
    });

    // =============================================
    // Learn More Buttons for Past Events
    // =============================================
    const learnMoreBtns = document.querySelectorAll('.btn-learn');
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard?.querySelector('h3')?.textContent || 'Event';
            showNotification(`📋 More information about "${eventTitle}" would open`, 'info');
        });
    });

    // =============================================
    // Hashtag Clicks
    // =============================================
    const hashtags = document.querySelectorAll('.event-hashtags span');
    hashtags.forEach(tag => {
        tag.addEventListener('click', function() {
            showNotification(`🔍 Browse events with ${this.textContent}`, 'info');
        });
    });

    // =============================================
    // Newsletter Form Handler
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
    // Smooth Scroll for Anchor Links
    // =============================================
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
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

    // =============================================
    // Active Navigation Link
    // =============================================
    const currentPage = window.location.pathname.split('/').pop() || 'events.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
});

// =============================================
// Popup Functions (Global)
// =============================================
window.openPopup = function(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.add('show');
        if (typeof window.lockBodyScroll === 'function') window.lockBodyScroll();
        else document.body.style.overflow = 'hidden';
    }
};

window.closePopup = function(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.remove('show');
        if (typeof window.unlockBodyScroll === 'function') window.unlockBodyScroll();
        else document.body.style.overflow = '';
    }
};

// Close popup when clicking outside
window.onclick = function(event) {
    if (event.target.classList && event.target.classList.contains('popup')) {
        event.target.classList.remove('show');
        if (typeof window.unlockBodyScroll === 'function') window.unlockBodyScroll();
        else document.body.style.overflow = '';
    }
};

// =============================================
// Mobile Dropdown Toggle (for header compatibility)
// =============================================
window.toggleMobileDropdown = function(button) {
    button.classList.toggle('active');
    const dropdownContent = button.nextElementSibling;
    if (dropdownContent && dropdownContent.classList.contains('mobile-dropdown-content')) {
        dropdownContent.classList.toggle('show');
    }
};

// =============================================
// Notification System
// =============================================
function showNotification(message, type) {
    // Remove existing notification
    const existing = document.querySelector('.event-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `event-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${escapeHtml(message)}</span>
        </div>
    `;

    // Add styles if not exists
    if (!document.querySelector('#event-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'event-notification-styles';
        style.textContent = `
            .event-notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 14px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                font-size: 0.9rem;
            }
            .event-notification.success {
                background: linear-gradient(135deg, #27ae60, #2ecc71);
            }
            .event-notification.error {
                background: linear-gradient(135deg, #e74c3c, #c0392b);
            }
            .event-notification.info {
                background: linear-gradient(135deg, #3498db, #2980b9);
            }
            .event-notification .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .event-notification i {
                font-size: 1.2rem;
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
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}