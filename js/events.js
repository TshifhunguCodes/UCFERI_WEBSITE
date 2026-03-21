// events.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                mobileMenu.style.display = 'block';
            } else {
                mobileMenu.style.display = 'none';
            }
        });
    }

    window.toggleMobileDropdown = function(button) {
        button.classList.toggle('active');
        const content = button.nextElementSibling;
        if (content) {
            content.classList.toggle('show');
        }
    };

    // Register Now button
    const registerBtn = document.querySelector('.event-registration .btn-primary');
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('📝 Registration form for Entrepreneurship Awareness Workshop (May 7, 2025) would open');
        });
    }

    // Apply Now for competition
    const applyBtn = document.querySelector('.competition-info .btn-primary');
    if (applyBtn) {
        applyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('💰 HALT Prize Competition application form would open\nDeadline: February 24, 2026');
        });
    }

    // Video placeholders
    const videoPlaceholders = document.querySelectorAll('.media-placeholder');
    
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            let eventName = 'Event video';
            const parent = this.closest('.featured-event-card, .past-event-card, .competition-card');
            if (parent) {
                const title = parent.querySelector('h3')?.textContent || 'UCFERI Event';
                eventName = title;
            }
            alert(`🎥 Video would play: ${eventName}\n(Placeholder - actual video file)`);
        });
    });

    // Watch recording links
    const watchLinks = document.querySelectorAll('.watch-link, .event-media-placeholder.small');
    watchLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const eventCard = this.closest('.past-event-card');
            const eventTitle = eventCard?.querySelector('h3')?.textContent || 'Past event';
            alert(`📼 Recording of "${eventTitle}" would open`);
        });
    });

    // Hashtag clicks
    const hashtags = document.querySelectorAll('.event-hashtags span');
    hashtags.forEach(tag => {
        tag.addEventListener('click', function() {
            alert(`🔍 Browse events with ${this.textContent}`);
        });
    });
});