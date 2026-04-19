export const initNavbarDisclosure = (root = document) => {
    root.querySelectorAll("[data-navbar-toggle]").forEach((toggle) => {
        if (toggle.dataset.navbarToggleBound === "true") {
            return;
        }

        toggle.dataset.navbarToggleBound = "true";
        toggle.addEventListener("click", () => {
            const targetSelector = toggle.getAttribute("data-navbar-toggle");
            const target = root.querySelector(targetSelector);
            if (!target) return;

            const expanded = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
            target.hidden = expanded;
        });
    });
};
