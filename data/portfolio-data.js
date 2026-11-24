/* ==========================================================================
   ATHARVA AGRAWAL // PORTFOLIO DATA HUB & WORDPRESS-GRADE CMS ENGINE
   ========================================================================== */

const PORTFOLIO_DATA = {
    // 1. Basic Profile & Brand Identity
    profile: {
        name: "Atharva Agrawal",
        brandName: "atharva.ai",
        monogram: "AA",
        title: "Autonomous AI · Cyber Defense · Innovation Engine",
        school: "Brighton International School, Raipur",
        location: "Raipur, Chhattisgarh, India",
        email: "atharva.agrawal@example.com",
        web3FormsKey: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        socials: {
            instagram: "https://www.instagram.com/atharva.agrawal8/",
            linkedin: "https://www.linkedin.com/in/atharvaagrawal8/",
            github: "https://github.com/atharvaagrawal8",
            twitter: "https://twitter.com/atharvaagrawal8"
        }
    },

    // 2. Dynamic WordPress Navigation Menus (Add, Edit, Reorder, Delete)
    navigation: [
        { id: "nav_bento", label: "Bento Matrix", icon: "fas fa-th-large", target: "#matrix-bento", visible: true },
        { id: "nav_intel", label: "Intel & Bio", icon: "fas fa-fingerprint", target: "#intel", visible: true },
        { id: "nav_vault", label: "Cert Vault", icon: "fas fa-shield-alt", target: "#vault", visible: true },
        { id: "nav_projects", label: "Prototypes", icon: "fas fa-laptop-code", target: "#projects", visible: true },
        { id: "nav_arena", label: "Arena", icon: "fas fa-trophy", target: "#arena", visible: true },
        { id: "nav_uplink", label: "Uplink", icon: "fas fa-satellite-dish", target: "#uplink", visible: true }
    ],

    // 3. WordPress Appearance & Minute Theme Controls
    appearance: {
        primaryColor: "#06b6d4",       // Cyber Cyan
        secondaryColor: "#10b981",     // Neon Emerald
        accentColor: "#8b5cf6",        // Electric Violet
        bgColor: "#030712",            // Deep Space Black
        cardBg: "rgba(15, 23, 42, 0.65)",
        fontHeading: "'Syne', sans-serif",
        fontBody: "'Plus Jakarta Sans', sans-serif",
        fontMono: "'JetBrains Mono', monospace",
        glowIntensity: "1",            // 0.5 to 2
        cardBorderRadius: "24px",      // 8px to 32px
        showAudioPlayer: true,
        showMatrixCli: true,
        showParticles: true,
        customCss: ""
    },

    // 4. Section Visibility & Layout Manager (WordPress Gutenberg-style block toggle)
    sections: [
        { id: "hero", name: "Kinetic Hero Section", visible: true },
        { id: "matrix-bento", name: "Bento Capability Matrix", visible: true },
        { id: "intel", name: "Operative Research Dossier", visible: true },
        { id: "vault", name: "3D Certificate Vault (24 Certs)", visible: true },
        { id: "projects", name: "Featured Engineering Prototypes", visible: true },
        { id: "arena", name: "National Arenas & Combat Timeline", visible: true },
        { id: "uplink", name: "Secure Encrypted Communication Uplink", visible: true }
    ],

    // 5. Skills Matrix
    skills: [
        { name: "LLMs & GenAI", icon: "fas fa-brain", level: 95, category: "ai" },
        { name: "Network Security", icon: "fas fa-network-wired", level: 90, category: "cyber" },
        { name: "Threat Defense", icon: "fas fa-shield-virus", level: 92, category: "cyber" },
        { name: "Full-Stack Web (JS/HTML/CSS)", icon: "fas fa-code", level: 90, category: "web" },
        { name: "UI/UX & Visual Design (Canva Pro)", icon: "fas fa-palette", level: 94, category: "design" },
        { name: "Data Analytics (Excel/Logic)", icon: "fas fa-chart-line", level: 85, category: "data" },
        { name: "Youth Diplomacy & Policy", icon: "fas fa-microphone-alt", level: 91, category: "leadership" }
    ],

    // 6. 24+ Verified Certificates & Credentials
    certificates: [
        {
            id: "cert_1",
            title: "Google AI Professional Specialization (7 Courses)",
            issuer: "Google / Coursera",
            category: "ai",
            date: "Aug 1, 2026",
            badge: "SPECIALIZATION",
            description: "Rigorous 7-course engineering curriculum: AI Fundamentals, Brainstorming & Planning, Research & Insights, Writing & Communicating, Content Creation, Data Analysis, and Practical App Building.",
            verifyUrl: "https://coursera.org/verify/specialization/Y58COKTBNKBC",
            image: "certificates/cert-01.png",
            file: "certificates/cert-01-orig.pdf"
        },
        {
            id: "cert_2",
            title: "Google Cybersecurity: Foundations of Cybersecurity",
            issuer: "Google / Coursera",
            category: "cyber",
            date: "Aug 5, 2026",
            badge: "GOOGLE CYBER",
            description: "Core defense-in-depth principles, CISSP baseline models, threat surfaces, risk matrices, and security ethics.",
            verifyUrl: "https://coursera.org/verify/JBX9R8KGDUU3",
            image: "certificates/cert-02.png",
            file: "certificates/cert-02-orig.pdf"
        },
        {
            id: "cert_3",
            title: "Google Cybersecurity: Play It Safe - Manage Security Risks",
            issuer: "Google / Coursera",
            category: "cyber",
            date: "Aug 5, 2026",
            badge: "RISK AUDITING",
            description: "Enterprise risk assessment, regulatory frameworks, vulnerability scanning, security compliance, and playbook mitigation.",
            verifyUrl: "https://coursera.org/verify/WGZW4MI3ZB13",
            image: "certificates/cert-03.png",
            file: "certificates/cert-03-orig.pdf"
        },
        {
            id: "cert_4",
            title: "Google Cybersecurity: Connect & Protect - Networks",
            issuer: "Google / Coursera",
            category: "cyber",
            date: "Sep 26, 2026",
            badge: "NETWORK DEFENSE",
            description: "TCP/IP and OSI stack deep-dives, packet capture/analysis, firewalls, and Intrusion Detection/Prevention Systems (IDS/IPS).",
            verifyUrl: "https://coursera.org/verify/JZPG31CYBSEF",
            image: "certificates/cert-04.png",
            file: "certificates/cert-04-orig.pdf"
        },
        {
            id: "cert_5",
            title: "Introduction to Generative AI Studio",
            issuer: "Simplilearn SkillUp",
            category: "ai",
            date: "May 5, 2026",
            badge: "GENAI STUDIO",
            description: "Model prompt engineering, foundation LLM grounding, fine-tuning methodologies, and rapid AI workflow deployment. Cert: 10190937.",
            verifyUrl: "",
            image: "certificates/cert-05.png",
            file: "certificates/cert-05-orig.pdf"
        },
        {
            id: "cert_6",
            title: "Global AI Impact Pledge 2026",
            issuer: "AI Impact Initiative",
            category: "ai",
            date: "2026",
            badge: "AI ETHICS",
            description: "Official credential affirming adherence to ethical AI development, societal accountability, fairness, and safety protocols.",
            verifyUrl: "",
            image: "certificates/cert-06.png",
            file: "certificates/cert-06-orig.png"
        },
        {
            id: "cert_7",
            title: "2-Day Generative AI Mastermind",
            issuer: "Outskill",
            category: "ai",
            date: "July 11-12, 2026",
            badge: "AUTONOMOUS AGENTS",
            description: "Intensive masterclass on agentic loops, prompt chaining architectures, Claude artifact orchestration, and vibe coding.",
            verifyUrl: "",
            image: "certificates/cert-07.png",
            file: "certificates/cert-07-orig.pdf"
        },
        {
            id: "cert_8",
            title: "Be10X AI Tools & Automation Workshop (July)",
            issuer: "Be10x",
            category: "workshop",
            date: "July 19, 2026",
            badge: "PRODUCTIVITY",
            description: "Prompt chaining, spreadsheet automation, generative image pipelines, and multiplier workflows.",
            verifyUrl: "",
            image: "certificates/cert-08.png",
            file: "certificates/cert-08-orig.pdf"
        },
        {
            id: "cert_9",
            title: "Be10X Advanced AI Workshop (October)",
            issuer: "Be10x",
            category: "workshop",
            date: "Oct 15, 2026",
            badge: "ADVANCED AI",
            description: "Autonomous agent execution, multi-modal synthesis, and algorithmic productivity scaling.",
            verifyUrl: "",
            image: "certificates/cert-09.png",
            file: "certificates/cert-09-orig.pdf"
        },
        {
            id: "cert_10",
            title: "Vidyarthi Vigyan Manthan (VVM) 2025-26 Selection",
            issuer: "VIBHA / NCERT / Vigyan Prasar (Govt. of India)",
            category: "competition",
            date: "2025-2026",
            badge: "NATIONAL SELECTION",
            description: "National Level-I merit selection in India's premier science talent search. Tested on experimental logic, mathematics, and heritage.",
            verifyUrl: "",
            image: "certificates/cert-10.png",
            file: "certificates/cert-10-orig.pdf"
        },
        {
            id: "cert_11",
            title: "Vivo Ignite 2026: Changemakers Challenge",
            issuer: "Vivo India / Igniting Change",
            category: "competition",
            date: "2026",
            badge: "CHANGEMAKER",
            description: "National finalist selection for socio-economic technological innovation designed to empower communities.",
            verifyUrl: "",
            image: "certificates/cert-11.png",
            file: "certificates/cert-11-orig.pdf"
        },
        {
            id: "cert_12",
            title: "NIT Raipur YEISS - INAE National Youth Conclave",
            issuer: "NIT Raipur & INAE",
            category: "competition",
            date: "2026",
            badge: "ENGINEERING CONCLAVE",
            description: "Technical prototype showcase and engineering dialogue on emerging AI paradigms hosted at NIT Raipur with INAE fellows.",
            verifyUrl: "",
            image: "certificates/cert-12.png",
            file: "certificates/cert-12-orig.png"
        },
        {
            id: "cert_13",
            title: "The Pi Quiz - Atharv Ranbhoomi (IIM Indore)",
            issuer: "IIM Indore",
            category: "competition",
            date: "2025",
            badge: "IIM INDORE FINALIST",
            description: "Competitive academic delegate solving mathematical modeling, combinatorics, and quantitative buzzer questions at IIM Indore.",
            verifyUrl: "",
            image: "certificates/cert-13.png",
            file: "certificates/cert-13-orig.pdf"
        },
        {
            id: "cert_14",
            title: "Eureka! Junior 2025 National Entrepreneurship",
            issuer: "E-Cell, IIT Bombay",
            category: "competition",
            date: "2025",
            badge: "IIT BOMBAY",
            description: "High-potential venture model pitched at Asia's largest youth startup competition with IIT Bombay mentorship.",
            verifyUrl: "",
            image: "certificates/cert-14.png",
            file: "certificates/cert-14-orig.pdf"
        },
        {
            id: "cert_15",
            title: "SRIJAN 5.0 - Scientific Model Making Conclave",
            issuer: "Anjaneya University, Raipur",
            category: "competition",
            date: "2026",
            badge: "WORKING PROTOTYPE",
            description: "Engineered and demonstrated working electro-mechanical prototype judged by university faculty.",
            verifyUrl: "",
            image: "certificates/cert-15.png",
            file: "certificates/cert-15-orig.png"
        },
        {
            id: "cert_16",
            title: "4th World Teen Parliament - Teen Influencer",
            issuer: "Blub World (Global Teen Parliament)",
            category: "competition",
            date: "2026",
            badge: "GLOBAL PARLIAMENT",
            description: "38th session parliamentary representative recognized as Teen Influencer for digital equity & youth AI safety policy.",
            verifyUrl: "",
            image: "certificates/cert-16.png",
            file: "certificates/cert-16-orig.png"
        },
        {
            id: "cert_17",
            title: "Health & Science Olympiad Quiz - 1st Place",
            issuer: "Brighton International School",
            category: "competition",
            date: "Jan 7, 2026",
            badge: "1ST PLACE GOLD",
            description: "Gold trophy champion across cohort for analytical biology, clinical diagnostics, and scientific methodology.",
            verifyUrl: "",
            image: "certificates/cert-17.png",
            file: "certificates/cert-17-orig.png"
        },
        {
            id: "cert_18",
            title: "Mindspark 2026 - HTML Web Dev Hackathon",
            issuer: "Brighton International School & Design.com",
            category: "web",
            date: "2026",
            badge: "1ST PLACE HACKATHON",
            description: "1st place gold winner in live web design hackathon building high-performance responsive interfaces with custom CSS grids.",
            verifyUrl: "",
            image: "certificates/cert-18.png",
            file: "certificates/cert-18-orig.jfif"
        },
        {
            id: "cert_19",
            title: "Build a Free Website with WordPress",
            issuer: "Coursera Project Network",
            category: "web",
            date: "May 5, 2026",
            badge: "CMS ARCHITECTURE",
            description: "Headless CMS configuration, theme customization, database schema, plugin ecosystems, and performance SEO.",
            verifyUrl: "https://coursera.org/verify/FFIMLRG6LULS",
            image: "certificates/cert-19.png",
            file: "certificates/cert-19-orig.pdf"
        },
        {
            id: "cert_20",
            title: "Canva Essentials Professional (13 Courses)",
            issuer: "Coursera Design Network",
            category: "web",
            date: "Jul 25, 2026",
            badge: "DESIGN MASTER",
            description: "Comprehensive 13-course design suite: Color Systems, Typography, UI/UX Wireframes, Brand Systems, and Video.",
            verifyUrl: "https://coursera.org/verify/specialization/2TC4WLLDQWH5",
            image: "certificates/cert-20.png",
            file: "certificates/cert-20-orig.pdf"
        },
        {
            id: "cert_21",
            title: "Getting Started with Microsoft Excel & Analytics",
            issuer: "Coursera Project Network",
            category: "workshop",
            date: "May 3, 2026",
            badge: "DATA MODELING",
            description: "VLOOKUP/XLOOKUP, logical matrix operations, dynamic PivotTables, and analytical dashboards.",
            verifyUrl: "https://coursera.org/verify/4YLHV7A4X4RY",
            image: "certificates/cert-21.png",
            file: "certificates/cert-21-orig.pdf"
        },
        {
            id: "cert_22",
            title: "National Intellectual Property Awareness Mission (NIPAM)",
            issuer: "Ministry of Commerce & Industry, Govt of India",
            category: "workshop",
            date: "July 2026",
            badge: "GOVT OF INDIA",
            description: "Certified IP law knowledge: Patent drafting, industrial designs, trademark defense, and digital copyright.",
            verifyUrl: "",
            image: "certificates/cert-22.png",
            file: "certificates/cert-22-orig.jpg"
        },
        {
            id: "cert_23",
            title: "School Innovation Marathon (SIM) - AIM",
            issuer: "Ministry of Education Innovation Cell & AIM",
            category: "competition",
            date: "2026",
            badge: "AIM INNOVATION",
            description: "Government of India design thinking sprint, user empathy research, rapid prototyping, and socio-economic validation.",
            verifyUrl: "",
            image: "certificates/cert-23.png",
            file: "certificates/cert-23-orig.pdf"
        },
        {
            id: "cert_24",
            title: "AI Business Summit 2.0 - Launch at Scale",
            issuer: "Launch At Scale Global",
            category: "workshop",
            date: "July 19, 2026",
            badge: "AI VENTURE",
            description: "Commercialization frameworks for AI models, autonomous workflow monetization, and venture scaling.",
            verifyUrl: "",
            image: "certificates/cert-24.png",
            file: "certificates/cert-24-orig.jpg"
        }
    ],

    // 7. Featured Prototypes & Projects
    projects: [
        {
            id: "p1",
            title: "Autonomous Multi-Agent AI Workflow Engine",
            desc: "Architected intelligent prompt chaining pipelines orchestrating Claude artifacts, localized LLM parameters, and autonomous agent loops.",
            tags: ["LLM Orchestration", "Prompt Chaining", "Agentic Systems", "Outskill"],
            image: "certificates/cert-07.png",
            githubUrl: "https://github.com/atharvaagrawal8",
            demoUrl: "#"
        },
        {
            id: "p2",
            title: "CyberShield Network Threat Analyzer",
            desc: "Security audit pipeline with packet anomaly detection, OSI inspection logic, and risk matrices adhering to Google Cybersecurity guidelines.",
            tags: ["Cyber Defense", "Packet Sniffing", "Google Certified", "Risk Auditing"],
            image: "certificates/cert-04.png",
            githubUrl: "https://github.com/atharvaagrawal8",
            demoUrl: "#"
        },
        {
            id: "p3",
            title: "Mindspark Dynamic Interface Architecture",
            desc: "Gold-medal winning responsive web layout featuring custom CSS grid hierarchies, high-contrast dark accessibility, and dynamic DOM rendering.",
            tags: ["Frontend UI", "CSS Grids", "Mindspark Gold", "Vanilla JS"],
            image: "certificates/cert-18.png",
            githubUrl: "https://github.com/atharvaagrawal8",
            demoUrl: "#"
        },
        {
            id: "p4",
            title: "Changemaker Civic Innovation Prototype",
            desc: "Working socio-technical innovation model exhibited for the Vivo Ignite Changemakers Challenge and Anjaneya University SRIJAN 5.0.",
            tags: ["Civic Tech", "Vivo Ignite", "Atal Innovation", "Physical Prototype"],
            image: "certificates/cert-11.png",
            githubUrl: "https://github.com/atharvaagrawal8",
            demoUrl: "#"
        }
    ]
};

