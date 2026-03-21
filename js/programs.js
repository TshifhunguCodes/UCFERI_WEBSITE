// programs.js - Clean Version (Keeping your original table)

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Mobile Menu Toggle
    // =============================================
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.setAttribute('aria-hidden', isExpanded);
            mobileMenu.style.display = isExpanded ? 'none' : 'block';
        });
    }

    // Mobile Dropdown Toggle (Exposed globally for inline onclick)
    window.toggleMobileDropdown = function(button) {
        button.classList.toggle('active');
        const content = button.nextElementSibling;
        if (content) {
            content.classList.toggle('show');
        }
    };
    
    // =============================================
    // FAQ Accordion
    // =============================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            faqQuestions.forEach(q => {
                q.parentElement.classList.remove('active');
            });
            
            // Open clicked one if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // =============================================
    // Countdown Timer
    // =============================================
    function updateCountdown() {
        const now = new Date().getTime();
        
        // Incubation countdown (February 29, 2024)
        const incubationDeadline = new Date('2024-02-29T23:59:59').getTime();
        const incubationElement = document.getElementById('incubation-countdown');
        if (incubationElement) {
            updateCountdownElement(incubationElement, incubationDeadline, now);
        }
        
        // SWEEP countdown (December 2, 2025)
        const sweepDeadline = new Date('2025-12-02T23:59:59').getTime();
        const sweepElement = document.getElementById('sweep-countdown');
        if (sweepElement) {
            updateCountdownElement(sweepElement, sweepDeadline, now);
        }
    }
    
    function updateCountdownElement(element, deadline, now) {
        const diff = deadline - now;
        
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
            if (days > 7) {
                element.textContent = `${days} days remaining`;
            } else if (days > 0) {
                element.textContent = `${days}d ${hours}h remaining`;
            } else {
                element.textContent = `${hours} hours remaining`;
            }
            element.style.color = '';
            element.style.fontWeight = '600';
        } else {
            element.textContent = 'Application Closed';
            element.style.color = '#e74c3c';
            element.style.fontWeight = '700';
        }
    }
    
    // Initialize countdown and update every hour
    updateCountdown();
    setInterval(updateCountdown, 3600000); // Update every hour
    
    // =============================================
    // Newsletter Form (Fixed - using querySelector)
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
    
    // Simple notification function
    function showNotification(message, type) {
        // Remove existing notification
        const existing = document.querySelector('.form-notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles if not exists
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .form-notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    padding: 16px 24px;
                    border-radius: 12px;
                    color: white;
                    font-weight: 500;
                    z-index: 10000;
                    animation: slideInRight 0.3s ease;
                    max-width: 400px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
                .form-notification.success {
                    background: linear-gradient(135deg, #27ae60, #2ecc71);
                }
                .form-notification.error {
                    background: linear-gradient(135deg, #e74c3c, #c0392b);
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
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
        }, 4000);
    }
    
    // =============================================
    // Smooth scrolling for anchor links
    // =============================================
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offset = 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =============================================
    // Animate elements on scroll (Single observer)
    // =============================================
    const animateElements = document.querySelectorAll('.program-card, .training-card');
    
    // Set initial styles
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
    });
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
    
    animateElements.forEach(el => animationObserver.observe(el));
    
    // =============================================
    // Responsive table handling (preserving your original table)
    // =============================================
    function handleResponsiveTables() {
        const tables = document.querySelectorAll('.comparison-table');
        
        tables.forEach(table => {
            const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
            const rows = table.querySelectorAll('tbody tr');
            
            if (window.innerWidth <= 768) {
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    cells.forEach((cell, index) => {
                        if (headers[index]) {
                            cell.setAttribute('data-label', headers[index]);
                        }
                    });
                });
            } else {
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    cells.forEach(cell => {
                        cell.removeAttribute('data-label');
                    });
                });
            }
        });
    }
    
    handleResponsiveTables();
    window.addEventListener('resize', handleResponsiveTables);
    
    // =============================================
    // Add active class to current navigation link
    // =============================================
    const currentPage = window.location.pathname.split('/').pop() || 'programs.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'programs.html' && href === 'programs.html')) {
            link.classList.add('active');
        }
    });
});