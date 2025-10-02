'use strict';

const PLUGIN_ID = 'advanced-fields';

const customFields = [
  {
    name: 'input',
    type: 'string',
    validate: (value, { required, options = {} }) => {
      // Basic required validation
      if (required && (!value || value.toString().trim().length === 0)) {
        return 'This field is required';
      }
      
      // Length validation
      if (value && options.maxLength && value.length > options.maxLength) {
        return `Maximum length is ${options.maxLength} characters`;
      }
      if (value && options.minLength && value.length < options.minLength) {
        return `Minimum length is ${options.minLength} characters`;
      }
      
      // Regex validation
      if (value && options.regex) {
        try {
          const regex = new RegExp(options.regex);
          if (!regex.test(value)) {
            return options.customErrorMessage || 'Value does not match required format';
          }
        } catch (e) {
          // Invalid regex pattern - silently ignore
        }
      }
      
      // Input type validation
      if (value && options.inputType) {
        switch (options.inputType) {
          case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              return 'Please enter a valid email address';
            }
            break;
          case 'url':
            try {
              new URL(value);
            } catch {
              return 'Please enter a valid URL';
            }
            break;
          case 'number':
            if (isNaN(parseFloat(value))) {
              return 'Please enter a valid number';
            }
            break;
        }
      }
      
      return null;
    }
  },
  {
    name: 'checkbox',
    type: 'json',
    validate: (value, { required, options = {} }) => {
      
      // Basic required validation
      if (required) {
        if (!value || 
            (Array.isArray(value) && value.length === 0) ||
            (typeof value === 'string' && value.trim() === '') ||
            value === null ||
            value === undefined) {
          return options.customErrorMessage || 'This field is required';
        }
      }
      
      // If no value and not required, no additional validation needed
      if (!required && (!value || (Array.isArray(value) && value.length === 0))) {
        return null;
      }
      
      // Choice validation for multiple checkboxes only
      if (options.checkboxType === 'multiple' && Array.isArray(value)) {
        if (options.minChoices > 0 && value.length < options.minChoices) {
          return options.customErrorMessage || `Please select at least ${options.minChoices} option${options.minChoices > 1 ? 's' : ''}`;
        }
        if (options.maxChoices > 0 && value.length > options.maxChoices) {
          return options.customErrorMessage || `Please select at most ${options.maxChoices} option${options.maxChoices > 1 ? 's' : ''}`;
        }
      }
      
      return null;
    }
  },
  {
    name: "radio",
    type: "json",
    validate: (value, { required, options = {} }) => {
      // Basic required validation
      if (required) {
        if (!value || 
            (Array.isArray(value) && value.length === 0) ||
            (typeof value === 'string' && value.trim() === '') ||
            value === null ||
            value === undefined) {
          return 'This field is required';
        }
      }
      
      // Choice validation
      if (Array.isArray(value)) {
        if (options.minChoices > 0 && value.length < options.minChoices) {
          return `Please select at least ${options.minChoices} option${options.minChoices > 1 ? 's' : ''}`;
        }
        if (options.maxChoices > 0 && value.length > options.maxChoices) {
          return `Please select at most ${options.maxChoices} option${options.maxChoices > 1 ? 's' : ''}`;
        }
      }
      
      return null;
    }
  }
];

module.exports = {
  register({ strapi }) {
    // Ensure custom fields registry is available
    if (!strapi.customFields) {
      return;
    }
    
    // Register custom fields with proper error handling
    customFields.forEach((field) => {
      try {
        
        const fieldConfig = {
          name: field.name,
          pluginId: PLUGIN_ID,
          type: field.type,
        };
        
        // Add validation function if it exists
        if (field.validate) {
          fieldConfig.validate = field.validate;
        }
        
        strapi.customFields.register(fieldConfig);
      } catch (error) {
        // Field registration failed - silently continue
      }
    });
  },

  bootstrap({ strapi }) {
    // Bootstrap completed
  },
};
