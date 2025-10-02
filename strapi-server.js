'use strict';

const PLUGIN_ID = 'advanced-fields';

const customFields = [
  {
    name: 'input',
    type: 'string',
    validate: (value, { required, options = {} }) => {
      // Parse field options
      const {
        minLength = 0,
        maxLength = 0,
        regex = '',
        customErrorMessage = ''
      } = options;
      
      // Check required validation
      if (required && (!value || value.trim().length === 0)) {
        return customErrorMessage || 'This field is required';
      }
      
      // If no value, no additional validation needed
      if (!value || value.trim().length === 0) {
        return null;
      }
      
      const stringValue = value.toString().trim();
      
      // Check min/max length validation
      if (minLength > 0 && stringValue.length < minLength) {
        return customErrorMessage || `Minimum length is ${minLength} characters`;
      }
      if (maxLength > 0 && stringValue.length > maxLength) {
        return customErrorMessage || `Maximum length is ${maxLength} characters`;
      }
      
      // Check regex validation
      if (regex && regex.trim()) {
        try {
          const regexPattern = new RegExp(regex);
          if (!regexPattern.test(stringValue)) {
            return customErrorMessage || 'Value does not match the required pattern';
          }
        } catch (e) {
          // Invalid regex pattern, skip validation
        }
      }
      
      return null;
    }
  },
  {
    name: 'checkbox',
    type: 'json',
    validate: (value, { required, options = {} }) => {
      // Parse field options
      const {
        checkboxType = 'single',
        minChoices = 0,
        maxChoices = 0,
        customErrorMessage = ''
      } = options;
      
      // Check required validation
      if (required) {
        if (!value || 
            (Array.isArray(value) && value.length === 0) ||
            (typeof value === 'string' && value.trim() === '') ||
            value === null ||
            value === undefined) {
          return customErrorMessage || 'This field is required';
        }
      }
      
      // If no value, no additional validation needed
      if (!value || (Array.isArray(value) && value.length === 0)) {
        return null;
      }
      
      const values = Array.isArray(value) ? value : [];
      
      // Check min/max choices validation (only for multiple mode)
      if (checkboxType === 'multiple') {
        if (minChoices > 0 && values.length < minChoices) {
          return customErrorMessage || `Please select at least ${minChoices} option${minChoices > 1 ? 's' : ''}`;
        }
        if (maxChoices > 0 && values.length > maxChoices) {
          return customErrorMessage || `Please select at most ${maxChoices} option${maxChoices > 1 ? 's' : ''}`;
        }
      }
      
      return null;
    }
  },
  {
    name: "radio",
    type: "json",
    validate: (value, { required, options = {} }) => {
      // Parse field options
      const {
        selectionType = 'single',
        minChoices = 0,
        maxChoices = 0,
        customErrorMessage = ''
      } = options;
      
      // Check required validation
      if (required) {
        if (!value || 
            (Array.isArray(value) && value.length === 0) ||
            (typeof value === 'string' && value.trim() === '') ||
            value === null ||
            value === undefined) {
          return customErrorMessage || 'This field is required';
        }
      }
      
      // If no value, no additional validation needed
      if (!value || (Array.isArray(value) && value.length === 0)) {
        return null;
      }
      
      const values = Array.isArray(value) ? value : [];
      
      // Check min/max choices validation (only for multiple mode)
      if (selectionType === 'multiple') {
        if (minChoices > 0 && values.length < minChoices) {
          return customErrorMessage || `Please select at least ${minChoices} option${minChoices > 1 ? 's' : ''}`;
        }
        if (maxChoices > 0 && values.length > maxChoices) {
          return customErrorMessage || `Please select at most ${maxChoices} option${maxChoices > 1 ? 's' : ''}`;
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
          plugin: PLUGIN_ID,
          type: field.type,
        };
        
        // Add validation function if it exists
        if (field.validate) {
          fieldConfig.validate = field.validate;
        }
        
        strapi.customFields.register(fieldConfig);
      } catch (error) {
        // Silent error handling
      }
    });
  },

  bootstrap({ strapi }) {
    // Wait longer for registration to complete
    setTimeout(() => {
      // Verify all fields are registered only if customFields.get is available
      if (strapi.customFields && typeof strapi.customFields.get === 'function') {
        customFields.forEach((field) => {
          try {
            const registeredField = strapi.customFields.get(`${PLUGIN_ID}.${field.name}`);
            // Field verification completed silently
          } catch (error) {
            // Silent error handling
          }
        });
      }
    }, 1000);
  },
};

