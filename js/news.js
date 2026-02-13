// news.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const body = document.body;
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            body.classList.toggle('mobile-menu-active');
        });
    }

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