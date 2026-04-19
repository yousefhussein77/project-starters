export const createValidationKit = ({ profiles = {} } = {}) => {
    const ensureErrorNode = (field) => {
        const form = field.form || document;
        let errorNode = form.querySelector(`[data-field-error-for="${field.name}"]`);
        if (errorNode) {
            return errorNode;
        }

        errorNode = document.createElement("div");
        errorNode.className = "field-error-message";
        errorNode.setAttribute("data-field-error-for", field.name);
        errorNode.setAttribute("aria-live", "polite");
        const anchor = field.closest(".input-group, .password-field-group") || field;
        anchor.insertAdjacentElement("afterend", errorNode);
        return errorNode;
    };

    const shakeField = (field) => {
        field.classList.remove("field-shake");
        void field.offsetWidth;
        field.classList.add("field-shake");
    };

    const setError = (field, message = "") => {
        const errorNode = ensureErrorNode(field);
        const hasError = Boolean(message);
        field.classList.toggle("is-invalid-live", hasError);
        field.setCustomValidity(message || "");
        errorNode.textContent = message || "";
        if (hasError) {
            shakeField(field);
        }
    };

    const getProfile = (field) => profiles[field.dataset.validationProfile];

    const bindField = (field) => {
        const profile = getProfile(field);
        if (!profile || field.dataset.validationKitBound === "true") {
            return;
        }

        field.dataset.validationKitBound = "true";
        ensureErrorNode(field);

        if (profile.sanitize) {
            field.value = profile.sanitize(field.value);
        }

        field.addEventListener("beforeinput", (event) => {
            if (event.isComposing || !event.inputType || event.inputType.startsWith("delete")) return;
            const message = profile.block?.(field, event.data || "") || "";
            if (!message) return;
            event.preventDefault();
            setError(field, message);
        });

        field.addEventListener("paste", (event) => {
            const message = profile.block?.(field, event.clipboardData?.getData("text") || "") || "";
            if (!message) return;
            event.preventDefault();
            setError(field, message);
        });

        field.addEventListener("input", () => {
            if (profile.sanitize) {
                field.value = profile.sanitize(field.value);
            }
            setError(field, profile.validate(field, "input"));
        });

        field.addEventListener("change", () => {
            setError(field, profile.validate(field, "change"));
        });

        field.addEventListener("blur", () => {
            setError(field, profile.validate(field, "blur"));
        });

        setError(field, "");
    };

    const bindForm = (form) => {
        const fields = Array.from(form.querySelectorAll("[data-validation-profile]"));
        if (!fields.length) return;
        fields.forEach(bindField);

        form.addEventListener("submit", (event) => {
            let firstInvalidField = null;
            fields.forEach((field) => {
                const message = getProfile(field)?.validate(field, "submit") || "";
                setError(field, message);
                if (!firstInvalidField && message) {
                    firstInvalidField = field;
                }
            });

            if (firstInvalidField) {
                event.preventDefault();
                firstInvalidField.focus();
            }
        });
    };

    const init = (scope = document) => {
        scope.querySelectorAll("form[data-validate-form], form[novalidate]").forEach((form) => {
            if (form.dataset.validationKitRootBound === "true") return;
            form.dataset.validationKitRootBound = "true";
            bindForm(form);
        });
    };

    return { init };
};
