// contact.js - Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const spans = mobileToggle.querySelectorAll('span');
            
            if (navMenu.classList.contains('active')) {
                // Animate to X
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                // Return to hamburger
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div class="success-content">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <h3>Message Sent Successfully!</h3>
                            <p>Thank you, ${formObject.fullName}! We've received your message and will contact you via ${formObject.preferredContact} within 48 hours.</p>
                            <p><strong>Reference:</strong> UCfERI-${Date.now().toString().slice(-6)}</p>
                        </div>
                    </div>
                `;
                
                // Style success message
                successMessage.style.cssText = `
                    background: linear-gradient(135deg, var(--success-color), #2ecc71);
                    color: white;
                    padding: 25px;
                    border-radius: 12px;
                    margin-top: 30px;
                    animation: fadeIn 0.5s ease;
                `;
                
                // Style content inside
                const successContent = successMessage.querySelector('.success-content');
                successContent.style.display = 'flex';
                successContent.style.alignItems = 'flex-start';
                successContent.style.gap = '20px';
                
                const icon = successContent.querySelector('i');
                icon.style.fontSize = '3rem';
                icon.style.marginTop = '5px';
                
                successContent.querySelector('h3').style.margin = '0 0 10px 0';
                successContent.querySelector('p').style.margin = '0 0 8px 0';
                
                // Insert success message
                const formFooter = this.querySelector('.form-footer');
                formFooter.parentNode.insertBefore(successMessage, formFooter.nextSibling);
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    this.reset();
                    successMessage.style.opacity = '0';
                    successMessage.style.transition = 'opacity 0.3s ease';
                    
                    setTimeout(() => {
                        successMessage.remove();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 300);
                }, 5000);
            }, 1500);
        });
    }
    
    // Purpose card selection styling
    const purposeCards = document.querySelectorAll('.purpose-card');
    purposeCards.forEach(card => {
        card.addEventListener('click', function() {
            purposeCards.forEach(c => {
                c.classList.remove('selected');
            });
            this.classList.add('selected');
            
            // Update radio button
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
        });
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .success-message {
            animation: fadeIn 0.5s ease;
        }
        
        .purpose-card.selected .purpose-content {
            border-color: var(--primary-color) !important;
            background: rgba(52, 152, 219, 0.1) !important;
            transform: scale(1.02);
        }
        
        .quick-link:hover {
            transform: translateX(5px);
        }
        
        .info-card:hover {
            transform: translateY(-5px);
        }
        
        .partner-card:hover {
            transform: translateY(-5px);
        }
        
        .social-card:hover {
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(style);
    
    // Form validation
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '' && this.hasAttribute('required')) {
                    this.style.borderColor = 'var(--danger-color)';
                } else {
                    this.style.borderColor = '#e0e6eb';
                }
            });
            
            input.addEventListener('focus', function() {
                this.style.borderColor = 'var(--primary-color)';
            });
        });
    }
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 2) {
                    value = '+27 ' + value;
                } else if (value.length <= 5) {
                    value = '+27 ' + value.substr(2, 3);
                } else if (value.length <= 8) {
                    value = '+27 ' + value.substr(2, 3) + ' ' + value.substr(5, 3);
                } else {
                    value = '+27 ' + value.substr(2, 3) + ' ' + value.substr(5, 3) + ' ' + value.substr(8, 4);
                }
            }
            
            e.target.value = value;
        });
    }
    
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
});