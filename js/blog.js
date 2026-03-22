// blog.js - Clean Version (Mobile menu handled by index.js)

document.addEventListener('DOMContentLoaded', function() {
    console.log('Blog page initialized');
    
    // =============================================
    // Read More Buttons
    // =============================================
    const readMoreBtns = document.querySelectorAll('.read-more-btn, .btn-read-more');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const blogCard = this.closest('.blog-card, .post-card, article');
            const blogTitle = blogCard?.querySelector('h2, h3')?.textContent || 'Blog post';
            showNotification(`📖 Reading full article: "${blogTitle}"`, 'info');
        });
    });

    // =============================================
    // Category Filter
    // =============================================
    const categoryLinks = document.querySelectorAll('.category-link, .blog-category');
    const blogCards = document.querySelectorAll('.blog-card, .post-card');
    
    if (categoryLinks.length > 0 && blogCards.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-category') || this.textContent.trim().toLowerCase();
                
                // Update active state
                categoryLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Filter blog posts
                let visibleCount = 0;
                blogCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category')?.toLowerCase() || '';
                    const cardTags = card.querySelectorAll('.tag, .post-tag');
                    let matchesCategory = false;
                    
                    if (category === 'all' || category === 'all posts') {
                        matchesCategory = true;
                    } else if (cardCategory === category) {
                        matchesCategory = true;
                    } else {
                        cardTags.forEach(tag => {
                            if (tag.textContent.trim().toLowerCase() === category) {
                                matchesCategory = true;
                            }
                        });
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
                
                // Show message if no posts
                if (visibleCount === 0) {
                    showNotification(`No posts found in "${category}" category`, 'info');
                }
            });
        });
    }

    // =============================================
    // Search Functionality
    // =============================================
    const searchInput = document.querySelector('.blog-search-input, #search-input');
    const searchBtn = document.querySelector('.blog-search-btn, #search-btn');
    
    function performSearch() {
        if (!searchInput) return;
        
        const searchTerm = searchInput.value.trim().toLowerCase();
        let foundCount = 0;
        
        blogCards.forEach(card => {
            const title = card.querySelector('h2, h3')?.textContent.toLowerCase() || '';
            const excerpt = card.querySelector('.excerpt, .post-excerpt')?.textContent.toLowerCase() || '';
            const content = card.querySelector('.post-content')?.textContent.toLowerCase() || '';
            const tags = Array.from(card.querySelectorAll('.tag, .post-tag')).map(t => t.textContent.toLowerCase()).join(' ');
            
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
            showNotification(`No posts found matching "${searchTerm}"`, 'info');
        }
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }

    // =============================================
    // Load More / Pagination
    // =============================================
    const loadMoreBtn = document.querySelector('.load-more-btn, #load-more');
    if (loadMoreBtn) {
        let currentPage = 1;
        const postsPerPage = 6;
        
        loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            currentPage++;
            showNotification(`Loading more posts... (Page ${currentPage})`, 'info');
            // In production, this would load more posts via AJAX
        });
    }

    // =============================================
    // Social Share Buttons
    // =============================================
    const shareBtns = document.querySelectorAll('.share-btn, .social-share a');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const blogTitle = document.querySelector('h1')?.textContent || 'Blog post';
            const url = window.location.href;
            const platform = this.classList.contains('facebook') ? 'Facebook' :
                            this.classList.contains('twitter') ? 'Twitter' :
                            this.classList.contains('linkedin') ? 'LinkedIn' :
                            this.classList.contains('whatsapp') ? 'WhatsApp' : 'social media';
            
            showNotification(`📤 Share "${blogTitle}" on ${platform}`, 'success');
        });
    });

    // =============================================
    // Comment Form Submission
    // =============================================
    const commentForm = document.querySelector('.comment-form, #commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = this.querySelector('#name, input[name="name"]');
            const commentInput = this.querySelector('#comment, textarea[name="comment"]');
            
            if (nameInput && commentInput && nameInput.value.trim() && commentInput.value.trim()) {
                showNotification('Thank you for your comment! It will be reviewed before publishing.', 'success');
                this.reset();
            } else {
                showNotification('Please fill in both name and comment fields.', 'error');
            }
        });
    }

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
                showNotification('Thank you for subscribing to our blog newsletter!', 'success');
                this.reset();
            } else {
                showNotification('Please enter a valid email address.', 'error');
                emailInput?.focus();
            }
        });
    }

    // =============================================
    // Featured Post Carousel (if present)
    // =============================================
    const featuredCarousel = document.querySelector('.featured-carousel, .post-slider');
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
    // Image Lightbox for Blog Images
    // =============================================
    const blogImages = document.querySelectorAll('.blog-content img, .post-content img');
    blogImages.forEach(img => {
        img.addEventListener('click', function() {
            showNotification('🔍 Image viewer would open', 'info');
        });
    });

    // =============================================
    // Popular Posts Widget
    // =============================================
    const popularPosts = document.querySelectorAll('.popular-post, .trending-post');
    popularPosts.forEach(post => {
        post.addEventListener('click', function(e) {
            const postTitle = this.querySelector('h4, .post-title')?.textContent || 'Popular post';
            showNotification(`📖 Loading: ${postTitle}`, 'info');
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
            showNotification(`📅 Showing posts from ${month}`, 'info');
        });
    });

    // =============================================
    // Tag Cloud
    // =============================================
    const tagLinks = document.querySelectorAll('.tag-cloud a, .post-tag');
    tagLinks.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const tagName = this.textContent.trim();
            showNotification(`🏷️ Showing posts tagged with "${tagName}"`, 'info');
        });
    });

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
    const currentPage = window.location.pathname.split('/').pop() || 'blog.html';
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
    
    // Add styles if not exists
    if (!document.querySelector('#blog-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'blog-notification-styles';
        style.textContent = `
            .blog-notification {
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