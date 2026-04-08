// news.js - News page interactions

document.addEventListener('DOMContentLoaded', function() {
    console.log('News page initialized');

    function requestVideoFullscreen(video) {
        if (!video) return Promise.reject(new Error('Video element not found'));

        if (typeof video.requestFullscreen === 'function') {
            return video.requestFullscreen();
        }

        if (typeof video.webkitRequestFullscreen === 'function') {
            return Promise.resolve(video.webkitRequestFullscreen());
        }

        if (typeof video.webkitEnterFullscreen === 'function') {
            return Promise.resolve(video.webkitEnterFullscreen());
        }

        return Promise.reject(new Error('Fullscreen API unavailable'));
    }

    // =============================================
    // Inline Local Videos
    // =============================================
    const inlineVideos = document.querySelectorAll('.inline-news-video');

    inlineVideos.forEach(video => {
        const primeFirstFrame = () => {
            const duration = Number.isFinite(video.duration) ? video.duration : 0;
            const targetTime = Math.min(0.1, Math.max(duration - 0.1, 0));

            try {
                if (targetTime > 0 && video.currentTime < targetTime) {
                    video.currentTime = targetTime;
                }
            } catch (error) {
                console.log('Preview frame unavailable:', error);
            }
        };

        video.addEventListener('loadedmetadata', primeFirstFrame, { once: true });
        video.addEventListener('error', function() {
            const failedSrc = video.currentSrc || video.querySelector('source')?.getAttribute('src') || 'the selected video';
            showNotification(`Unable to load video: ${failedSrc}`, 'error');
        });
    });

    // Open local videos in fullscreen from the card buttons
    const playButtons = document.querySelectorAll('.play-local-video');

    playButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const newsCard = this.closest('.featured-news-card');
            const inlineVideo = newsCard?.querySelector('.inline-news-video');

            if (inlineVideo) {
                inlineVideo.scrollIntoView({ behavior: 'smooth', block: 'center' });
                inlineVideo.play()
                    .catch(() => null)
                    .finally(() => {
                        requestVideoFullscreen(inlineVideo).catch(() => {
                            showNotification('Fullscreen is unavailable here. Use the video controls to continue watching.', 'info');
                        });
                    });
            } else {
                showNotification('Video file not found. Please check the assets/video/news/ folder.', 'error');
            }
        });
    });

    // =============================================
    // Newsletter Form
    // =============================================
    const newsletterForm = document.getElementById('newsletterForm');
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
    // Hashtag Clicks
    // =============================================
    const hashtags = document.querySelectorAll('.news-hashtags span');
    hashtags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagName = this.textContent.trim();
            showNotification(`Browse news with hashtag: ${tagName}`, 'info');
        });
    });

    // =============================================
    // Social Links (Footer & Announcement Bar)
    // =============================================
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.getAttribute('aria-label') || 'social media';
            showNotification(`Opening ${platform} page`, 'info');
        });
    });

    // =============================================
    // Notification System
    // =============================================
    function showNotification(message, type) {
        const existing = document.querySelector('.news-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `news-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${escapeHtml(message)}</span>
            </div>
        `;

        if (!document.querySelector('#news-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'news-notification-styles';
            style.textContent = `
                .news-notification {
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
                .news-notification.success {
                    background: linear-gradient(135deg, #27ae60, #2ecc71);
                }
                .news-notification.error {
                    background: linear-gradient(135deg, #e74c3c, #c0392b);
                }
                .news-notification.info {
                    background: linear-gradient(135deg, #3498db, #2980b9);
                }
                .news-notification .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .news-notification i {
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
