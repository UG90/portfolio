/* ==========================================================================
   ATHARVA AGRAWAL // ADVANCED COGNITIVE ML BRAIN & TERMINAL SUITE
   Natural Language Processing · Vector Space Embeddings · Custom CLI Commands
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

        this.init();
    }

    init() {
        // Load Custom CLI Commands
        const savedCmds = localStorage.getItem(this.commandsStorageKey);
        if (savedCmds) {
            try {
                this.customCommands = JSON.parse(savedCmds);
            } catch (e) {
                this.customCommands = {};
            }
        } else {
            this.customCommands = {
                "skills": "AI/ML (95%), Network Defense (92%), Web Architecture (90%), Canva Pro (94%), Data Analytics (85%)",
                "certs": "24+ Verified credentials from Google, Coursera, NIT Raipur, IIT Bombay, and Simplilearn",
                "achievements": "Mindspark Web Dev (1st Place Gold), VVM National Level-I Merit, World Teen Parliament Influencer",
                "contact": "Location: Raipur, Chhattisgarh | Instagram: @atharva.agrawal8 | LinkedIn: in/atharvaagrawal8",
                "whoami": "Guest operative inspecting Atharva Agrawal's Neural System Core"
            };
        }

        // Load NLP Training Corpus
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
                    "give me a summary of atharva agrawal", "bio", "overview", "introduction"
                ],
                response: "Atharva Agrawal is a secondary student innovator and technology researcher based in Raipur, Chhattisgarh, attending Brighton International School. He specializes in Artificial Intelligence and Cybersecurity defense, backed by 24+ accredited certifications and national honors."
            },
            {
                intent: "google_ai",
                queries: [
                    "google ai specialization", "what did you learn in google ai",
                    "google artificial intelligence", "7 course specialization", "ai fundamentals"
                ],
                response: "Atharva completed Google's comprehensive 7-Course AI Professional Specialization on Coursera, covering AI Fundamentals, Brainstorming & Planning, Research & Insights, Writing & Communicating, Content Creation, Data Analysis, and App Building."
            },
            {
                intent: "google_cybersecurity",
                queries: [
                    "google cybersecurity", "cyber security certificate", "network defense",
                    "play it safe", "connect and protect", "packet analysis", "threat modeling"
                ],
                response: "Atharva earned Google Cybersecurity certificates in Foundations of Cybersecurity, Play It Safe: Manage Security Risks, and Connect & Protect: Networks & Network Security, mastering CISSP core principles, packet analysis, and perimeter defenses."
            },
            {
                intent: "teen_parliament",
                queries: [
                    "world teen parliament", "blub world", "teen influencer",
                    "38th session representative", "global youth policy", "parliamentary role"
                ],
                response: "Atharva represented Brighton International School in the 38th Session of the 4th World Teen Parliament (Blub World) and was honored with the Teen Influencer Award for drafting global youth policy resolutions on digital equity and AI safety."
            },
            {
                intent: "vvm_olympiad",
                queries: [
                    "vvm", "vidyarthi vigyan manthan", "national science talent search",
                    "ncert science exam", "vibha selection", "cg0291627"
                ],
                response: "Atharva achieved Level-I National Selection in Vidyarthi Vigyan Manthan (VVM 2025-26, Candidate ID: CG0291627), India's premier digital science talent search organized by NCERT, Vigyan Prasar (Govt. of India), and VIBHA."
            },
            {
                intent: "iim_indore",
                queries: [
                    "iim indore", "the pi quiz", "atharv ranbhoomi", "math quiz", "combinatorics"
                ],
                response: "Atharva represented Brighton International School at Central India's premier cultural and management fest, Atharv Ranbhoomi at IIM Indore, competing in The Pi Quiz across mathematical modeling and algorithmic puzzle rounds."
            },
            {
                intent: "iit_bombay",
                queries: [
                    "iit bombay", "eureka junior", "entrepreneurship e-cell", "startup pitch", "business model"
                ],
                response: "Atharva qualified and competed in Eureka! Junior 2025, Asia's largest youth entrepreneurship and business model competition organized by IIT Bombay's E-Cell, presenting a tech-driven social innovation model."
            },
            {
                intent: "mindspark_winner",
                queries: [
                    "mindspark 2026", "web development winner", "html competition", "1st place gold", "design com"
                ],
                response: "Atharva clinched 1st Place Gold Medal at Mindspark 2026 in the Design.com HTML Web Development Competition, engineering an award-winning responsive interface with custom CSS grids."
            },
            {
                intent: "vivo_ignite",
                queries: [
                    "vivo ignite", "changemakers challenge", "social innovation", "community safety"
                ],
                response: "Atharva was recognized as a National Changemaker in the Vivo Ignite 2026 2nd Edition Challenge, developing technical solutions engineered to advance community safety and digital inclusion."
            },
            {
                intent: "tech_stack",
                queries: [
                    "what is your tech stack", "tools you use", "technologies", "programming languages", "frameworks",
                    "adobe", "vfx", "creative cloud", "video editing", "design"
                ],
                response: "Atharva's multidisciplinary stack spans Generative AI Studio, Claude artifacts, Vibe-Coding, ML video datasets, Python, Semantic HTML5/CSS3, Vanilla JS, Adobe Creative Cloud Pro (VFX & Video), and Canva Pro (13-Course Specialization in Branding, Typography, Color Theory & Content Creation)."
            },
            {
                intent: "creative_vfx_design",
                queries: [
                    "vfx", "adobe creative cloud", "canva essentials", "graphic design", "video creation",
                    "presentation mastery", "social media design", "branding", "creative"
                ],
                response: "Beyond AI & Cybersecurity, Atharva is a creative visual designer and VFX creator using Adobe Creative Cloud Pro and holds the 13-course Canva Essentials Professional Certificate (Typography, Color Theory, Branding, Video & Social Media Content Creation, Presentation Mastery)."
            },
            {
                intent: "ai_sashakt",
                queries: [
                    "ai sashakt", "meity", "indiaai", "intel india", "responsible ai", "pledge"
                ],
                response: "Atharva took the national AI Sashakt Responsible AI Pledge (Feb 2026) alongside MeitY, IndiaAI, and Intel India, advocating for ethical, safe, and inclusive AI development."
            },
            {
                intent: "contact_socials",
                queries: [
                    "contact info", "how to hire", "email address", "instagram", "linkedin", "github"
                ],
                response: "You can reach Atharva via Instagram (@atharva.agrawal8), LinkedIn (in/atharvaagrawal8), GitHub (github.com/atharvaagrawal8), or submit an encrypted message via the website's Uplink form."
            }
        ];
    }

    tokenize(text) {
        return text.toLowerCase()
            .replace(/[^a-z0-9\s]/g, ' ')
            .split(/\s+/)
            .filter(token => token.length > 1 && !this.isStopWord(token));
    }

    isStopWord(word) {
        const stopWords = new Set([
            "a", "an", "and", "are", "as", "at", "be", "by", "for",
            "from", "how", "i", "in", "is", "it", "of", "on", "or", "that",
            "the", "this", "to", "was", "what", "when", "where", "who", "will", "with"
        ]);
        return stopWords.has(word);
    }

    train() {
        this.vocabulary.clear();
        const docTokensList = [];

        this.trainingCorpus.forEach(doc => {
            const combinedText = doc.queries.join(" ") + " " + doc.intent;
            const tokens = this.tokenize(combinedText);
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
                const tfIdfWeight = (tf[term] / tokens.length) * this.idf[term];
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

        const queryTokens = this.tokenize(rawQuery);
        if (queryTokens.length === 0) {
            return {
                matched: false,
                confidence: "0%",
                response: "Please enter a specific question about Atharva's AI projects, cybersecurity credentials, or competitions."
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

        const CONFIDENCE_THRESHOLD = 0.10;

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
                response: "My cognitive neural model doesn't have an exact match for that query yet. Try asking about Google AI, Cybersecurity, World Teen Parliament, VVM Selection, or add this topic in the Admin ML Trainer!"
            };
        }
    }

    // Custom Commands API for Matrix Terminal
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

    // Dynamic Intent Training API
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
