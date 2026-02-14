<parameter name="content"># UCfERI Website Page Flow

## Website Overview
This document outlines the pages and navigation structure of the University of Venda Centre for Entrepreneurship & Rapid Incubation (UCfERI) website.

---

## Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                        MAIN NAVIGATION                          │
├─────────────────────────────────────────────────────────────────┤
│  Home ──── About Us ──── Programs ──── Media ──── Contact     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Pages List

### 1. Home Page (index.html)
**Purpose:** Main landing page showcasing UCfERI's programs, services, and impact

**Key Sections:**
- Hero Section with sliding images
- About Section
- Our Services (Programs Preview)
- Our Programs / Services Grid
- Upcoming Events
- Our Credentials / Trust Section
- Call to Action Section
- Partners Section

**Navigation Links:**
- Links to: about.html, programs.html, incubation.html, sweep.html, contact.html

---

### 2. About Us (about.html)
**Purpose:** Information about UCfERI's mission, vision, history, and team

**Key Sections:**
- Page Header with breadcrumb
- Mission & Vision
- History Timeline
- Leadership Team
- Statistics Section
- UNIVEN Entrepreneurship Ecosystem

**Navigation Links:**
- Anchor links: #mission&vision, #history
- Links to: index.html, programs.html, incubation.html, sweep.html, contact.html

---

### 3. Programs (programs.html)
**Purpose:** Overview of all entrepreneurial programs offered

**Key Sections:**
- Business Incubation program details
- SWEEP Program details
- Training Programs

**Navigation Links:**
- Links to: incubation.html, sweep.html, index.html, about.html, contact.html

---

### 4. Business Incubation (incubation.html)
**Purpose:** Detailed information about the business incubation program

**Key Sections:**
- Program description
- Benefits
- Application process
- Support services

**Navigation Links:**
- Links to: programs.html, sweep.html, index.html, about.html, contact.html

---

### 5. SWEEP Program (sweep.html)
**Purpose:** Student Women Economic Empowerment Programme details

**Key Sections:**
- Program description
- Leadership positions (7 Executive Positions)
- Sisterhood Circle
- Application details

**Navigation Links:**
- Links to: programs.html, incubation.html, index.html, about.html, contact.html

---

### 6. Media / Resources (resources.html)
**Purpose:** Blog, News, Events, and Success Stories

**Key Sections:**
- Blog section (#blog)
- News section (#news)
- Events section (#events)
- Success Stories

**Navigation Links:**
- Links to: story.html, index.html, about.html, programs.html, contact.html

---

### 7. Success Stories (story.html)
**Purpose:** Showcase of successful entrepreneurs

**Navigation Links:**
- Links to: resources.html, index.html, about.html, programs.html, contact.html

---

### 8. Contact (contact.html)
**Purpose:** Contact information and inquiry form

**Key Sections:**
- Contact details
- Location
- Inquiry form
- Partner section (#partner)

**Navigation Links:**
- Links to: index.html, about.html, programs.html

---

## Navigation Structure

### Main Navigation Bar
| Item | Page | Dropdown Items |
|------|------|----------------|
| Home | index.html | - |
| About Us | about.html | Mission, Vision, History |
| Programs | programs.html | Business Incubation, SWEEP, Training |
| Media | resources.html | Blog, News, Events, Success Stories |
| Contact | contact.html | - |

### Footer Quick Links
- Home
- About Us
- Business Incubation
- SWEEP Program
- All Programs

---

## Dropdown Menu Flow

```
Home (index.html)
    |
    +-- About Us (about.html)
    |       |
    |       +-- Mission (#mission&vision)
    |       +-- Vision (#mission&vision)
    |       +-- History (#history)
    |
    +-- Programs (programs.html)
    |       |
    |       +-- Business Incubation (incubation.html)
    |       +-- SWEEP Program (sweep.html)
    |       +-- Training Programs (programs.html#training)
    |
    +-- Media (resources.html)
    |       |
    |       +-- Blog (resources.html#blog)
    |       +-- News (resources.html#news)
    |       +-- Events (resources.html#events)
    |       +-- Success Story (story.html)
    |
    +-- Contact (contact.html)
```

---

## Page Hierarchy

```
index.html (Home)
    |
    +-- about.html (About Us)
    |       +-- #mission&vision
    |       +-- #history
    |
    +-- programs.html (Programs)
    |       +-- incubation.html (Business Incubation)
    |       +-- sweep.html (SWEEP Program)
    |       +-- #training (Training Programs)
    |
    +-- resources.html (Media)
    |       +-- #blog
    |       +-- #news
    |       +-- #events
    |       +-- story.html (Success Stories)
    |
    +-- contact.html (Contact)
            +-- #partner (Partner Section)
```

---

## External Resources Referenced

- Font Awesome 6.4.0 (Icons)
- Google Fonts (Manrope, Source Serif Pro)
- Google Analytics (G-H4L52LZVHL)
- EDHE (www.edhe.co.za)

---

## CSS Files

- css/index.css - Home page styles
- css/about.css - About page styles
- css/programs.css - Programs page styles
- css/incubation.css - Incubation page styles
- css/sweep.css - SWEEP page styles
- css/resources.css - Resources page styles
- css/story.css - Story page styles
- css/contact.css - Contact page styles
- css/mobile.css - Mobile responsive styles

## JavaScript Files

- js/index.js - Home page functionality
- js/about.js - About page functionality
- js/programs.js - Programs page functionality
- js/incubation.js - Incubation page functionality
- js/sweep.js - SWEEP page functionality
- js/resources.js - Resources page functionality
- js/story.js - Story page functionality
- js/contact.js - Contact page functionality
- js/mobile-menu.js - Mobile menu functionality
</parameter>
