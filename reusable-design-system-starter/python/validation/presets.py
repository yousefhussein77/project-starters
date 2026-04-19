from .core import (
    validate_arabic_full_name,
    validate_phone_number,
    validate_safe_text,
    validate_username,
    validate_yemen_mobile,
)


def validate_name_field(
    value: str | None,
    *,
    field_label: str = "Full name",
    min_length: int = 3,
    max_length: int = 100,
) -> str:
    from .core import validate_person_name

    return validate_person_name(
        value,
        field_label=field_label,
        min_length=min_length,
        max_length=max_length,
    )


def validate_phone_field(
    value: str | None,
    *,
    field_label: str = "Phone number",
    min_length: int = 7,
    max_length: int = 20,
    exact_length: int | None = None,
    allowed_prefixes: tuple[str, ...] | None = None,
    must_start_with: str | None = None,
) -> str:
    return validate_phone_number(
        value,
        field_label=field_label,
        min_length=min_length,
        max_length=max_length,
        exact_length=exact_length,
        allowed_prefixes=allowed_prefixes,
        must_start_with=must_start_with,
    )


def validate_username_field(value: str | None, *, field_label: str = "Username") -> str:
    return validate_username(value, field_label=field_label)


def validate_reason_field(
    value: str | None,
    *,
    field_label: str = "Reason",
    max_length: int = 1000,
) -> str | None:
    return validate_safe_text(
        value,
        field_label=field_label,
        min_length=5,
        max_length=max_length,
        required=False,
    )


def validate_safe_text_field(
    value: str | None,
    *,
    field_label: str = "Text",
    min_length: int = 3,
    max_length: int = 200,
    required: bool = True,
) -> str | None:
    return validate_safe_text(
        value,
        field_label=field_label,
        min_length=min_length,
        max_length=max_length,
        required=required,
    )


def validate_arabic_full_name_field(value: str | None) -> str:
    return validate_arabic_full_name(value, field_label="Arabic full name")


def validate_yemen_mobile_field(value: str | None) -> str:
    return validate_yemen_mobile(value, field_label="Yemen mobile number")
