# CSS Conflicts Documentation

## Overview
This document outlines the conflicting CSS styles found across multiple CSS files in the UCFeri Website project and the proposed resolutions.

---

## 1. CSS Custom Properties (Variables) Conflicts

### Primary Color (`--primary-color`)
| File | Value | Status |
|------|-------|--------|
| about.css | #ee9919 (but uses #110de0 for secondary) | ❌ Conflict |
| blog.css | #2316da | ❌ Different |
| contact.css | #3498db | ❌ Different |
| events.css | #2316da | ❌ Different |
| header-footer.css | #2316da | ✅ Standard |
| header.css | #2316da (as --header-primary) | ✅ Standard |
| incubation.css | #3498db | ❌ Different |
| index.css | #2316da | ✅ Standard |
| news.css | #2316da | ✅ Standard |
| programs.css | #1512d3 | ❌ Different |
| resources.css | #3498db | ❌ Different |
| story.css | #3498db | ❌ Different |
| sweep.css | #3498db | ❌ Different |

### Secondary Color (`--secondary-color`)
| File | Value | Status |
|------|-------|--------|
| about.css | #110de0 (as primary) | ❌ Conflict |
| blog.css | #df7b1d | ❌ Different |
| contact.css | #9b59b6 | ❌ Different |
| events.css | #df7b1d | ❌ Different |
| header-footer.css | #df7b1d | ✅ Standard |
| header.css | #df7b1d (as --header-secondary) | ✅ Standard |
| incubation.css | #9b59b6 | ❌ Different |
| index.css | #df7b1d | ✅ Standard |
| news.css | #df7b1d | ✅ Standard |
| programs.css | #d8861c | ❌ Different |
| resources.css | #9b59b6 | ❌ Different |
| story.css | #9b59b6 | ❌ Different |
| sweep.css | #9b59b6 | ❌ Different |

### Accent Color (`--accent-color`)
| File | Value | Status |
|------|-------|--------|
| about.css | #3ba710 | ❌ Different |
| blog.css | #e67e22 | ✅ Standard |
| contact.css | #e67e22 | ✅ Standard |
| events.css | #e67e22 | ✅ Standard |
| header-footer.css | #e67e22 | ✅ Standard |
| header.css | #e67b22 | ⚠️ Slight |
| incubation.css | #e67e22 | ✅ Standard |
| index.css | #e67e22 | ✅ Standard |
| news.css | #e67e22 | ✅ Standard |
| programs.css | #e67e22 | ✅ Standard |
| resources.css | #e67e22 | ✅ Standard |
| story.css | #e67e22 | ✅ Standard |
| sweep.css | #e67e22 | ✅ Standard |

---

## 2. Proposed Standard Values

Based on the analysis, the following values are recommended as the standard:

```
css
:root {
    /* Primary Colors */
    --primary-color: #2316da;      /* Main brand blue - Most commonly used */
    --secondary-color: #df7b1d;   /* Orange - Secondary brand color */
    --accent-color: #e67e22;      /* Accent orange - Most consistent across files */
    
    /* Status Colors */
    --success-color: #27ae60;     /* Green - Success states */
    --danger-color: #e74c3c;      /* Red - Danger/Error states */
    --warning-color: #f39c12;     /* Yellow - Warning states */
    
    /* Neutral Colors */
    --dark-color: #2c3e50;        /* Dark blue-gray - Primary text */
    --light-color: #ecf0f1;       /* Light gray - Backgrounds */
    --gray-color: #95a5a6;        /* Gray - Secondary text */
    --white: #ffffff;             /* White */
    --border: #e0e0e0;           /* Border color */
    
    /* Text Colors */
    --text: #333333;             /* Primary text */
    --text-light: #666666;       /* Secondary text */
    
    /* Shadows */
    --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
    --shadow-md: 0 4px 12px rgba(0,0,0,0.12);
    --shadow-lg: 0 8px 24px rgba(0,0,0,0.16);
    
    /* Other */
    --transition: all 0.3s ease;
    --border-radius: 8px;
}
```

---

## 3. Duplicate Selectors Conflicts

