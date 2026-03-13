"use client";

import { useIntl } from "react-intl";
import { Field, Box, MultiSelect, MultiSelectOption } from "@strapi/design-system";
import { useState, useEffect } from "react";

const AdvancedEnumeration = ({
  attribute = {},
  description = { id: "", defaultMessage: "" },
  disabled,
  error,
  intlLabel = { id: "", defaultMessage: "" },
  labelAction,
  name,
  onChange,
  required,
  value,
}) => {
  const { formatMessage } = useIntl();

  const {
    enumOptions = "",
    minChoices = 0,
    maxChoices = 0,
    defaultSelected = "",
    customErrorMessage = "",
    fieldNote = "",
  } = attribute.options || attribute;

  const fieldNoteFromAttribute = attribute.options?.fieldNote || "";

  // Parse enum options from "value|label" format
  const options = enumOptions
    .split("\n")
    .filter((opt) => opt.trim())
    .map((opt) => {
      const parts = opt.split("|");
      const optionValue = parts[0]?.trim() || "";
      const label = parts[1]?.trim() || optionValue;
      return { value: optionValue, label };
    })
    .filter((opt) => opt.value);

  const getInitialValues = () => {
    if (value && Array.isArray(value) && value.length > 0) {
      return value.map(String);
    } else if (value && typeof value === "string" && value.trim()) {
      return value.split(",").map((v) => v.trim()).filter((v) => v);
    } else if (defaultSelected && typeof defaultSelected === "string" && defaultSelected.trim()) {
      return defaultSelected.split("\n").map((v) => v.trim()).filter((v) => v);
    }
    return [];
  };

  const [fieldValue, setFieldValue] = useState(getInitialValues);
  const [validationError, setValidationError] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Validate selected values against min/max choices
  const validateSelection = (val) => {
    const values = Array.isArray(val) ? val : [];

    if (required && values.length === 0) {
      return customErrorMessage || "This field is required";
    }
    if (values.length === 0) return null;

    if (minChoices > 0 && values.length < Number(minChoices)) {
      return (
        customErrorMessage ||
        `Please select at least ${minChoices} option${Number(minChoices) > 1 ? "s" : ""}`
      );
    }
    if (maxChoices > 0 && values.length > Number(maxChoices)) {
      return (
        customErrorMessage ||
        `Please select at most ${maxChoices} option${Number(maxChoices) > 1 ? "s" : ""}`
      );
    }

    return null;
  };

  // Initialize on mount with default values
  useEffect(() => {
    const initialValues = getInitialValues();
    setFieldValue(initialValues);

    const validationResult = validateSelection(initialValues);
    setValidationError(validationResult);

    if (
      onChange &&
      initialValues.length > 0 &&
      (!value || (Array.isArray(value) && value.length === 0)) &&
      !isInitialized
    ) {
      setTimeout(() => {
        onChange({
          target: {
            value: initialValues,
            name: name,
            id: name,
          },
        });
        setIsInitialized(true);
      }, 0);
    } else if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [value, defaultSelected, onChange, error]);

  // Sync when value prop changes externally
  useEffect(() => {
    if (value && Array.isArray(value) && value.length > 0) {
      setFieldValue(value.map(String));
      const validationResult = validateSelection(value);
      setValidationError(validationResult);
    }
  }, [value]);

  const handleChange = (newValues) => {
    setFieldValue(newValues);
    setHasInteracted(true);

    const errMsg = validateSelection(newValues);
    setValidationError(errMsg);

    if (onChange) {
      onChange({
        target: {
          value: newValues,
          name: name,
          id: name,
        },
      });
    }
  };

  // Prioritize Strapi's server-side error, then local validation (only after interaction)
  const displayError = error || (hasInteracted && validationError);

  // Build hint text for selection limits
  const buildConstraintHint = () => {
    const min = Number(minChoices);
    const max = Number(maxChoices);
    if (min > 0 && max > 0) {
      return `Select between ${min} and ${max} options`;
    } else if (min > 0) {
      return `Select at least ${min} option${min > 1 ? "s" : ""}`;
    } else if (max > 0) {
      return `Select at most ${max} option${max > 1 ? "s" : ""}`;
    }
    return null;
  };

  const constraintHint = buildConstraintHint();

  const renderContent = () => {
    // No options configured yet
    if (!options || options.length === 0) {
      return (
        <div
          style={{
            padding: "10px 12px",
            color: "#8e8ea9",
            fontStyle: "italic",
            fontSize: "14px",
            backgroundColor: "#f6f6f9",
            borderRadius: "4px",
            border: "1px dashed #dcdce4",
          }}
        >
          {formatMessage({
            id: "advanced-fields.enumeration.no-options",
            defaultMessage:
              "No options defined. Please configure this field in the content type settings (one per line: value|label).",
          })}
        </div>
      );
    }

    return (
      <>
        <MultiSelect
          id={name}
          name={name}
          placeholder={formatMessage({
            id: "advanced-fields.enumeration.placeholder",
            defaultMessage: "Select one or more options...",
          })}
          onChange={handleChange}
          value={fieldValue}
          disabled={disabled}
          hasError={!!displayError}
          withTags
        >
          {options.map((option) => (
            <MultiSelectOption key={option.value} value={option.value}>
              {option.label}
            </MultiSelectOption>
          ))}
        </MultiSelect>

        {/* Selection count indicator */}
        {fieldValue.length > 0 && (
          <div
            style={{
              marginTop: "4px",
              fontSize: "12px",
              color: "#666687",
              textAlign: "right",
            }}
          >
            {fieldValue.length} of {options.length} selected
            {Number(maxChoices) > 0 && ` (max ${maxChoices})`}
          </div>
        )}
      </>
    );
  };

  return (
    <Box col={6}>
      <Field.Root name={name} error={displayError}>
        <Field.Label>
          {intlLabel.id
            ? formatMessage(intlLabel)
            : intlLabel.defaultMessage || name}
          {required && (
            <span style={{ color: "#d02b20", marginLeft: "4px" }}>*</span>
          )}
        </Field.Label>

        {renderContent()}

        {displayError && <Field.Error>{displayError}</Field.Error>}

        {constraintHint && !displayError && (
          <div
            style={{
              fontSize: "12px",
              color: "#666687",
              marginTop: "4px",
            }}
          >
            {constraintHint}
          </div>
        )}

        {description && (description.id || description.defaultMessage) && (
          <Field.Hint>
            {description.id
              ? formatMessage(description)
              : description.defaultMessage}
          </Field.Hint>
        )}

        {(fieldNote || fieldNoteFromAttribute) && (
          <span
            style={{
              fontStyle: "italic",
              color: "#666",
              fontSize: "12px",
              display: "block",
              marginTop: "4px",
            }}
          >
            {fieldNote || fieldNoteFromAttribute}
          </span>
        )}
      </Field.Root>
    </Box>
  );
};

export default AdvancedEnumeration;
