// blog.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (shared functionality)
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

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.dataset.filter;

            // Filter cards
            blogCards.forEach(card => {
                const categories = card.dataset.category || '';
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Video placeholders click
    const videoPlaceholders = document.querySelectorAll('.media-placeholder.video');
    
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            let videoTitle = 'UCFERI Video';
            const caption = this.querySelector('.media-caption');
            if (caption) videoTitle = caption.textContent;
            
            alert(`🎬 Video would play here: ${videoTitle}\n(Placeholder - actual video file would be inserted)`);
        });
    });

    // Load more button
    const loadMoreBtn = document.querySelector('.load-more .btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            alert('📚 More blog posts would load via pagination or AJAX');
        });
    }

    // Hashtag clicks
    const hashtags = document.querySelectorAll('.featured-hashtags span, .card-hashtags span');
    hashtags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagText = this.textContent;
            alert(`🔍 Filtering posts by hashtag: ${tagText}`);
        });
    });
});