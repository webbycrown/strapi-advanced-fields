"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
const reactColor = require("react-color");
const reactIntl = require("react-intl");
const designSystem = require("@strapi/design-system");
const normalizeHexColor = (value) => {
  if (!value) return "";
  const raw = String(value).trim();
  if (!raw) return "";
  const withHash = raw.startsWith("#") ? raw : `#${raw}`;
  return withHash;
};
const isValidHexColor = (value) => {
  if (!value) return false;
  const v = normalizeHexColor(value);
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v);
};
const AdvancedColor = ({
  attribute = {},
  description = { id: "", defaultMessage: "" },
  disabled,
  error,
  intlLabel = { id: "", defaultMessage: "" },
  name,
  onChange,
  required,
  value
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const containerRef = react.useRef(null);
  const { options = {} } = attribute;
  const {
    defaultValue = "",
    customErrorMessage = "",
    fieldNote = ""
  } = options;
  const fieldNoteFromAttribute = attribute.options?.fieldNote || "";
  const initialColor = react.useMemo(() => {
    const normalized = value === void 0 ? defaultValue : value;
    return normalizeHexColor(normalized);
  }, [value, defaultValue]);
  const [inputValue, setInputValue] = react.useState(initialColor);
  const [validationError, setValidationError] = react.useState(null);
  const [hasInteracted, setHasInteracted] = react.useState(false);
  const [isPickerOpen, setIsPickerOpen] = react.useState(false);
  react.useEffect(() => {
    setInputValue(initialColor);
    if (error) setValidationError(error);
  }, [initialColor, error]);
  react.useEffect(() => {
    if (!isPickerOpen) return;
    const onDocumentMouseDown = (e) => {
      if (!containerRef.current) return;
      if (containerRef.current.contains(e.target)) return;
      setIsPickerOpen(false);
    };
    document.addEventListener("mousedown", onDocumentMouseDown);
    return () => document.removeEventListener("mousedown", onDocumentMouseDown);
  }, [isPickerOpen]);
  const validateColor = (val) => {
    if (required && (!val || String(val).trim().length === 0)) {
      return customErrorMessage || "This field is required";
    }
    if (!val || String(val).trim().length === 0) return null;
    if (!isValidHexColor(val)) {
      return customErrorMessage || "Invalid color (use hex like #RRGGBB)";
    }
    return null;
  };
  const displayError = error || hasInteracted && validationError;
  const handleChangeFromPicker = (pickerColor2) => {
    const hex = pickerColor2?.hex ? String(pickerColor2.hex).toUpperCase() : "";
    setInputValue(hex);
    setHasInteracted(true);
    const nextError = validateColor(hex);
    setValidationError(nextError);
    if (onChange) {
      onChange({
        target: {
          name,
          id: name,
          type: attribute?.type || "string",
          value: hex
        }
      });
    }
  };
  const pickerColor = isValidHexColor(inputValue) ? inputValue : "#FFFFFF";
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { col: 6, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name, error: displayError, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Label, { children: [
      intlLabel.id ? formatMessage(intlLabel) : intlLabel.defaultMessage || name,
      required && /* @__PURE__ */ jsxRuntime.jsx("span", { style: { color: "#d02b20", marginLeft: "4px" }, children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Box,
      {
        style: {
          position: "relative",
          marginBottom: "12px"
        },
        ref: containerRef,
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            "button",
            {
              type: "button",
              onClick: () => !disabled && setIsPickerOpen((v) => !v),
              style: {
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                padding: "8px 10px",
                borderRadius: "4px",
                border: `1px solid ${displayError ? "#d02b20" : "#dcdce4"}`,
                backgroundColor: disabled ? "#f6f6f9" : "#ffffff",
                cursor: disabled ? "not-allowed" : "pointer",
                fontFamily: "inherit"
              },
              children: [
                /* @__PURE__ */ jsxRuntime.jsxs(
                  "span",
                  {
                    style: {
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsx(
                        "span",
                        {
                          style: {
                            width: "18px",
                            height: "18px",
                            borderRadius: "4px",
                            backgroundColor: pickerColor,
                            border: "1px solid rgba(0,0,0,0.12)"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntime.jsx("span", { style: { color: "#32324d", fontSize: "14px" }, children: pickerColor })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx("span", { style: { color: "#666" }, children: isPickerOpen ? "▲" : "▼" })
              ]
            }
          ),
          isPickerOpen && !disabled && /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              style: {
                position: "absolute",
                top: "calc(100% + 6px)",
                left: 0,
                zIndex: 50
              },
              children: /* @__PURE__ */ jsxRuntime.jsx(
                reactColor.ChromePicker,
                {
                  color: pickerColor,
                  onChange: handleChangeFromPicker
                }
              )
            }
          )
        ]
      }
    ),
    displayError && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, { children: displayError }),
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
exports.default = AdvancedColor;
