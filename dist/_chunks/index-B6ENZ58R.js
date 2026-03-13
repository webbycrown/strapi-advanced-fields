"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const reactIntl = require("react-intl");
const designSystem = require("@strapi/design-system");
const react = require("react");
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
  value
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const {
    enumOptions = "",
    minChoices = 0,
    maxChoices = 0,
    defaultSelected = "",
    customErrorMessage = "",
    fieldNote = ""
  } = attribute.options || attribute;
  const fieldNoteFromAttribute = attribute.options?.fieldNote || "";
  const options = enumOptions.split("\n").filter((opt) => opt.trim()).map((opt) => {
    const parts = opt.split("|");
    const optionValue = parts[0]?.trim() || "";
    const label = parts[1]?.trim() || optionValue;
    return { value: optionValue, label };
  }).filter((opt) => opt.value);
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
  const [fieldValue, setFieldValue] = react.useState(getInitialValues);
  const [validationError, setValidationError] = react.useState(null);
  const [hasInteracted, setHasInteracted] = react.useState(false);
  const [isInitialized, setIsInitialized] = react.useState(false);
  const validateSelection = (val) => {
    const values = Array.isArray(val) ? val : [];
    if (required && values.length === 0) {
      return customErrorMessage || "This field is required";
    }
    if (values.length === 0) return null;
    if (minChoices > 0 && values.length < Number(minChoices)) {
      return customErrorMessage || `Please select at least ${minChoices} option${Number(minChoices) > 1 ? "s" : ""}`;
    }
    if (maxChoices > 0 && values.length > Number(maxChoices)) {
      return customErrorMessage || `Please select at most ${maxChoices} option${Number(maxChoices) > 1 ? "s" : ""}`;
    }
    return null;
  };
  react.useEffect(() => {
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
  }, [value, defaultSelected, onChange, error]);
  react.useEffect(() => {
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
          name,
          id: name
        }
      });
    }
  };
  const displayError = error || hasInteracted && validationError;
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
    if (!options || options.length === 0) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          style: {
            padding: "10px 12px",
            color: "#8e8ea9",
            fontStyle: "italic",
            fontSize: "14px",
            backgroundColor: "#f6f6f9",
            borderRadius: "4px",
            border: "1px dashed #dcdce4"
          },
          children: formatMessage({
            id: "advanced-fields.enumeration.no-options",
            defaultMessage: "No options defined. Please configure this field in the content type settings (one per line: value|label)."
          })
        }
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.MultiSelect,
        {
          id: name,
          name,
          placeholder: formatMessage({
            id: "advanced-fields.enumeration.placeholder",
            defaultMessage: "Select one or more options..."
          }),
          onChange: handleChange,
          value: fieldValue,
          disabled,
          hasError: !!displayError,
          withTags: true,
          children: options.map((option) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.MultiSelectOption, { value: option.value, children: option.label }, option.value))
        }
      ),
      fieldValue.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          style: {
            marginTop: "4px",
            fontSize: "12px",
            color: "#666687",
            textAlign: "right"
          },
          children: [
            fieldValue.length,
            " of ",
            options.length,
            " selected",
            Number(maxChoices) > 0 && ` (max ${maxChoices})`
          ]
        }
      )
    ] });
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { col: 6, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name, error: displayError, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Label, { children: [
      intlLabel.id ? formatMessage(intlLabel) : intlLabel.defaultMessage || name,
      required && /* @__PURE__ */ jsxRuntime.jsx("span", { style: { color: "#d02b20", marginLeft: "4px" }, children: "*" })
    ] }),
    renderContent(),
    displayError && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, { children: displayError }),
    constraintHint && !displayError && /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        style: {
          fontSize: "12px",
          color: "#666687",
          marginTop: "4px"
        },
        children: constraintHint
      }
    ),
    description && (description.id || description.defaultMessage) && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, { children: description.id ? formatMessage(description) : description.defaultMessage }),
    (fieldNote || fieldNoteFromAttribute) && /* @__PURE__ */ jsxRuntime.jsx(
      "span",
      {
        style: {
          fontStyle: "italic",
          color: "#666",
          fontSize: "12px",
          display: "block",
          marginTop: "4px"
        },
        children: fieldNote || fieldNoteFromAttribute
      }
    )
  ] }) });
};
exports.default = AdvancedEnumeration;
