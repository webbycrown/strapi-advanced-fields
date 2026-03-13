"use strict";
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
const PLUGIN_ID = "advanced-fields";
const customFields = [
  {
    name: "input",
    type: "string",
    validate: (value, { required, options = {} }) => {
      const {
        minLength = 0,
        maxLength = 0,
        regex = "",
        customErrorMessage = ""
      } = options;
      if (required && (!value || value.trim().length === 0)) {
        return customErrorMessage || "This field is required";
      }
      if (!value || value.trim().length === 0) {
        return null;
      }
      const stringValue = value.toString().trim();
      if (minLength > 0 && stringValue.length < minLength) {
        return customErrorMessage || `Minimum length is ${minLength} characters`;
      }
      if (maxLength > 0 && stringValue.length > maxLength) {
        return customErrorMessage || `Maximum length is ${maxLength} characters`;
      }
      if (regex && regex.trim()) {
        try {
          const regexPattern = new RegExp(regex);
          if (!regexPattern.test(stringValue)) {
            return customErrorMessage || "Value does not match the required pattern";
          }
        } catch (e) {
        }
      }
      return null;
    }
  },
  {
    name: "checkbox",
    type: "json",
    validate: (value, { required, options = {} }) => {
      const {
        checkboxType = "single",
        minChoices = 0,
        maxChoices = 0,
        customErrorMessage = ""
      } = options;
      if (required) {
        if (!value || Array.isArray(value) && value.length === 0 || typeof value === "string" && value.trim() === "" || value === null || value === void 0) {
          return customErrorMessage || "This field is required";
        }
      }
      if (!value || Array.isArray(value) && value.length === 0) {
        return null;
      }
      const values = Array.isArray(value) ? value : [];
      if (checkboxType === "multiple") {
        if (minChoices > 0 && values.length < minChoices) {
          return customErrorMessage || `Please select at least ${minChoices} option${minChoices > 1 ? "s" : ""}`;
        }
        if (maxChoices > 0 && values.length > maxChoices) {
          return customErrorMessage || `Please select at most ${maxChoices} option${maxChoices > 1 ? "s" : ""}`;
        }
      }
      return null;
    }
  },
  {
    name: "radio",
    type: "json",
    validate: (value, { required, options = {} }) => {
      const {
        selectionType = "single",
        minChoices = 0,
        maxChoices = 0,
        customErrorMessage = ""
      } = options;
      if (required) {
        if (!value || Array.isArray(value) && value.length === 0 || typeof value === "string" && value.trim() === "" || value === null || value === void 0) {
          return customErrorMessage || "This field is required";
        }
      }
      if (!value || Array.isArray(value) && value.length === 0) {
        return null;
      }
      const values = Array.isArray(value) ? value : [];
      if (selectionType === "multiple") {
        if (minChoices > 0 && values.length < minChoices) {
          return customErrorMessage || `Please select at least ${minChoices} option${minChoices > 1 ? "s" : ""}`;
        }
        if (maxChoices > 0 && values.length > maxChoices) {
          return customErrorMessage || `Please select at most ${maxChoices} option${maxChoices > 1 ? "s" : ""}`;
        }
      }
      return null;
    }
  },
  {
    name: "enumeration",
    type: "json",
    validate: (value, { required, options = {} }) => {
      const {
        minChoices = 0,
        maxChoices = 0,
        customErrorMessage = ""
      } = options;
      if (required) {
        if (!value || Array.isArray(value) && value.length === 0 || typeof value === "string" && value.trim() === "" || value === null || value === void 0) {
          return customErrorMessage || "This field is required";
        }
      }
      if (!value || Array.isArray(value) && value.length === 0) {
        return null;
      }
      const values = Array.isArray(value) ? value : [];
      if (minChoices > 0 && values.length < minChoices) {
        return customErrorMessage || `Please select at least ${minChoices} option${minChoices > 1 ? "s" : ""}`;
      }
      if (maxChoices > 0 && values.length > maxChoices) {
        return customErrorMessage || `Please select at most ${maxChoices} option${maxChoices > 1 ? "s" : ""}`;
      }
      return null;
    }
  }
];
var server = {
  register({ strapi }) {
    customFields.forEach((field) => {
      const fieldConfig = {
        name: field.name,
        plugin: PLUGIN_ID,
        type: field.type
      };
      if (field.validate) {
        fieldConfig.validate = field.validate;
      }
      strapi.customFields.register(fieldConfig);
    });
  },
  bootstrap({ strapi }) {
  }
};
const index = /* @__PURE__ */ getDefaultExportFromCjs(server);
module.exports = index;
