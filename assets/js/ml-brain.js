/* ==========================================================================
   ATHARVA AGRAWAL // ADVANCED COGNITIVE ML BRAIN & FUZZY NLP ENGINE
   TF-IDF Vector Space · Levenshtein Typo Correction · Synonym Expansion
   ========================================================================== */

class PortfolioMLEngine {
    constructor() {
        this.vocabulary = new Set();
        this.vocabList = [];
        this.idf = {};
        this.documentVectors = [];
        this.trainingCorpus = [];
        this.customCommands = {};
        this.isTrained = false;

        this.corpusStorageKey = 'ATHARVA_ML_TRAINED_CORPUS';
        this.commandsStorageKey = 'ATHARVA_CUSTOM_CLI_COMMANDS';

        // Domain-aware synonym / abbreviation expansion map
        this.synonyms = {
            "rpi": "raspberry pi",
            "esp": "esp32 arduino embedded",
            "cc": "creative cloud adobe",
            "ae": "after effects",
            "pr": "premiere pro",
            "ps": "photoshop",
            "ai": "artificial intelligence",
            "ml": "machine learning",
            "dl": "deep learning",
            "cyber": "cybersecurity",
            "sec": "security",
            "cert": "certificate",
            "certs": "certificates",
            "diploma": "certificate",
            "diplomas": "certificates",
            "vfx": "visual effects compositing",
            "3d": "maya unreal 3d",
            "wp": "wordpress",
            "js": "javascript",
            "cpp": "c++",
            "ig": "instagram",
            "insta": "instagram",
            "li": "linkedin",
            "gh": "github",
            "mail": "email",
            "gmail": "email",
            "retinoscope": "smart retinoscope",
            "startup": "smart retinoscope co-founder",
            "founder": "co-founder smart retinoscope",
            "4wtp": "world teen parliament",
            "wtp": "world teen parliament",
            "school": "brighton international school",
            "arena": "arena animation raipur"
        };

        this.init();
    }

    init() {
        const savedCmds = localStorage.getItem(this.commandsStorageKey);
        if (savedCmds) {
            try {
                this.customCommands = JSON.parse(savedCmds);
            } catch (e) {
                this.customCommands = {};
            }
        } else {
            this.customCommands = {
                "skills": "43 Verified LinkedIn Skills: AI/GenAI, Robotics & Embedded (RPi, ESP, Arduino, C++, Python), 3D/VFX (Maya, Unreal, Nuke, DaVinci, Adobe CC), Cybersecurity (Linux, SQL, Ethical Hacking), Startup Leadership",
                "certs": "31+ Verified credentials from Google, Coursera, Arena Animation, NIT Raipur, IIT Bombay, IIM Indore, and Simplilearn",
                "achievements": "Co-Founder @ Smart Retinoscope, Arena VFX Certified, Mindspark Web Dev (Runner-Up), VVM National Level-I, World Teen Parliament MP (4WTP), Health Quiz 1st Place",
                "contact": "Email: atharvaagrawal8@gmail.com | Raipur, India | IG: @atharva.agrawal8 | LI: in/atharvaagrawal8 | GH: github.com/UG90",
                "whoami": "Guest operative inspecting Atharva Agrawal's Neural System Core (type 'sudo help' if Admin)"
            };
        }

        const savedCorpus = localStorage.getItem(this.corpusStorageKey);
        if (savedCorpus) {
            try {
                this.trainingCorpus = JSON.parse(savedCorpus);
            } catch (e) {
                this.loadBaselineCorpus();
            }
        } else {
            this.loadBaselineCorpus();
        }

        this.train();
    }

