// ================================================
// HERO SECTION SLIDESHOW - SMOOTH WITH NO GAPS
// ================================================

(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        
        // DOM Elements
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.slider-dot');
        const heroSection = document.getElementById('heroSlideshowSection');
        const scrollIndicator = document.querySelector('.hero-scroll-indicator');
        
        let currentSlide = 0;
        let slideInterval;
        const intervalTime = 5000;
        let isTransitioning = false;
        
        // Preload all images to prevent gaps
        function preloadImages() {
            slides.forEach(slide => {
                const img = slide.querySelector('.hero-bg-img');
                if (img) {
                    const newImg = new Image();
                    newImg.src = img.src;
                }
            });
        }
        
        // ========== SLIDE FUNCTIONALITY ==========
        function showSlide(index) {
            if (isTransitioning) return;
            if (index === currentSlide) return;
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            isTransitioning = true;
            
            // Remove active class from current slide
            slides[currentSlide].classList.remove('active');
            
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Add active class to new slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            // Update current slide
            currentSlide = index;
            
            setTimeout(() => {
                isTransitioning = false;
            }, 600);
        }
        
        function nextSlide() {
            if (isTransitioning) return;
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) {
                newIndex = 0;
            }
            showSlide(newIndex);
        }
        
        function prevSlide() {
            if (isTransitioning) return;
            let newIndex = currentSlide - 1;
            if (newIndex < 0) {
                newIndex = slides.length - 1;
            }
            showSlide(newIndex);
        }
        
        // ========== AUTO SLIDESHOW ==========
        function startSlideshow() {
            if (slideInterval) clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
        }
        
        function stopSlideshow() {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
            }
        }
        
        // Pause on hover, resume on leave
        if (heroSection) {
            heroSection.addEventListener('mouseenter', stopSlideshow);
            heroSection.addEventListener('mouseleave', startSlideshow);
        }
        
        // ========== DOT NAVIGATION ==========
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                if (currentSlide === index) return;
                stopSlideshow();
                showSlide(index);
                startSlideshow();
            });
        });
        
        // ========== KEYBOARD NAVIGATION ==========
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                stopSlideshow();
                nextSlide();
                startSlideshow();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                stopSlideshow();
                prevSlide();
                startSlideshow();
            }
        });
        
        // ========== SCROLL INDICATOR ==========
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function() {
                const nextElement = heroSection.nextElementSibling;
                if (nextElement) {
                    nextElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    window.scrollBy({
                        top: window.innerHeight,
                        behavior: 'smooth'
                    });
                }
            });
        }
        
        // ========== TOUCH SWIPE ==========
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (heroSection) {
            heroSection.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            heroSection.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                const swipeThreshold = 50;
                const diff = touchEndX - touchStartX;
                
                if (Math.abs(diff) < swipeThreshold) return;
                
                stopSlideshow();
                if (diff > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }
                startSlideshow();
            });
        }
        
        // ========== ENSURE NO BLANK GAPS ==========
        function ensureNoGaps() {
            // Make sure all slides have the same dimensions
            const height = heroSection.offsetHeight;
            slides.forEach(slide => {
                slide.style.height = height + 'px';
            });
        }
        
        window.addEventListener('resize', ensureNoGaps);
        
        // ========== INITIALIZE ==========
        preloadImages();
        
        if (slides.length > 0 && !slides[0].classList.contains('active')) {
            slides[0].classList.add('active');
            dots[0].classList.add('active');
            currentSlide = 0;
        }
        
        ensureNoGaps();
        startSlideshow();
        
        console.log('Hero slideshow initialized with 3 images - no gaps, reduced glow');
    });
})();

/**
 * abbreviations.js
 * UCfERI Abbreviations Guide — Load More, Search & PDF Download
 */

