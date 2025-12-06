// resources.js - Resources Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Category tabs functionality
    const categoryTabs = document.querySelectorAll('.category-tab');
    const resourceCards = document.querySelectorAll('.resource-card');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            const category = tab.getAttribute('data-category');
            
            // Filter resource cards
            resourceCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Smooth scroll to resources section if needed
            if (category !== 'all') {
                const resourcesSection = document.querySelector('.resource-categories');
                if (resourcesSection) {
                    window.scrollTo({
                        top: resourcesSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Quick link animations
    const quickLinks = document.querySelectorAll('.quick-link');
    quickLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Resource card animations
    resourceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
        
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Target card animations
    const targetCards = document.querySelectorAll('.target-card');
    targetCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100 + 300);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .resource-card {
            animation: fadeInUp 0.5s ease forwards;
            animation-delay: calc(var(--index, 0) * 0.1s);
        }
        
        .target-card {
            animation: fadeInUp 0.5s ease forwards;
            animation-delay: calc(var(--index, 0) * 0.1s + 0.3s);
        }
        
        .quick-link {
            transition: all 0.3s ease;
        }
        
        .category-tab {
            transition: all 0.3s ease;
        }
        
        .resource-card {
            transition: all 0.3s ease;
        }
        
        .target-card {
            transition: all 0.3s ease;
        }
        
        .partner-item {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Set animation delays
    resourceCards.forEach((card, index) => {
        card.style.setProperty('--index', index);
    });
    
    targetCards.forEach((card, index) => {
        card.style.setProperty('--index', index);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form submission for newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.textContent = 'Thank you for subscribing!';
            successMsg.style.cssText = `
                color: var(--success-color);
                padding: 10px;
                margin-top: 10px;
                text-align: center;
                font-weight: 600;
            `;
            
            this.appendChild(successMsg);
            this.reset();
            
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        });
    }
});