    loadBaselineCorpus() {
        this.trainingCorpus = [
            {
                intent: "identity_bio",
                queries: [
                    "who are you", "who is atharva", "tell me about yourself",
                    "give me a summary of atharva agrawal", "bio", "overview", "introduction", "profile", "about"
                ],
                response: "Atharva Agrawal is the Co-Founder of The Smart Retinoscope, a student innovator at Brighton International School, Raipur, and a certified 3D/VFX Artist at Arena Animation Raipur. He bridges AI, Embedded Robotics (Raspberry Pi, ESP, Arduino, C++, Python), Cybersecurity, and 3D/VFX production."
            },
            {
                intent: "smart_retinoscope",
                queries: [
                    "smart retinoscope", "startup", "co-founder", "founder", "venture", "medtech", "company", "business"
                ],
                response: "Atharva is the Co-Founder of The Smart Retinoscope (Oct 2026–Present), a hardware-AI MedTech startup in Raipur uniting Startup Leadership with embedded engineering and computer vision."
            },
            {
                intent: "robotics_embedded",
                queries: [
                    "robotics", "raspberry pi", "esp", "esp32", "arduino", "embedded", "hardware", "c++", "python", "model making", "revit", "srijan", "iot"
                ],
                response: "Atharva builds robotics and embedded hardware systems using Raspberry Pi, ESP32, Arduino, C++, Python, and Revit. He has been part of the Brighton International School Robotics Team since 2017 and exhibited Model Making at Anjaneya University SRIJAN 5.0."
            },
            {
                intent: "arena_vfx_3d",
                queries: [
                    "arena animation", "maya", "autodesk maya", "unreal engine", "nuke", "davinci resolve", "after effects", "premiere pro", "photoshop", "illustrator", "digital matte painting", "3d", "game design", "vfx", "movie posters", "video editing"
                ],
                response: "Atharva is an Arena Certified Professional in VFX Compositing and Editing (Arena Animation Raipur, Credential 44eC1605700), mastering Autodesk Maya, Unreal Engine, Nuke, DaVinci Resolve, After Effects, Premiere Pro, Photoshop, Illustrator, and Digital Matte Painting."
            },
            {
                intent: "google_ai",
                queries: [
                    "google ai specialization", "what did you learn in google ai",
                    "google artificial intelligence", "7 course specialization", "ai fundamentals", "brainstorming", "research and insights"
                ],
                response: "Atharva completed Google's 7-Course AI Professional Specialization (Coursera ID: LORXIVPHRXUN / Y58COKTBNKBC), building 20+ AI artifacts, vibe-coding custom AI solutions, and processing ML video datasets."
            },
            {
                intent: "google_cybersecurity",
                queries: [
                    "google cybersecurity", "cyber security certificate", "network defense", "ethical hacking",
                    "play it safe", "connect and protect", "packet analysis", "threat modeling", "linux", "sql", "tools of the trade"
                ],
                response: "Atharva earned Google Cybersecurity credentials in Foundations of Cybersecurity (JBX9R8KGDUU3), Play It Safe: Manage Security Risks (WGZW4MI3ZB13), Connect & Protect: Networks (JZPG31CYBSEF), and Tools of the Trade: Linux & SQL (MFF1IGF2KXKF)."
            },
            {
                intent: "creative_canva_design",
                queries: [
                    "canva", "canva essentials", "graphic design", "brand identity", "logo design", "poster design",
                    "presentation mastery", "social media design", "video content creation", "marketing material"
                ],
                response: "Atharva holds the 13-course Canva Essentials Professional Certificate (Coursera ID: 2TC4WLLDQWH5), including 6 specialized badges in Video Content Creation, Social Media Design, Event Marketing, Portfolio Development, Presentation Mastery, and Marketing Materials."
            },
            {
                intent: "teen_parliament",
                queries: [
                    "world teen parliament", "blub world", "teen influencer", "member of parliament",
                    "38th session representative", "global youth policy", "parliamentary role", "4wtp"
                ],
                response: "Atharva served as a Member of Parliament (4WTP) and Influencer at the 4th World Teen Parliament (Blub World, Feb 2025–Apr 2026), drafting global youth policy resolutions on digital equity and AI safety."
            },
            {
                intent: "vvm_olympiad",
                queries: [
                    "vvm", "vidyarthi vigyan manthan", "national science talent search",
                    "ncert science exam", "vibha selection", "cg0291627", "science olympiad"
                ],
                response: "Atharva achieved Level-I National Selection in Vidyarthi Vigyan Manthan (VVM 2025-26, Candidate ID: CG0291627), India's premier digital science talent search organized by NCERT, Vigyan Prasar (Govt. of India), and VIBHA."
            },
            {
                intent: "iim_iit_nit",
                queries: [
                    "iim indore", "the pi quiz", "atharv ranbhoomi", "iit bombay", "eureka junior",
                    "nit raipur", "inae youth conclave", "collegiate", "entrepreneurship"
                ],
                response: "Atharva represented Brighton International School at IIM Indore (Atharv Ranbhoomi The Pi Quiz), IIT Bombay E-Cell (Eureka! Junior 25 Nurture Track), and NIT Raipur (INAE Youth Conclave YEISS/NITRR/2026/HT/074)."
            },
            {
                intent: "mindspark_health_vivo",
                queries: [
                    "mindspark", "design com", "health quiz", "vivo ignite", "changemakers", "awards", "competitions", "prizes"
                ],
                response: "Atharva won 1st Place in the Health Quiz (Jan 2025), secured 2nd Position Runner-Up in Design.com at MINDSPARK Inter-School Fest (Oct 2026), and was recognized in the 4th Edition Vivo Ignite Technology & Innovation Initiative."
            },
            {
                intent: "ai_sashakt",
                queries: [
                    "ai sashakt", "meity", "indiaai", "intel india", "responsible ai", "pledge", "ethics"
                ],
                response: "Atharva took the national AI Sashakt Responsible AI Pledge (Feb 2026) alongside MeitY, IndiaAI, and Intel India, advocating for ethical, safe, and inclusive AI development."
            },
            {
                intent: "education_languages",
                queries: [
                    "education", "school", "brighton", "kidzee", "grade", "languages", "hindi", "english", "location", "raipur"
                ],
                response: "Based in Raipur, Chhattisgarh, India, Atharva studies at Brighton International School (2017–2031) and trains in VFX Compositing & 3D at Arena Animation Raipur (Apr 2024–Present). He speaks English and Hindi."
            },
            {
                intent: "tech_stack_web",
                queries: [
                    "what is your tech stack", "tools you use", "technologies", "programming languages", "frameworks",
                    "wordpress", "excel", "html", "css", "javascript", "data science", "be10x", "outskill", "claude"
                ],
                response: "Atharva's tech stack spans Python, C++, HTML5/CSS3, JavaScript, Linux, SQL, WordPress, Microsoft Excel, Raspberry Pi, ESP32, Arduino, Claude/GenAI Studio, Autodesk Maya, Unreal Engine, Nuke, DaVinci Resolve, and Adobe Creative Cloud Pro."
            },
            {
                intent: "contact_socials",
                queries: [
                    "contact info", "how to hire", "email address", "instagram", "linkedin", "github", "gmail", "reach out", "connect"
                ],
                response: "You can reach Atharva at atharvaagrawal8@gmail.com, via LinkedIn (in/atharvaagrawal8), Instagram (@atharva.agrawal8), GitHub (github.com/UG90), or through the website's Uplink form."
            }
        ];
    }