(function () {
    "use strict";

    /* ── Config ───────────────────────────────────────────────── */
    const INITIAL_VISIBLE = 12;   // Cards shown on first load
    const LOAD_STEP       = 9;    // Cards revealed per "Show More" click

    /* ── DOM refs ─────────────────────────────────────────────── */
    const grid          = document.getElementById("abbreviationsGrid");
    const searchInput   = document.getElementById("abbrSearch");
    const loadMoreBtn   = document.getElementById("abbrLoadMore");
    const collapseBtn   = document.getElementById("abbrCollapse");
    const loadControls  = document.getElementById("abbrLoadControls");
    const noResults     = document.getElementById("abbrNoResults");
    const searchTerm    = document.getElementById("abbrSearchTerm");
    const visibleCount  = document.getElementById("abbrVisibleCount");
    const totalCount    = document.getElementById("abbrTotalCount");
    const remainingBadge = document.getElementById("abbrRemaining");
    const downloadBtn   = document.getElementById("downloadAbbrPdf");

    /* ── State ────────────────────────────────────────────────── */
    let allCards     = [];   // All card elements (deduped)
    let filteredCards = [];  // Cards matching current search
    let shownCount   = 0;    // How many are currently un-hidden

    /* ── Init ─────────────────────────────────────────────────── */
    function init() {
        // Deduplicate cards (same code + meaning combo)
        const seen = new Set();
        const raw  = Array.from(grid.querySelectorAll(".abbreviation-card"));

        raw.forEach(card => {
            const key = (card.dataset.code + "|" + card.dataset.meaning).toLowerCase();
            if (seen.has(key)) {
                card.remove();          // Remove duplicate from DOM
            } else {
                seen.add(key);
                allCards.push(card);
                card.style.display = "none"; // Hide everything first
            }
        });

        // Sort alphabetically by code
        allCards.sort((a, b) => a.dataset.code.localeCompare(b.dataset.code));
        allCards.forEach(c => grid.appendChild(c)); // Re-append in sorted order

        filteredCards = [...allCards];
        totalCount.textContent = allCards.length;

        // Show initial batch
        shownCount = 0;
        revealCards(INITIAL_VISIBLE);
        updateControls();
    }

    /* ── Reveal next N cards ──────────────────────────────────── */
    function revealCards(n) {
        const toShow = filteredCards.slice(shownCount, shownCount + n);
        toShow.forEach(card => {
            card.style.display = "";
            // Stagger entrance animation
            card.classList.remove("abbr-card-visible");
            requestAnimationFrame(() => {
                requestAnimationFrame(() => card.classList.add("abbr-card-visible"));
            });
        });
        shownCount += toShow.length;
        visibleCount.textContent = shownCount;
        updateControls();
    }

    /* ── Hide all filtered cards ──────────────────────────────── */
    function hideAllFiltered() {
        filteredCards.forEach(c => {
            c.style.display = "none";
            c.classList.remove("abbr-card-visible");
        });
    }

    /* ── Update Load More / Collapse button state ─────────────── */
    function updateControls() {
        const remaining = filteredCards.length - shownCount;
        const isSearching = searchInput.value.trim().length > 0;

        // Hide controls entirely during active search
        if (isSearching) {
            loadControls.hidden = true;
            return;
        }

        loadControls.hidden = false;

        if (remaining > 0) {
            loadMoreBtn.hidden = false;
            remainingBadge.textContent = "+" + remaining;
            collapseBtn.hidden = shownCount <= INITIAL_VISIBLE;
        } else {
            loadMoreBtn.hidden = true;
            collapseBtn.hidden = shownCount <= INITIAL_VISIBLE;
        }
    }

    /* ── Search / Filter ──────────────────────────────────────── */
    function applySearch(query) {
        const q = query.trim().toLowerCase();

        // Reset visibility on all cards
        allCards.forEach(c => {
            c.style.display = "none";
            c.classList.remove("abbr-card-visible");
        });

        if (!q) {
            // Restore non-search state
            filteredCards = [...allCards];
            shownCount = 0;
            noResults.hidden = true;
            revealCards(INITIAL_VISIBLE);
            updateControls();
            return;
        }

        // Filter
        filteredCards = allCards.filter(card => {
            return (
                card.dataset.code.toLowerCase().includes(q) ||
                card.dataset.meaning.toLowerCase().includes(q)
            );
        });

        if (filteredCards.length === 0) {
            noResults.hidden = false;
            searchTerm.textContent = query;
            visibleCount.textContent = 0;
            totalCount.textContent = allCards.length;
            loadControls.hidden = true;
            return;
        }

        noResults.hidden = true;
        shownCount = 0;

        // Show all matches during search (no pagination)
        filteredCards.forEach((card, i) => {
            card.style.display = "";
            setTimeout(() => card.classList.add("abbr-card-visible"), i * 30);
        });
        shownCount = filteredCards.length;
        visibleCount.textContent = shownCount;
        updateControls();
    }

    /* ── Highlight matching text ──────────────────────────────── */
    function highlightText(el, query) {
        // Simple highlight: wrap matches in <mark>
        // Only applied to .abbreviation-meaning and .abbreviation-code
        const targets = el.querySelectorAll(".abbreviation-code, .abbreviation-meaning");
        targets.forEach(t => {
            const original = t.dataset.original || t.textContent;
            t.dataset.original = original;

            if (!query) {
                t.innerHTML = original;
                return;
            }

            const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const regex   = new RegExp(`(${escaped})`, "gi");
            t.innerHTML   = original.replace(regex, "<mark>$1</mark>");
        });
    }

    /* ── PDF Download ─────────────────────────────────────────── */
    function downloadPDF() {
        if (typeof window.jspdf === "undefined" && typeof jsPDF === "undefined") {
            alert("PDF library is still loading. Please try again in a moment.");
            return;
        }

        const { jsPDF } = window.jspdf || window;
        const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

        const pageW  = doc.internal.pageSize.getWidth();
        const pageH  = doc.internal.pageSize.getHeight();
        const margin = 18;
        const colW   = (pageW - margin * 2 - 8) / 2; // Two columns
        let   y      = 0;

        /* ── Header ── */
        doc.setFillColor(3, 34, 77);
        doc.rect(0, 0, pageW, 28, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("UCfERI Abbreviations Guide", margin, 12);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text("UNIVEN Centre for Entrepreneurship and Rapid Incubation", margin, 20);

        const today = new Date().toLocaleDateString("en-ZA", {
            day: "2-digit", month: "long", year: "numeric"
        });
        doc.text("Generated: " + today, pageW - margin, 20, { align: "right" });

        y = 36;

        /* ── Sort all cards alphabetically ── */
        const sorted = [...allCards].sort((a, b) =>
            a.dataset.code.localeCompare(b.dataset.code)
        );

        const colStartX = [margin, margin + colW + 8];
        let col = 0;

        sorted.forEach((card, idx) => {
            const code    = card.dataset.code;
            const meaning = card.dataset.meaning;
            const isManual = card.classList.contains("is-manual");

            // Estimate row height (wrap meaning text)
            const lines    = doc.splitTextToSize(meaning, colW - 8);
            const rowH     = 8 + lines.length * 4.5 + 6;

            // New page check
            if (y + rowH > pageH - 18) {
                if (col === 0) {
                    col = 1; // Switch to second column
                } else {
                    doc.addPage();
                    addPageFooter(doc, pageW, pageH, margin);
                    y   = 24;
                    col = 0;
                }
            }

            const x = colStartX[col];

            // Card background
            doc.setFillColor(isManual ? 250 : 246, isManual ? 250 : 249, 254);
            doc.roundedRect(x, y, colW, rowH, 2.5, 2.5, "F");

            // Top accent line
            doc.setFillColor(isManual ? 200 : 3, isManual ? 130 : 34, isManual ? 60 : 77);
            doc.rect(x, y, colW, 2, "F");

            // Code pill background
            doc.setFillColor(225, 230, 243);
            doc.roundedRect(x + 4, y + 5, Math.min(code.length * 5.5 + 10, colW - 8), 7, 2, 2, "F");

            // Code text
            doc.setFont("helvetica", "bold");
            doc.setFontSize(7.5);
            doc.setTextColor(3, 34, 77);
            doc.text(code, x + 9, y + 10.5);

            // Meaning text
            doc.setFont("helvetica", "normal");
            doc.setFontSize(7);
            doc.setTextColor(80, 90, 110);
            doc.text(lines, x + 4, y + 17);

            y += rowH + 4;

            // After each pair (col 1 done), reset y for next row if needed
            if (col === 1) {
                // Both columns filled one row — handled via independent y per column
                // Simple single-y approach: after col 1, y already advanced
                col = 0;
            } else {
                col = 1;
                y -= (rowH + 4); // Rewind y so col 1 aligns with col 0
            }

            // After last item in col 1, advance y properly
            if (col === 0 && idx === sorted.length - 1) {
                y += (rowH + 4);
            }
        });

        addPageFooter(doc, pageW, pageH, margin);

        /* ── Legend ── */
        y = pageH - 30;
        doc.setFont("helvetica", "italic");
        doc.setFontSize(7);
        doc.setTextColor(140, 148, 160);
        doc.text(
            "Cards with a coloured top accent are standard entries. Darker/warm accents indicate manually added entries.",
            margin, y
        );

        doc.save("UCfERI_Abbreviations_Guide.pdf");
    }

    function addPageFooter(doc, pageW, pageH, margin) {
        doc.setFillColor(3, 34, 77);
        doc.rect(0, pageH - 10, pageW, 10, "F");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(180, 190, 210);
        doc.text("UCfERI — University of Venda", margin, pageH - 3.5);
        doc.text("ucferi.ac.za", pageW - margin, pageH - 3.5, { align: "right" });
    }

    /* ── Event Listeners ──────────────────────────────────────── */
    loadMoreBtn.addEventListener("click", () => {
        revealCards(LOAD_STEP);
    });

    collapseBtn.addEventListener("click", () => {
        // Hide everything beyond initial
        const toHide = filteredCards.slice(INITIAL_VISIBLE);
        toHide.forEach(c => {
            c.classList.remove("abbr-card-visible");
            setTimeout(() => { c.style.display = "none"; }, 200);
        });
        shownCount = Math.min(INITIAL_VISIBLE, filteredCards.length);
        visibleCount.textContent = shownCount;

        setTimeout(() => {
            updateControls();
            // Smooth scroll back up to section
            document.getElementById("abbreviations").scrollIntoView({
                behavior: "smooth", block: "start"
            });
        }, 250);
    });

    let searchDebounce;
    searchInput.addEventListener("input", (e) => {
        clearTimeout(searchDebounce);
        const q = e.target.value;
        searchDebounce = setTimeout(() => {
            applySearch(q);
            // Highlight only on non-empty
            if (q.trim()) {
                filteredCards.forEach(c => highlightText(c, q.trim()));
            } else {
                allCards.forEach(c => highlightText(c, ""));
            }
        }, 180);
    });

    downloadBtn.addEventListener("click", downloadPDF);

    /* ── Kick off ─────────────────────────────────────────────── */
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();