// Safe recursive object sanitizer against prototype pollution
function sanitizeDataPayload(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(sanitizeDataPayload);
    const clean = {};
    for (const [k, v] of Object.entries(obj)) {
        if (k === '__proto__' || k === 'constructor' || k === 'prototype') continue;
        clean[k] = sanitizeDataPayload(v);
    }
    return clean;
}

// Global helper to load data from LocalStorage (if edited via Admin Panel) or fall back to default
function getActivePortfolioData() {
    const saved = localStorage.getItem('ATHARVA_PORTFOLIO_CUSTOM_DATA');
    if (saved) {
        try {
            const parsed = sanitizeDataPayload(JSON.parse(saved));
            // Merge defaults to ensure newly added properties (navigation, appearance, sections) are always available
            return {
                ...PORTFOLIO_DATA,
                ...parsed,
                profile: { ...PORTFOLIO_DATA.profile, ...(parsed.profile || {}) },
                appearance: { ...PORTFOLIO_DATA.appearance, ...(parsed.appearance || {}) },
                navigation: parsed.navigation || PORTFOLIO_DATA.navigation,
                sections: parsed.sections || PORTFOLIO_DATA.sections
            };
        } catch (e) {
            console.warn('Failed to parse custom local storage data, using defaults.', e);
        }
    }
    return PORTFOLIO_DATA;
}

// Global helper to save changes from Admin Panel
function saveActivePortfolioData(data) {
    localStorage.setItem('ATHARVA_PORTFOLIO_CUSTOM_DATA', JSON.stringify(sanitizeDataPayload(data)));
}
