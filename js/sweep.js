// SWEEP Program Page JavaScript - Clean Version (No Duplicate Mobile Menu)

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Countdown Timer for SWEEP Deadline
    // =============================================
    const countdownElement = document.getElementById('sweep-countdown');
    if (countdownElement) {
        const deadline = new Date('December 2, 2025 23:59:59').getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = deadline - now;
            
            if (timeLeft < 0) {
                countdownElement.innerHTML = '<div style="text-align: center; font-size: 1.5rem; font-weight: 700;">Application Closed</div>';
                return;
            }
            
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `
                <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                    <div>
                        <div style="font-size: 1.8rem; font-weight: 700;">${days}</div>
                        <div style="font-size: 0.8rem;">Days</div>
                    </div>
                    <div>
                        <div style="font-size: 1.8rem; font-weight: 700;">${hours}</div>
                        <div style="font-size: 0.8rem;">Hours</div>
                    </div>
                    <div>
                        <div style="font-size: 1.8rem; font-weight: 700;">${minutes}</div>
                        <div style="font-size: 0.8rem;">Minutes</div>
                    </div>
                    <div>
                        <div style="font-size: 1.8rem; font-weight: 700;">${seconds}</div>
                        <div style="font-size: 0.8rem;">Seconds</div>
                    </div>
                </div>
            `;
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // =============================================
    // Email Copy Functionality
    // =============================================
    const emailLinks = document.querySelectorAll('.email-addresses a');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.textContent;
            
            navigator.clipboard.writeText(email).then(() => {
                const originalText = this.innerHTML;
                const originalBg = this.style.backgroundColor;
                
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                this.style.backgroundColor = '#27ae60';
                this.style.color = 'white';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.backgroundColor = originalBg;
                    this.style.color = '';
                }, 2000);
            }).catch(() => {
                alert('Press Ctrl+C to copy: ' + email);
            });
        });
    });
    
    // =============================================
    // Smooth Scrolling for Anchor Links
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
    // Newsletter Form Submission
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
    // Notification System
    // =============================================
    function showNotification(message, type) {
        const existing = document.querySelector('.form-notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${escapeHtml(message)}</span>
            </div>
        `;
        
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
        }, 4000);
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // =============================================
    // Intersection Observer for Scroll Animations
    // =============================================
    const animatedElements = document.querySelectorAll('.feature, .position-card, .eligibility-item, .benefit, .ecosystem-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
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
    
    animatedElements.forEach(el => animationObserver.observe(el));
    
    // =============================================
    // Active Navigation Link
    // =============================================
    const currentPath = window.location.pathname.split('/').pop() || 'sweep.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        }
    });
});