// blog.js - Video Modal ONLY for Featured Post

document.addEventListener('DOMContentLoaded', function() {
    console.log('Blog page initialized');

    const featuredVideo = document.querySelector('.inline-featured-video');

    if (featuredVideo) {
        const primeFirstFrame = () => {
            const duration = Number.isFinite(featuredVideo.duration) ? featuredVideo.duration : 0;
            const targetTime = Math.min(0.1, Math.max(duration - 0.1, 0));

            try {
                if (targetTime > 0 && featuredVideo.currentTime < targetTime) {
                    featuredVideo.currentTime = targetTime;
                }
            } catch (error) {
                console.log('Featured frame unavailable:', error);
            }
        };

        featuredVideo.addEventListener('loadedmetadata', primeFirstFrame, { once: true });
        featuredVideo.addEventListener('error', function() {
            showNotification('Featured interview video could not be loaded. Please check the file path.', 'error');
        });
    }

    // Video Modal Elements (ONLY for featured Dr. Mlu Ganto video)
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalVideoSource = document.getElementById('modalVideoSource');
    const modalTitle = document.getElementById('videoModalTitle');
    const closeBtn = document.querySelector('.video-modal-close');

    function openVideoModal(videoSrc, videoTitle) {
        if (!modal || !modalVideo || !modalVideoSource) return;
        
        modalVideoSource.src = videoSrc;
        modalVideo.load();
        modalTitle.textContent = videoTitle || 'UCFERI Video';
        modal.style.display = 'flex';
        
        modalVideo.play().catch(e => console.log('Autoplay prevented:', e));
    }

    function closeVideoModal() {
        if (modal) {
            modal.style.display = 'none';
            if (modalVideo) {
                modalVideo.pause();
                modalVideoSource.src = '';
                modalVideo.load();
            }
        }
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeVideoModal);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeVideoModal();
            }
        });
    }

    // ONLY Featured Video Triggers (Dr. Mlu Ganto)
    const featuredWatchButton = document.querySelector('.featured-content .btn-primary.watch-video-btn');

    if (featuredWatchButton) {
        featuredWatchButton.addEventListener('click', function(e) {
            e.preventDefault();
            const videoSrc = this.getAttribute('data-video-src');
            const videoTitle = this.getAttribute('data-video-title');
            if (videoSrc) {
                openVideoModal(videoSrc, videoTitle);
            } else {
                showNotification('Video coming soon!', 'info');
            }
        });
    }

    // Read More Links for Blog Cards (Static navigation, no video)
    const readMoreLinks = document.querySelectorAll('.blog-card .read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const blogTitle = this.closest('.blog-card')?.querySelector('h3')?.textContent || 'Blog post';
            showNotification(`📖 Opening article: "${blogTitle}"`, 'info');
        });
    });

    // Tag Clicks
    const tags = document.querySelectorAll('.card-tags span, .featured-hashtags span');
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagName = this.textContent.trim();
            showNotification(`🔍 Showing posts tagged with "${tagName}"`, 'info');
        });
    });

    // Newsletter Form
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

    // Load More Button
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        let currentPage = 1;
        loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            currentPage++;
            showNotification(`Loading more articles... (Page ${currentPage})`, 'info');
        });
    }

    // Notification System
    function showNotification(message, type) {
        const existing = document.querySelector('.blog-notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `blog-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${escapeHtml(message)}</span>
            </div>
        `;
        
        if (!document.querySelector('#blog-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'blog-notification-styles';
            style.textContent = `
                .blog-notification {
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
                .blog-notification.success {
                    background: linear-gradient(135deg, #27ae60, #2ecc71);
                }
                .blog-notification.error {
                    background: linear-gradient(135deg, #e74c3c, #c0392b);
                }
                .blog-notification.info {
                    background: linear-gradient(135deg, #3498db, #2980b9);
                }
                .blog-notification .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .blog-notification i {
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
