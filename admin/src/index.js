import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { AdvancedCheckboxIcon, AdvancedInputIcon, AdvancedRadioIcon } from './components/PluginIcon';

// Dynamic field configuration with comprehensive options
const customFields = [
  {
    name: "input",
    type: "string",
    icon: AdvancedInputIcon,
    pluginId: PLUGIN_ID,
    component: () => import("./components/AdvancedInput"),
    intlLabel: {
      id: `${PLUGIN_ID}.input.label`,
      defaultMessage: 'Advanced Input',
    },
    intlDescription: {
      id: `${PLUGIN_ID}.input.description`,
      defaultMessage: "Professional-grade text input with comprehensive validation and advanced configuration options",
    },
    options: {
      base: [],
      advanced: [
        {
          sectionTitle: {
            id: `${PLUGIN_ID}.input.settings.advanced.label`,
            defaultMessage: 'Advanced Settings',
          },
          items: [
            {
              name: 'required',
              type: 'checkbox',
              intlLabel: {
                id: `${PLUGIN_ID}.input.options.required.label`,
                defaultMessage: 'Required Field',
              },
              description: {
                id: `${PLUGIN_ID}.input.options.required.description`,
                defaultMessage: 'This field must be filled before saving',
              },
            },
            {
              name: 'unique',
              type: 'checkbox',
              intlLabel: {
                id: `${PLUGIN_ID}.input.options.unique.label`,
                defaultMessage: 'Unique Value',
              },
              description: {
                id: `${PLUGIN_ID}.input.options.unique.description`,
                defaultMessage: 'Each entry must have a different value',
              },
            },
            {
              name: 'maxLength',
              type: 'number',
              intlLabel: {
                id: `${PLUGIN_ID}.input.options.maxLength.label`,
                defaultMessage: 'Maximum Length',
              },
              description: {
                id: `${PLUGIN_ID}.input.options.maxLength.description`,
                defaultMessage: 'Maximum number of characters allowed',
              },
              placeholder: {
                id: `${PLUGIN_ID}.input.options.maxLength.placeholder`,
                defaultMessage: 'Enter max length (e.g., 255)',
              },
            },
            {
              name: 'minLength',
              type: 'number',
              intlLabel: {
                id: `${PLUGIN_ID}.input.options.minLength.label`,
                defaultMessage: 'Minimum Length',
              },
              description: {
                id: `${PLUGIN_ID}.input.options.minLength.description`,
                defaultMessage: 'Minimum number of characters required',
              },
              placeholder: {
                id: `${PLUGIN_ID}.input.options.minLength.placeholder`,
                defaultMessage: 'Enter min length (e.g., 3)',
              },
            },
            {
              name: 'options.defaultValue',
              type: 'text',
              intlLabel: {
                id: `${PLUGIN_ID}.input.options.defaultValue.label`,
                defaultMessage: 'Default Value',
              },
              description: {
                id: `${PLUGIN_ID}.input.options.defaultValue.description`,
                defaultMessage: 'Pre-filled value for new entries',
              },
              placeholder: {
                id: `${PLUGIN_ID}.input.options.defaultValue.placeholder`,
                defaultMessage: 'Enter default text',
              },
            },
            {
              name: 'options.placeholder',
              type: 'text',
              intlLabel: {
                id: `${PLUGIN_ID}.input.options.placeholder.label`,
                defaultMessage: 'Placeholder Text',
              },
              description: {
                id: `${PLUGIN_ID}.input.options.placeholder.description`,
                defaultMessage: 'Hint text shown when field is empty',
              },
              placeholder: {
                id: `${PLUGIN_ID}.input.options.placeholder.placeholder`,
                defaultMessage: 'Enter placeholder text',
              },
            },
            {
              name: 'regex',
              type: 'text',
              intlLabel: {
                id: `${PLUGIN_ID}.input.options.regex.label`,
                defaultMessage: 'Regular Expression',
              },
              description: {
                id: `${PLUGIN_ID}.input.options.regex.description`,
                defaultMessage: 'Custom validation pattern (regex)',
              },
              placeholder: {
                id: `${PLUGIN_ID}.input.options.regex.placeholder`,
                defaultMessage: 'e.g., ^[A-Za-z]+$ for letters only',
              },
            },
            {
              name: 'options.customErrorMessage',
              type: 'text',
              intlLabel: {
                id: `${PLUGIN_ID}.input.options.customErrorMessage.label`,
                defaultMessage: 'Custom Error Message',
              },
              description: {
                id: `${PLUGIN_ID}.input.options.customErrorMessage.description`,
                defaultMessage: 'Custom error message for validation failures',
              },
              placeholder: {
                id: `${PLUGIN_ID}.input.options.customErrorMessage.placeholder`,
                defaultMessage: 'Enter custom error message',
              },
            },
            {
              name: 'options.fieldNote',
              type: 'text',
              intlLabel: {
                id: `${PLUGIN_ID}.input.options.fieldNote.label`,
                defaultMessage: 'Field Note',
              },
              description: {
                id: `${PLUGIN_ID}.input.options.fieldNote.description`,
                defaultMessage: 'Add a helpful note that will appear below the field',
              },
              placeholder: {
                id: `${PLUGIN_ID}.input.options.fieldNote.placeholder`,
                defaultMessage: 'Enter a note for this field',
              },
            },
            {
              name: 'private',
              type: 'checkbox',
              intlLabel: {
                id: `${PLUGIN_ID}.input.options.private.label`,
                defaultMessage: 'Private Field',
              },
              description: {
                id: `${PLUGIN_ID}.input.options.private.description`,
                defaultMessage: 'Hide this field from API responses',
              },
            },
          ],
        },
      ],
    },
  },
  {
    name: "checkbox",
    type: "json",
    icon: AdvancedCheckboxIcon,
    pluginId: PLUGIN_ID,
    component: () => import("./components/AdvancedCheckbox"),
    intlLabel: {
      id: `${PLUGIN_ID}.checkbox.label`,
      defaultMessage: "Advanced Checkbox",
    },
    intlDescription: {
      id: `${PLUGIN_ID}.checkbox.description`,
      defaultMessage: "Unified checkbox field supporting both single and multiple selections with advanced configuration",
    },
    getDisplayValue: (value, field) => {
      if (!value || !Array.isArray(value) || value.length === 0) {
        return '';
      }
      
      // Get field options to map values to labels
      const options = field?.options?.checkboxOptions || '';
      const optionMap = {};
      
      if (options) {
        options.split('\n').forEach(opt => {
          const [val, label] = opt.split('|');
          if (val && label) {
            optionMap[val.trim()] = label.trim();
          }
        });
      }
      
      // Map values to labels, fallback to values if no labels found
      const displayValues = value.map(val => optionMap[val] || val);
      
      return displayValues.join(', ');
    },
    options: {
      base: [],
      advanced: [
        {
          sectionTitle: {
            id: `${PLUGIN_ID}.checkbox.settings.advanced.label`,
            defaultMessage: 'Advanced Settings',
          },
          items: [
            {
              name: 'required',
              type: 'checkbox',
              intlLabel: {
                id: `${PLUGIN_ID}.checkbox.options.required.label`,
                defaultMessage: 'Required Field',
              },
              description: {
                id: `${PLUGIN_ID}.checkbox.options.required.description`,
                defaultMessage: 'This field must be filled before saving',
              },
            },
            {
              name: 'options.checkboxType',
              type: 'select',
              intlLabel: {
                id: `${PLUGIN_ID}.checkbox.options.checkboxType.label`,
                defaultMessage: 'Checkbox Type',
              },
              description: {
                id: `${PLUGIN_ID}.checkbox.options.checkboxType.description`,
                defaultMessage: 'Choose between single checkbox or multiple checkboxes',
              },
              options: [
                {
                  value: 'single',
                  metadatas: {
                    intlLabel: {
                      id: `${PLUGIN_ID}.checkbox.options.checkboxType.single`,
                      defaultMessage: 'Single Checkbox',
                    },
                  },
                },
                {
                  value: 'multiple',
                  metadatas: {
                    intlLabel: {
                      id: `${PLUGIN_ID}.checkbox.options.checkboxType.multiple`,
                      defaultMessage: 'Multiple Checkboxes',
                    },
                  },
                },
              ],
              defaultValue: 'single',
            },
            {
              name: 'options.checkboxOptions',
              type: 'textarea',
              intlLabel: {
                id: `${PLUGIN_ID}.checkbox.options.checkboxOptions.label`,
                defaultMessage: 'Checkbox Options',
              },
              description: {
                id: `${PLUGIN_ID}.checkbox.options.checkboxOptions.description`,
                defaultMessage: 'Define available options for multiple checkboxes (one per line: value|label)',
              },
              placeholder: {
                id: `${PLUGIN_ID}.checkbox.options.checkboxOptions.placeholder`,
                defaultMessage: 'option1|Option 1\noption2|Option 2\noption3|Option 3',
              },
              condition: {
                field: 'options.checkboxType',
                operator: 'eq',
                value: 'multiple',
              },
            },
            {
              name: 'options.defaultSelected',
              type: 'textarea',
              intlLabel: {
                id: `${PLUGIN_ID}.checkbox.options.defaultSelected.label`,
                defaultMessage: 'Default Selected',
              },
              description: {
                id: `${PLUGIN_ID}.checkbox.options.defaultSelected.description`,
                defaultMessage: 'Pre-selected options for multiple checkboxes (one per line)',
              },
              placeholder: {
                id: `${PLUGIN_ID}.checkbox.options.defaultSelected.placeholder`,
                defaultMessage: 'option1\noption2',
              },
              condition: {
                field: 'options.checkboxType',
                operator: 'eq',
                value: 'multiple',
              },
            },
            {
              name: 'options.minChoices',
              type: 'number',
              intlLabel: {
                id: `${PLUGIN_ID}.checkbox.options.minChoices.label`,
                defaultMessage: 'Minimum Choices',
              },
              description: {
                id: `${PLUGIN_ID}.checkbox.options.minChoices.description`,
                defaultMessage: 'Minimum number of options that must be selected',
              },
              placeholder: {
                id: `${PLUGIN_ID}.checkbox.options.minChoices.placeholder`,
                defaultMessage: 'Enter minimum (0 for no limit)',
              },
              defaultValue: 0,
              condition: {
                field: 'options.checkboxType',
                operator: 'eq',
                value: 'multiple',
              },
            },
            {
              name: 'options.maxChoices',
              type: 'number',
              intlLabel: {
                id: `${PLUGIN_ID}.checkbox.options.maxChoices.label`,
                defaultMessage: 'Maximum Choices',
              },
              description: {
                id: `${PLUGIN_ID}.checkbox.options.maxChoices.description`,
                defaultMessage: 'Maximum number of options that can be selected',
              },
              placeholder: {
                id: `${PLUGIN_ID}.checkbox.options.maxChoices.placeholder`,
                defaultMessage: 'Enter maximum (0 for no limit)',
              },
              defaultValue: 0,
              condition: {
                field: 'options.checkboxType',
                operator: 'eq',
                value: 'multiple',
              },
            },
            {
              name: 'options.layout',
              type: 'select',
              intlLabel: {
                id: `${PLUGIN_ID}.checkbox.options.layout.label`,
                defaultMessage: 'Layout Style',
              },
              description: {
                id: `${PLUGIN_ID}.checkbox.options.layout.description`,
                defaultMessage: 'Visual layout of multiple checkbox options',
              },
              options: [
                {
                  value: 'vertical',
                  metadatas: {
                    intlLabel: {
                      id: `${PLUGIN_ID}.checkbox.options.layout.vertical`,
                      defaultMessage: 'Vertical Stack',
                    },
                  },
                },
                {
                  value: 'horizontal',
                  metadatas: {
                    intlLabel: {
                      id: `${PLUGIN_ID}.checkbox.options.layout.horizontal`,
                      defaultMessage: 'Horizontal Row',
                    },
                  },
                },
                {
                  value: 'grid',
                  metadatas: {
                    intlLabel: {
                      id: `${PLUGIN_ID}.checkbox.options.layout.grid`,
                      defaultMessage: 'Grid Layout',
                    },
                  },
                },
              ],
              defaultValue: 'vertical',
              condition: {
                field: 'options.checkboxType',
                operator: 'eq',
                value: 'multiple',
              },
            },
            {
              name: 'options.customErrorMessage',
              type: 'text',
              intlLabel: {
                id: `${PLUGIN_ID}.checkbox.options.customErrorMessage.label`,
                defaultMessage: 'Custom Error Message',
              },
              description: {
                id: `${PLUGIN_ID}.checkbox.options.customErrorMessage.description`,
                defaultMessage: 'Custom error message for validation failures',
              },
              placeholder: {
                id: `${PLUGIN_ID}.checkbox.options.customErrorMessage.placeholder`,
                defaultMessage: 'Enter custom error message',
              },
            },
            {
              name: 'options.fieldNote',
              type: 'text',
              intlLabel: {
                id: `${PLUGIN_ID}.checkbox.options.fieldNote.label`,
                defaultMessage: 'Field Note',
              },
              description: {
                id: `${PLUGIN_ID}.checkbox.options.fieldNote.description`,
                defaultMessage: 'Add a helpful note that will appear below the field',
              },
              placeholder: {
                id: `${PLUGIN_ID}.checkbox.options.fieldNote.placeholder`,
                defaultMessage: 'Enter a note for this field',
              },
            },
            {
              name: 'private',
              type: 'checkbox',
              intlLabel: {
                id: `${PLUGIN_ID}.checkbox.options.private.label`,
                defaultMessage: 'Private Field',
              },
              description: {
                id: `${PLUGIN_ID}.checkbox.options.private.description`,
                defaultMessage: 'Hide this field from API responses',
              },
            },
          ],
        },
      ],
    },
  },
  {
    name: "radio",
    type: "json",
    icon: AdvancedRadioIcon,
    pluginId: PLUGIN_ID,
    component: () => import("./components/AdvancedRadio"),
    intlLabel: {
      id: `${PLUGIN_ID}.radio.label`,
      defaultMessage: "Advanced Radio",
    },
    intlDescription: {
      id: `${PLUGIN_ID}.radio.description`,
      defaultMessage: "Radio buttons with dynamic options and selection types",
    },
    getDisplayValue: (value, field) => {
      if (!value || !Array.isArray(value) || value.length === 0) {
        return '';
      }
      
      // Get field options to map values to labels
      const options = field?.options?.radioOptions || '';
      const optionMap = {};
      
      if (options) {
        options.split('\n').forEach(opt => {
          const [val, label] = opt.split('|');
          if (val && label) {
            optionMap[val.trim()] = label.trim();
          }
        });
      }
      
      // Map values to labels, fallback to values if no labels found
      const displayValues = value.map(val => optionMap[val] || val);
      
      return displayValues.join(', ');
    },
    options: {
      base: [],
      advanced: [
        {
          sectionTitle: {
            id: `${PLUGIN_ID}.radio.settings.advanced.label`,
            defaultMessage: 'Advanced Settings',
          },
          items: [
            {
              name: 'required',
              type: 'checkbox',
              intlLabel: {
                id: `${PLUGIN_ID}.radio.options.required.label`,
                defaultMessage: 'Required Field',
              },
              description: {
                id: `${PLUGIN_ID}.radio.options.required.description`,
                defaultMessage: 'At least one option must be selected',
              },
            },
            {
              name: 'options.radioOptions',
              type: 'textarea',
              intlLabel: {
                id: `${PLUGIN_ID}.radio.options.radioOptions.label`,
                defaultMessage: 'Radio Options',
              },
              description: {
                id: `${PLUGIN_ID}.radio.options.radioOptions.description`,
                defaultMessage: 'Define available options (one per line: value|label)',
              },
              placeholder: {
                id: `${PLUGIN_ID}.radio.options.radioOptions.placeholder`,
                defaultMessage: '1|Option 1\n2|Option 2\n3|Option 3',
              },
            },
            {
              name: 'options.defaultSelected',
              type: 'textarea',
              intlLabel: {
                id: `${PLUGIN_ID}.radio.options.defaultSelected.label`,
                defaultMessage: 'Default Selected',
              },
              description: {
                id: `${PLUGIN_ID}.radio.options.defaultSelected.description`,
                defaultMessage: 'Pre-selected options (one per line)',
              },
              placeholder: {
                id: `${PLUGIN_ID}.radio.options.defaultSelected.placeholder`,
                defaultMessage: '1\n2',
              },
            },
            {
              name: "options.selectionType",
              type: "select",
              intlLabel: {
                id: `${PLUGIN_ID}.radio.options.selectionType.label`,
                defaultMessage: "Selection Type",
              },
              description: {
                id: `${PLUGIN_ID}.radio.options.selectionType.description`,
                defaultMessage: "Choose whether users can select one or multiple options",
              },
              options: [
                {
                  value: "single",
                  metadatas: {
                    intlLabel: {
                      id: `${PLUGIN_ID}.radio.options.selectionType.single`,
                      defaultMessage: "Single Selection",
                    },
                  },
                },
                {
                  value: "multiple",
                  metadatas: {
                    intlLabel: {
                      id: `${PLUGIN_ID}.radio.options.selectionType.multiple`,
                      defaultMessage: "Multiple Selection",
                    },
                  },
                },
              ],
              defaultValue: "single",
            },
            {
              name: 'options.minChoices',
              type: 'number',
              intlLabel: {
                id: `${PLUGIN_ID}.radio.options.minChoices.label`,
                defaultMessage: 'Minimum Choices',
              },
              description: {
                id: `${PLUGIN_ID}.radio.options.minChoices.description`,
                defaultMessage: 'Minimum number of options that must be selected',
              },
              placeholder: {
                id: `${PLUGIN_ID}.radio.options.minChoices.placeholder`,
                defaultMessage: 'Enter minimum (0 for no limit)',
              },
              defaultValue: 0,
            },
            {
              name: 'options.maxChoices',
              type: 'number',
              intlLabel: {
                id: `${PLUGIN_ID}.radio.options.maxChoices.label`,
                defaultMessage: 'Maximum Choices',
              },
              description: {
                id: `${PLUGIN_ID}.radio.options.maxChoices.description`,
                defaultMessage: 'Maximum number of options that can be selected',
              },
              placeholder: {
                id: `${PLUGIN_ID}.radio.options.maxChoices.placeholder`,
                defaultMessage: 'Enter maximum (0 for no limit)',
              },
              defaultValue: 0,
            },
            {
              name: 'options.layout',
              type: 'select',
              intlLabel: {
                id: `${PLUGIN_ID}.radio.options.layout.label`,
                defaultMessage: 'Layout Style',
              },
              description: {
                id: `${PLUGIN_ID}.radio.options.layout.description`,
                defaultMessage: 'Visual layout of radio options',
              },
              options: [
                {
                  value: 'vertical',
                  metadatas: {
                    intlLabel: {
                      id: `${PLUGIN_ID}.radio.options.layout.vertical`,
                      defaultMessage: 'Vertical Stack',
                    },
                  },
                },
                {
                  value: 'horizontal',
                  metadatas: {
                    intlLabel: {
                      id: `${PLUGIN_ID}.radio.options.layout.horizontal`,
                      defaultMessage: 'Horizontal Row',
                    },
                  },
                },
                {
                  value: 'grid',
                  metadatas: {
                    intlLabel: {
                      id: `${PLUGIN_ID}.radio.options.layout.grid`,
                      defaultMessage: 'Grid Layout',
                    },
                  },
                },
              ],
              defaultValue: 'vertical',
            },
            {
              name: 'options.customErrorMessage',
              type: 'text',
              intlLabel: {
                id: `${PLUGIN_ID}.radio.options.customErrorMessage.label`,
                defaultMessage: 'Custom Error Message',
              },
              description: {
                id: `${PLUGIN_ID}.radio.options.customErrorMessage.description`,
                defaultMessage: 'Custom error message for validation failures',
              },
              placeholder: {
                id: `${PLUGIN_ID}.radio.options.customErrorMessage.placeholder`,
                defaultMessage: 'Enter custom error message',
              },
            },
            {
              name: 'options.fieldNote',
              type: 'text',
              intlLabel: {
                id: `${PLUGIN_ID}.radio.options.fieldNote.label`,
                defaultMessage: 'Field Note',
              },
              description: {
                id: `${PLUGIN_ID}.radio.options.fieldNote.description`,
                defaultMessage: 'Add a helpful note that will appear below the field',
              },
              placeholder: {
                id: `${PLUGIN_ID}.radio.options.fieldNote.placeholder`,
                defaultMessage: 'Enter a note for this field',
              },
            },
          ],
        },
      ],
    },
  },
];

