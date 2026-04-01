// contact.js - Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    const RECIPIENT_EMAIL = 'cferi@univen.ac.za';

    function formatLabel(value) {
        if (!value) return 'Not provided';
        return value
            .split(/[_-]/)
            .map(function (part) {
                return part.charAt(0).toUpperCase() + part.slice(1);
            })
            .join(' ');
    }

    function setFormStatus(statusElement, type, message) {
        if (!statusElement) return;
        statusElement.hidden = false;
        statusElement.className = 'form-status is-' + type;
        statusElement.textContent = message;
    }

    function clearFormStatus(statusElement) {
        if (!statusElement) return;
        statusElement.hidden = true;
        statusElement.className = 'form-status';
        statusElement.textContent = '';
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!isExpanded));
            mobileMenu.style.display = isExpanded ? 'none' : 'block';
        });
    }

    window.toggleMobileDropdown = function (button) {
        button.classList.toggle('active');
        const content = button.nextElementSibling;
        if (content) {
            content.classList.toggle('show');
        }
    };

    const contactForm = document.getElementById('newContactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!contactForm.reportValidity()) {
                setFormStatus(formStatus, 'error', 'Please complete the required fields before sending your message.');
                return;
            }

            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const phone = document.getElementById('contactPhone').value.trim() || 'Not provided';
            const subject = document.getElementById('contactSubject').value.trim();
            const message = document.getElementById('contactMessage').value.trim();
            const preferredMethod = formatLabel(document.getElementById('preferredMethod').value);
            const inquiryType = formatLabel(document.getElementById('inquiryType').value);
            const fullName = (firstName + ' ' + lastName).trim();
            const reference = 'UCFERI-' + Date.now().toString().slice(-8);
            const submittedAt = new Date().toLocaleString('en-ZA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            const emailSubject = '[UCfERI Contact] ' + subject;
            const emailBody = [
                'UCfERI CONTACT FORM SUBMISSION',
                '========================================',
                'Reference: ' + reference,
                'Submitted: ' + submittedAt,
                '',
                'CONTACT DETAILS',
                '----------------------------------------',
                'Name: ' + fullName,
                'Email: ' + email,
                'Phone: ' + phone,
                'Preferred Contact Method: ' + preferredMethod,
                '',
                'INQUIRY DETAILS',
                '----------------------------------------',
                'Inquiry Type: ' + inquiryType,
                'Subject: ' + subject,
                '',
                'MESSAGE',
                '----------------------------------------',
                message,
                '',
                'Source: UCfERI website contact form'
            ].join('\n');

            const mailtoLink =
                'mailto:' +
                encodeURIComponent(RECIPIENT_EMAIL) +
                '?subject=' +
                encodeURIComponent(emailSubject) +
                '&body=' +
                encodeURIComponent(emailBody);

            setFormStatus(
                formStatus,
                'info',
                'Your email app is opening with a pre-filled message to ' + RECIPIENT_EMAIL + '. Review it and click send to complete your submission.'
            );

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-envelope-open-text"></i> Opening Email App...';
            submitBtn.disabled = true;

            window.location.href = mailtoLink;

            window.setTimeout(function () {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                setFormStatus(
                    formStatus,
                    'success',
                    'Email draft prepared for ' + RECIPIENT_EMAIL + '. If no mail window appeared, send the same details manually to that address.'
                );
            }, 1200);
        });

        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(function (input) {
            input.addEventListener('input', function () {
                clearFormStatus(formStatus);
            });

            input.addEventListener('blur', function () {
                if (this.hasAttribute('required') && this.value.trim() === '') {
                    this.style.borderColor = '#b42815';
                } else {
                    this.style.borderColor = '#e9ecef';
                }
            });

            input.addEventListener('focus', function () {
                this.style.borderColor = 'var(--primary-color)';
            });
        });
    }

    const phoneInput = document.getElementById('contactPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/[^\d+]/g, '');

            if (value.startsWith('+27')) {
                value = value.replace(/\D/g, '');
                if (value.length <= 2) {
                    e.target.value = '+27';
                    return;
                }

                const rest = value.slice(2, 11);
                const parts = [];
                if (rest.slice(0, 2)) parts.push(rest.slice(0, 2));
                if (rest.slice(2, 5)) parts.push(rest.slice(2, 5));
                if (rest.slice(5, 9)) parts.push(rest.slice(5, 9));
                e.target.value = '+27 ' + parts.join(' ');
                return;
            }

            e.target.value = value;
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
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
