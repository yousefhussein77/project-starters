const ARABIC_PATTERN = /^[\u0621-\u064A\s]+$/;
const SAFE_TEXT_PATTERN = /^[^\x00-\x1F<>]+$/;
const USERNAME_PATTERN = /^[A-Za-z0-9._-]+$/;

const getMinLength = (field, fallback = 0) => {
    const raw = field.getAttribute("minlength");
    return raw ? Number(raw) : fallback;
};

const getMaxLength = (field, fallback = Number.POSITIVE_INFINITY) => {
    const raw = field.getAttribute("maxlength");
    return raw ? Number(raw) : fallback;
};

const getLabel = (field, fallback) => field.dataset.validationLabel || fallback;
const getTrimmedValue = (field) => (field.value || "").trim();

const getNextValue = (field, insertedText = "") => {
    if (typeof field.selectionStart !== "number" || typeof field.selectionEnd !== "number") {
        return `${field.value || ""}${insertedText}`;
    }

    return `${field.value.slice(0, field.selectionStart)}${insertedText}${field.value.slice(field.selectionEnd)}`;
};

const ensureErrorNode = (field, classNames) => {
    const form = field.form || document;
    let errorNode = form.querySelector(`[data-field-error-for="${field.name}"]`);
    if (errorNode) {
        return errorNode;
    }

    errorNode = document.createElement("div");
    errorNode.className = classNames.error;
    errorNode.setAttribute("data-field-error-for", field.name);
    errorNode.setAttribute("aria-live", "polite");
    const anchor = field.closest(".input-group, .password-field-group") || field;
    anchor.insertAdjacentElement("afterend", errorNode);
    return errorNode;
};

const shakeField = (field, shakeClass) => {
    field.classList.remove(shakeClass);
    void field.offsetWidth;
    field.classList.add(shakeClass);
};

const setError = (field, message, classNames) => {
    const errorNode = ensureErrorNode(field, classNames);
    const hasError = Boolean(message);
    field.classList.toggle(classNames.invalid, hasError);
    field.setCustomValidity(message || "");
    errorNode.textContent = message || "";

    if (hasError) {
        shakeField(field, classNames.shake);
    }
};

export const createLengthProfile = ({
    defaultLabel = "This field",
    required = true,
    minFallback = 0,
    maxFallback = 100,
    pattern = null,
    invalidMessage = null,
    skipWhen = null,
} = {}) => ({
    validate(field, phase) {
        if (typeof skipWhen === "function" && skipWhen(field)) return "";
        const label = getLabel(field, defaultLabel);
        const value = getTrimmedValue(field);

        if (!value) {
            return required && phase !== "input" ? `${label} is required.` : "";
        }
        if (pattern && !pattern.test(value)) {
            return invalidMessage || `${label} is invalid.`;
        }
        if (value.length > getMaxLength(field, maxFallback)) {
            return `${label} must be at most ${getMaxLength(field, maxFallback)} characters.`;
        }
        if (phase === "input") return "";
        if (value.length < getMinLength(field, minFallback)) {
            return `${label} must be at least ${getMinLength(field, minFallback)} characters.`;
        }
        return "";
    },
    block(field, insertedText) {
        if (typeof skipWhen === "function" && skipWhen(field)) return "";
        const label = getLabel(field, defaultLabel);
        if (pattern && ![...insertedText].every((char) => pattern.test(char))) {
            return invalidMessage || `${label} is invalid.`;
        }
        if (getNextValue(field, insertedText).trim().length > getMaxLength(field, maxFallback)) {
            return `${label} must be at most ${getMaxLength(field, maxFallback)} characters.`;
        }
        return "";
    },
});

export const createPhoneProfile = ({
    defaultLabel = "Phone number",
    requiredMessage = null,
    digitsOnlyMessage = null,
    maxFallback = 20,
    minFallback = 7,
    exactLength = null,
    allowedPrefixes = null,
    mustStartWith = null,
    sanitizeDigits = true,
} = {}) => ({
    sanitize(value) {
        return sanitizeDigits ? (value || "").replace(/\D+/g, "").slice(0, exactLength || maxFallback) : value || "";
    },
    validate(field, phase) {
        const label = getLabel(field, defaultLabel);
        const value = getTrimmedValue(field);
        if (!value) return phase === "input" ? "" : (requiredMessage || `${label} is required.`);
        if (!/^\d+$/.test(value)) return digitsOnlyMessage || `${label} must contain digits only.`;
        if (mustStartWith && !value.startsWith(mustStartWith)) {
            return `${label} must start with ${mustStartWith}.`;
        }
        if (allowedPrefixes && value.length >= Math.min(...allowedPrefixes.map((prefix) => prefix.length))) {
            if (!allowedPrefixes.some((prefix) => value.startsWith(prefix))) {
                return `${label} must start with one of: ${allowedPrefixes.join(", ")}.`;
            }
        }
        if (value.length > getMaxLength(field, exactLength || maxFallback)) {
            return `${label} must be at most ${getMaxLength(field, exactLength || maxFallback)} digits.`;
        }
        if (phase === "input") return "";
        const expectedMin = exactLength || getMinLength(field, minFallback);
        const expectedMax = exactLength || getMaxLength(field, maxFallback);
        if (value.length < expectedMin) {
            return `${label} must be at least ${expectedMin} digits.`;
        }
        if (exactLength && value.length !== expectedMax) {
            return `${label} must be exactly ${expectedMax} digits.`;
        }
        return "";
    },
    block(field, insertedText) {
        const label = getLabel(field, defaultLabel);
        if (!/^\d+$/.test(insertedText)) return digitsOnlyMessage || `${label} must contain digits only.`;
        if (getNextValue(field, insertedText).length > getMaxLength(field, exactLength || maxFallback)) {
            return `${label} must be at most ${getMaxLength(field, exactLength || maxFallback)} digits.`;
        }
        return "";
    },
});

