"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const reactIntl = require("react-intl");
const designSystem = require("@strapi/design-system");
require("@strapi/icons");
const react = require("react");
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
  const { formatMessage } = reactIntl.useIntl();
  const [inputValue, setInputValue] = react.useState(value || "");
  const [validationError, setValidationError] = react.useState(null);
  const [hasInteracted, setHasInteracted] = react.useState(false);
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
  react.useEffect(() => {
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
    return /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      {
        ...commonProps,
        type: "text",
        style: inputStyle
      }
    );
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { col: 6, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name, error: displayError, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Label, { children: [
      intlLabel.id ? formatMessage(intlLabel) : intlLabel.defaultMessage || name,
      required && /* @__PURE__ */ jsxRuntime.jsx("span", { style: { color: "#d02b20", marginLeft: "4px" }, children: "*" })
    ] }),
    renderInput(),
    displayError && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, { children: displayError }),
    description && (description.id || description.defaultMessage) && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, { children: description.id ? formatMessage(description) : description.defaultMessage }),
    (fieldNote || fieldNoteFromAttribute) && /* @__PURE__ */ jsxRuntime.jsx("span", { style: {
      fontStyle: "italic",
      color: "#666",
      fontSize: "12px",
      display: "block",
      marginTop: "4px"
    }, children: fieldNote || fieldNoteFromAttribute })
  ] }) });
};
exports.default = AdvancedInput;
