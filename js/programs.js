// Programs Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown > a');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Update aria-expanded attribute
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
    }
    
    // Dropdown functionality for mobile
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
            }
        });
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
            
            // Close other FAQ items
            if (faqItem.classList.contains('active')) {
                faqQuestions.forEach(otherQuestion => {
                    const otherItem = otherQuestion.parentElement;
                    if (otherItem !== faqItem && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Countdown Timer
    function updateCountdown() {
        const incubationDeadline = new Date('2024-02-29').getTime();
        const sweepDeadline = new Date('2025-12-02').getTime();
        const now = new Date().getTime();
        
        // Incubation countdown
        const incubationElement = document.getElementById('incubation-countdown');
        if (incubationElement) {
            const incubationDiff = incubationDeadline - now;
            if (incubationDiff > 0) {
                const days = Math.floor(incubationDiff / (1000 * 60 * 60 * 24));
                incubationElement.textContent = `${days} days remaining`;
            } else {
                incubationElement.textContent = 'Application closed';
                incubationElement.style.color = '#e74c3c';
            }
        }
        
        // SWEEP countdown
        const sweepElement = document.getElementById('sweep-countdown');
        if (sweepElement) {
            const sweepDiff = sweepDeadline - now;
            if (sweepDiff > 0) {
                const days = Math.floor(sweepDiff / (1000 * 60 * 60 * 24));
                sweepElement.textContent = `${days} days remaining`;
            } else {
                sweepElement.textContent = 'Application closed';
                sweepElement.style.color = '#e74c3c';
            }
        }
    }
    
    // Initialize countdown
    updateCountdown();
    setInterval(updateCountdown, 86400000); // Update daily
    
    // Training Modal
    const modal = document.getElementById('trainingModal');
    const modalBtns = document.querySelectorAll('.training-modal-btn');
    const closeBtns = document.querySelectorAll('.modal-close');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalOverview = document.getElementById('modalOverview');
    const modalLearning = document.getElementById('modalLearning');
    const modalSchedule = document.getElementById('modalSchedule');
    const modalAudience = document.getElementById('modalAudience');
    const modalRegisterBtn = document.getElementById('modalRegisterBtn');
    
    // Training data
    const trainingData = {
        'business-planning': {
            title: 'Business Planning Workshop',
            subtitle: 'Comprehensive business plan development with financial projections',
            overview: 'Learn to create professional business plans that attract investors and guide your business growth. This workshop covers all aspects of business planning from market analysis to financial projections.',
            learning: [
                'Market research and analysis techniques',
                'Business model canvas development',
                'Financial projection and budgeting',
                'Risk assessment and mitigation',
                'Presentation and pitching skills'
            ],
            schedule: '2-day workshop (9:00 AM - 4:00 PM). Next session: 15-16 February 2024',
            audience: 'Startup founders, SMME owners, and aspiring entrepreneurs at all levels',
            registerLink: 'contact.html?training=business-planning'
        },
        'financial-management': {
            title: 'Financial Management Training',
            subtitle: 'Master financial skills for business success',
            overview: 'Develop essential financial management skills including budgeting, cash flow management, and funding application preparation.',
            learning: [
                'Basic financial literacy',
                'Budget creation and management',
                'Cash flow forecasting',
                'Funding application processes',
                'Financial reporting basics'
            ],
            schedule: '3-day training program. Next session: 22-24 February 2024',
            audience: 'SMME owners, startup founders, and business managers',
            registerLink: 'contact.html?training=financial-management'
        },
        'pitching': {
            title: 'Pitching & Presentation Skills',
            subtitle: 'Master the art of pitching to investors',
            overview: 'Learn how to create compelling pitches that capture investor attention and secure funding for your business.',
            learning: [
                'Storytelling techniques',
                'Slide deck creation',
                'Delivery and presentation skills',
                'Q&A preparation',
                'Investor psychology'
            ],
            schedule: '1-day intensive workshop. Next session: 28 February 2024',
            audience: 'Entrepreneurs seeking funding, competition participants',
            registerLink: 'contact.html?training=pitching'
        },
        'digital-marketing': {
            title: 'Digital Marketing Fundamentals',
            subtitle: 'Online marketing strategies for business growth',
            overview: 'Learn essential digital marketing skills to grow your business online and reach more customers.',
            learning: [
                'Social media marketing',
                'Content creation strategy',
                'Basic SEO principles',
                'Email marketing basics',
                'Analytics and tracking'
            ],
            schedule: '2-day workshop. Next session: 7-8 March 2024',
            audience: 'Business owners, marketing professionals, entrepreneurs',
            registerLink: 'contact.html?training=digital-marketing'
        },
        'legal-compliance': {
            title: 'Legal Compliance Workshop',
            subtitle: 'Understanding legal requirements for businesses',
            overview: 'Navigate the legal landscape of business operations with confidence.',
            learning: [
                'Business registration processes',
                'Tax compliance requirements',
                'Basic contract understanding',
                'Employment law basics',
                'Industry-specific regulations'
            ],
            schedule: '1-day workshop. Next session: 14 March 2024',
            audience: 'All business owners and managers',
            registerLink: 'contact.html?training=legal-compliance'
        },
        'team-leadership': {
            title: 'Team Leadership Development',
            subtitle: 'Effective team management and leadership skills',
            overview: 'Develop leadership skills to build and manage effective teams.',
            learning: [
                'Communication strategies',
                'Team building techniques',
                'Conflict resolution',
                'Performance management',
                'Motivation strategies'
            ],
            schedule: '2-day workshop. Next session: 21-22 March 2024',
            audience: 'Managers, team leaders, aspiring leaders',
            registerLink: 'contact.html?training=team-leadership'
        }
    };
    
    // Open modal
    modalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const trainingId = this.getAttribute('data-training');
            const data = trainingData[trainingId];
            
            if (data) {
                modalTitle.textContent = data.title;
                modalSubtitle.textContent = data.subtitle;
                modalOverview.textContent = data.overview;
                modalSchedule.textContent = data.schedule;
                modalAudience.textContent = data.audience;
                
                // Clear previous learning points
                modalLearning.innerHTML = '';
                
                // Add new learning points
                data.learning.forEach(point => {
                    const li = document.createElement('li');
                    li.textContent = point;
                    modalLearning.appendChild(li);
                });
                
                // Set register link
                modalRegisterBtn.onclick = function() {
                    window.location.href = data.registerLink;
                };
                
                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simple validation
            if (email && email.includes('@')) {
                // In a real application, you would send this to a server
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.program-card, .training-card, .stat-card').forEach(card => {
        observer.observe(card);
    });
    
    // Add animation class when element comes into view
    const cards = document.querySelectorAll('.program-card, .training-card, .stat-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        cardObserver.observe(card);
    });
    
    // Responsive table handling
    function handleResponsiveTables() {
        const tables = document.querySelectorAll('.comparison-table');
        tables.forEach(table => {
            const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
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
    
    // Program filter functionality (if needed in future)
    const programFilter = document.querySelector('.program-filter');
    if (programFilter) {
        programFilter.addEventListener('change', function() {
            const filterValue = this.value;
            const cards = document.querySelectorAll('.program-card, .training-card');
            
            cards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    }
});