export const createSelectRequiredProfile = ({
    defaultLabel = "This field",
} = {}) => ({
    validate(field, phase) {
        if (field.value) return "";
        return phase === "input" ? "" : `${getLabel(field, defaultLabel)} is required.`;
    },
    block() {
        return "";
    },
});

export const createPasswordProfile = ({
    defaultLabel = "Password",
    minFallback = 6,
    maxFallback = 128,
} = {}) => ({
    validate(field, phase) {
        const label = getLabel(field, defaultLabel);
        const value = field.value || "";
        if (!value) return field.required && phase !== "input" ? `${label} is required.` : "";
        if (value !== value.trim()) return `${label} cannot start or end with spaces.`;
        if (value.length > getMaxLength(field, maxFallback)) {
            return `${label} must be at most ${getMaxLength(field, maxFallback)} characters.`;
        }
        if (phase === "input") return "";
        if (value.length < getMinLength(field, minFallback)) {
            return `${label} must be at least ${getMinLength(field, minFallback)} characters.`;
        }
        return "";
    },
    block(field, insertedText) {
        const label = getLabel(field, defaultLabel);
        if (getNextValue(field, insertedText).length > getMaxLength(field, maxFallback)) {
            return `${label} must be at most ${getMaxLength(field, maxFallback)} characters.`;
        }
        return "";
    },
});

export const createPasswordConfirmProfile = ({
    defaultLabel = "Password confirmation",
    minFallback = 6,
    maxFallback = 128,
} = {}) => ({
    validate(field, phase) {
        const label = getLabel(field, defaultLabel);
        const value = field.value || "";
        const sourceField = field.form?.querySelector(`#${field.dataset.matchField}`);
        const sourceValue = sourceField?.value || "";
        if (phase === "input") return "";
        if (!value) return field.required && sourceValue ? `${label} is required.` : "";
        if (value.length < getMinLength(field, minFallback)) {
            return `${label} must be at least ${getMinLength(field, minFallback)} characters.`;
        }
        if (value.length > getMaxLength(field, maxFallback)) {
            return `${label} must be at most ${getMaxLength(field, maxFallback)} characters.`;
        }
        if (value !== sourceValue) return `${label} does not match.`;
        return "";
    },
    block(field, insertedText) {
        const label = getLabel(field, defaultLabel);
        if (getNextValue(field, insertedText).length > getMaxLength(field, maxFallback)) {
            return `${label} must be at most ${getMaxLength(field, maxFallback)} characters.`;
        }
        return "";
    },
});

export const createReasonProfile = ({
    defaultLabel = "Reason",
    minFallback = 5,
    maxFallback = 1000,
} = {}) => ({
    validate(field, phase) {
        const value = getTrimmedValue(field);
        const label = getLabel(field, defaultLabel);
        if (field.disabled) return "";
        if (!value) return phase === "input" ? "" : `${label} is required.`;
        if (!SAFE_TEXT_PATTERN.test(value)) return `${label} contains unsupported characters.`;
        if (value.length > getMaxLength(field, maxFallback)) {
            return `${label} must be at most ${getMaxLength(field, maxFallback)} characters.`;
        }
        if (phase === "input") return "";
        if (value.length < getMinLength(field, minFallback)) {
            return `${label} must be at least ${getMinLength(field, minFallback)} characters.`;
        }
        return "";
    },
    block(field, insertedText) {
        const label = getLabel(field, defaultLabel);
        if (field.disabled) return "";
        if (![...insertedText].every((char) => SAFE_TEXT_PATTERN.test(char))) {
            return `${label} contains unsupported characters.`;
        }
        if (getNextValue(field, insertedText).trim().length > getMaxLength(field, maxFallback)) {
            return `${label} must be at most ${getMaxLength(field, maxFallback)} characters.`;
        }
        return "";
    },
});