export default {
  register(app) {
    // Ensure custom fields registry is available
    if (!app.customFields) {
      return;
    }
    
    // Register custom fields dynamically with error handling
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
            Input: field.component,
          },
          options: field.options,
          getDisplayValue: field.getDisplayValue,
        });
      } catch (error) {
        // Silent error handling
      }
    });
  },

  bootstrap(app) {
    // Verify admin-side registration only if customFields.get is available
    if (app.customFields && typeof app.customFields.get === 'function') {
      customFields.forEach((field) => {
        try {
          const registeredField = app.customFields.get(`${field.pluginId}.${field.name}`);
          // Field verification completed silently
        } catch (error) {
          // Silent error handling
        }
      });
    }
  },

  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        if (locale === 'en') {
          // Build comprehensive translations from customFields
          const translations = {
            [`${PLUGIN_ID}.plugin.name`]: "Advanced Fields",
            [`${PLUGIN_ID}.plugin.description`]: "Advanced custom fields with dynamic options",
          };

          // Helper function to extract all translations recursively
          const extractTranslations = (obj, prefix = '') => {
            Object.keys(obj).forEach(key => {
              const value = obj[key];
              const currentKey = prefix ? `${prefix}.${key}` : key;
              
              if (typeof value === 'object' && value !== null) {
                if (value.id && value.defaultMessage) {
                  // This is a translation object
                  translations[value.id] = value.defaultMessage;
                } else if (Array.isArray(value)) {
                  // Handle arrays
                  value.forEach((item, index) => {
                    extractTranslations(item, `${currentKey}[${index}]`);
                  });
                } else {
                  // Recursively extract from nested objects
                  extractTranslations(value, currentKey);
                }
              }
            });
          };

          // Extract all translations from customFields
          customFields.forEach((field) => {
            extractTranslations(field);
          });

          return { data: translations, locale: 'en' };
        }

        try {
          const { default: data } = await import(`./translations/${locale}.json`);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};