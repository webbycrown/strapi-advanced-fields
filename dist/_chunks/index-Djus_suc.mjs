import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useMemo, useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import { useIntl } from "react-intl";
import { Box, Field } from "@strapi/design-system";
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
  const { formatMessage } = useIntl();
  const containerRef = useRef(null);
  const { options = {} } = attribute;
  const {
    defaultValue = "",
    customErrorMessage = "",
    fieldNote = ""
  } = options;
  const fieldNoteFromAttribute = attribute.options?.fieldNote || "";
  const initialColor = useMemo(() => {
    const normalized = value === void 0 ? defaultValue : value;
    return normalizeHexColor(normalized);
  }, [value, defaultValue]);
  const [inputValue, setInputValue] = useState(initialColor);
  const [validationError, setValidationError] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  useEffect(() => {
    setInputValue(initialColor);
    if (error) setValidationError(error);
  }, [initialColor, error]);
  useEffect(() => {
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
  return /* @__PURE__ */ jsx(Box, { col: 6, children: /* @__PURE__ */ jsxs(Field.Root, { name, error: displayError, children: [
    /* @__PURE__ */ jsxs(Field.Label, { children: [
      intlLabel.id ? formatMessage(intlLabel) : intlLabel.defaultMessage || name,
      required && /* @__PURE__ */ jsx("span", { style: { color: "#d02b20", marginLeft: "4px" }, children: "*" })
    ] }),
    /* @__PURE__ */ jsxs(
      Box,
      {
        style: {
          position: "relative",
          marginBottom: "12px"
        },
        ref: containerRef,
        children: [
          /* @__PURE__ */ jsxs(
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
                /* @__PURE__ */ jsxs(
                  "span",
                  {
                    style: {
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px"
                    },
                    children: [
                      /* @__PURE__ */ jsx(
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
                      /* @__PURE__ */ jsx("span", { style: { color: "#32324d", fontSize: "14px" }, children: pickerColor })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("span", { style: { color: "#666" }, children: isPickerOpen ? "▲" : "▼" })
              ]
            }
          ),
          isPickerOpen && !disabled && /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                position: "absolute",
                top: "calc(100% + 6px)",
                left: 0,
                zIndex: 50
              },
              children: /* @__PURE__ */ jsx(
                ChromePicker,
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
    displayError && /* @__PURE__ */ jsx(Field.Error, { children: displayError }),
    description && (description.id || description.defaultMessage) && /* @__PURE__ */ jsx(Field.Hint, { children: description.id ? formatMessage(description) : description.defaultMessage }),
    (fieldNote || fieldNoteFromAttribute) && /* @__PURE__ */ jsx(
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
export {
  AdvancedColor as default
};
