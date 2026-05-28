const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(file => file.endsWith('.html'));

// The OLD desktop nested-dropdown-content block to replace.
// Use flexible whitespace matching so the updater still works when HTML indentation or line breaks vary.
const oldDesktopRegex = /<div class="nested-dropdown-content">[\s\S]*?<a href="student-network\.html"><i class="fas fa-eye"><\/i> CEEIIC Overview<\/a>[\s\S]*?<a href="ceeiic-programs\.html"><i class="fas fa-gift"><\/i> CEEIIC Programs<\/a>[\s\S]*?<a href="sweep\.html"><i class="fas fa-file-alt"><\/i> SWEEP<\/a>[\s\S]*?<\/div>/g;

// The NEW desktop nested-dropdown-content block
const newDesktopBlock = `<div class="nested-dropdown-content">
                            <button class="nested-dropdown-overview-toggle" onclick="toggleCeeiicSections(this)">
                                <span><i class="fas fa-eye"></i> CEEIIC Overview</span>
                                <i class="fas fa-chevron-right"></i>
                            </button>
                            <div class="nested-dropdown-inline-sections">
                                <a href="student-network.html#about"><i class="fas fa-info-circle"></i> About</a>
                                <a href="student-network.html#vision-mission"><i class="fas fa-low-vision"></i> Vision & Mission</a>
                                <a href="student-network.html#values"><i class="fas fa-heart"></i> Core Principles</a>
                                <a href="student-network.html#programs"><i class="fas fa-graduation-cap"></i> Programmes</a>
                                <a href="student-network.html#stakeholders"><i class="fas fa-handshake"></i> Stakeholders</a>
                                <a href="student-network.html#strategic-impact"><i class="fas fa-chart-line"></i> Strategic Impact</a>
                                <a href="student-network.html#target-beneficiaries"><i class="fas fa-users"></i> Beneficiaries</a>
                                <a href="student-network.html#recruitment"><i class="fas fa-user-plus"></i> Recruitment</a>
                                <a href="student-network.html#activities"><i class="fas fa-tasks"></i> Activities</a>
                                <a href="student-network.html#governance"><i class="fas fa-balance-scale"></i> Governance</a>
                            </div>
                            <a href="ceeiic-programs.html"><i class="fas fa-gift"></i> CEEIIC Programs</a>
                            <a href="sweep.html"><i class="fas fa-file-alt"></i> SWEEP</a>
                        </div>`;

const mobileOverviewInsert = `<a href="student-network.html" class="mobile-sub-item mobile-deep-item"><i class="fas fa-eye"></i> Overview Home</a>\n`;
const mobileOverviewPattern = /(<a href="student-network\.html#about"[^>]*><i class="fas fa-info-circle"><\/i>\s*About<\/a>)/g;
const mobileOverviewHomeRegex = /<a href="student-network\.html" class="mobile-sub-item mobile-deep-item"[\s\S]*?>[\s\S]*?Overview Home[\s\S]*?<\/a>/;

const oldMobileNestedBlockRegex = /<div class="mobile-dropdown mobile-nested">[\s\S]*?<button[^>]*>[\s\S]*?CEEIIC Student Network[\s\S]*?<\/button>[\s\S]*?<div class="mobile-dropdown-content">[\s\S]*?<\/div>\s*<\/div>/g;
const newMobileOverviewBlock = `<div class="mobile-dropdown-content">
                                    <a href="student-network.html" class="mobile-sub-item mobile-deep-item"><i class="fas fa-eye"></i> Overview Home</a>
                                    <a href="student-network.html#about" class="mobile-sub-item mobile-deep-item"><i class="fas fa-info-circle"></i> About</a>
                                    <a href="student-network.html#vision-mission" class="mobile-sub-item mobile-deep-item"><i class="fas fa-low-vision"></i> Vision & Mission</a>
                                    <a href="student-network.html#values" class="mobile-sub-item mobile-deep-item"><i class="fas fa-heart"></i> Core Principles</a>
                                    <a href="student-network.html#programs" class="mobile-sub-item mobile-deep-item"><i class="fas fa-graduation-cap"></i> Programmes</a>
                                    <a href="student-network.html#stakeholders" class="mobile-sub-item mobile-deep-item"><i class="fas fa-handshake"></i> Stakeholders</a>
                                    <a href="student-network.html#strategic-impact" class="mobile-sub-item mobile-deep-item"><i class="fas fa-chart-line"></i> Strategic Impact</a>
                                    <a href="student-network.html#target-beneficiaries" class="mobile-sub-item mobile-deep-item"><i class="fas fa-users"></i> Beneficiaries</a>
                                    <a href="student-network.html#recruitment" class="mobile-sub-item mobile-deep-item"><i class="fas fa-user-plus"></i> Recruitment</a>
                                    <a href="student-network.html#activities" class="mobile-sub-item mobile-deep-item"><i class="fas fa-tasks"></i> Activities</a>
                                    <a href="student-network.html#governance" class="mobile-sub-item mobile-deep-item"><i class="fas fa-balance-scale"></i> Governance</a>
                                    <a href="ceeiic-programs.html" class="mobile-sub-item mobile-deep-item"><i class="fas fa-gift"></i> CEEIIC Programs</a>
                                    <a href="sweep.html" class="mobile-sub-item mobile-deep-item"><i class="fas fa-file-alt"></i> SWEEP</a>
                                </div>`;

files.forEach(file => {
    const filePath = path.join(rootDir, file);
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('nested-dropdown-content')) {
            let updated = false;

            // Replace the old desktop dropdown block
            if (oldDesktopRegex.test(content)) {
                content = content.replace(oldDesktopRegex, newDesktopBlock);
                updated = true;
                console.log(`✓ Updated desktop nav in: ${file}`);
            }

            // Replace old mobile CEEIIC Overview block with expanded Overview Home menu
            if (oldMobileNestedBlockRegex.test(content)) {
                content = content.replace(oldMobileNestedBlockRegex, matched => matched.replace(/<div class="mobile-dropdown-content">[\s\S]*?<\/div>/, newMobileOverviewBlock));
                updated = true;
                console.log(`✓ Updated mobile CEEIIC Overview menu in: ${file}`);
            }

            // Add mobile CEEIIC Overview home link before About if the expanded menu exists but is missing it
            if (!mobileOverviewHomeRegex.test(content) && mobileOverviewPattern.test(content)) {
                content = content.replace(mobileOverviewPattern, `${mobileOverviewInsert}$1`);
                updated = true;
                console.log(`✓ Added mobile Overview Home link in: ${file}`);
            }

            if (updated) {
                fs.writeFileSync(filePath, content, 'utf8');
            } else {
                console.log(`- Skipped (already updated or different pattern): ${file}`);
            }
        } else {
            console.log(`- No nav found: ${file}`);
        }
    } catch (err) {
        console.log(`✗ Error with ${file}: ${err.message}`);
    }
});

console.log('\nDone!');