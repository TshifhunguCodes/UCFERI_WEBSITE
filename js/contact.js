// contact.js - Contact Page JavaScript

// Remove any conflicting code and ensure clean initialization

(function() {
    const heroVideo = document.querySelector('.hero-video');
    const heroContainer = document.querySelector('.hero-video-container');

    if (heroVideo && heroContainer) {
        const markReady = function() {
            heroContainer.classList.add('is-video-ready');
        };

        const attemptPlay = function() {
            heroVideo.muted = true;
            heroVideo.defaultMuted = true;
            heroVideo.setAttribute('playsinline', '');
            heroVideo.setAttribute('webkit-playsinline', '');

            const playPromise = heroVideo.play();
            if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(function() {});
            }
        };

        heroVideo.addEventListener('playing', markReady);
        window.addEventListener('load', attemptPlay, { once: true });

        ['touchstart', 'click', 'scroll'].forEach(function(eventName) {
            window.addEventListener(eventName, attemptPlay, { once: true, passive: true });
        });

        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) attemptPlay();
        });
    }
})();

// Initialize EmailJS
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init({
            publicKey: "QGPyj8w--XmYGtoy9"
        });
        console.log("EmailJS initialized successfully");
    } else {
        console.error("EmailJS not loaded");
    }
})();

// Create and show custom dialog
function showDialog(type, message) {
    // Remove any existing dialog
    const existingDialog = document.querySelector('.custom-dialog');
    if (existingDialog) {
        existingDialog.remove();
    }
    
    // Create dialog element
    const dialog = document.createElement('div');
    dialog.className = `custom-dialog custom-dialog-${type}`;
    
    // Set icon based on type
    let icon = '';
    if (type === 'success') {
        icon = '<svg class="dialog-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    } else if (type === 'error') {
        icon = '<svg class="dialog-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="currentColor"/><line x1="12" y1="8" x2="12" y2="12" stroke="currentColor"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor"/></svg>';
    } else if (type === 'loading') {
        icon = '<svg class="dialog-icon dialog-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-dasharray="60" stroke-dashoffset="20"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></circle></svg>';
    }
    
    dialog.innerHTML = `
        <div class="dialog-overlay"></div>
        <div class="dialog-container">
            <div class="dialog-content">
                <div class="dialog-icon-wrapper">${icon}</div>
                <h3 class="dialog-title">${type === 'success' ? 'Success!' : type === 'error' ? 'Error!' : 'Sending...'}</h3>
                <p class="dialog-message">${message}</p>
                <button class="dialog-button" onclick="this.closest('.custom-dialog').remove()">
                    ${type === 'loading' ? 'Please wait...' : 'OK'}
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(dialog);
    
    // Auto remove success dialog after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            const dialogToRemove = document.querySelector('.custom-dialog');
            if (dialogToRemove) dialogToRemove.remove();
        }, 3000);
    }
    
    // Close when clicking overlay (but not for loading)
    if (type !== 'loading') {
        const overlay = dialog.querySelector('.dialog-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => dialog.remove());
        }
    }
}

// Send email function
async function sendMail(event) {
    // Prevent default form submission
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    console.log("sendMail triggered - Starting form submission");
    
    // Get form data with null checks
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('contactEmail');
    const phoneInput = document.getElementById('contactPhone');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');
    const preferredMethodInput = document.getElementById('preferredMethod');
    const inquiryTypeInput = document.getElementById('inquiryType');
    
    // Check if all required elements exist
    if (!firstNameInput || !lastNameInput || !emailInput || !subjectInput || !messageInput) {
        console.error("Form elements not found");
        showDialog('error', 'Form elements missing. Please refresh the page and try again.');
        return false;
    }
    
    let params = {
        firstName: firstNameInput.value.trim(),
        lastName: lastNameInput.value.trim(),
        contactEmail: emailInput.value.trim(),
        contactPhone: phoneInput ? phoneInput.value.trim() : 'Not provided',
        contactSubject: subjectInput.value.trim(),
        contactMessage: messageInput.value.trim(),
        preferredMethod: preferredMethodInput ? preferredMethodInput.value : 'email',
        inquiryType: inquiryTypeInput ? inquiryTypeInput.value : 'general'
    };
    
    console.log("Form data collected:", {
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.contactEmail,
        subject: params.contactSubject
    });
    
    // Validate required fields
    if (!params.firstName || !params.lastName || !params.contactEmail || !params.contactSubject || !params.contactMessage) {
        showDialog('error', 'Please fill in all required fields before submitting.');
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(params.contactEmail)) {
        showDialog('error', 'Please enter a valid email address (e.g., name@example.com).');
        return false;
    }
    
    // Show loading dialog
    showDialog('loading', 'Sending your message, please wait...');
    
    try {
        // Check if emailjs is available
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS library not loaded. Please check your internet connection.');
        }
        
        console.log("Attempting to send email with params:", params);
        
        // Send email - USING YOUR CORRECT IDs FROM THE ERROR LOG
        const response = await emailjs.send(
            'service_79qykug',  // Your Service ID
            'template_7wghgjs',  // Your Template ID
            params
        );
        
        console.log('SUCCESS! Full response:', response);
        
        // Remove loading dialog
        const loadingDialog = document.querySelector('.custom-dialog');
        if (loadingDialog) loadingDialog.remove();
        
        // Show success dialog
        showDialog('success', '✓ Your message has been sent successfully!\n\nWe will get back to you within 24 hours.');
        
        // Reset form
        const form = document.getElementById('contactForm');
        if (form) {
            form.reset();
        }
        
        return true;
        
    } catch (error) {
        console.error('FAILED... Error details:', error);
        
        // Remove loading dialog
        const loadingDialog = document.querySelector('.custom-dialog');
        if (loadingDialog) loadingDialog.remove();
        
        // Detailed error message based on error type
        let errorMessage = 'Failed to send your message. ';
        
        if (error.status === 0 || error.message === 'Failed to fetch') {
            errorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.text) {
            errorMessage += `Error: ${error.text}`;
        } else if (error.message) {
            if (error.message.includes('template')) {
                errorMessage = 'Email template configuration error. Please contact support.';
            } else if (error.message.includes('service')) {
                errorMessage = 'Email service configuration error. Please contact support.';
            } else {
                errorMessage += error.message;
            }
        } else {
            errorMessage += 'Please try again later or contact support.';
        }
        
        showDialog('error', errorMessage);
        return false;
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded - setting up contact form");
    
    const form = document.getElementById('contactForm');
    if (form) {
        // Remove any existing event listeners by replacing the form
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        // Add event listener to the new form
        newForm.addEventListener('submit', sendMail);
        console.log("Form submit handler attached successfully");
    } else {
        console.error("Contact form not found with ID 'contactForm'");
    }
});

// Also add a backup listener for dynamically loaded forms
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('contactForm');
        if (form && !form.hasAttribute('data-listener-added')) {
            form.setAttribute('data-listener-added', 'true');
            form.addEventListener('submit', sendMail);
        }
    });
} else {
    const form = document.getElementById('contactForm');
    if (form && !form.hasAttribute('data-listener-added')) {
        form.setAttribute('data-listener-added', 'true');
        form.addEventListener('submit', sendMail);
    }
}
