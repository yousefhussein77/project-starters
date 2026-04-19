import { initPasswordToggles } from "./password-toggle.js";

const APP_READY_CLASS = "app-ready";
const APP_LOADING_CLASS = "app-loading";
const APP_BOOT_TIMEOUT_MS = 8000;

function waitForStylesheets() {
    const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"][data-app-style]'));

    if (!stylesheets.length) {
        return Promise.resolve();
    }

    return Promise.all(
        stylesheets.map((link) => {
            if (link.sheet) {
                return Promise.resolve();
            }

            return new Promise((resolve) => {
                const done = () => {
                    link.removeEventListener("load", done);
                    link.removeEventListener("error", done);
                    resolve();
                };

                link.addEventListener("load", done, { once: true });
                link.addEventListener("error", done, { once: true });
            });
        }),
    );
}

function waitForFonts() {
    if (!document.fonts || !document.fonts.ready) {
        return Promise.resolve();
    }

    return document.fonts.ready.catch(() => undefined);
}

function revealApplication() {
    document.documentElement.classList.remove(APP_LOADING_CLASS);
    document.documentElement.classList.add(APP_READY_CLASS);
}

async function bootApplicationShell() {
    const fallback = new Promise((resolve) => {
        window.setTimeout(resolve, APP_BOOT_TIMEOUT_MS);
    });

    await Promise.race([
        Promise.all([waitForStylesheets(), waitForFonts()]),
        fallback,
    ]);

    revealApplication();
}

initPasswordToggles();
bootApplicationShell();