    // Damerau-Levenshtein distance for intelligent typo/mistake detection
    editDistance(a, b) {
        if (a === b) return 0;
        const m = a.length, n = b.length;
        if (m === 0) return n;
        if (n === 0) return m;
        const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,
                    dp[i][j - 1] + 1,
                    dp[i - 1][j - 1] + cost
                );
                if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
                    dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + cost);
                }
            }
        }
        return dp[m][n];
    }

    correctToken(token) {
        if (this.vocabulary.has(token) || token.length < 3) return token;
        let bestWord = token;
        let bestDist = Infinity;
        const maxAllowed = token.length <= 4 ? 1 : 2;

        for (const vocabWord of this.vocabList) {
            if (Math.abs(vocabWord.length - token.length) > maxAllowed) continue;
            const d = this.editDistance(token, vocabWord);
            if (d <= maxAllowed && d < bestDist) {
                bestDist = d;
                bestWord = vocabWord;
                if (d === 1) break;
            }
        }
        return bestWord;
    }

    tokenize(text, applyFuzzyCorrection = false) {
        let normalized = text.toLowerCase().replace(/[^a-z0-9+\s]/g, ' ');
        const rawTokens = normalized.split(/\s+/).filter(t => t.length > 1 && !this.isStopWord(t));

        const expanded = [];
        for (const t of rawTokens) {
            if (this.synonyms[t]) {
                expanded.push(...this.synonyms[t].split(/\s+/));
            }
            const resolved = applyFuzzyCorrection ? this.correctToken(t) : t;
            expanded.push(resolved);
        }
        return expanded;
    }

    isStopWord(word) {
        const stopWords = new Set([
            "a", "an", "and", "are", "as", "at", "be", "by", "for",
            "from", "how", "i", "in", "is", "it", "of", "on", "or", "that",
            "the", "this", "to", "was", "what", "when", "where", "who", "will", "with", "me", "my", "you", "your"
        ]);
        return stopWords.has(word);
    }

    train() {
        this.vocabulary.clear();
        const docTokensList = [];

        this.trainingCorpus.forEach(doc => {
            const combinedText = doc.queries.join(" ") + " " + doc.intent.replace(/_/g, " ");
            const tokens = this.tokenize(combinedText, false);
            tokens.forEach(t => this.vocabulary.add(t));
            docTokensList.push(tokens);
        });

        this.vocabList = Array.from(this.vocabulary);
        const N = docTokensList.length;

        this.idf = {};
        this.vocabList.forEach(term => {
            let docCount = 0;
            docTokensList.forEach(tokens => {
                if (tokens.includes(term)) docCount++;
            });
            this.idf[term] = Math.log((N + 1) / (docCount + 1)) + 1;
        });

        this.documentVectors = docTokensList.map(tokens => this.vectorize(tokens));
        this.isTrained = true;
    }

    vectorize(tokens) {
        const tf = {};
        tokens.forEach(t => { tf[t] = (tf[t] || 0) + 1; });

        const vector = new Array(this.vocabList.length).fill(0);
        let normSq = 0;

        this.vocabList.forEach((term, idx) => {
            if (tf[term]) {
                const tfIdfWeight = (tf[term] / (tokens.length || 1)) * this.idf[term];
                vector[idx] = tfIdfWeight;
                normSq += tfIdfWeight * tfIdfWeight;
            }
        });

        const norm = Math.sqrt(normSq) || 1;
        return vector.map(v => v / norm);
    }

    cosineSimilarity(vecA, vecB) {
        let dotProduct = 0;
        for (let i = 0; i < vecA.length; i++) {
            dotProduct += vecA[i] * vecB[i];
        }
        return dotProduct;
    }

    predict(rawQuery) {
        if (!this.isTrained) this.train();

        // Tokenize with fuzzy typo correction enabled!
        const queryTokens = this.tokenize(rawQuery, true);
        if (queryTokens.length === 0) {
            return {
                matched: false,
                confidence: "0%",
                response: "Please ask about Atharva's Smart Retinoscope startup, Robotics (RPi/Arduino), 3D/VFX (Maya/Nuke/Adobe), AI/Cybersecurity, or competitions."
            };
        }

        const queryVec = this.vectorize(queryTokens);
        let highestSim = -1;
        let bestMatchIndex = -1;

        this.documentVectors.forEach((docVec, idx) => {
            const sim = this.cosineSimilarity(queryVec, docVec);
            if (sim > highestSim) {
                highestSim = sim;
                bestMatchIndex = idx;
            }
        });

        const CONFIDENCE_THRESHOLD = 0.08;

        if (highestSim >= CONFIDENCE_THRESHOLD && bestMatchIndex >= 0) {
            const matchedDoc = this.trainingCorpus[bestMatchIndex];
            return {
                matched: true,
                confidence: (highestSim * 100).toFixed(1) + "%",
                intent: matchedDoc.intent,
                response: matchedDoc.response
            };
        } else {
            return {
                matched: false,
                confidence: (highestSim * 100).toFixed(1) + "%",
                response: "My neural model couldn't find an exact match yet. Try asking about Smart Retinoscope, Robotics, Maya/VFX, Google AI, Cybersecurity, or train a new intent in Admin!"
            };
        }
    }

    // Fuzzy CLI command suggestion ("Did you mean ...?")
    suggestCommand(cmd, builtInCommands = []) {
        const allCmds = Array.from(new Set([...builtInCommands, ...Object.keys(this.customCommands)]));
        let best = null;
        let bestDist = Infinity;
        for (const c of allCmds) {
            const d = this.editDistance(cmd, c);
            if (d <= 2 && d < bestDist) {
                bestDist = d;
                best = c;
            }
        }
        return best;
    }

    executeCommand(cmd) {
        const cleanCmd = cmd.trim().toLowerCase();
        if (this.customCommands[cleanCmd]) {
            return { matched: true, output: this.customCommands[cleanCmd] };
        }
        return { matched: false };
    }

    setCustomCommand(name, response) {
        const cleanName = name.trim().toLowerCase();
        this.customCommands[cleanName] = response.trim();
        localStorage.setItem(this.commandsStorageKey, JSON.stringify(this.customCommands));
        return true;
    }

    deleteCustomCommand(name) {
        const cleanName = name.trim().toLowerCase();
        delete this.customCommands[cleanName];
        localStorage.setItem(this.commandsStorageKey, JSON.stringify(this.customCommands));
        return true;
    }

    addTrainingIntent(intentName, queriesArray, responseText) {
        const cleanQueries = queriesArray.map(q => q.trim().toLowerCase()).filter(q => q.length > 0);
        const existingIdx = this.trainingCorpus.findIndex(c => c.intent === intentName);

        if (existingIdx >= 0) {
            this.trainingCorpus[existingIdx].queries = Array.from(new Set([...this.trainingCorpus[existingIdx].queries, ...cleanQueries]));
            this.trainingCorpus[existingIdx].response = responseText;
        } else {
            this.trainingCorpus.push({
                intent: intentName,
                queries: cleanQueries,
                response: responseText
            });
        }

        localStorage.setItem(this.corpusStorageKey, JSON.stringify(this.trainingCorpus));
        this.train();
        return true;
    }

    deleteTrainingIntent(intentName) {
        this.trainingCorpus = this.trainingCorpus.filter(c => c.intent !== intentName);
        localStorage.setItem(this.corpusStorageKey, JSON.stringify(this.trainingCorpus));
        this.train();
        return true;
    }
}

window.PortfolioML = new PortfolioMLEngine();
