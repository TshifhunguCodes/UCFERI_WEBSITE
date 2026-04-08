// story.js - Success Stories Page Interactions

document.addEventListener('DOMContentLoaded', function() {
    console.log('Success Stories page initialized');

    // =============================================
    // Video Placeholder Handling
    // =============================================
    const videoPlaceholders = document.querySelectorAll('.story-media-placeholder--video');
    
    videoPlaceholders.forEach(placeholder => {
        const video = placeholder.querySelector('video');
        if (video && (!video.src || video.src === '')) {
            // Video placeholder is empty - show click to add functionality
            placeholder.addEventListener('click', function(e) {
                if (e.target !== video) {
                    showNotification('📹 Video placeholder ready. Add your video file path to the src attribute.', 'info');
                }
            });
        }
    });

    // =============================================
    // Image Placeholder Handling
    // =============================================
    const imagePlaceholders = document.querySelectorAll('.story-media-placeholder--feature, .story-media-placeholder--gallery');
    
    imagePlaceholders.forEach(placeholder => {
        const img = placeholder.querySelector('img');
        if (img && (!img.src || img.src === '' || img.src.includes('null'))) {
            placeholder.addEventListener('click', function(e) {
                if (e.target !== img) {
                    showNotification('🖼️ Image placeholder ready. Add your image file path to the src attribute.', 'info');
                }
            });
        }
    });

    // =============================================
    // Story Link Cards - External Links
    // =============================================
    const storyLinks = document.querySelectorAll('.story-link-card');
    storyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('http')) {
                // External link - allow default behavior
                console.log('Opening external link:', href);
            } else if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // =============================================
    // Quote Interactions
    // =============================================
    const quotes = document.querySelectorAll('.story-quote, .entrepreneur-quote');
    quotes.forEach(quote => {
        quote.addEventListener('click', function() {
            const quoteText = this.querySelector('p')?.textContent || '';
            if (quoteText) {
                showNotification('💬 Inspiring words from our entrepreneur!', 'info');
            }
        });
    });

    // =============================================
    // Tag Clicks
    // =============================================
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagName = this.textContent.trim();
            showNotification(`🔍 Showing stories tagged with "${tagName}"`, 'info');
        });
    });

    // =============================================
    // CTA Buttons
    // =============================================
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const btnText = this.querySelector('i')?.nextSibling?.textContent?.trim() || this.textContent.trim();
            showNotification(`✨ ${btnText} - Let's start your journey!`, 'success');
        });
    });

    // =============================================
    // How We Help Steps - Interactive
    // =============================================
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.addEventListener('click', function() {
            const stepNumber = this.querySelector('.step-number')?.textContent || '';
            const stepTitle = this.querySelector('h3')?.textContent || '';
            showNotification(`📌 Step ${stepNumber}: ${stepTitle} - Learn more about our support`, 'info');
        });
    });

    // =============================================
    // Stat Cards Animation on Hover
    // =============================================
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const number = this.querySelector('h3')?.textContent || '';
            if (number) {
                // Optional: Add animation effect
                this.style.transform = 'translateY(-5px)';
            }
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // =============================================
    // Newsletter Form (if exists in footer)
    // =============================================
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput ? emailInput.value.trim() : '';
            
            if (email && /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email)) {
                showNotification('Thank you for subscribing!', 'success');
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
            if (href && href !== '#' && href.startsWith('#')) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
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
    // Notification System
    // =============================================
    function showNotification(message, type) {
        const existing = document.querySelector('.story-notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `story-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${escapeHtml(message)}</span>
            </div>
        `;
        
        if (!document.querySelector('#story-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'story-notification-styles';
            style.textContent = `
                .story-notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    padding: 14px 20px;
                    border-radius: 12px;
                    color: white;
                    font-weight: 500;
                    z-index: 10000;
                    animation: slideInRight 0.3s ease;
                    max-width: 400px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    font-size: 0.9rem;
                }
                .story-notification.success {
                    background: linear-gradient(135deg, #27ae60, #2ecc71);
                }
                .story-notification.error {
                    background: linear-gradient(135deg, #e74c3c, #c0392b);
                }
                .story-notification.info {
                    background: linear-gradient(135deg, #3498db, #2980b9);
                }
                .story-notification .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .story-notification i {
                    font-size: 1.2rem;
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
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
});