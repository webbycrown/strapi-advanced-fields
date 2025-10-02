import { jsx, jsxs } from "react/jsx-runtime";
import { useIntl } from "react-intl";
import { Box, Field, Flex } from "@strapi/design-system";
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
  value
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
    fieldNote = ""
  } = attribute.options || attribute;
  const fieldNoteFromAttribute = attribute.options?.fieldNote || "";
  const options = radioOptions.split("\n").filter((opt) => opt.trim()).map((opt) => {
    const [value2, label] = opt.split("|");
    return { value: value2?.trim() || "", label: label?.trim() || value2?.trim() || "" };
  });
  useEffect(() => {
    let initialValues = [];
    if (value && Array.isArray(value)) {
      initialValues = value;
    } else if (value && typeof value === "string") {
      initialValues = value.split(",").map((v) => v.trim()).filter((v) => v);
    } else if (defaultSelected) {
      initialValues = defaultSelected.split(",").map((v) => v.trim()).filter((v) => v);
    }
    setSelectedValues(initialValues);
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
  const validateSelection = (values) => {
    const valArray = Array.isArray(values) ? values : [];
    if (required && valArray.length === 0) {
      return customErrorMessage || "This field is required";
    }
    if (valArray.length === 0) {
      return null;
    }
    if (selectionType === "multiple") {
      if (minChoices > 0 && valArray.length < minChoices) {
        return customErrorMessage || `Please select at least ${minChoices} option${minChoices > 1 ? "s" : ""}`;
      }
      if (maxChoices > 0 && valArray.length > maxChoices) {
        return customErrorMessage || `Please select at most ${maxChoices} option${maxChoices > 1 ? "s" : ""}`;
      }
    }
    return null;
  };
  const handleRadioChange = (optionValue, isChecked) => {
    let newValues;
    if (selectionType === "single") {
      newValues = isChecked ? [optionValue] : [];
    } else {
      if (isChecked) {
        newValues = [...selectedValues, optionValue];
      } else {
        newValues = selectedValues.filter((val) => val !== optionValue);
      }
    }
    setSelectedValues(newValues);
    setHasInteracted(true);
    const error2 = validateSelection(newValues);
    setValidationError(error2);
    if (onChange) {
      const event = {
        target: {
          name,
          id: name,
          value: newValues
        }
      };
      onChange(event);
    }
  };
  const displayError = error || hasInteracted && validationError;
  const renderRadios = () => {
    const radioStyle = {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "4px 0"
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
      transition: "all 0.2s ease"
    };
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
      justifyContent: "center"
    };
    const customRadioCheckedStyle = {
      ...customRadioStyle,
      backgroundColor: "#ffffff",
      borderColor: "#4945ff"
    };
    const customRadioDotStyle = {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      backgroundColor: "#4945ff"
    };
    const radioLabelStyle = {
      fontSize: "14px",
      fontFamily: "inherit",
      cursor: "pointer",
      userSelect: "none",
      color: "#32324d",
      fontWeight: "400",
      lineHeight: "1.5",
      marginLeft: "4px"
    };
    if (!options || options.length === 0) {
      return /* @__PURE__ */ jsx("div", { style: { padding: "8px", color: "#666", fontStyle: "italic" }, children: formatMessage({
        id: "advanced-fields.radio.no-options",
        defaultMessage: "No options defined. Please configure this field in the content type settings."
      }) });
    }
    if (layout === "horizontal") {
      return /* @__PURE__ */ jsx(Flex, { wrap: "wrap", gap: 2, children: options.map((option) => /* @__PURE__ */ jsxs("div", { style: radioStyle, children: [
        selectionType === "multiple" ? (
          // Custom radio button appearance for multiple selection
          /* @__PURE__ */ jsx(
            "div",
            {
              style: selectedValues.includes(option.value) ? customRadioCheckedStyle : customRadioStyle,
              onClick: () => handleRadioChange(option.value, !selectedValues.includes(option.value)),
              children: selectedValues.includes(option.value) && /* @__PURE__ */ jsx("div", { style: customRadioDotStyle })
            }
          )
        ) : (
          // Regular radio button for single selection
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              id: `${name}-${option.value}`,
              name,
              checked: selectedValues.includes(option.value),
              onChange: (e) => handleRadioChange(option.value, e.target.checked),
              disabled,
              style: radioInputStyle
            }
          )
        ),
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: selectionType === "single" ? `${name}-${option.value}` : void 0,
            style: radioLabelStyle,
            onClick: selectionType === "multiple" ? () => handleRadioChange(option.value, !selectedValues.includes(option.value)) : void 0,
            children: option.label
          }
        )
      ] }, option.value)) });
    }
    return /* @__PURE__ */ jsx("div", { children: options.map((option) => /* @__PURE__ */ jsxs("div", { style: radioStyle, children: [
      selectionType === "multiple" ? (
        // Custom radio button appearance for multiple selection
        /* @__PURE__ */ jsx(
          "div",
          {
            style: selectedValues.includes(option.value) ? customRadioCheckedStyle : customRadioStyle,
            onClick: () => handleRadioChange(option.value, !selectedValues.includes(option.value)),
            children: selectedValues.includes(option.value) && /* @__PURE__ */ jsx("div", { style: customRadioDotStyle })
          }
        )
      ) : (
        // Regular radio button for single selection
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "radio",
            id: `${name}-${option.value}`,
            name,
            checked: selectedValues.includes(option.value),
            onChange: (e) => handleRadioChange(option.value, e.target.checked),
            disabled,
            style: radioInputStyle
          }
        )
      ),
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: selectionType === "single" ? `${name}-${option.value}` : void 0,
          style: radioLabelStyle,
          onClick: selectionType === "multiple" ? () => handleRadioChange(option.value, !selectedValues.includes(option.value)) : void 0,
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
    renderRadios(),
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
  AdvancedRadio as default
};
