// 1. Two-state Dark / Light Theme Switch (shared via localStorage with MyApp/loginform.html)
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

if (themeToggle) {
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
}

window.addEventListener("storage", (e) => {
    if (e.key === "color-scheme") {
        applyScheme(getStoredScheme());
    }
});

// 2. Interactive Notice Publishing (prepends new notice to Latest Bulletins)
const noticeForm = document.getElementById("noticeForm");
const noticeStatus = document.getElementById("noticeStatus");
const bulletinFeed = document.getElementById("bulletinFeed");

if (noticeForm) {
    noticeForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const title = document.getElementById("title").value.trim();
        const dept = document.getElementById("department").value;
        const msg = document.getElementById("msg").value.trim();

        const entry = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = `${title} (${dept}): `;
        entry.append(strong, document.createTextNode(msg));
        bulletinFeed.prepend(entry);

        noticeStatus.textContent = `Notice "${title}" published to Latest Bulletins!`;
        noticeStatus.classList.add("is-visible");
        this.reset();
    });
}

// 3. Interactive Contact Inquiry Confirmation
const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("full-name").value.trim();
        const office = document.getElementById("office").value;

        contactStatus.textContent = `Thank you, ${name}! Your inquiry for ${office} has been received.`;
        contactStatus.classList.add("is-visible");
        this.reset();
    });
}
