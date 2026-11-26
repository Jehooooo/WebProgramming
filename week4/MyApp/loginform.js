// 1. Two-state Dark / Light Theme Switch synced with <meta name="color-scheme">
const colorSchemeMeta = document.querySelector('meta[name="color-scheme"]');
const themeToggle = document.getElementById("themeToggle");
const darkMedia = window.matchMedia("(prefers-color-scheme: dark)");

function getSystemScheme() {
    return darkMedia.matches ? "dark" : "light";
}

function getStoredScheme() {
    try {
        const value = localStorage.getItem("color-scheme");
        return value === "light" || value === "dark" ? value : null;
    } catch (e) {
        return null;
    }
}

function applyScheme(stored) {
    colorSchemeMeta.content = stored ?? "light dark";
}

themeToggle.addEventListener("click", () => {
    const system = getSystemScheme();
    const rendered = getStoredScheme() ?? system;
    const target = rendered === "dark" ? "light" : "dark";

    if (target === system) {
        try { localStorage.removeItem("color-scheme"); } catch (e) { /* ignore */ }
        applyScheme(null);
    } else {
        try { localStorage.setItem("color-scheme", target); } catch (e) { /* ignore */ }
        applyScheme(target);
    }
});

window.addEventListener("storage", (e) => {
    if (e.key === "color-scheme") {
        applyScheme(getStoredScheme());
    }
});

// 2. Login / Sign Up Tab Switching
const tabLogin = document.getElementById("tab-login");
const tabSignup = document.getElementById("tab-signup");
const panelLogin = document.getElementById("panel-login");
const panelSignup = document.getElementById("panel-signup");
const statusBanner = document.getElementById("statusBanner");

function clearStatus() {
    statusBanner.className = "status-banner";
    statusBanner.textContent = "";
}

function showStatus(message, type) {
    statusBanner.className = "status-banner is-visible " + (type === "success" ? "is-success" : "is-info");
    statusBanner.textContent = message;
}

function switchMode(mode) {
    const isLogin = mode === "login";
    tabLogin.setAttribute("aria-selected", String(isLogin));
    tabSignup.setAttribute("aria-selected", String(!isLogin));
    panelLogin.hidden = !isLogin;
    panelSignup.hidden = isLogin;
    clearStatus();
    const firstInput = (isLogin ? panelLogin : panelSignup).querySelector("input");
    if (firstInput) firstInput.focus();
}

tabLogin.addEventListener("click", () => switchMode("login"));
tabSignup.addEventListener("click", () => switchMode("signup"));
document.querySelectorAll("[data-switch-tab]").forEach((btn) => {
    btn.addEventListener("click", () => switchMode(btn.dataset.switchTab));
});

// 3. Show / Hide Password Toggles
document.querySelectorAll(".toggle-pw").forEach((btn) => {
    btn.addEventListener("click", () => {
        const input = document.getElementById(btn.dataset.target);
        const showing = input.type === "text";
        input.type = showing ? "password" : "text";
        btn.textContent = showing ? "Show" : "Hide";
        btn.setAttribute("aria-pressed", String(!showing));
        input.focus();
    });
});

document.getElementById("forgotBtn").addEventListener("click", () => {
    showStatus("Enter your email address and check your inbox for password reset instructions.", "info");
    document.getElementById("login-email").focus();
});

// 4. Consistent ARIA Validation Sync & :user-invalid Fallback
const supportsUserInvalid = CSS.supports("selector(:user-invalid)");
const dirtyState = new WeakMap();
const flagged = new WeakSet();
const announced = new WeakSet();

const announcer = document.createElement("div");
announcer.setAttribute("aria-live", "polite");
announcer.classList.add("visually-hidden");
document.body.append(announcer);
let announceTimer;
let announcedField;

const linkError = (el, shown) => {
    const errorId = el.dataset.error;
    if (!errorId) return;
    const ids = (el.getAttribute("aria-describedby") || "").split(/\s+/).filter((id) => id && id !== errorId);
    if (shown) ids.push(errorId);
    if (ids.length) el.setAttribute("aria-describedby", ids.join(" "));
    else el.removeAttribute("aria-describedby");
};

