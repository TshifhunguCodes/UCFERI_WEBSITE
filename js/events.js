// events.js - Clean Version (Mobile menu handled by index.js)

document.addEventListener('DOMContentLoaded', function() {
    console.log('Events page initialized');
    
    // =============================================
    // Register Button Handler
    // =============================================
    const registerBtn = document.querySelector('.event-registration .btn-primary');
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('📝 Registration form would open for this event', 'info');
        });
    }

    // =============================================
    // Apply Now for Competition
    // =============================================
    const applyBtn = document.querySelector('.competition-info .btn-primary');
    if (applyBtn) {
        applyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('💰 HALT Prize Competition application form would open. Deadline: February 24, 2026', 'info');
        });
    }

    // =============================================
    // Learn More Buttons
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
    // Apply Buttons for Past Events
    // =============================================
    const applyPastBtns = document.querySelectorAll('.event-card .btn-apply');
    applyPastBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard?.querySelector('h3')?.textContent || 'Event';
            showNotification(`📝 Application for "${eventTitle}" would open`, 'info');
        });
    });

    // =============================================
    // RSVP Button for Upcoming Events
    // =============================================
    const rsvpBtns = document.querySelectorAll('.event-registration .btn-primary');
    rsvpBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const eventCard = this.closest('.featured-event-card');
            const eventTitle = eventCard?.querySelector('h3')?.textContent || 'Event';
            showNotification(`✅ RSVP for "${eventTitle}" would open`, 'success');
        });
    });

    // =============================================
    // Event Media Placeholders (Image Click)
    // =============================================
    const mediaPlaceholders = document.querySelectorAll('.event-media .media-placeholder');
    
    mediaPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            let eventName = 'Event';
            const parent = this.closest('.featured-event-card, .event-card, .competition-card');
            if (parent) {
                const title = parent.querySelector('h3')?.textContent;
                if (title) eventName = title;
            }
            showNotification(`🎬 Opening media for: ${eventName}`, 'info');
        });
    });

    // =============================================
    // Past Event Image Click (Popup)
    // =============================================
    const eventImages = document.querySelectorAll('.event-image');
    eventImages.forEach(image => {
        image.addEventListener('click', function() {
            const popupId = this.getAttribute('onclick')?.match(/openPopup\('([^']+)'\)/)?.[1];
            if (popupId) {
                const popup = document.getElementById(popupId);
                if (popup) {
                    popup.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            }
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
    // Category Tabs (if present)
    // =============================================
    const categoryTabs = document.querySelectorAll('.category-tab');
    if (categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                const eventCards = document.querySelectorAll('.event-card');
                
                // Update active tab
                categoryTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Filter events
                eventCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

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

// Close popup when clicking outside
window.onclick = function(event) {
    if (event.target.classList && event.target.classList.contains('popup')) {
        event.target.classList.remove('show');
        document.body.style.overflow = '';
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