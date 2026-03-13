"use client";

import { useIntl } from "react-intl";
import { Field, Box, Flex } from "@strapi/design-system";
import { useState, useEffect } from "react";

const AdvancedRadio = ({
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
  const [selectedValues, setSelectedValues] = useState([]);
  const [validationError, setValidationError] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const {
    selectionType = "single",
    layout = "vertical",
    minChoices = 0,
    maxChoices = 0,
    defaultSelected = "",
    radioOptions = "",
    customErrorMessage = "",
    fieldNote = "",
  } = attribute.options || attribute;

  // Also check attribute.options for fieldNote
  const fieldNoteFromAttribute = attribute.options?.fieldNote || '';

  // Parse radio options
  const options = radioOptions
    .split("\n")
    .filter((opt) => opt.trim())
    .map((opt) => {
      const [value, label] = opt.split("|");
      return { value: value?.trim() || "", label: label?.trim() || value?.trim() || "" };
    });

  // Initialize selected values
  useEffect(() => {
    let initialValues = [];
    
    if (value && Array.isArray(value)) {
      initialValues = value;
    } else if (value && typeof value === "string") {
      initialValues = value.split(",").map(v => v.trim()).filter(v => v);
    } else if (defaultSelected) {
      initialValues = defaultSelected.split(",").map(v => v.trim()).filter(v => v);
    }
    
    setSelectedValues(initialValues);
    
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
  }, [value, defaultSelected, onChange, error]);

  // Validation function - this should match server-side validation
  const validateSelection = (values) => {
    const valArray = Array.isArray(values) ? values : [];
    
    // Check required validation first
    if (required && valArray.length === 0) {
      return customErrorMessage || 'This field is required';
    }
    
    // If field is empty and not required, no validation error
    if (valArray.length === 0) {
      return null;
    }
    
    // Check min/max choices validation (only for multiple mode)
    if (selectionType === "multiple") {
      if (minChoices > 0 && valArray.length < minChoices) {
        return customErrorMessage || `Please select at least ${minChoices} option${minChoices > 1 ? 's' : ''}`;
      }
      if (maxChoices > 0 && valArray.length > maxChoices) {
        return customErrorMessage || `Please select at most ${maxChoices} option${maxChoices > 1 ? 's' : ''}`;
      }
    }
    
    return null;
  };

  const handleRadioChange = (optionValue, isChecked) => {
    let newValues;
    
    if (selectionType === "single") {
      // Single selection: replace current selection
      newValues = isChecked ? [optionValue] : [];
    } else {
      // Multiple selection: add/remove from array
      if (isChecked) {
        newValues = [...selectedValues, optionValue];
      } else {
        newValues = selectedValues.filter(val => val !== optionValue);
      }
    }
    
    setSelectedValues(newValues);
    setHasInteracted(true);
    
    // Validate selection only after user interaction
    const error = validateSelection(newValues);
    setValidationError(error);
    
    
    if (onChange) {
      // Create a proper event object with name and id attributes
      const event = {
        target: {
          name: name,
          id: name,
          value: newValues
        }
      };
      onChange(event);
    }
  };

  // Show validation error - prioritize Strapi's error, then our validation only after user interaction
  const displayError = error || (hasInteracted && validationError);

  const renderRadios = () => {

    const radioStyle = {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "4px 0",
    };

    const radioInputStyle = {
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
      cursor: "pointer",
      border: "2px solid #dcdce4",
      borderRadius: "50%",
      backgroundColor: "white",
      transition: "all 0.2s ease",
    };

    // Custom radio button style for multiple selection
    const customRadioStyle = {
      width: "16px",
      height: "16px",
      borderRadius: "50%",
      borderWidth: "1px",
      borderStyle: "solid",
      backgroundColor: "#ffffff",
      cursor: "pointer",
      transition: "all 0.2s ease",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    const customRadioCheckedStyle = {
      ...customRadioStyle,
      backgroundColor: "#ffffff",
      borderColor: "#4945ff",
    };

    const customRadioDotStyle = {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      backgroundColor: "#4945ff",
    };

    const radioLabelStyle = {
      fontSize: "14px",
      fontFamily: "inherit",
      cursor: "pointer",
      userSelect: "none",
      color: "#32324d",
      fontWeight: "400",
      lineHeight: "1.5",
      marginLeft: "4px",
    };

    // If no options are defined, show a message
    if (!options || options.length === 0) {
        return (
          <div style={{ padding: "8px", color: "#666", fontStyle: "italic" }}>
            {formatMessage({
              id: 'advanced-fields.radio.no-options',
              defaultMessage: 'No options defined. Please configure this field in the content type settings.'
            })}
          </div>
        );
    }

    if (layout === "horizontal") {
      return (
        <Flex wrap="wrap" gap={2}>
          {options.map((option) => (
            <div key={option.value} style={radioStyle}>
              {selectionType === "multiple" ? (
                // Custom radio button appearance for multiple selection
                <div
                  style={selectedValues.includes(option.value) ? customRadioCheckedStyle : customRadioStyle}
                  onClick={() => handleRadioChange(option.value, !selectedValues.includes(option.value))}
                >
                  {selectedValues.includes(option.value) && (
                    <div style={customRadioDotStyle} />
                  )}
                </div>
              ) : (
                // Regular radio button for single selection
                <input
                  type="radio"
                  id={`${name}-${option.value}`}
                  name={name}
                  checked={selectedValues.includes(option.value)}
                  onChange={(e) => handleRadioChange(option.value, e.target.checked)}
                  disabled={disabled}
                  style={radioInputStyle}
                />
              )}
              <label
                htmlFor={selectionType === "single" ? `${name}-${option.value}` : undefined}
                style={radioLabelStyle}
                onClick={selectionType === "multiple" ? () => handleRadioChange(option.value, !selectedValues.includes(option.value)) : undefined}
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
          <div key={option.value} style={radioStyle}>
            {selectionType === "multiple" ? (
              // Custom radio button appearance for multiple selection
              <div
                style={selectedValues.includes(option.value) ? customRadioCheckedStyle : customRadioStyle}
                onClick={() => handleRadioChange(option.value, !selectedValues.includes(option.value))}
              >
                {selectedValues.includes(option.value) && (
                  <div style={customRadioDotStyle} />
                )}
              </div>
            ) : (
              // Regular radio button for single selection
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                checked={selectedValues.includes(option.value)}
                onChange={(e) => handleRadioChange(option.value, e.target.checked)}
                disabled={disabled}
                style={radioInputStyle}
              />
            )}
            <label
              htmlFor={selectionType === "single" ? `${name}-${option.value}` : undefined}
              style={radioLabelStyle}
              onClick={selectionType === "multiple" ? () => handleRadioChange(option.value, !selectedValues.includes(option.value)) : undefined}
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
        {renderRadios()}
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

export default AdvancedRadio;