### `.btn` class
- **about.css**: Uses `--primary` / `--secondary` variables with different values
- **blog.css**: Uses `--primary-color` / `--secondary-color` 
- **contact.css**: Different padding and border-radius values
- **header-footer.css**: Different border-radius (8px vs others)
- **header.css**: Different padding values
- **incubation.css**: Uses `--transition` variable
- **index.css**: Has duplicate declarations for `.btn-large`

### `.container` class
- **about.css**: max-width: 1400px
- **blog.css**: max-width: 1200px
- **contact.css**: max-width not specified in :root
- **header-footer.css**: max-width: 1200px
- **header.css**: Not defined in :root
- **incubation.css**: max-width: 1200px
- **index.css**: max-width: 1400px
- **programs.css**: max-width: 1200px

### `.page-header` class
- **about.css**: padding: 100px 0 60px; background gradient
- **blog.css**: padding: 60px 0 40px; different gradient
- **contact.css**: Not used as main class
- **events.css**: Not explicitly styled
- **header-footer.css**: padding: 60px 0 40px; gradient
- **header.css**: padding: 100px 0 60px; gradient
- **incubation.css**: Different structure with image support
- **index.css**: Not used
- **news.css**: Not explicitly styled
- **programs.css**: padding: 80px 0; gradient
- **sweep.css**: Different gradient (purple)

### `.announcement-bar` class
- **about.css**: padding: 15px 0; gradient
- **blog.css**: Not defined
- **contact.css**: Not defined
- **events.css**: Not defined
- **header-footer.css**: padding: 10px 0; gradient
- **header.css**: padding: 15px 0; gradient
- **incubation.css**: Not defined
- **index.css**: padding: 15px 0; gradient
- **programs.css**: padding: 10px 0; gradient

### `.logo` and `.logo-text` classes
- Multiple files define similar but slightly different styles
- Inconsistent font sizes for logo text
- Different color values for logo text

---

## 4. Resolution Strategy

### Step 1: Create Unified Base CSS
Create a single `base.css` file with all standardized CSS custom properties and common base styles.

### Step 2: Remove Duplicate Variable Declarations
From each page-specific CSS file, remove the `:root` block that redefines colors. Keep page-specific styles only.

### Step 3: Update HTML Files
Ensure each HTML file loads the base CSS first, then page-specific CSS.

### Step 4: Use CSS Variables Consistently
All files should reference `--primary-color`, `--secondary-color`, etc. instead of hardcoding color values.

---

## 5. Files Affected

### CSS Files to Modify:
1. `about.css` - Remove :root variables, keep page-specific styles
2. `blog.css` - Remove :root variables, keep page-specific styles
3. `contact.css` - Remove :root variables, keep page-specific styles
4. `events.css` - Remove :root variables, keep page-specific styles
5. `header-footer.css` - Consider merging with header.css
6. `header.css` - Consider merging with header-footer.css
7. `incubation.css` - Remove :root variables, keep page-specific styles
8. `index.css` - Remove duplicate declarations, keep page-specific styles
9. `mobile.css` - Keep as is (no variable conflicts)
10. `news.css` - Remove :root variables, keep page-specific styles
11. `programs.css` - Remove :root variables, keep page-specific styles
12. `resources.css` - Remove :root variables, keep page-specific styles
13. `story.css` - Remove :root variables, keep page-specific styles
14. `sweep.css` - Remove :root variables, keep page-specific styles

### New File to Create:
- `css/base.css` - Unified base styles and CSS variables

---

## 6. Action Items

- [ ] Create `css/base.css` with standardized CSS custom properties
- [ ] Remove duplicate `:root` declarations from all page-specific CSS files
- [ ] Update HTML files to include base.css before page-specific CSS
- [ ] Test all pages to ensure styles render correctly
- [ ] Verify responsive design works on all pages

---

## 7. Notes

- The color `#2316da` (primary) and `#df7b1d` (secondary) appear most frequently and should be the standard
- The accent color `#e67e22` is consistent across most files
- Page-specific styles (like `.featured-event-card`, `.program-card`, etc.) should remain in their respective files
- Common components (header, footer, buttons, containers) should use the base.css variables
