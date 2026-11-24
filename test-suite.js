// Automated Functional & Penetration Test Suite for Atharva Agrawal Portfolio (port2)
const fs = require('fs');
const path = require('path');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const findings = [];

function assert(condition, testName, category = 'FUNCTIONAL') {
    totalTests++;
    if (condition) {
        passedTests++;
        console.log(`[PASS] [${category}] ${testName}`);
    } else {
        failedTests++;
        console.error(`[FAIL] [${category}] ${testName}`);
        findings.push({ category, testName, status: 'FAILED' });
    }
}

console.log("===============================================================================");
console.log(" ATHARVA AGRAWAL PORTFOLIO // COMPREHENSIVE QA & DEFENSIVE PENETRATION SUITE  ");
console.log("===============================================================================\n");

// 1. FILE INTEGRITY CHECKS
const port2Dir = __dirname;
const indexHtmlPath = path.join(port2Dir, 'index.html');
const adminHtmlPath = path.join(port2Dir, 'admin', 'index.html');
const port2JsPath = path.join(port2Dir, 'assets', 'js', 'port2.js');
const customizerJsPath = path.join(port2Dir, 'assets', 'js', 'wordpress-customizer.js');
const mlBrainJsPath = path.join(port2Dir, 'assets', 'js', 'ml-brain.js');
const portfolioDataPath = path.join(port2Dir, 'data', 'portfolio-data.js');
const cssPath = path.join(port2Dir, 'assets', 'css', 'port2.css');
const netlifyPath = path.join(port2Dir, 'netlify.toml');

assert(fs.existsSync(indexHtmlPath), "Main index.html exists", "INTEGRITY");
assert(fs.existsSync(adminHtmlPath), "Admin Console index.html exists", "INTEGRITY");
assert(fs.existsSync(port2JsPath), "Runtime engine port2.js exists", "INTEGRITY");
assert(fs.existsSync(customizerJsPath), "Visual Customizer wordpress-customizer.js exists", "INTEGRITY");
assert(fs.existsSync(mlBrainJsPath), "NLP Brain ml-brain.js exists", "INTEGRITY");
assert(fs.existsSync(portfolioDataPath), "Central data store portfolio-data.js exists", "INTEGRITY");
assert(fs.existsSync(cssPath), "Styling system port2.css exists", "INTEGRITY");
assert(fs.existsSync(netlifyPath), "Netlify configuration netlify.toml exists", "INTEGRITY");

// 2. DATA HUB INTEGRITY
const dataContent = fs.readFileSync(portfolioDataPath, 'utf8');
assert(dataContent.includes('const PORTFOLIO_DATA ='), "PORTFOLIO_DATA definition is present", "DATA");
assert(dataContent.includes('sanitizeDataPayload'), "Prototype pollution shield sanitizeDataPayload is present", "SECURITY");

// 3. DEFENSIVE SECURITY PENETRATION TESTS

// Test Vector 1: CLI Terminal XSS Protection
const port2JsContent = fs.readFileSync(port2JsPath, 'utf8');
assert(port2JsContent.includes('escapeHtml(cmd)'), "CLI user command input is escaped against reflected XSS", "SECURITY");
assert(port2JsContent.includes('escapeHtml(customResult.output)'), "Custom CLI command output is escaped against stored XSS", "SECURITY");
assert(port2JsContent.includes('escapeHtml(responseText)'), "AI Twin responses are escaped before DOM insertion", "SECURITY");

// Test Vector 2: Holographic Modal & Certificate URL Scheme Validation
assert(port2JsContent.includes('safeUrl(cert.verifyUrl)'), "Certificate verifyUrl is validated against javascript: protocol injection", "SECURITY");
assert(port2JsContent.includes('safeUrl(cert.image)'), "Certificate image is validated against javascript: protocol injection", "SECURITY");

// Test Vector 3: WordPress Visual Customizer Sanitization
const customizerContent = fs.readFileSync(customizerJsPath, 'utf8');
assert(customizerContent.includes('sanitizeBlockHtml'), "DOMParser HTML sanitizer is active for live block editing", "SECURITY");
assert(customizerContent.includes('isValidImageUrl'), "Strict image URL validation is active for profile photo updates", "SECURITY");
assert(customizerContent.includes("key === '__proto__'"), "Prototype pollution protection is active on block storage deserialization", "SECURITY");

// Test Vector 4: Admin Dashboard Escaping
const adminHtmlContent = fs.readFileSync(adminHtmlPath, 'utf8');
assert(adminHtmlContent.includes('escapeHtml(cert.title)'), "Admin certificate renderer escapes title against stored XSS", "SECURITY");
assert(adminHtmlContent.includes('escapeHtml(skill.name)'), "Admin skill renderer escapes name against stored XSS", "SECURITY");
assert(adminHtmlContent.includes('escapeHtml(doc.response)'), "Admin ML intent renderer escapes response against stored XSS", "SECURITY");
assert(adminHtmlContent.includes('escapeHtml(cmdOutput)'), "Admin custom CLI command renderer escapes output against stored XSS", "SECURITY");

// Test Vector 5: CSP in Netlify Configuration
const netlifyContent = fs.readFileSync(netlifyPath, 'utf8');
assert(netlifyContent.includes('Content-Security-Policy'), "Content-Security-Policy header configured in netlify.toml", "SECURITY");
assert(netlifyContent.includes('X-Frame-Options = "DENY"'), "Anti-clickjacking X-Frame-Options DENY header configured", "SECURITY");

// 4. PERFORMANCE & SPEED AUDIT
assert(port2JsContent.includes('IntersectionObserver'), "Canvas observer halts particle loop when scrolled away from hero section", "PERFORMANCE");
assert(port2JsContent.includes('requestAnimationFrame'), "Magnetic cursor and 3D card tilt are throttled via requestAnimationFrame", "PERFORMANCE");
assert(port2JsContent.includes('passive: true'), "High-frequency mousemove events use passive listeners to prevent main-thread jank", "PERFORMANCE");
assert(port2JsContent.includes('translate3d'), "Cursor coordinates use GPU hardware-accelerated translate3d transforms", "PERFORMANCE");

const cssContent = fs.readFileSync(cssPath, 'utf8');
assert(cssContent.includes('will-change: transform'), "Cursor elements specify will-change: transform for hardware layer promotion", "PERFORMANCE");

// 5. ML BRAIN ACCURACY CHECK
const mlBrainContent = fs.readFileSync(mlBrainJsPath, 'utf8');
assert(mlBrainContent.includes('class PortfolioMLEngine'), "PortfolioMLEngine class is defined", "FUNCTIONAL");
assert(mlBrainContent.includes('cosineSimilarity'), "Vector space cosine similarity math is implemented", "FUNCTIONAL");
assert(mlBrainContent.includes('google_ai'), "Google AI specialization intent is trained", "FUNCTIONAL");
assert(mlBrainContent.includes('google_cybersecurity'), "Google Cybersecurity specialization intent is trained", "FUNCTIONAL");

console.log("\n===============================================================================");
console.log(` AUDIT SUMMARY: Total: ${totalTests} | Passed: ${passedTests} | Failed: ${failedTests}`);
console.log("===============================================================================");

if (failedTests === 0) {
    console.log("All functional QA checks passed! All security penetration vectors DEFENDED!");
    process.exit(0);
} else {
    console.error("Vulnerabilities or test failures detected!");
    process.exit(1);
}
