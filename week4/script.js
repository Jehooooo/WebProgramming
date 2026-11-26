// 0. Splash Screen (Shows for 2 seconds before revealing the whole UCC main page)
const splash = document.getElementById("splash");
const pageShell = document.getElementById("pageShell");

if (splash && pageShell) {
    setTimeout(() => {
        splash.classList.add("hidden");
        pageShell.classList.remove("hidden");
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) target.scrollIntoView();
        }
    }, 2000);
}

// 1. Dark / Light Theme Switch (synced via localStorage "theme" with MyApp)
const colorSchemeMeta = document.querySelector('meta[name="color-scheme"]');
const themeToggle = document.getElementById("themeToggle");
const darkMedia = window.matchMedia("(prefers-color-scheme: dark)");

function getSystemScheme() {
    return darkMedia.matches ? "dark" : "light";
}

function getStoredScheme() {
    try {
        const value = localStorage.getItem("theme") || localStorage.getItem("color-scheme");
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

        try { localStorage.setItem("theme", target); } catch (e) { /* ignore */ }
        applyScheme(target);
    });
}

window.addEventListener("storage", (e) => {
    if (e.key === "theme" || e.key === "color-scheme") {
        applyScheme(getStoredScheme());
    }
});

// 2. MyApp Modal Popup (Register, Login & Welcome screens from slide tutorial)
const myAppDialog = document.getElementById("myAppDialog");
const closeMyApp = document.getElementById("closeMyApp");
const modalScreens = document.querySelectorAll(".modal-screen");
const regForm = document.getElementById("regForm");
const regMsg = document.getElementById("regMsg");
const logForm = document.getElementById("logForm");
const logMsg = document.getElementById("logMsg");
const hello = document.getElementById("welcomeText");
const portalAlert = document.getElementById("alert");

const getUsers = () => {
    try {
        const raw = localStorage.getItem("users");
        return JSON.parse(raw) ?? [];
    } catch (e) {
        return [];
    }
};

const showScreen = (id) => {
    modalScreens.forEach((s) => {
        s.classList.toggle("hidden", s.id !== id);
    });
};

let currentUser = null;

document.querySelectorAll("[data-open-myapp]").forEach((btn) => {
    btn.addEventListener("click", () => {
        if (!myAppDialog) return;
        regMsg.textContent = "";
        logMsg.textContent = "";
        if (currentUser) {
            hello.textContent = `Welcome, ${currentUser.name}!`;
            showScreen("welcome");
        } else {
            showScreen(getUsers().length ? "login" : "register");
        }
        myAppDialog.showModal();
    });
});

if (closeMyApp && myAppDialog) {
    closeMyApp.addEventListener("click", () => myAppDialog.close());

    // Fallback for browsers without native <dialog closedby="any"> support (e.g. Safari)
    if (!("closedBy" in HTMLDialogElement.prototype)) {
        myAppDialog.addEventListener("click", (event) => {
            if (event.target !== myAppDialog) return;
            const rect = myAppDialog.getBoundingClientRect();
            const isDialogContent = (
                rect.top <= event.clientY &&
                event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX &&
                event.clientX <= rect.left + rect.width
            );
            if (!isDialogContent) {
                myAppDialog.close();
            }
        });
    }
}

document.addEventListener("click", (e) => {
    const id = e.target.id;
    if (id === "toLogin") {
        e.preventDefault();
        regMsg.textContent = "";
        showScreen("login");
    }
    if (id === "toRegister") {
        e.preventDefault();
        logMsg.textContent = "";
        showScreen("register");
    }
    if (id === "logout") {
        currentUser = null;
        if (portalAlert) portalAlert.textContent = "Welcome to UCC San Fernando!";
        logForm.reset();
        logMsg.textContent = "";
        showScreen("login");
    }
});

if (regForm) {
    regForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const f = regForm.elements;
        try {
            if (f.password.value.length < 8)
                throw new Error("Password too short");
            if (f.password.value !== f.confirm.value)
                throw new Error("Passwords do not match");

            const email = f.email.value.trim().toLowerCase();
            if (getUsers().some((u) => u.email === email))
                throw new Error("Email already used");

            const users = [...getUsers(), {
                name: f.name.value,
                email,
                password: f.password.value,
            }];
            localStorage.setItem("users", JSON.stringify(users));
            regMsg.textContent = "";
            regForm.reset();
            showScreen("login");
        } catch (error) {
            regMsg.textContent = error.message;
        }
    });
}

if (logForm) {
    logForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const f = logForm.elements;
        const mail = f.email.value.trim().toLowerCase();
        const user = getUsers().find((u) => u.email === mail);
        if (user?.password === f.password.value) {
            currentUser = user;
            logMsg.textContent = "";
            hello.textContent = `Welcome, ${user.name}!`;
            if (portalAlert) portalAlert.textContent = `Welcome, ${user.name}!`;
            showScreen("welcome");
        } else {
            logMsg.textContent = "Wrong email or password";
        }
    });
}

// 3. Interactive Notice Publishing (prepends new notice to Latest Bulletins)
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

// 4. Interactive Contact Inquiry Confirmation
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