export const createArabicFullNameProfile = ({
    defaultLabel = "Arabic full name",
    minFallback = 10,
    maxFallback = 50,
    minParts = 4,
    maxParts = 6,
} = {}) => ({
    validate(field, phase) {
        const label = getLabel(field, defaultLabel);
        const value = getTrimmedValue(field);
        if (!value) return phase === "input" ? "" : `${label} is required.`;
        if (!ARABIC_PATTERN.test(value)) {
            return `${label} must contain Arabic letters and spaces only.`;
        }
        if (value.length > getMaxLength(field, maxFallback)) {
            return `${label} must be at most ${getMaxLength(field, maxFallback)} characters.`;
        }
        if (phase === "input") return "";
        if (value.length < getMinLength(field, minFallback)) {
            return `${label} must be at least ${getMinLength(field, minFallback)} characters.`;
        }
        const parts = value.split(/\s+/).filter(Boolean);
        if (parts.length < minParts || parts.length > maxParts) {
            return `${label} must contain between ${minParts} and ${maxParts} parts.`;
        }
        return "";
    },
    block(field, insertedText) {
        const label = getLabel(field, defaultLabel);
        if (![...insertedText].every((char) => ARABIC_PATTERN.test(char))) {
            return `${label} must contain Arabic letters and spaces only.`;
        }
        if (getNextValue(field, insertedText).trim().length > getMaxLength(field, maxFallback)) {
            return `${label} must be at most ${getMaxLength(field, maxFallback)} characters.`;
        }
        return "";
    },
});

export const defaultProfiles = {
    "person-name": createLengthProfile({
        defaultLabel: "Full name",
        minFallback: 3,
        maxFallback: 100,
        pattern: SAFE_TEXT_PATTERN,
    }),
    phone: createPhoneProfile(),
    username: createLengthProfile({
        defaultLabel: "Username",
        minFallback: 3,
        maxFallback: 30,
        pattern: USERNAME_PATTERN,
        invalidMessage: "Username contains unsupported characters.",
    }),
    "safe-text": createLengthProfile({
        defaultLabel: "Text",
        minFallback: 3,
        maxFallback: 200,
        pattern: SAFE_TEXT_PATTERN,
        invalidMessage: "Text contains unsupported characters.",
    }),
    "select-required": createSelectRequiredProfile(),
    password: createPasswordProfile(),
    "password-confirm": createPasswordConfirmProfile(),
    reason: createReasonProfile(),
    "arabic-full-name": createArabicFullNameProfile(),
    "yemen-mobile": createPhoneProfile({
        defaultLabel: "Yemen mobile number",
        exactLength: 9,
        maxFallback: 9,
        allowedPrefixes: ["70", "71", "73", "77", "78"],
        mustStartWith: "7",
    }),
};

export const createValidationKit = ({
    profiles = defaultProfiles,
    selectors = {},
    classNames = {},
} = {}) => {
    const resolvedSelectors = {
        forms: selectors.forms || "form[data-validate-form], form[novalidate]",
        fields: selectors.fields || "[data-validation-profile]",
    };

    const resolvedClassNames = {
        invalid: classNames.invalid || "is-invalid-live",
        error: classNames.error || "field-error-message",
        shake: classNames.shake || "field-shake",
    };

    const getProfile = (field) => profiles[field.dataset.validationProfile];

    const validateField = (field, phase = "submit") => {
        const profile = getProfile(field);
        if (!profile) return "";
        const message = profile.validate(field, phase) || "";
        setError(field, message, resolvedClassNames);
        return message;
    };

    const bindField = (field) => {
        const profile = getProfile(field);
        if (!profile || field.dataset.validationKitBound === "true") return;
        field.dataset.validationKitBound = "true";

        ensureErrorNode(field, resolvedClassNames);

        if (profile.sanitize) {
            field.value = profile.sanitize(field.value);
        }

        field.addEventListener("beforeinput", (event) => {
            if (event.isComposing || !event.inputType || event.inputType.startsWith("delete")) return;
            const message = profile.block?.(field, event.data || "") || "";
            if (!message) return;
            event.preventDefault();
            setError(field, message, resolvedClassNames);
        });

        field.addEventListener("paste", (event) => {
            const message = profile.block?.(field, event.clipboardData?.getData("text") || "") || "";
            if (!message) return;
            event.preventDefault();
            setError(field, message, resolvedClassNames);
        });

        field.addEventListener("input", () => {
            if (profile.sanitize) {
                field.value = profile.sanitize(field.value);
            }
            validateField(field, "input");
        });

        field.addEventListener("change", () => {
            validateField(field, "change");
        });

        field.addEventListener("blur", () => {
            validateField(field, "blur");
        });

        setError(field, "", resolvedClassNames);
    };

    const bindForm = (form) => {
        const fields = Array.from(form.querySelectorAll(resolvedSelectors.fields));
        if (!fields.length) return;
        fields.forEach(bindField);

        form.addEventListener("submit", (event) => {
            let firstInvalidField = null;

            fields.forEach((field) => {
                const message = validateField(field, "submit");
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
        scope.querySelectorAll(resolvedSelectors.forms).forEach((form) => {
            if (form.dataset.validationKitRootBound === "true") return;
            form.dataset.validationKitRootBound = "true";
            bindForm(form);
        });
    };

    return {
        init,
        bindForm,
        bindField,
        validateField,
        profiles,
    };
};
