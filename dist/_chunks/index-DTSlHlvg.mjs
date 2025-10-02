import { jsx, jsxs } from "react/jsx-runtime";
import { useIntl } from "react-intl";
import { Box, Field } from "@strapi/design-system";
import "@strapi/icons";
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
  value
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
    options = {}
  } = attribute;
  const {
    placeholder = "",
    defaultValue = "",
    customErrorMessage = "",
    regex = "",
    fieldNote = ""
  } = options;
  const fieldNoteFromAttribute = attribute.options?.fieldNote || "";
  useEffect(() => {
    const initialValue = value === void 0 ? defaultValue : value;
    setInputValue(initialValue);
    if (error) {
      setValidationError(error);
    }
    if (onChange) {
      onChange({ target: { value: initialValue } });
    }
  }, [value, defaultValue, onChange, error]);
  const validateInput = (val) => {
    if (required && (!val || val.toString().trim().length === 0)) {
      return customErrorMessage || "This field is required";
    }
    if (!val || val.toString().trim().length === 0) {
      return null;
    }
    const stringValue = val.toString().trim();
    if (minLength > 0 && stringValue.length < minLength) {
      return customErrorMessage || `Minimum length is ${minLength} characters`;
    }
    if (maxLength > 0 && stringValue.length > maxLength) {
      return customErrorMessage || `Maximum length is ${maxLength} characters`;
    }
    if (regex && stringValue) {
      try {
        const regexPattern = new RegExp(regex);
        if (!regexPattern.test(stringValue)) {
          return customErrorMessage || "Invalid format";
        }
      } catch (e) {
      }
    }
    return null;
  };
  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setHasInteracted(true);
    const error2 = validateInput(newValue);
    setValidationError(error2);
    if (onChange) {
      onChange(e);
    }
  };
  const displayError = error || hasInteracted && validationError;
  const renderInput = () => {
    const commonProps = {
      name,
      value: inputValue,
      onChange: handleChange,
      disabled,
      placeholder: placeholder || (intlLabel.id ? formatMessage(intlLabel) : intlLabel.defaultMessage || "")
    };
    const inputStyle = {
      width: "100%",
      padding: "8px 12px",
      border: `1px solid ${displayError ? "#d02b20" : "#dcdce4"}`,
      borderRadius: "4px",
      fontSize: "14px",
      fontFamily: "inherit",
      backgroundColor: disabled ? "#f6f6f9" : "#ffffff"
    };
    return /* @__PURE__ */ jsx(
      "input",
      {
        ...commonProps,
        type: "text",
        style: inputStyle
      }
    );
  };
  return /* @__PURE__ */ jsx(Box, { col: 6, children: /* @__PURE__ */ jsxs(Field.Root, { name, error: displayError, children: [
    /* @__PURE__ */ jsxs(Field.Label, { children: [
      intlLabel.id ? formatMessage(intlLabel) : intlLabel.defaultMessage || name,
      required && /* @__PURE__ */ jsx("span", { style: { color: "#d02b20", marginLeft: "4px" }, children: "*" })
    ] }),
    renderInput(),
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
  AdvancedInput as default
};
