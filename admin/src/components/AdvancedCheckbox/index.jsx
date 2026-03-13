"use client";

import { useIntl } from "react-intl";
import { Field, Box, Flex } from "@strapi/design-system";
import { useState, useEffect } from "react";

const AdvancedCheckbox = ({
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
    checkboxType = "multiple",
    layout = "vertical",
    minChoices = 0,
    maxChoices = 0,
    defaultSelected = "",
    checkboxOptions = "",
    customErrorMessage = "",
    fieldNote = "",
  } = attribute.options || attribute;

  // Also check attribute.options for fieldNote
  const fieldNoteFromAttribute = attribute.options?.fieldNote || '';


  // Initialize with default values if available
  const getInitialValues = () => {
    if (checkboxType === "single") {
      // For single checkbox mode, return array with one value (like radio button)
      if (value && Array.isArray(value) && value.length > 0) {
        return value;
      } else if (value && typeof value === "string" && value.trim()) {
        return [value.trim()];
      } else if (defaultSelected && typeof defaultSelected === "string" && defaultSelected.trim()) {
        return [defaultSelected.trim()];
      } else if (defaultSelected && Array.isArray(defaultSelected) && defaultSelected.length > 0) {
        return defaultSelected;
      }
      return [];
    } else {
      // For multiple checkboxes, return array of selected values
      if (value && Array.isArray(value)) {
        return value;
      } else if (value && typeof value === "string") {
        return value.split(",").map(v => v.trim()).filter(v => v);
      } else if (defaultSelected) {
        return defaultSelected.split(",").map(v => v.trim()).filter(v => v);
      }
      return [];
    }
  };

  const [fieldValue, setFieldValue] = useState(getInitialValues);
  const [validationError, setValidationError] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Parse checkbox options
  const options = checkboxOptions
    .split("\n")
    .filter((opt) => opt.trim())
    .map((opt) => {
      const [value, label] = opt.split("|");
      return { value: value?.trim() || "", label: label?.trim() || value?.trim() || "" };
    });

  // Initialize selected values - only run once on mount
  useEffect(() => {
    const initialValues = getInitialValues();
    
    
    setFieldValue(initialValues);
    
    // Validate the initial values
    const validationResult = validateSelection(initialValues);
    setValidationError(validationResult);
    
    // Only trigger onChange if we have initial values and it's different from current value
    // AND only if the value prop is not already set (to avoid overriding during publish)
    // AND only if this is the first initialization
    if (onChange && initialValues.length > 0 && (!value || (Array.isArray(value) && value.length === 0)) && !isInitialized) {
      // Use setTimeout to ensure this happens after the component is fully mounted
      setTimeout(() => {
        onChange({ 
          target: { 
            value: initialValues,
            name: name,
            id: name
          } 
        });
        setIsInitialized(true);
      }, 0);
    } else if (!isInitialized) {
      setIsInitialized(true);
    }
  }, []); // Remove dependencies to only run once on mount

  // Handle external value changes (like when loading existing data)
  useEffect(() => {
    // Only update if the value prop has changed and it's not empty
    // This handles cases like loading existing content
    if (value && Array.isArray(value) && value.length > 0) {
      setFieldValue(value);
      const validationResult = validateSelection(value);
      setValidationError(validationResult);
    }
  }, [value]);

  // Validation function - this should match server-side validation
  const validateSelection = (val) => {
    const values = Array.isArray(val) ? val : [];
    
    // Check required validation first
    if (required && values.length === 0) {
      return customErrorMessage || 'This field is required';
    }
    
    // If field is empty and not required, no validation error
    if (values.length === 0) {
      return null;
    }
    
    // Check min/max choices validation (only for multiple mode)
    if (checkboxType === "multiple") {
      if (minChoices > 0 && values.length < minChoices) {
        return customErrorMessage || `Please select at least ${minChoices} option${minChoices > 1 ? 's' : ''}`;
      }
      if (maxChoices > 0 && values.length > maxChoices) {
        return customErrorMessage || `Please select at most ${maxChoices} option${maxChoices > 1 ? 's' : ''}`;
      }
    }
    
    return null;
  };

  const handleCheckboxChange = (optionValue, isChecked) => {
    let newValue;
    
    if (checkboxType === "single") {
      // For single checkbox mode, work like radio button - only one option can be selected
      if (isChecked) {
        // If checking an option, set it as the only selected value
        newValue = [optionValue];
      } else {
        // If unchecking, clear the selection
        newValue = [];
      }
    } else {
      // For multiple checkboxes, handle array of values
      if (isChecked) {
        newValue = [...fieldValue, optionValue];
      } else {
        newValue = fieldValue.filter(val => val !== optionValue);
      }
    }
    
    setFieldValue(newValue);
    setHasInteracted(true);
    
    // Validate selection only after user interaction
    const error = validateSelection(newValue);
    setValidationError(error);
    
    
    // Always trigger onChange for user interactions
    if (onChange) {
      onChange({ 
        target: { 
          value: newValue,
          name: name,
          id: name
        } 
      });
    }
  };

  // Show validation error - prioritize Strapi's error, then our validation only after user interaction
  const displayError = error || (hasInteracted && validationError);
  const renderCheckboxes = () => {

    const checkboxStyle = {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "8px",
    };

    const checkboxInputStyle = {
      width: "16px",
      height: "16px",
      accentColor: "#4945ff",
      margin: "0",
      padding: "0",
      opacity: "1",
      visibility: "visible",
      display: "block",
      position: "relative",
      zIndex: "1",
    };

    const checkboxLabelStyle = {
      fontSize: "14px",
      fontFamily: "inherit",
      cursor: "pointer",
      userSelect: "none",
    };

    // Single checkbox mode - show multiple options but only one selectable (like radio buttons)
    if (checkboxType === "single") {
      // If no options are defined for single mode, show a message
      if (!options || options.length === 0) {
        return (
          <div style={{ padding: "8px", color: "#666", fontStyle: "italic" }}>
            {formatMessage({
              id: 'advanced-fields.checkbox.options.checkboxOptions.description',
              defaultMessage: 'Define available options for multiple checkboxes (one per line: value|label)'
            })}
          </div>
        );
      }

      if (layout === "horizontal") {
        return (
          <Flex wrap="wrap" gap={2}>
            {options.map((option) => (
              <div key={option.value} style={checkboxStyle}>
                <input
                  type="checkbox"
                  id={`${name}-${option.value}`}
                  checked={fieldValue.includes(option.value)}
                  onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                  disabled={disabled}
                  style={checkboxInputStyle}
                />
                <label
                  htmlFor={`${name}-${option.value}`}
                  style={checkboxLabelStyle}
                >
                  {option.label}
                </label>
              </div>
            ))}
          </Flex>
        );
      }

      return (
        <div>
          {options.map((option) => (
            <div key={option.value} style={checkboxStyle}>
              <input
                type="checkbox"
                id={`${name}-${option.value}`}
                checked={fieldValue.includes(option.value)}
                onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                disabled={disabled}
                style={checkboxInputStyle}
              />
              <label
                htmlFor={`${name}-${option.value}`}
                style={checkboxLabelStyle}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      );
    }

    // Multiple checkbox mode
    // If no options are defined, show a message
    if (!options || options.length === 0) {
        return (
          <div style={{ padding: "8px", color: "#666", fontStyle: "italic" }}>
            {formatMessage({
              id: 'advanced-fields.checkbox.options.checkboxOptions.description',
              defaultMessage: 'Define available options for multiple checkboxes (one per line: value|label)'
            })}
          </div>
        );
    }

    if (layout === "horizontal") {
      return (
        <Flex wrap="wrap" gap={2}>
          {options.map((option) => (
            <div key={option.value} style={checkboxStyle}>
              <input
                type="checkbox"
                id={`${name}-${option.value}`}
                checked={fieldValue.includes(option.value)}
                onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                disabled={disabled}
                style={checkboxInputStyle}
              />
              <label
                htmlFor={`${name}-${option.value}`}
                style={checkboxLabelStyle}
              >
                {option.label}
              </label>
            </div>
          ))}
        </Flex>
      );
    }

    return (
      <div>
        {options.map((option) => (
          <div key={option.value} style={checkboxStyle}>
            <input
              type="checkbox"
              id={`${name}-${option.value}`}
              checked={fieldValue.includes(option.value)}
              onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
              disabled={disabled}
              style={checkboxInputStyle}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              style={checkboxLabelStyle}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Box col={6}>
      <Field.Root name={name} error={displayError}>
        <Field.Label>
          {intlLabel.id ? formatMessage(intlLabel) : intlLabel.defaultMessage || name}
          {required && <span style={{ color: "#d02b20", marginLeft: "4px" }}>*</span>}
        </Field.Label>
        {renderCheckboxes()}
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

export default AdvancedCheckbox;