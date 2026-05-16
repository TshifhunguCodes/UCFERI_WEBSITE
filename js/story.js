/* ============================================
   SUCCESS STORIES PAGE — Premium Interactions
   Scroll animations, counter effects, smooth UX
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  'use strict';

  // =============================================
  // 1. SCROLL-TRIGGERED ANIMATIONS
  // =============================================
  const animateElements = document.querySelectorAll('.st-animate');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animations
        setTimeout(() => {
          entry.target.classList.add('st-animate--visible');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(el => observer.observe(el));

  // =============================================
  // 2. STAT COUNTER ANIMATION (Hero Stats)
  // =============================================
  const statNumbers = document.querySelectorAll('.st-hero-stat__number[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        if (!isNaN(target)) {
          animateCounter(el, target);
        }
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(element, target) {
    const duration = 1500; // ms
    const startTime = performance.now();
    const isKFormat = element.textContent.includes('K');

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      if (isKFormat) {
        element.textContent = `${current}K+`;
      } else {
        element.textContent = `${current}+`;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = isKFormat ? `${target}K+` : `${target}+`;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // =============================================
  // 3. SMOOTH SCROLL FOR ANCHOR LINKS
  // =============================================
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 120;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // =============================================
  // 4. FEATURED STORY IMAGE PARALLAX ON HOVER
  // =============================================
  const featuredMedia = document.querySelector('.st-featured__media');
  if (featuredMedia) {
    const img = featuredMedia.querySelector('img');
    if (img) {
      featuredMedia.addEventListener('mousemove', (e) => {
        const rect = featuredMedia.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        img.style.transform = `scale(1.05) translate(${x * 8}px, ${y * 8}px)`;
      });

      featuredMedia.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1) translate(0, 0)';
      });
    }
  }

  // =============================================
  // 5. GALLERY ITEM CLICK — Lightbox Effect
  // =============================================
  const galleryItems = document.querySelectorAll('.st-gallery__item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      if (!img || !img.src) return;

      // Create lightbox
      const lightbox = document.createElement('div');
      lightbox.className = 'st-lightbox';
      lightbox.innerHTML = `
        <div class="st-lightbox__overlay"></div>
        <div class="st-lightbox__content">
          <button class="st-lightbox__close" aria-label="Close lightbox">
            <i class="fas fa-times"></i>
          </button>
          <img src="${img.src}" alt="${img.alt || 'Gallery image'}" class="st-lightbox__image">
        </div>
      `;

      // Style the lightbox
      Object.assign(lightbox.style, {
        position: 'fixed',
        inset: '0',
        zIndex: '99999',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: '0',
        transition: 'opacity 0.3s ease'
      });

      const overlay = lightbox.querySelector('.st-lightbox__overlay');
      Object.assign(overlay.style, {
        position: 'absolute',
        inset: '0',
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)'
      });

      const content = lightbox.querySelector('.st-lightbox__content');
      Object.assign(content.style, {
        position: 'relative',
        maxWidth: '90vw',
        maxHeight: '90vh',
        zIndex: '2'
      });

      const lightboxImg = lightbox.querySelector('.st-lightbox__image');
      Object.assign(lightboxImg.style, {
        maxWidth: '100%',
        maxHeight: '85vh',
        borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        transform: 'scale(0.9)',
        transition: 'transform 0.3s ease'
      });

      const closeBtn = lightbox.querySelector('.st-lightbox__close');
      Object.assign(closeBtn.style, {
        position: 'absolute',
        top: '-40px',
        right: '0',
        background: 'rgba(255,255,255,0.1)',
        border: 'none',
        color: '#fff',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s'
      });

      closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255,255,255,0.2)';
      });
      closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'rgba(255,255,255,0.1)';
      });

      // Add to body
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';

      // Animate in
      requestAnimationFrame(() => {
        lightbox.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
      });

      // Close handlers
      function closeLightbox() {
        lightbox.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.9)';
        setTimeout(() => {
          lightbox.remove();
          document.body.style.overflow = '';
        }, 300);
      }

      closeBtn.addEventListener('click', closeLightbox);
      overlay.addEventListener('click', closeLightbox);

      // Close on Escape
      const escHandler = (e) => {
        if (e.key === 'Escape') {
          closeLightbox();
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);
    });
  });

  // =============================================
  // 6. HELP CARDS — Staggered Hover Lift
  // =============================================
  const helpCards = document.querySelectorAll('.st-help-card');
  helpCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const siblings = Array.from(this.parentElement.children);
      siblings.forEach(sib => {
        if (sib !== this) {
          sib.style.opacity = '0.6';
          sib.style.transform = 'scale(0.97)';
        }
      });
    });

    card.addEventListener('mouseleave', function() {
      const siblings = Array.from(this.parentElement.children);
      siblings.forEach(sib => {
        sib.style.opacity = '1';
        sib.style.transform = 'scale(1)';
      });
    });
  });

  // =============================================
  // 7. VIDEO PLAY TRACKING
  // =============================================
  const videos = document.querySelectorAll('.st-gallery__video video');
  videos.forEach(video => {
    video.addEventListener('play', function() {
      // Pause other videos when one starts playing
      videos.forEach(otherVideo => {
        if (otherVideo !== video && !otherVideo.paused) {
          otherVideo.pause();
        }
      });
    });
  });

  // =============================================
  // 8. COUNTER ANIMATION ON METRIC CARDS
  // =============================================
  const metricCards = document.querySelectorAll('.st-metric');
  const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'st-fadeInUp 0.6s ease forwards';
        metricObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  metricCards.forEach(card => {
    card.style.opacity = '0';
    metricObserver.observe(card);
  });

  // =============================================
  // 9. PARALLAX CTA SECTION BACKGROUND
  // =============================================
  const ctaSection = document.querySelector('.st-cta');
  if (ctaSection) {
    window.addEventListener('scroll', () => {
      const rect = ctaSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = 1 - (rect.top / windowHeight);
        const offset = progress * 20;
        ctaSection.style.backgroundPosition = `center ${offset}px`;
      }
    });
  }

  // =============================================
  // 10. COPY QUOTE TO CLIPBOARD (double-click)
  // =============================================
  const quotes = document.querySelectorAll('.st-quote');
  quotes.forEach(quote => {
    quote.addEventListener('dblclick', function() {
      const textEl = this.querySelector('.st-quote__text');
      if (!textEl) return;
      const text = textEl.textContent.trim();

      if (navigator.clipboard && text) {
        navigator.clipboard.writeText(`"${text}"`).then(() => {
          // Flash effect
          this.style.transition = 'background 0.2s';
          this.style.background = 'rgba(194, 65, 50, 0.08)';
          setTimeout(() => {
            this.style.background = '';
          }, 400);
        }).catch(() => {
          // Fallback: do nothing
        });
      }
    });
  });

  // =============================================
  // 11. TAG INTERACTION
  // =============================================
  const tags = document.querySelectorAll('.st-tag');
  tags.forEach(tag => {
    tag.addEventListener('click', function() {
      // Subtle scale pop on click
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });

});