import "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Box } from "@strapi/design-system";
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const PLUGIN_ID = "advanced-fields";
const PluginIcon = (props) => {
  return /* @__PURE__ */ jsx(AdvancedRadioIcon, { ...props });
};
const AdvancedInputIcon = () => /* @__PURE__ */ jsx(
  Box,
  {
    style: {
      width: "28px",
      height: "28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f8f9fa",
      borderRadius: "6px",
      border: "1px solid #e9ecef"
    },
    children: /* @__PURE__ */ jsxs(
      "svg",
      {
        width: "18",
        height: "18",
        viewBox: "0 0 32 32",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
          /* @__PURE__ */ jsx("rect", { width: "32", height: "32", rx: "6", fill: "#4945FF", fillOpacity: "0.1" }),
          /* @__PURE__ */ jsx("rect", { x: "0.5", y: "0.5", width: "31", height: "31", rx: "5.5", stroke: "#4945FF", strokeOpacity: "0.15" }),
          /* @__PURE__ */ jsx("path", { d: "M27 11.6364V20.3636C27 20.7494 26.8455 21.1194 26.5704 21.3922C26.2954 21.6649 25.9223 21.8182 25.5333 21.8182H17.1C17.0028 21.8182 16.9095 21.7799 16.8407 21.7117C16.772 21.6435 16.7333 21.551 16.7333 21.4545V10.5455C16.7333 10.449 16.772 10.3565 16.8407 10.2883C16.9095 10.2201 17.0028 10.1818 17.1 10.1818H25.5333C25.9223 10.1818 26.2954 10.3351 26.5704 10.6078C26.8455 10.8806 27 11.2506 27 11.6364ZM15.2667 8.72727V23.2727C15.2667 23.4656 15.1894 23.6506 15.0519 23.787C14.9144 23.9234 14.7278 24 14.5333 24C14.3388 24 14.1523 23.9234 14.0148 23.787C13.8773 23.6506 13.8 23.4656 13.8 23.2727V21.8182H6.46667C6.07768 21.8182 5.70463 21.6649 5.42958 21.3922C5.15452 21.1194 5 20.7494 5 20.3636V11.6364C5 11.2506 5.15452 10.8806 5.42958 10.6078C5.70463 10.3351 6.07768 10.1818 6.46667 10.1818H13.8V8.72727C13.8 8.53439 13.8773 8.3494 14.0148 8.21301C14.1523 8.07662 14.3388 8 14.5333 8C14.7278 8 14.9144 8.07662 15.0519 8.21301C15.1894 8.3494 15.2667 8.53439 15.2667 8.72727ZM12.3333 14.5455C12.3333 14.3526 12.2561 14.1676 12.1185 14.0312C11.981 13.8948 11.7945 13.8182 11.6 13.8182H8.66667C8.47217 13.8182 8.28565 13.8948 8.14812 14.0312C8.0106 14.1676 7.93333 14.3526 7.93333 14.5455C7.93333 14.7383 8.0106 14.9233 8.14812 15.0597C8.28565 15.1961 8.47217 15.2727 8.66667 15.2727H9.4V17.4545C9.4 17.6474 9.47726 17.8324 9.61479 17.9688C9.75232 18.1052 9.93884 18.1818 10.1333 18.1818C10.3278 18.1818 10.5144 18.1052 10.6519 17.9688C10.7894 17.8324 10.8667 17.6474 10.8667 17.4545V15.2727H11.6C11.7945 15.2727 11.981 15.1961 12.1185 15.0597C12.2561 14.9233 12.3333 14.7383 12.3333 14.5455Z", fill: "#4945FF" }),
          /* @__PURE__ */ jsx("mask", { id: "path-4-inside-1_649_85", fill: "white", children: /* @__PURE__ */ jsx("path", { d: "M0 6C0 2.68629 2.68629 0 6 0H10V10H0V6Z" }) }),
          /* @__PURE__ */ jsx("path", { d: "M-2 6C-2 1.58172 1.58172 -2 6 -2H10V2H6C3.79086 2 2 3.79086 2 6H-2ZM10 10H0H10ZM-2 10V6C-2 1.58172 1.58172 -2 6 -2V2C3.79086 2 2 3.79086 2 6V10H-2ZM10 0V10V0Z", fill: "#4945FF", mask: "url(#path-4-inside-1_649_85)" })
        ]
      }
    )
  }
);
const AdvancedCheckboxIcon = () => /* @__PURE__ */ jsx(
  Box,
  {
    style: {
      width: "28px",
      height: "28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f8f9fa",
      borderRadius: "6px",
      border: "1px solid #e9ecef"
    },
    children: /* @__PURE__ */ jsxs(
      "svg",
      {
        width: "18",
        height: "18",
        viewBox: "0 0 32 32",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
          /* @__PURE__ */ jsx("rect", { width: "32", height: "32", rx: "6", fill: "#4945FF", fillOpacity: "0.1" }),
          /* @__PURE__ */ jsx("rect", { x: "0.5", y: "0.5", width: "31", height: "31", rx: "5.5", stroke: "#4945FF", strokeOpacity: "0.15" }),
          /* @__PURE__ */ jsx("mask", { id: "path-3-inside-1_649_76", fill: "white", children: /* @__PURE__ */ jsx("path", { d: "M0 6C0 2.68629 2.68629 0 6 0H10V10H0V6Z" }) }),
          /* @__PURE__ */ jsx("path", { d: "M-2 6C-2 1.58172 1.58172 -2 6 -2H10V2H6C3.79086 2 2 3.79086 2 6H-2ZM10 10H0H10ZM-2 10V6C-2 1.58172 1.58172 -2 6 -2V2C3.79086 2 2 3.79086 2 6V10H-2ZM10 0V10V0Z", fill: "#4945FF", mask: "url(#path-3-inside-1_649_76)" }),
          /* @__PURE__ */ jsx("path", { d: "M14.67 17.71L12.6275 15.6675C12.4533 15.4933 12.2317 15.4062 11.9625 15.4062C11.6933 15.4062 11.4717 15.4933 11.2975 15.6675C11.1233 15.8417 11.0362 16.0633 11.0362 16.3325C11.0362 16.6017 11.1233 16.8233 11.2975 16.9975L14.005 19.705C14.195 19.895 14.4167 19.99 14.67 19.99C14.9233 19.99 15.145 19.895 15.335 19.705L20.7025 14.3375C20.8767 14.1633 20.9637 13.9417 20.9637 13.6725C20.9637 13.4033 20.8767 13.1817 20.7025 13.0075C20.5283 12.8333 20.3067 12.7462 20.0375 12.7462C19.7683 12.7462 19.5467 12.8333 19.3725 13.0075L14.67 17.71ZM16 25.5C14.6858 25.5 13.4508 25.2505 12.295 24.7514C11.1392 24.2523 10.1337 23.5756 9.27875 22.7212C8.42375 21.8669 7.74703 20.8615 7.2486 19.705C6.75017 18.5485 6.50063 17.3135 6.5 16C6.49937 14.6865 6.7489 13.4515 7.2486 12.295C7.7483 11.1385 8.42502 10.1331 9.27875 9.27875C10.1325 8.42438 11.1379 7.74767 12.295 7.2486C13.4521 6.74953 14.6871 6.5 16 6.5C17.3129 6.5 18.5479 6.74953 19.705 7.2486C20.8621 7.74767 21.8675 8.42438 22.7212 9.27875C23.575 10.1331 24.252 11.1385 24.7523 12.295C25.2527 13.4515 25.5019 14.6865 25.5 16C25.4981 17.3135 25.2486 18.5485 24.7514 19.705C24.2542 20.8615 23.5775 21.8669 22.7212 22.7212C21.865 23.5756 20.8596 24.2526 19.705 24.7523C18.5504 25.252 17.3154 25.5013 16 25.5Z", fill: "#4945FF" })
        ]
      }
    )
  }
);
const AdvancedRadioIcon = () => /* @__PURE__ */ jsx(
  Box,
  {
    style: {
      width: "28px",
      height: "28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f8f9fa",
      borderRadius: "6px",
      border: "1px solid #e9ecef"
    },
    children: /* @__PURE__ */ jsxs(
      "svg",
      {
        width: "18",
        height: "18",
        viewBox: "0 0 32 32",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
          /* @__PURE__ */ jsx("rect", { width: "32", height: "32", rx: "6", fill: "#4945FF", fillOpacity: "0.1" }),
          /* @__PURE__ */ jsx("rect", { x: "0.5", y: "0.5", width: "31", height: "31", rx: "5.5", stroke: "#4945FF", strokeOpacity: "0.15" }),
          /* @__PURE__ */ jsx("path", { d: "M16 6.5C10.775 6.5 6.5 10.775 6.5 16C6.5 21.225 10.775 25.5 16 25.5C21.225 25.5 25.5 21.225 25.5 16C25.5 10.775 21.225 6.5 16 6.5ZM23.6 16H19.8C19.8 14.575 19.04 13.34 17.9 12.77L19.8 9.445C22.08 10.775 23.6 13.15 23.6 16ZM16 14.1C17.045 14.1 17.9 14.955 17.9 16C17.9 17.045 17.045 17.9 16 17.9C14.955 17.9 14.1 17.045 14.1 16C14.1 14.955 14.955 14.1 16 14.1ZM12.2 9.445C12.77 10.395 13.435 11.63 14.1 12.77C12.96 13.435 12.2 14.67 12.2 16H8.4C8.4 13.15 9.92 10.775 12.2 9.445ZM12.2 22.555C12.77 21.605 13.435 20.37 14.1 19.23C14.67 19.515 15.335 19.8 16 19.8C16.665 19.8 17.33 19.61 17.9 19.23L19.8 22.555C18.66 23.22 17.425 23.6 16 23.6C14.575 23.6 13.34 23.22 12.2 22.555Z", fill: "#4945FF" }),
          /* @__PURE__ */ jsx("mask", { id: "path-4-inside-1_649_89", fill: "white", children: /* @__PURE__ */ jsx("path", { d: "M0 6C0 2.68629 2.68629 0 6 0H10V10H0V6Z" }) }),
          /* @__PURE__ */ jsx("path", { d: "M-2 6C-2 1.58172 1.58172 -2 6 -2H10V2H6C3.79086 2 2 3.79086 2 6H-2ZM10 10H0H10ZM-2 10V6C-2 1.58172 1.58172 -2 6 -2V2C3.79086 2 2 3.79086 2 6V10H-2ZM10 0V10V0Z", fill: "#4945FF", mask: "url(#path-4-inside-1_649_89)" })
        ]
      }
    )
  }
);
const customFields = [
  {
    name: "input",
    type: "string",
    icon: AdvancedInputIcon,
    pluginId: PLUGIN_ID,
    component: () => import("../_chunks/index-cLPilu5W.mjs"),
    intlLabel: {
      id: `${PLUGIN_ID}.input.label`,
      defaultMessage: "Advanced Input"
    },
    intlDescription: {
      id: `${PLUGIN_ID}.input.description`,
      defaultMessage: "Professional-grade text input with comprehensive validation and advanced configuration options"
    },
    options: {
      base: [],
      advanced: [
        {
          sectionTitle: {
            id: `${PLUGIN_ID}.input.settings.advanced.label`,
            defaultMessage: "Advanced Settings"
          },
          items: [
            {
              name: "required",
              type: "checkbox",
              intlLabel: {
                id: `${PLUGIN_ID}.input.options.required.label`,
                defaultMessage: "Required Field"
              },
              description: {
                id: `${PLUGIN_ID}.input.options.required.description`,
                defaultMessage: "This field must be filled before saving"
              }
            },
            {
              name: "unique",
              type: "checkbox",
              intlLabel: {
                id: `${PLUGIN_ID}.input.options.unique.label`,
                defaultMessage: "Unique Value"
              },
              description: {
                id: `${PLUGIN_ID}.input.options.unique.description`,
                defaultMessage: "Each entry must have a different value"
              }
            },
            {
              name: "maxLength",
              type: "number",
              intlLabel: {
                id: `${PLUGIN_ID}.input.options.maxLength.label`,
                defaultMessage: "Maximum Length"
              },
              description: {
                id: `${PLUGIN_ID}.input.options.maxLength.description`,
                defaultMessage: "Maximum number of characters allowed"
              },
              placeholder: {
                id: `${PLUGIN_ID}.input.options.maxLength.placeholder`,
                defaultMessage: "Enter max length (e.g., 255)"
              }
            },
            {
              name: "minLength",
              type: "number",
              intlLabel: {
                id: `${PLUGIN_ID}.input.options.minLength.label`,
                defaultMessage: "Minimum Length"
              },
              description: {
                id: `${PLUGIN_ID}.input.options.minLength.description`,
                defaultMessage: "Minimum number of characters required"
              },
              placeholder: {
                id: `${PLUGIN_ID}.input.options.minLength.placeholder`,
                defaultMessage: "Enter min length (e.g., 3)"
              }
            },
            {
              name: "options.defaultValue",
              type: "text",
              intlLabel: {
                id: `${PLUGIN_ID}.input.options.defaultValue.label`,
                defaultMessage: "Default Value"
              },
              description: {
                id: `${PLUGIN_ID}.input.options.defaultValue.description`,
                defaultMessage: "Pre-filled value for new entries"
              },
              placeholder: {
                id: `${PLUGIN_ID}.input.options.defaultValue.placeholder`,
                defaultMessage: "Enter default text"
              }
            },
            {
              name: "options.placeholder",
              type: "text",
              intlLabel: {
                id: `${PLUGIN_ID}.input.options.placeholder.label`,
                defaultMessage: "Placeholder Text"
              },
              description: {
                id: `${PLUGIN_ID}.input.options.placeholder.description`,
                defaultMessage: "Hint text shown when field is empty"
              },
              placeholder: {
                id: `${PLUGIN_ID}.input.options.placeholder.placeholder`,
                defaultMessage: "Enter placeholder text"
              }
            },
            {
              name: "regex",
              type: "text",
              intlLabel: {
                id: `${PLUGIN_ID}.input.options.regex.label`,
                defaultMessage: "Regular Expression"
              },
              description: {
                id: `${PLUGIN_ID}.input.options.regex.description`,
                defaultMessage: "Custom validation pattern (regex)"
              },
              placeholder: {
                id: `${PLUGIN_ID}.input.options.regex.placeholder`,
                defaultMessage: "e.g., ^[A-Za-z]+$ for letters only"
              }
            },
            {
              name: "options.customErrorMessage",
              type: "text",
              intlLabel: {
                id: `${PLUGIN_ID}.input.options.customErrorMessage.label`,
                defaultMessage: "Custom Error Message"
              },
              description: {
                id: `${PLUGIN_ID}.input.options.customErrorMessage.description`,
                defaultMessage: "Custom error message for validation failures"
              },
              placeholder: {
                id: `${PLUGIN_ID}.input.options.customErrorMessage.placeholder`,
                defaultMessage: "Enter custom error message"
              }
            },
            {
              name: "options.fieldNote",
              type: "text",
              intlLabel: {
                id: `${PLUGIN_ID}.input.options.fieldNote.label`,
                defaultMessage: "Field Note"
              },
              description: {
                id: `${PLUGIN_ID}.input.options.fieldNote.description`,
                defaultMessage: "Add a helpful note that will appear below the field"
              },
              placeholder: {
                id: `${PLUGIN_ID}.input.options.fieldNote.placeholder`,
                defaultMessage: "Enter a note for this field"
              }
            },
            {
              name: "private",
              type: "checkbox",
              intlLabel: {
                id: `${PLUGIN_ID}.input.options.private.label`,
                defaultMessage: "Private Field"
              },
              description: {
                id: `${PLUGIN_ID}.input.options.private.description`,
                defaultMessage: "Hide this field from API responses"
              }
            }
          ]
        }
      ]
    }
  },
  {
    name: "checkbox",
    type: "json",
    icon: AdvancedCheckboxIcon,
    pluginId: PLUGIN_ID,
    component: () => import("../_chunks/index-DXVpJkpj.mjs"),
    intlLabel: {
      id: `${PLUGIN_ID}.checkbox.label`,
      defaultMessage: "Advanced Checkbox"
    },
    intlDescription: {
      id: `${PLUGIN_ID}.checkbox.description`,
      defaultMessage: "Unified checkbox field supporting both single and multiple selections with advanced configuration"
    },
    getDisplayValue: (value, field) => {
      if (!value || !Array.isArray(value) || value.length === 0) {
        return "";
      }
      const options = field?.options?.checkboxOptions || "";
      const optionMap = {};
      if (options) {
        options.split("\n").forEach((opt) => {
          const [val, label] = opt.split("|");
          if (val && label) {
            optionMap[val.trim()] = label.trim();
          }
        });
      }
      const displayValues = value.map((val) => optionMap[val] || val);
      return displayValues.join(", ");
    },
    options: {
      base: [],
      advanced: [
        {
          sectionTitle: {
            id: `${PLUGIN_ID}.checkbox.settings.advanced.label`,
            defaultMessage: "Advanced Settings"
          },
          items: [
            {
              name: "required",
              type: "checkbox",
              intlLabel: {
                id: `${PLUGIN_ID}.checkbox.options.required.label`,
                defaultMessage: "Required Field"
              },
              description: {
                id: `${PLUGIN_ID}.checkbox.options.required.description`,
                defaultMessage: "This field must be filled before saving"
              }
            },
            {
              name: "options.checkboxType",
              type: "select",
              intlLabel: {
                id: `${PLUGIN_ID}.checkbox.options.checkboxType.label`,
                defaultMessage: "Checkbox Type"
              },
              description: {
                id: `${PLUGIN_ID}.checkbox.options.checkboxType.description`,
                defaultMessage: "Choose between single checkbox or multiple checkboxes"
              },
              options: [
                {
                  value: "single",
                  metadatas: {
                    intlLabel: {
                      id: `${PLUGIN_ID}.checkbox.options.checkboxType.single`,
                      defaultMessage: "Single Checkbox"
                    }
                  }
                },
                {
                  value: "multiple",
                  metadatas: {
                    intlLabel: {
                      id: `${PLUGIN_ID}.checkbox.options.checkboxType.multiple`,
                      defaultMessage: "Multiple Checkboxes"
                    }
                  }
                }
              ],
              defaultValue: "single"
            },
            {
              name: "options.checkboxOptions",
              type: "textarea",
              intlLabel: {
                id: `${PLUGIN_ID}.checkbox.options.checkboxOptions.label`,
                defaultMessage: "Checkbox Options"
              },
              description: {
                id: `${PLUGIN_ID}.checkbox.options.checkboxOptions.description`,
                defaultMessage: "Define available options for multiple checkboxes (one per line: value|label)"
              },
              placeholder: {
                id: `${PLUGIN_ID}.checkbox.options.checkboxOptions.placeholder`,
                defaultMessage: "option1|Option 1\noption2|Option 2\noption3|Option 3"
              },
              condition: {
                field: "options.checkboxType",
                operator: "eq",
                value: "multiple"
              }
            },
            {
              name: "options.defaultSelected",
              type: "textarea",
              intlLabel: {
                id: `${PLUGIN_ID}.checkbox.options.defaultSelected.label`,
                defaultMessage: "Default Selected"
              },
              description: {
                id: `${PLUGIN_ID}.checkbox.options.defaultSelected.description`,
                defaultMessage: "Pre-selected options for multiple checkboxes (one per line)"
              },
              placeholder: {
                id: `${PLUGIN_ID}.checkbox.options.defaultSelected.placeholder`,
                defaultMessage: "option1\noption2"
              },
              condition: {
                field: "options.checkboxType",
                operator: "eq",
                value: "multiple"
              }
            },
            {
              name: "options.minChoices",
              type: "number",
              intlLabel: {
                id: `${PLUGIN_ID}.checkbox.options.minChoices.label`,
                defaultMessage: "Minimum Choices"
              },
              description: {
                id: `${PLUGIN_ID}.checkbox.options.minChoices.description`,
                defaultMessage: "Minimum number of options that must be selected"
              },
              placeholder: {
                id: `${PLUGIN_ID}.checkbox.options.minChoices.placeholder`,
                defaultMessage: "Enter minimum (0 for no limit)"
              },
              defaultValue: 0,
              condition: {
                field: "options.checkboxType",
                operator: "eq",
                value: "multiple"
              }
            },
            {
              name: "options.maxChoices",
              type: "number",
              intlLabel: {
                id: `${PLUGIN_ID}.checkbox.options.maxChoices.label`,
                defaultMessage: "Maximum Choices"
              },
              description: {
                id: `${PLUGIN_ID}.checkbox.options.maxChoices.description`,
                defaultMessage: "Maximum number of options that can be selected"
              },
              placeholder: {
                id: `${PLUGIN_ID}.checkbox.options.maxChoices.placeholder`,
                defaultMessage: "Enter maximum (0 for no limit)"
              },
              defaultValue: 0,
              condition: {
                field: "options.checkboxType",
                operator: "eq",
                value: "multiple"
              }
            },
            {
              name: "options.layout",
              type: "select",
              intlLabel: {
                id: `${PLUGIN_ID}.checkbox.options.layout.label`,
                defaultMessage: "Layout Style"
              },
              description: {
                id: `${PLUGIN_ID}.checkbox.options.layout.description`,
                defaultMessage: "Visual layout of multiple checkbox options"
              },
              options: [
                {
                  value: "vertical",
                  metadatas: {
                    intlLabel: {
                      id: `${PLUGIN_ID}.checkbox.options.layout.vertical`,
                      defaultMessage: "Vertical Stack"
                    }
                  }
                },
                {
                  value: "horizontal",
                  metadatas: {
                    intlLabel: {
                      id: `${PLUGIN_ID}.checkbox.options.layout.horizontal`,
                      defaultMessage: "Horizontal Row"
                    }
                  }
                },
                {
                  value: "grid",
                  metadatas: {
                    intlLabel: {
                      id: `${PLUGIN_ID}.checkbox.options.layout.grid`,
                      defaultMessage: "Grid Layout"
                    }
                  }
                }
              ],
              defaultValue: "vertical",
              condition: {
                field: "options.checkboxType",
                operator: "eq",
                value: "multiple"
              }
            },
            {
              name: "options.customErrorMessage",
              type: "text",
              intlLabel: {
                id: `${PLUGIN_ID}.checkbox.options.customErrorMessage.label`,
                defaultMessage: "Custom Error Message"
              },
              description: {
                id: `${PLUGIN_ID}.checkbox.options.customErrorMessage.description`,
                defaultMessage: "Custom error message for validation failures"
              },
              placeholder: {
                id: `${PLUGIN_ID}.checkbox.options.customErrorMessage.placeholder`,
                defaultMessage: "Enter custom error message"
              }
            },
            {
              name: "options.fieldNote",
              type: "text",
              intlLabel: {
                id: `${PLUGIN_ID}.checkbox.options.fieldNote.label`,
                defaultMessage: "Field Note"
              },
              description: {
                id: `${PLUGIN_ID}.checkbox.options.fieldNote.description`,
                defaultMessage: "Add a helpful note that will appear below the field"
              },
              placeholder: {
                id: `${PLUGIN_ID}.checkbox.options.fieldNote.placeholder`,
                defaultMessage: "Enter a note for this field"
              }
            },
            {
              name: "private",
              type: "checkbox",
              intlLabel: {
                id: `${PLUGIN_ID}.checkbox.options.private.label`,
                defaultMessage: "Private Field"
              },
              description: {
                id: `${PLUGIN_ID}.checkbox.options.private.description`,
                defaultMessage: "Hide this field from API responses"
              }
            }
          ]
        }
      ]
    }
  },
  {
    name: "radio",
    type: "json",
    icon: AdvancedRadioIcon,
    pluginId: PLUGIN_ID,
    component: () => import("../_chunks/index-C-A6rX1K.mjs"),
    intlLabel: {
      id: `${PLUGIN_ID}.radio.label`,
      defaultMessage: "Advanced Radio"
    },
    intlDescription: {
      id: `${PLUGIN_ID}.radio.description`,
      defaultMessage: "Radio buttons with dynamic options and selection types"
    },
    getDisplayValue: (value, field) => {
      if (!value || !Array.isArray(value) || value.length === 0) {
        return "";
      }
      const options = field?.options?.radioOptions || "";
      const optionMap = {};
      if (options) {
        options.split("\n").forEach((opt) => {
          const [val, label] = opt.split("|");
          if (val && label) {
            optionMap[val.trim()] = label.trim();
          }
        });
      }
      const displayValues = value.map((val) => optionMap[val] || val);
      return displayValues.join(", ");
    },
    options: {
      base: [],
      advanced: [
        {
          sectionTitle: {
            id: `${PLUGIN_ID}.radio.settings.advanced.label`,
            defaultMessage: "Advanced Settings"
          },
          items: [
            {
              name: "required",
              type: "checkbox",
              intlLabel: {
                id: `${PLUGIN_ID}.radio.options.required.label`,
                defaultMessage: "Required Field"
              },
              description: {
                id: `${PLUGIN_ID}.radio.options.required.description`,
                defaultMessage: "At least one option must be selected"
              }
            },
            {
              name: "options.radioOptions",
              type: "textarea",
              intlLabel: {
                id: `${PLUGIN_ID}.radio.options.radioOptions.label`,
                defaultMessage: "Radio Options"
              },
              description: {
                id: `${PLUGIN_ID}.radio.options.radioOptions.description`,
                defaultMessage: "Define available options (one per line: value|label)"
              },
              placeholder: {
                id: `${PLUGIN_ID}.radio.options.radioOptions.placeholder`,
                defaultMessage: "1|Option 1\n2|Option 2\n3|Option 3"
              }
            },
            {
              name: "options.defaultSelected",
              type: "textarea",
              intlLabel: {
                id: `${PLUGIN_ID}.radio.options.defaultSelected.label`,
                defaultMessage: "Default Selected"
              },
              description: {
                id: `${PLUGIN_ID}.radio.options.defaultSelected.description`,
                defaultMessage: "Pre-selected options (one per line)"
              },
              placeholder: {
                id: `${PLUGIN_ID}.radio.options.defaultSelected.placeholder`,
                defaultMessage: "1\n2"
              }
            },
            {
              name: "options.selectionType",
              type: "select",
              intlLabel: {
                id: `${PLUGIN_ID}.radio.options.selectionType.label`,
                defaultMessage: "Selection Type"
              },
              description: {
                id: `${PLUGIN_ID}.radio.options.selectionType.description`,
                defaultMessage: "Choose whether users can select one or multiple options"
              },
              options: [
                {
                  value: "single",
                  metadatas: {
                    intlLabel: {
                      id: `${PLUGIN_ID}.radio.options.selectionType.single`,
                      defaultMessage: "Single Selection"
                    }
                  }
                },
                {
                  value: "multiple",
                  metadatas: {
                    intlLabel: {
                      id: `${PLUGIN_ID}.radio.options.selectionType.multiple`,
                      defaultMessage: "Multiple Selection"
                    }
                  }
                }
              ],
              defaultValue: "single"
            },
            {
              name: "options.minChoices",
              type: "number",
              intlLabel: {
                id: `${PLUGIN_ID}.radio.options.minChoices.label`,
                defaultMessage: "Minimum Choices"
              },
              description: {
                id: `${PLUGIN_ID}.radio.options.minChoices.description`,
                defaultMessage: "Minimum number of options that must be selected"
              },
              placeholder: {
                id: `${PLUGIN_ID}.radio.options.minChoices.placeholder`,
                defaultMessage: "Enter minimum (0 for no limit)"
              },
              defaultValue: 0
            },
            {
              name: "options.maxChoices",
              type: "number",
              intlLabel: {
                id: `${PLUGIN_ID}.radio.options.maxChoices.label`,
                defaultMessage: "Maximum Choices"
              },
              description: {
                id: `${PLUGIN_ID}.radio.options.maxChoices.description`,
                defaultMessage: "Maximum number of options that can be selected"
              },
              placeholder: {
                id: `${PLUGIN_ID}.radio.options.maxChoices.placeholder`,
                defaultMessage: "Enter maximum (0 for no limit)"
              },
              defaultValue: 0
            },
            {
              name: "options.layout",
              type: "select",
              intlLabel: {
                id: `${PLUGIN_ID}.radio.options.layout.label`,
                defaultMessage: "Layout Style"
              },
              description: {
                id: `${PLUGIN_ID}.radio.options.layout.description`,
                defaultMessage: "Visual layout of radio options"
              },
              options: [
                {
                  value: "vertical",
                  metadatas: {
                    intlLabel: {
                      id: `${PLUGIN_ID}.radio.options.layout.vertical`,
                      defaultMessage: "Vertical Stack"
                    }
                  }
                },
                {
                  value: "horizontal",
                  metadatas: {
                    intlLabel: {
                      id: `${PLUGIN_ID}.radio.options.layout.horizontal`,
                      defaultMessage: "Horizontal Row"
                    }
                  }
                },
                {
                  value: "grid",
                  metadatas: {
                    intlLabel: {
                      id: `${PLUGIN_ID}.radio.options.layout.grid`,
                      defaultMessage: "Grid Layout"
                    }
                  }
                }
              ],
              defaultValue: "vertical"
            },
            {
              name: "options.customErrorMessage",
              type: "text",
              intlLabel: {
                id: `${PLUGIN_ID}.radio.options.customErrorMessage.label`,
                defaultMessage: "Custom Error Message"
              },
              description: {
                id: `${PLUGIN_ID}.radio.options.customErrorMessage.description`,
                defaultMessage: "Custom error message for validation failures"
              },
              placeholder: {
                id: `${PLUGIN_ID}.radio.options.customErrorMessage.placeholder`,
                defaultMessage: "Enter custom error message"
              }
            },
            {
              name: "options.fieldNote",
              type: "text",
              intlLabel: {
                id: `${PLUGIN_ID}.radio.options.fieldNote.label`,
                defaultMessage: "Field Note"
              },
              description: {
                id: `${PLUGIN_ID}.radio.options.fieldNote.description`,
                defaultMessage: "Add a helpful note that will appear below the field"
              },
              placeholder: {
                id: `${PLUGIN_ID}.radio.options.fieldNote.placeholder`,
                defaultMessage: "Enter a note for this field"
              }
            }
          ]
        }
      ]
    }
  }
];
const index = {
  register(app) {
    if (!app.customFields) {
      return;
    }
    try {
      app.registerPlugin({
        id: PLUGIN_ID,
        name: "Advanced Fields",
        icon: PluginIcon,
        isReady: true
      });
    } catch (e) {
    }
    customFields.forEach((field) => {
      try {
        app.customFields.register({
          name: field.name,
          pluginId: field.pluginId,
          type: field.type,
          intlLabel: field.intlLabel,
          intlDescription: field.intlDescription,
          icon: field.icon,
          components: {
            Input: field.component
          },
          options: field.options,
          getDisplayValue: field.getDisplayValue
        });
      } catch (error) {
      }
    });
  },
  bootstrap(app) {
    if (app.customFields && typeof app.customFields.get === "function") {
      customFields.forEach((field) => {
        try {
          const registeredField = app.customFields.get(`${field.pluginId}.${field.name}`);
        } catch (error) {
        }
      });
    }
  },
  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        if (locale === "en") {
          const translations = {
            [`${PLUGIN_ID}.plugin.name`]: "Advanced Fields",
            [`${PLUGIN_ID}.plugin.description`]: "Advanced custom fields with dynamic options"
          };
          const extractTranslations = (obj, prefix = "") => {
            Object.keys(obj).forEach((key) => {
              const value = obj[key];
              const currentKey = prefix ? `${prefix}.${key}` : key;
              if (typeof value === "object" && value !== null) {
                if (value.id && value.defaultMessage) {
                  translations[value.id] = value.defaultMessage;
                } else if (Array.isArray(value)) {
                  value.forEach((item, index2) => {
                    extractTranslations(item, `${currentKey}[${index2}]`);
                  });
                } else {
                  extractTranslations(value, currentKey);
                }
              }
            });
          };
          customFields.forEach((field) => {
            extractTranslations(field);
          });
          return { data: translations, locale: "en" };
        }
        try {
          const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => import("../_chunks/en-CJmJkBE0.mjs") }), `./translations/${locale}.json`, 3);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  }
};
export {
  index as default
};
