/* ==========================================================================
   ATHARVA AGRAWAL // ENTERPRISE VISUAL BLOCK & THEME CUSTOMIZER
   STRICT SECURITY: ONLY visible and accessible to AUTHENTICATED ADMINS.
   UNIVERSAL EDITING: Edit text, headlines, brand name, links, and PROFILE PHOTO.
   ========================================================================== */

(function () {
    const BLOCKS_STORAGE_KEY = 'ATHARVA_PORTFOLIO_PAGE_BLOCKS';
    let isEditing = false;
    let savedBlocks = {};

    // 1. Strict Security Check: Verify Admin Authentication
    function isAdminAuthenticated() {
        const sessionAuth = sessionStorage.getItem('PORT2_ADMIN_AUTH') === 'true';
        const rememberAuth = localStorage.getItem('PORT2_REMEMBER_ADMIN') === 'true';
        const firebaseAuth = sessionStorage.getItem('FIREBASE_AUTH_ACTIVE') === 'true';
        return sessionAuth || rememberAuth || firebaseAuth;
    }

    // Defensive HTML Sanitizer to prevent Stored XSS while allowing rich typography formatting
    function sanitizeBlockHtml(dirtyHtml) {
        if (!dirtyHtml || typeof dirtyHtml !== 'string') return '';
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(dirtyHtml, 'text/html');

            // Strip all high-risk execution tags
            const dangerousTags = ['script', 'style', 'iframe', 'object', 'embed', 'link', 'meta', 'form', 'base', 'svg', 'math', 'frame'];
            dangerousTags.forEach(tag => {
                const els = doc.querySelectorAll(tag);
                els.forEach(el => el.remove());
            });

            // Strip any inline event handlers (on*) and dangerous URL schemes
            const allNodes = doc.querySelectorAll('*');
            allNodes.forEach(node => {
                const attrs = Array.from(node.attributes);
                attrs.forEach(attr => {
                    const name = attr.name.toLowerCase();
                    const val = attr.value.trim().toLowerCase();
                    if (name.startsWith('on')) {
                        node.removeAttribute(name);
                    } else if ((name === 'href' || name === 'src' || name === 'action') &&
                               (val.startsWith('javascript:') || val.startsWith('vbscript:') || (val.startsWith('data:') && !val.startsWith('data:image/')))) {
                        node.removeAttribute(name);
                    }
                });
            });

            return doc.body.innerHTML;
        } catch (e) {
            console.warn("Block sanitization error, escaping:", e);
            const div = document.createElement('div');
            div.textContent = dirtyHtml;
            return div.innerHTML;
        }
    }

    function isValidImageUrl(url) {
        if (!url || typeof url !== 'string') return false;
        const trimmed = url.trim();
        return /^(https?:\/\/|\/|\.\/|\.\.\/|assets\/|data:image\/(png|jpeg|jpg|webp|gif);base64,)/i.test(trimmed) &&
               !/^(javascript:|vbscript:)/i.test(trimmed);
    }

    // 2. Load and Apply any previously saved customized blocks (Strictly Sanitized)
    function loadAndApplyBlocks() {
        const data = localStorage.getItem(BLOCKS_STORAGE_KEY);
        if (data) {
            try {
                savedBlocks = JSON.parse(data);
                for (const [key, val] of Object.entries(savedBlocks)) {
                    // Prevent Prototype Pollution
                    if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;

                    if (key === 'profile_avatar_img') {
                        const avatarImg = document.querySelector('.avatar-holo-img');
                        if (avatarImg && val && isValidImageUrl(val)) {
                            avatarImg.src = val;
                        }
                    } else {
                        const el = document.querySelector(`[data-block-id="${key}"]`);
                        if (el) {
                            el.innerHTML = sanitizeBlockHtml(val);
                        }
                    }
                }
            } catch (e) {
                console.warn("Failed to apply saved blocks:", e);
            }
        }
    }

    // 3. Initialize Customizer
    function initCustomizer() {
        // Tag all editable elements with distinct IDs
        const targets = [
            // Brand & Navigation
            { sel: '.brand-monogram', id: 'brand_monogram' },
            { sel: '.brand-name', id: 'brand_name' },
            { sel: '.hero-header-badge span', id: 'hero_badge_text' },

            // Hero Section
            { sel: '.hero-row:first-child', id: 'hero_first_name' },
            { sel: '.hero-row.outline-text', id: 'hero_last_name' },
            { sel: '.hero-manifesto p', id: 'hero_bio_text' },
            { sel: '.manifesto-tag', id: 'hero_manifesto_tag' },
            { sel: '.m-badge:nth-child(1)', id: 'hero_badge_1' },
            { sel: '.m-badge:nth-child(2)', id: 'hero_badge_2' },
            { sel: '.m-badge:nth-child(3)', id: 'hero_badge_3' },
            { sel: '.avatar-meta-tag span:last-child', id: 'avatar_status_tag' },

            // Marquee
            { sel: '.marquee-track span:first-child', id: 'hero_marquee_text' },

            // Bento Matrix
            { sel: '#matrix-bento .title-meta', id: 'bento_meta' },
            { sel: '#matrix-bento .section-heading', id: 'bento_heading' },
            { sel: '#matrix-bento .section-lead', id: 'bento_lead' },

            // Research Dossier
            { sel: '#intel .title-meta', id: 'intel_meta' },
            { sel: '#intel .section-heading', id: 'intel_heading' },
            { sel: '#intel .section-lead', id: 'intel_lead' },
            { sel: '.narrative-block:nth-child(1) h3', id: 'intel_n1_title' },
            { sel: '.narrative-block:nth-child(1) p:first-of-type', id: 'intel_n1_p1' },
            { sel: '.narrative-block:nth-child(1) p:last-of-type', id: 'intel_n1_p2' },
            { sel: '.narrative-block:nth-child(2) h3', id: 'intel_n2_title' },
            { sel: '.narrative-block:nth-child(2) p', id: 'intel_n2_p' },

            // Certificate Vault
            { sel: '#vault .title-meta', id: 'vault_meta' },
            { sel: '#vault .section-heading', id: 'vault_heading' },
            { sel: '#vault .section-lead', id: 'vault_lead' },

            // Prototypes
            { sel: '#projects .title-meta', id: 'projects_meta' },
            { sel: '#projects .section-heading', id: 'projects_heading' },
            { sel: '#projects .section-lead', id: 'projects_lead' },

            // Combat Arena
            { sel: '#arena .title-meta', id: 'arena_meta' },
            { sel: '#arena .section-heading', id: 'arena_heading' },
            { sel: '#arena .section-lead', id: 'arena_lead' },

            // Uplink Transmission
            { sel: '#uplink .title-meta', id: 'uplink_meta' },
            { sel: '#uplink .section-heading', id: 'uplink_heading' },
            { sel: '#uplink .section-lead', id: 'uplink_lead' },
            { sel: '.intel-header h4', id: 'uplink_intel_title' },
            { sel: '.intel-subtext', id: 'uplink_subtext' },

            // Footer
            { sel: '.footer-brand h4', id: 'footer_brand_title' },
            { sel: '.footer-brand p', id: 'footer_brand_sub' },
            { sel: '.footer-rights', id: 'footer_rights_text' }
        ];

        targets.forEach(item => {
            const el = document.querySelector(item.sel);
            if (el) {
                el.setAttribute('data-block-id', item.id);
            }
        });

        // Always apply saved customizations for all visitors
        loadAndApplyBlocks();

        // STRICT SECURITY: Only inject editing tools if ADMIN IS LOGGED IN!
        if (isAdminAuthenticated()) {
            createAdminEditingUI();
        }
    }

    function createAdminEditingUI() {
        if (document.getElementById('wp-admin-cms-bar')) return;

        // 1. Top Admin CMS Bar
        const bar = document.createElement('div');
        bar.id = 'wp-admin-cms-bar';
        bar.innerHTML = `
            <div class="wpc-container">
                <div class="wpc-left">
                    <span class="wpc-badge"><i class="fab fa-wordpress"></i> ADMIN CMS</span>
                    <button id="wpc-toggle-btn" class="wpc-btn wpc-btn-primary">
                        <i class="fas fa-edit"></i> <span id="wpc-toggle-text">START VISUAL EDITING</span>
                    </button>
                    <button id="wpc-change-photo-btn" class="wpc-btn wpc-btn-secondary">
                        <i class="fas fa-camera"></i> CHANGE PROFILE PHOTO
                    </button>
                    <button id="wpc-save-btn" class="wpc-btn wpc-btn-save" style="display:none;">
                        <i class="fas fa-save"></i> PUBLISH LIVE
                    </button>
                    <button id="wpc-reset-btn" class="wpc-btn wpc-btn-danger" style="display:none;">
                        <i class="fas fa-undo"></i> RESET DEFAULTS
                    </button>
                </div>
                <div class="wpc-right">
                    <span id="wpc-status" class="wpc-status-tag">STATUS: AUTHENTICATED ADMIN</span>
                    <a href="admin/index.html" class="wpc-link" title="Open Admin Console"><i class="fas fa-sliders-h"></i> CONSOLE</a>
                    <button id="wpc-logout-btn" class="wpc-btn wpc-btn-danger" style="padding: 4px 8px;" title="Logout Admin"><i class="fas fa-sign-out-alt"></i></button>
                </div>
            </div>
        `;
        document.body.prepend(bar);

        // 2. Photo Upload / URL Modal
        const photoModal = document.createElement('div');
        photoModal.id = 'wpc-photo-modal';
        photoModal.innerHTML = `
            <div class="wpc-photo-card">
                <h3 style="color: #fff; margin-bottom: 12px; font-family: 'Syne', sans-serif;"><i class="fas fa-image" style="color:#06b6d4;"></i> Update Profile Picture</h3>
                <p style="font-size: 12px; color: #94a3b8; margin-bottom: 16px;">Choose a file from your computer or enter an image URL:</p>
                <div style="margin-bottom: 14px;">
                    <label style="display:block; font-size:10px; color:#94a3b8; margin-bottom:6px; font-family:monospace;">UPLOAD FROM COMPUTER</label>
                    <input type="file" id="wpc-photo-file-input" accept="image/*" style="font-size:11px; color:#e2e8f0; width:100%;">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display:block; font-size:10px; color:#94a3b8; margin-bottom:6px; font-family:monospace;">OR PASTE IMAGE URL</label>
                    <input type="url" id="wpc-photo-url-input" placeholder="https://... or assets/img/photo.jpg" style="width:100%; padding:8px 12px; background:#030712; border:1px solid rgba(255,255,255,0.15); border-radius:6px; color:#fff; font-size:12px; outline:none;">
                </div>
                <div style="display: flex; justify-content: flex-end; gap: 10px;">
                    <button id="wpc-photo-cancel" class="wpc-btn wpc-btn-secondary">Cancel</button>
                    <button id="wpc-photo-save" class="wpc-btn wpc-btn-save">Apply Photo</button>
                </div>
            </div>
        `;
        document.body.appendChild(photoModal);

        // 3. Styles for Customizer Bar and Editable Elements
        const style = document.createElement('style');
        style.textContent = `
            #wp-admin-cms-bar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 44px;
                background: #0b0f19;
                border-bottom: 2px solid #06b6d4;
                z-index: 9999999;
                display: flex;
                align-items: center;
                box-shadow: 0 4px 25px rgba(0,0,0,0.8);
                font-family: 'JetBrains Mono', monospace;
                font-size: 11px;
            }
            body.has-admin-bar {
                padding-top: 44px !important;
            }
            body.has-admin-bar .hud-top-bar {
                top: 44px !important;
            }
            body.has-admin-bar .floating-island {
                top: 92px !important;
            }
            .wpc-container {
                width: 100%;
                max-width: 1400px;
                margin: 0 auto;
                padding: 0 1.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .wpc-left, .wpc-right {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .wpc-badge {
                background: #06b6d4;
                color: #000;
                padding: 4px 10px;
                border-radius: 4px;
                font-weight: 800;
            }
            .wpc-btn {
                border: none;
                padding: 5px 12px;
                border-radius: 4px;
                font-family: inherit;
                font-size: 10px;
                font-weight: 700;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 6px;
                transition: all 0.2s;
            }
            .wpc-btn-primary {
                background: rgba(6, 182, 212, 0.15);
                border: 1px solid #06b6d4;
                color: #06b6d4;
            }
            .wpc-btn-primary:hover {
                background: #06b6d4;
                color: #000;
            }
            .wpc-btn-secondary {
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #e2e8f0;
            }
            .wpc-btn-secondary:hover {
                border-color: #06b6d4;
                color: #06b6d4;
            }
            .wpc-btn-save {
                background: #10b981;
                color: #000;
            }
            .wpc-btn-save:hover {
                transform: scale(1.04);
            }
            .wpc-btn-danger {
                background: rgba(244, 63, 94, 0.15);
                border: 1px solid #f43f5e;
                color: #f43f5e;
            }
            .wpc-status-tag {
                color: #10b981;
                font-size: 10px;
            }
            .wpc-link {
                color: #06b6d4;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 11px;
            }

            /* Photo Modal Styling */
            #wpc-photo-modal {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(8px);
                z-index: 10000000;
                display: none;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            #wpc-photo-modal.active {
                display: flex;
            }
            .wpc-photo-card {
                background: #0b0f19;
                border: 1px solid #06b6d4;
                border-radius: 14px;
                padding: 24px;
                max-width: 440px;
                width: 100%;
                box-shadow: 0 0 40px rgba(6, 182, 212, 0.4);
            }

            /* Active Outline while editing */
            [data-block-id].wpc-editing-active {
                outline: 2px dashed #06b6d4 !important;
                outline-offset: 4px !important;
                cursor: text !important;
                background: rgba(6, 182, 212, 0.08) !important;
                position: relative;
                border-radius: 4px;
            }
            [data-block-id].wpc-editing-active:hover {
                outline-color: #10b981 !important;
            }
            [data-block-id].wpc-editing-active::after {
                content: "✎ " attr(data-block-id);
                position: absolute;
                bottom: -18px;
                right: 0;
                background: #06b6d4;
                color: #000;
                font-family: 'JetBrains Mono', monospace;
                font-size: 9px;
                font-weight: 800;
                padding: 1px 6px;
                border-radius: 3px;
                pointer-events: none;
                z-index: 1000;
            }
        `;
        document.head.appendChild(style);
        document.body.classList.add('has-admin-bar');

        // Logic Bindings
        const toggleBtn = document.getElementById('wpc-toggle-btn');
        const toggleText = document.getElementById('wpc-toggle-text');
        const saveBtn = document.getElementById('wpc-save-btn');
        const resetBtn = document.getElementById('wpc-reset-btn');
        const statusTag = document.getElementById('wpc-status');
        const changePhotoBtn = document.getElementById('wpc-change-photo-btn');
        const photoModalEl = document.getElementById('wpc-photo-modal');
        const photoCancelBtn = document.getElementById('wpc-photo-cancel');
        const photoSaveBtn = document.getElementById('wpc-photo-save');
        const photoFileInput = document.getElementById('wpc-photo-file-input');
        const photoUrlInput = document.getElementById('wpc-photo-url-input');
        const logoutBtn = document.getElementById('wpc-logout-btn');

        toggleBtn.addEventListener('click', () => {
            isEditing = !isEditing;
            const blockElements = document.querySelectorAll('[data-block-id]');

            if (isEditing) {
                toggleText.textContent = "STOP EDITING";
                toggleBtn.style.background = "#f43f5e";
                toggleBtn.style.borderColor = "#f43f5e";
                toggleBtn.style.color = "#fff";
                saveBtn.style.display = "inline-flex";
                resetBtn.style.display = "inline-flex";
                statusTag.textContent = "STATUS: EDITING ACTIVE (Click any highlighted element to type)";
                statusTag.style.color = "#06b6d4";

                blockElements.forEach(el => {
                    el.setAttribute('contenteditable', 'true');
                    el.classList.add('wpc-editing-active');
                });
            } else {
                toggleText.textContent = "START VISUAL EDITING";
                toggleBtn.style.background = "";
                toggleBtn.style.borderColor = "";
                toggleBtn.style.color = "";
                saveBtn.style.display = "none";
                resetBtn.style.display = "none";
                statusTag.textContent = "STATUS: AUTHENTICATED ADMIN";
                statusTag.style.color = "#10b981";

                blockElements.forEach(el => {
                    el.removeAttribute('contenteditable');
                    el.classList.remove('wpc-editing-active');
                });
            }
        });

        // Photo Modal Actions
        changePhotoBtn.addEventListener('click', () => {
            photoModalEl.classList.add('active');
        });
        photoCancelBtn.addEventListener('click', () => {
            photoModalEl.classList.remove('active');
        });
        photoSaveBtn.addEventListener('click', () => {
            const avatarImg = document.querySelector('.avatar-holo-img');
            if (photoFileInput.files && photoFileInput.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const dataUrl = e.target.result;
                    if (isValidImageUrl(dataUrl)) {
                        if (avatarImg) avatarImg.src = dataUrl;
                        savedBlocks['profile_avatar_img'] = dataUrl;
                        localStorage.setItem(BLOCKS_STORAGE_KEY, JSON.stringify(savedBlocks));
                    }
                    photoModalEl.classList.remove('active');
                };
                reader.readAsDataURL(photoFileInput.files[0]);
            } else if (photoUrlInput.value.trim()) {
                const url = photoUrlInput.value.trim();
                if (isValidImageUrl(url)) {
                    if (avatarImg) avatarImg.src = url;
                    savedBlocks['profile_avatar_img'] = url;
                    localStorage.setItem(BLOCKS_STORAGE_KEY, JSON.stringify(savedBlocks));
                }
                photoModalEl.classList.remove('active');
            }
        });

        // Save All Changes (Sanitized before writing to storage)
        saveBtn.addEventListener('click', () => {
            const blockElements = document.querySelectorAll('[data-block-id]');
            blockElements.forEach(el => {
                const id = el.getAttribute('data-block-id');
                if (id && id !== '__proto__' && id !== 'constructor') {
                    savedBlocks[id] = sanitizeBlockHtml(el.innerHTML);
                }
            });

            localStorage.setItem(BLOCKS_STORAGE_KEY, JSON.stringify(savedBlocks));
            saveBtn.innerHTML = `<i class="fas fa-check"></i> PUBLISHED!`;
            setTimeout(() => {
                saveBtn.innerHTML = `<i class="fas fa-save"></i> PUBLISH LIVE`;
            }, 2000);
        });

        // Reset to Defaults
        resetBtn.addEventListener('click', () => {
            if (confirm("Reset all customizations to default code state?")) {
                localStorage.removeItem(BLOCKS_STORAGE_KEY);
                location.reload();
            }
        });

        // Logout
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('PORT2_ADMIN_AUTH');
            sessionStorage.removeItem('FIREBASE_AUTH_ACTIVE');
            localStorage.removeItem('PORT2_REMEMBER_ADMIN');
            location.reload();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCustomizer);
    } else {
        initCustomizer();
    }
})();
