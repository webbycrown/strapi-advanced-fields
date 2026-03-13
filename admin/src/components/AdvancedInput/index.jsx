"use client";

import { useIntl } from "react-intl";
import { Field, Box } from "@strapi/design-system";
import { useState, useEffect } from "react";

const AdvancedInput = ({
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
  const [inputValue, setInputValue] = useState(value || "");
  const [validationError, setValidationError] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const {
    minLength = 0,
    maxLength = 0,
    min = 0,
    max = 0,
    step = 1,
    rows = 4,
    options = {},
  } = attribute;

  // Extract options with defaults
  const {
    placeholder = '',
    defaultValue = '',
    customErrorMessage = '',
    regex = '',
    fieldNote = '',
  } = options;

  // Also check attribute.options for fieldNote
  const fieldNoteFromAttribute = attribute.options?.fieldNote || '';


  // Initialize input value
  useEffect(() => {
    const initialValue = value === undefined ? defaultValue : value;
    setInputValue(initialValue);
    
    // Don't validate on initial load unless there's an error from Strapi
    if (error) {
      setValidationError(error);
    }
    
    if (onChange) {
      onChange({ target: { value: initialValue } });
    }
  }, [value, defaultValue, onChange, error]);

  // Validation function - this should match server-side validation
  const validateInput = (val) => {
    // Check required validation first
    if (required && (!val || val.toString().trim().length === 0)) {
      return customErrorMessage || "This field is required";
    }
    
    // If no value, no additional validation needed
    if (!val || val.toString().trim().length === 0) {
      return null;
    }
    
    const stringValue = val.toString().trim();
    
    // Check min/max length validation
    if (minLength > 0 && stringValue.length < minLength) {
      return customErrorMessage || `Minimum length is ${minLength} characters`;
    }
    if (maxLength > 0 && stringValue.length > maxLength) {
      return customErrorMessage || `Maximum length is ${maxLength} characters`;
    }
    
    // Check regex validation if provided
    if (regex && stringValue) {
      try {
        const regexPattern = new RegExp(regex);
        if (!regexPattern.test(stringValue)) {
          return customErrorMessage || "Invalid format";
        }
      } catch (e) {
        // Invalid regex pattern, skip validation
      }
    }
    
    return null;
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setHasInteracted(true);
    
    // Validate input only after user interaction
    const error = validateInput(newValue);
    setValidationError(error);
    
    if (onChange) {
      onChange(e);
    }
  };

  // Show validation error - prioritize Strapi's error, then our validation only after user interaction
  const displayError = error || (hasInteracted && validationError);

  const renderInput = () => {
    const commonProps = {
      name,
      value: inputValue,
      onChange: handleChange,
      disabled,
      placeholder: placeholder || (intlLabel.id ? formatMessage(intlLabel) : intlLabel.defaultMessage || ""),
    };

    const inputStyle = {
      width: "100%",
      padding: "8px 12px",
      border: `1px solid ${displayError ? "#d02b20" : "#dcdce4"}`,
      borderRadius: "4px",
      fontSize: "14px",
      fontFamily: "inherit",
      backgroundColor: disabled ? "#f6f6f9" : "#ffffff",
    };

    return (
      <input
        {...commonProps}
        type="text"
        style={inputStyle}
      />
    );
  };

  return (
    <Box col={6}>
      <Field.Root name={name} error={displayError}>
        <Field.Label>
          {intlLabel.id ? formatMessage(intlLabel) : intlLabel.defaultMessage || name}
          {required && <span style={{ color: "#d02b20", marginLeft: "4px" }}>*</span>}
        </Field.Label>
        {renderInput()}
        {displayError && (
          <Field.Error>
            {displayError}
          </Field.Error>
        )}
        {description && (description.id || description.defaultMessage) && (
          <Field.Hint>
            {description.id ? formatMessage(description) : description.defaultMessage}
          </Field.Hint>
        )}
        {(fieldNote || fieldNoteFromAttribute) && (
          <span style={{ 
            fontStyle: 'italic', 
            color: '#666', 
            fontSize: '12px',
            display: 'block',
            marginTop: '4px'
          }}>
          {fieldNote || fieldNoteFromAttribute}
          </span>
        )}
      </Field.Root>
    </Box>
  );
};

export default AdvancedInput;