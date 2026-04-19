export const initPasswordToggles = (root = document) => {
    root.querySelectorAll("[data-password-toggle]").forEach((toggle) => {
        if (toggle.dataset.passwordToggleBound === "true") {
            return;
        }

        toggle.dataset.passwordToggleBound = "true";
        toggle.addEventListener("click", () => {
            const targetId = toggle.getAttribute("data-password-toggle");
            const field = root.getElementById?.(targetId) || document.getElementById(targetId);
            if (!field) return;

            const showLabel = toggle.dataset.showLabel || "Show password";
            const hideLabel = toggle.dataset.hideLabel || "Hide password";
            const isPassword = field.type === "password";

            field.type = isPassword ? "text" : "password";
            toggle.setAttribute("aria-label", isPassword ? hideLabel : showLabel);
            toggle.setAttribute("aria-pressed", isPassword ? "true" : "false");
        });
    });
};
