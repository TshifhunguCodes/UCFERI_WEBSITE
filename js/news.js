// news.js - Clean Version (Mobile menu handled by index.js)

document.addEventListener('DOMContentLoaded', function() {
    console.log('News page initialized');
    
    // =============================================
    // Read More / Full Story Buttons
    // =============================================
    const readMoreBtns = document.querySelectorAll('.read-more, .btn-read-more, .full-story-btn');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const newsCard = this.closest('.news-card, .article-card, .post-card');
            const newsTitle = newsCard?.querySelector('h2, h3')?.textContent || 'News article';
            showNotification(`📖 Reading full story: "${newsTitle}"`, 'info');
        });
    });

    // =============================================
    // Video Placeholders
    // =============================================
    const videoPlaceholders = document.querySelectorAll('.media-placeholder.video, .video-thumbnail');
    
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            let videoInfo = 'UCFERI Video';
            const caption = this.querySelector('.media-caption');
            const youtubeLink = this.querySelector('.youtube-link');
            const parentCard = this.closest('.news-card, .article-card');
            const newsTitle = parentCard?.querySelector('h2, h3')?.textContent;
            
            if (caption) videoInfo = caption.textContent;
            if (newsTitle) videoInfo = newsTitle;
            if (youtubeLink) videoInfo += `\n🔗 Watch on YouTube: ${youtubeLink.textContent}`;
            
            showNotification(`🎬 Playing video: ${videoInfo}`, 'info');
        });
    });

    // =============================================
    // Watch/Play Buttons
    // =============================================
    const watchButtons = document.querySelectorAll('.watch-btn, .play-btn, .btn-play');
    watchButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const parentCard = this.closest('.news-card, .article-card');
            const newsTitle = parentCard?.querySelector('h2, h3')?.textContent || 'News video';
            showNotification(`🎬 Playing video: ${newsTitle}`, 'info');
        });
    });

    // =============================================
    // Apply Now / Register Buttons
    // =============================================
    const applyBtns = document.querySelectorAll('.btn-apply, .btn-register, .competition-apply');
    applyBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const parentCard = this.closest('.news-card, .article-card, .competition-card');
            const eventTitle = parentCard?.querySelector('h2, h3')?.textContent || 'Event';
            showNotification(`📝 Application form for "${eventTitle}" would open`, 'info');
        });
    });

    // =============================================
    // Category Filter
    // =============================================
    const categoryLinks = document.querySelectorAll('.category-filter a, .news-category');
    const newsCards = document.querySelectorAll('.news-card, .article-card');
    
    if (categoryLinks.length > 0 && newsCards.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-category') || this.textContent.trim().toLowerCase();
                
                // Update active state
                categoryLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Filter news cards
                let visibleCount = 0;
                newsCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category')?.toLowerCase() || '';
                    const cardTags = Array.from(card.querySelectorAll('.news-tag, .tag')).map(t => t.textContent.toLowerCase());
                    
                    let matchesCategory = false;
                    
                    if (category === 'all' || category === 'all news') {
                        matchesCategory = true;
                    } else if (cardCategory === category) {
                        matchesCategory = true;
                    } else if (cardTags.includes(category)) {
                        matchesCategory = true;
                    }
                    
                    if (matchesCategory) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                        visibleCount++;
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
                
                if (visibleCount === 0 && category !== 'all') {
                    showNotification(`No news found in "${category}" category`, 'info');
                }
            });
        });
    }

    // =============================================
    // Search Functionality
    // =============================================
    const searchInput = document.querySelector('.news-search-input, #search-input');
    const searchBtn = document.querySelector('.news-search-btn, #search-btn');
    
    function performNewsSearch() {
        if (!searchInput) return;
        
        const searchTerm = searchInput.value.trim().toLowerCase();
        let foundCount = 0;
        
        newsCards.forEach(card => {
            const title = card.querySelector('h2, h3')?.textContent.toLowerCase() || '';
            const excerpt = card.querySelector('.excerpt, .news-excerpt')?.textContent.toLowerCase() || '';
            const content = card.querySelector('.news-content')?.textContent.toLowerCase() || '';
            const tags = Array.from(card.querySelectorAll('.news-tag, .tag')).map(t => t.textContent.toLowerCase()).join(' ');
            
            if (searchTerm === '' || title.includes(searchTerm) || excerpt.includes(searchTerm) || content.includes(searchTerm) || tags.includes(searchTerm)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
                foundCount++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        if (searchTerm !== '' && foundCount === 0) {
            showNotification(`No news found matching "${searchTerm}"`, 'info');
        }
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            performNewsSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performNewsSearch();
            }
        });
    }

    // =============================================
    // Load More / Pagination
    // =============================================
    const loadMoreBtn = document.querySelector('.load-more-btn, .load-more .btn, #load-more');
    if (loadMoreBtn) {
        let currentPage = 1;
        const itemsPerPage = 6;
        
        loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            currentPage++;
            showNotification(`📰 Loading more news articles... (Page ${currentPage})`, 'info');
            // In production, this would load more articles via AJAX
        });
    }

    // =============================================
    // Social Share Buttons
    // =============================================
    const shareBtns = document.querySelectorAll('.share-btn, .social-share a, .news-share');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const newsTitle = document.querySelector('h1')?.textContent || 'News article';
            const platform = this.classList.contains('facebook') ? 'Facebook' :
                            this.classList.contains('twitter') ? 'Twitter' :
                            this.classList.contains('linkedin') ? 'LinkedIn' :
                            this.classList.contains('whatsapp') ? 'WhatsApp' : 'social media';
            
            showNotification(`📤 Share "${newsTitle}" on ${platform}`, 'success');
        });
    });

    // =============================================
    // Newsletter Form
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
    // Hashtag Clicks
    // =============================================
    const hashtags = document.querySelectorAll('.news-hashtags span, .hashtag');
    hashtags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagName = this.textContent.trim();
            showNotification(`🔍 Browse news with hashtag: ${tagName}`, 'info');
        });
    });

    // =============================================
    // Tag Clicks
    // =============================================
    const tagLinks = document.querySelectorAll('.news-tag, .tag');
    tagLinks.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const tagName = this.textContent.trim();
            showNotification(`🏷️ Showing news tagged with "${tagName}"`, 'info');
        });
    });

    // =============================================
    // Archive Links
    // =============================================
    const archiveLinks = document.querySelectorAll('.archive-link, .month-link');
    archiveLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const month = this.textContent.trim();
            showNotification(`📅 Showing news from ${month}`, 'info');
        });
    });

    // =============================================
    // Image Lightbox for News Images
    // =============================================
    const newsImages = document.querySelectorAll('.news-image img, .article-image img');
    newsImages.forEach(img => {
        img.addEventListener('click', function() {
            const caption = this.closest('.news-image')?.querySelector('.image-caption')?.textContent || 'News image';
            showNotification(`🔍 Opening image viewer for: ${caption}`, 'info');
        });
    });

    // =============================================
    // Featured News Carousel (if present)
    // =============================================
    const featuredCarousel = document.querySelector('.featured-carousel, .news-slider');
    if (featuredCarousel) {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide, .slider-item');
        const prevBtn = document.querySelector('.carousel-prev, .slider-prev');
        const nextBtn = document.querySelector('.carousel-next, .slider-next');
        
        function showSlide(index) {
            if (!slides.length) return;
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
            currentSlide = index;
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                const newIndex = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
                showSlide(newIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                const newIndex = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
                showSlide(newIndex);
            });
        }
        
        if (slides.length > 0) {
            showSlide(0);
        }
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
    const currentPage = window.location.pathname.split('/').pop() || 'news.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
});

// =============================================
// Notification System
// =============================================
function showNotification(message, type) {
    // Remove existing notification
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
    
    // Add styles if not exists
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