const spokenText = (node) => {
    const copy = node.cloneNode(true);
    copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
    copy.querySelectorAll('[role="img"][aria-label]').forEach((n) => n.replaceWith(`${n.getAttribute("aria-label")}: `));
    return copy.textContent.replace(/\s+/g, " ").trim();
};

const announceError = (el) => {
    const error = document.getElementById(el.dataset.error);
    if (!error) return;
    const label = el.labels?.[0] ? `${spokenText(el.labels[0])}: ` : "";
    clearTimeout(announceTimer);
    announcer.textContent = "";
    announcedField = el;
    announceTimer = setTimeout(() => { announcer.textContent = label + spokenText(error); }, 500);
};

const syncAria = (el, announce = false) => {
    if (!el.matches?.("input, select, textarea")) return;
    const invalid = supportsUserInvalid
        ? el.matches(":user-invalid")
        : el.classList.contains("user-invalid-fallback");
    if (invalid) {
        if (announce && !announced.has(el)) {
            announceError(el);
            announced.add(el);
        }
        el.setAttribute("aria-invalid", "true");
        linkError(el, true);
        flagged.add(el);
    } else if (flagged.has(el) || el.getAttribute("aria-invalid") !== "true") {
        el.setAttribute("aria-invalid", "false");
        linkError(el, false);
        flagged.delete(el);
        announced.delete(el);
        if (announcedField === el) {
            clearTimeout(announceTimer);
            announcer.textContent = "";
        }
    }
};

const updateFallback = (el) => {
    if (supportsUserInvalid || !el.checkValidity) return;
    const valid = el.validity.valid;
    el.classList.toggle("user-invalid-fallback", !valid);
    el.classList.toggle("user-valid-fallback", valid);
};

document.querySelectorAll("input").forEach((el) => syncAria(el));

document.addEventListener("blur", (e) => {
    const el = e.target;
    if (!supportsUserInvalid && el.matches?.("input")) {
        const state = dirtyState.get(el) || { hasInteracted: false, hasBlurred: false };
        state.hasBlurred = true;
        dirtyState.set(el, state);
        if (state.hasInteracted) updateFallback(el);
    }
    syncAria(el, true);
}, true);

document.addEventListener("input", (e) => {
    const el = e.target;
    if (!supportsUserInvalid && el.matches?.("input")) {
        const state = dirtyState.get(el) || { hasInteracted: false, hasBlurred: false };
        state.hasInteracted = true;
        dirtyState.set(el, state);
        if (state.hasBlurred) updateFallback(el);
    }
    if (el.hasAttribute("aria-invalid")) syncAria(el);
});

document.addEventListener("change", (e) => {
    const el = e.target;
    if (!supportsUserInvalid && el.matches?.("input")) {
        const state = dirtyState.get(el) || { hasInteracted: false, hasBlurred: false };
        state.hasInteracted = true;
        dirtyState.set(el, state);
        if (state.hasBlurred) updateFallback(el);
    }
    syncAria(el, true);
}, true);

document.addEventListener("invalid", (e) => {
    const el = e.target;
    if (!supportsUserInvalid && el.matches?.("input")) {
        dirtyState.set(el, { hasInteracted: true, hasBlurred: true });
        updateFallback(el);
    }
    announced.add(el);
    syncAria(el);
}, true);

document.addEventListener("reset", (e) => {
    setTimeout(() => {
        [...e.target.elements].forEach((el) => {
            dirtyState.delete(el);
            el.classList.remove("user-invalid-fallback", "user-valid-fallback");
            syncAria(el);
        });
    });
}, true);

// 5. Form Submissions
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    showStatus(`Signed in successfully as ${email}.`, "success");
    this.reset();
});

document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("signup-name").value.trim();
    showStatus(`Account created for ${name}! You can now sign in.`, "success");
    this.reset();
});
