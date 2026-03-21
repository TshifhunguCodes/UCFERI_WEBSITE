// news.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
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

    // Video placeholders
    const videoPlaceholders = document.querySelectorAll('.media-placeholder.video');
    
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            let videoInfo = 'UCFERI Video';
            const caption = this.querySelector('.media-caption');
            const youtubeLink = this.querySelector('.youtube-link');
            
            if (caption) videoInfo = caption.textContent;
            if (youtubeLink) videoInfo += `\n🔗 ${youtubeLink.textContent}`;
            
            alert(`🎥 Video would play: ${videoInfo}\n(Placeholder - actual video file would be inserted)`);
        });
    });

    // Watch buttons
    const watchButtons = document.querySelectorAll('.btn-primary i.fa-play')?.forEach(btn => {
        btn.parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Opening SABC SME OnPoint discussion video');
        });
    });

    // Apply Now button for competition
    const applyBtn = document.querySelector('.btn-primary.btn-small');
    if (applyBtn) {
        applyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Application form for HALT Prize Competition would open');
        });
    }

    // Load more button
    const loadMoreBtn = document.querySelector('.load-more .btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            alert('📰 More news articles would load');
        });
    }

    // Hashtag clicks
    const hashtags = document.querySelectorAll('.news-hashtags span');
    hashtags.forEach(tag => {
        tag.addEventListener('click', function() {
            alert(`🔍 Browse news with hashtag: ${this.textContent}`);
        });
    });
});