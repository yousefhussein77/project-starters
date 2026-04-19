import re
from collections.abc import Iterable


class ValidationError(ValueError):
    """Raised when incoming data fails validation rules."""


MULTI_SPACE_PATTERN = re.compile(r"\s+")
LATIN_USERNAME_PATTERN = re.compile(r"^[A-Za-z0-9._-]+$")
ARABIC_NAME_PATTERN = re.compile(r"^[\u0621-\u064A\s]+$")
SAFE_TEXT_PATTERN = re.compile(r"^[^\x00-\x1F<>]+$")


def normalize_text(value: str | None) -> str:
    return MULTI_SPACE_PATTERN.sub(" ", (value or "").strip())


def validate_required(value: str | None, field_label: str = "This field") -> str:
    normalized = normalize_text(value)
    if not normalized:
        raise ValidationError(f"{field_label} is required.")
    return normalized


def validate_length(
    value: str,
    field_label: str = "This field",
    *,
    min_length: int = 0,
    max_length: int | None = None,
) -> str:
    if min_length and len(value) < min_length:
        raise ValidationError(f"{field_label} must be at least {min_length} characters.")
    if max_length is not None and len(value) > max_length:
        raise ValidationError(f"{field_label} must be at most {max_length} characters.")
    return value


def validate_pattern(
    value: str,
    field_label: str = "This field",
    *,
    pattern: re.Pattern[str],
    invalid_message: str | None = None,
) -> str:
    if not pattern.fullmatch(value):
        raise ValidationError(invalid_message or f"{field_label} is invalid.")
    return value


def validate_safe_text(
    value: str | None,
    *,
    field_label: str = "Text",
    min_length: int = 0,
    max_length: int | None = None,
    required: bool = True,
) -> str | None:
    normalized = normalize_text(value)
    if not normalized:
        if required:
            raise ValidationError(f"{field_label} is required.")
        return None
    validate_length(normalized, field_label, min_length=min_length, max_length=max_length)
    validate_pattern(
        normalized,
        field_label,
        pattern=SAFE_TEXT_PATTERN,
        invalid_message=f"{field_label} contains unsupported characters.",
    )
    return normalized


def validate_person_name(
    value: str | None,
    *,
    field_label: str = "Full name",
    min_length: int = 3,
    max_length: int = 100,
    min_parts: int | None = None,
    max_parts: int | None = None,
    pattern: re.Pattern[str] | None = None,
    invalid_message: str | None = None,
) -> str:
    normalized = validate_required(value, field_label)
    validate_length(normalized, field_label, min_length=min_length, max_length=max_length)

    if pattern is not None:
        validate_pattern(
            normalized,
            field_label,
            pattern=pattern,
            invalid_message=invalid_message or f"{field_label} is invalid.",
        )

    parts = [part for part in normalized.split(" ") if part]
    if min_parts is not None and len(parts) < min_parts:
        raise ValidationError(f"{field_label} must contain at least {min_parts} parts.")
    if max_parts is not None and len(parts) > max_parts:
        raise ValidationError(f"{field_label} must contain at most {max_parts} parts.")
    return normalized


def validate_arabic_full_name(
    value: str | None,
    *,
    field_label: str = "Arabic full name",
    min_length: int = 10,
    max_length: int = 50,
    min_parts: int = 4,
    max_parts: int = 6,
) -> str:
    return validate_person_name(
        value,
        field_label=field_label,
        min_length=min_length,
        max_length=max_length,
        min_parts=min_parts,
        max_parts=max_parts,
        pattern=ARABIC_NAME_PATTERN,
        invalid_message=f"{field_label} must contain Arabic letters and spaces only.",
    )


def validate_phone_number(
    value: str | None,
    *,
    field_label: str = "Phone number",
    min_length: int = 7,
    max_length: int = 20,
    allowed_prefixes: Iterable[str] | None = None,
    exact_length: int | None = None,
    must_start_with: str | None = None,
) -> str:
    normalized = normalize_text(value)
    if not normalized:
        raise ValidationError(f"{field_label} is required.")
    if not normalized.isdigit():
        raise ValidationError(f"{field_label} must contain digits only.")

    expected_max = exact_length if exact_length is not None else max_length
    validate_length(
        normalized,
        field_label,
        min_length=exact_length if exact_length is not None else min_length,
        max_length=expected_max,
    )

    if must_start_with and not normalized.startswith(must_start_with):
        raise ValidationError(f"{field_label} must start with {must_start_with}.")

    if allowed_prefixes:
        allowed_prefixes = tuple(allowed_prefixes)
        if not normalized.startswith(allowed_prefixes):
            options = ", ".join(allowed_prefixes)
            raise ValidationError(f"{field_label} must start with one of: {options}.")

    return normalized


def validate_yemen_mobile(
    value: str | None,
    *,
    field_label: str = "Yemen mobile number",
) -> str:
    return validate_phone_number(
        value,
        field_label=field_label,
        exact_length=9,
        must_start_with="7",
        allowed_prefixes=("70", "71", "73", "77", "78"),
    )


def validate_username(
    value: str | None,
    *,
    field_label: str = "Username",
    min_length: int = 3,
    max_length: int = 30,
    pattern: re.Pattern[str] = LATIN_USERNAME_PATTERN,
) -> str:
    normalized = validate_required(value, field_label)
    if " " in normalized:
        raise ValidationError(f"{field_label} cannot contain spaces.")
    validate_length(normalized, field_label, min_length=min_length, max_length=max_length)
    validate_pattern(
        normalized,
        field_label,
        pattern=pattern,
        invalid_message=f"{field_label} contains unsupported characters.",
    )
    return normalized


def validate_password(
    value: str | None,
    *,
    field_label: str = "Password",
    min_length: int = 6,
    max_length: int = 128,
) -> str:
    raw_value = value or ""
    if not raw_value:
        raise ValidationError(f"{field_label} is required.")
    if raw_value != raw_value.strip():
        raise ValidationError(f"{field_label} cannot start or end with spaces.")
    validate_length(raw_value, field_label, min_length=min_length, max_length=max_length)
    return raw_value


def validate_match(
    value: str | None,
    other_value: str | None,
    *,
    field_label: str = "This field",
    mismatch_message: str | None = None,
) -> str:
    normalized = value or ""
    if normalized != (other_value or ""):
        raise ValidationError(mismatch_message or f"{field_label} does not match.")
    return normalized
