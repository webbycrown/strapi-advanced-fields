import { jsx, jsxs } from "react/jsx-runtime";
import { useIntl } from "react-intl";
import { Box, Field, Flex } from "@strapi/design-system";
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
  value
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
    fieldNote = ""
  } = attribute.options || attribute;
  const fieldNoteFromAttribute = attribute.options?.fieldNote || "";
  const getInitialValues = () => {
    if (checkboxType === "single") {
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
      if (value && Array.isArray(value)) {
        return value;
      } else if (value && typeof value === "string") {
        return value.split(",").map((v) => v.trim()).filter((v) => v);
      } else if (defaultSelected) {
        return defaultSelected.split(",").map((v) => v.trim()).filter((v) => v);
      }
      return [];
    }
  };
  const [fieldValue, setFieldValue] = useState(getInitialValues);
  const [validationError, setValidationError] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const options = checkboxOptions.split("\n").filter((opt) => opt.trim()).map((opt) => {
    const [value2, label] = opt.split("|");
    return { value: value2?.trim() || "", label: label?.trim() || value2?.trim() || "" };
  });
  useEffect(() => {
    const initialValues = getInitialValues();
    setFieldValue(initialValues);
    const validationResult = validateSelection(initialValues);
    setValidationError(validationResult);
    if (onChange && initialValues.length > 0 && (!value || Array.isArray(value) && value.length === 0) && !isInitialized) {
      setTimeout(() => {
        onChange({
          target: {
            value: initialValues,
            name,
            id: name
          }
        });
        setIsInitialized(true);
      }, 0);
    } else if (!isInitialized) {
      setIsInitialized(true);
    }
  }, []);
  useEffect(() => {
    if (value && Array.isArray(value) && value.length > 0) {
      setFieldValue(value);
      const validationResult = validateSelection(value);
      setValidationError(validationResult);
    }
  }, [value]);
  const validateSelection = (val) => {
    const values = Array.isArray(val) ? val : [];
    if (required && values.length === 0) {
      return customErrorMessage || "This field is required";
    }
    if (values.length === 0) {
      return null;
    }
    if (checkboxType === "multiple") {
      if (minChoices > 0 && values.length < minChoices) {
        return customErrorMessage || `Please select at least ${minChoices} option${minChoices > 1 ? "s" : ""}`;
      }
      if (maxChoices > 0 && values.length > maxChoices) {
        return customErrorMessage || `Please select at most ${maxChoices} option${maxChoices > 1 ? "s" : ""}`;
      }
    }
    return null;
  };
  const handleCheckboxChange = (optionValue, isChecked) => {
    let newValue;
    if (checkboxType === "single") {
      if (isChecked) {
        newValue = [optionValue];
      } else {
        newValue = [];
      }
    } else {
      if (isChecked) {
        newValue = [...fieldValue, optionValue];
      } else {
        newValue = fieldValue.filter((val) => val !== optionValue);
      }
    }
    setFieldValue(newValue);
    setHasInteracted(true);
    const error2 = validateSelection(newValue);
    setValidationError(error2);
    if (onChange) {
      onChange({
        target: {
          value: newValue,
          name,
          id: name
        }
      });
    }
  };
  const displayError = error || hasInteracted && validationError;
  const renderCheckboxes = () => {
    const checkboxStyle = {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "8px"
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
      zIndex: "1"
    };
    const checkboxLabelStyle = {
      fontSize: "14px",
      fontFamily: "inherit",
      cursor: "pointer",
      userSelect: "none"
    };
    if (checkboxType === "single") {
      if (!options || options.length === 0) {
        return /* @__PURE__ */ jsx("div", { style: { padding: "8px", color: "#666", fontStyle: "italic" }, children: formatMessage({
          id: "advanced-fields.checkbox.options.checkboxOptions.description",
          defaultMessage: "Define available options for multiple checkboxes (one per line: value|label)"
        }) });
      }
      if (layout === "horizontal") {
        return /* @__PURE__ */ jsx(Flex, { wrap: "wrap", gap: 2, children: options.map((option) => /* @__PURE__ */ jsxs("div", { style: checkboxStyle, children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: `${name}-${option.value}`,
              checked: fieldValue.includes(option.value),
              onChange: (e) => handleCheckboxChange(option.value, e.target.checked),
              disabled,
              style: checkboxInputStyle
            }
          ),
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: `${name}-${option.value}`,
              style: checkboxLabelStyle,
              children: option.label
            }
          )
        ] }, option.value)) });
      }
      return /* @__PURE__ */ jsx("div", { children: options.map((option) => /* @__PURE__ */ jsxs("div", { style: checkboxStyle, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            id: `${name}-${option.value}`,
            checked: fieldValue.includes(option.value),
            onChange: (e) => handleCheckboxChange(option.value, e.target.checked),
            disabled,
            style: checkboxInputStyle
          }
        ),
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: `${name}-${option.value}`,
            style: checkboxLabelStyle,
            children: option.label
          }
        )
      ] }, option.value)) });
    }
    if (!options || options.length === 0) {
      return /* @__PURE__ */ jsx("div", { style: { padding: "8px", color: "#666", fontStyle: "italic" }, children: formatMessage({
        id: "advanced-fields.checkbox.options.checkboxOptions.description",
        defaultMessage: "Define available options for multiple checkboxes (one per line: value|label)"
      }) });
    }
    if (layout === "horizontal") {
      return /* @__PURE__ */ jsx(Flex, { wrap: "wrap", gap: 2, children: options.map((option) => /* @__PURE__ */ jsxs("div", { style: checkboxStyle, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            id: `${name}-${option.value}`,
            checked: fieldValue.includes(option.value),
            onChange: (e) => handleCheckboxChange(option.value, e.target.checked),
            disabled,
            style: checkboxInputStyle
          }
        ),
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: `${name}-${option.value}`,
            style: checkboxLabelStyle,
            children: option.label
          }
        )
      ] }, option.value)) });
    }
    return /* @__PURE__ */ jsx("div", { children: options.map((option) => /* @__PURE__ */ jsxs("div", { style: checkboxStyle, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          id: `${name}-${option.value}`,
          checked: fieldValue.includes(option.value),
          onChange: (e) => handleCheckboxChange(option.value, e.target.checked),
          disabled,
          style: checkboxInputStyle
        }
      ),
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: `${name}-${option.value}`,
          style: checkboxLabelStyle,
          children: option.label
        }
      )
    ] }, option.value)) });
  };
  return /* @__PURE__ */ jsx(Box, { col: 6, children: /* @__PURE__ */ jsxs(Field.Root, { name, error: displayError, children: [
    /* @__PURE__ */ jsxs(Field.Label, { children: [
      intlLabel.id ? formatMessage(intlLabel) : intlLabel.defaultMessage || name,
      required && /* @__PURE__ */ jsx("span", { style: { color: "#d02b20", marginLeft: "4px" }, children: "*" })
    ] }),
    renderCheckboxes(),
    displayError && /* @__PURE__ */ jsx(Field.Error, { children: displayError }),
    description && (description.id || description.defaultMessage) && /* @__PURE__ */ jsx(Field.Hint, { children: description.id ? formatMessage(description) : description.defaultMessage }),
    (fieldNote || fieldNoteFromAttribute) && /* @__PURE__ */ jsx("span", { style: {
      fontStyle: "italic",
      color: "#666",
      fontSize: "12px",
      display: "block",
      marginTop: "4px"
    }, children: fieldNote || fieldNoteFromAttribute })
  ] }) });
};
export {
  AdvancedCheckbox as default
};
