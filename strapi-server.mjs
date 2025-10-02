'use strict';

const PLUGIN_ID = 'advanced-fields';

const customFields = [
  {
    name: 'input',
    type: 'string',
  },
  {
    name: 'checkbox',
    type: 'json',
  },
  {
    name: "radio",
    type: "json"
  }
];

module.exports = {
  register({ strapi }) {
    console.log(`[${PLUGIN_ID}] Registering custom fields...`);
    
    // Ensure custom fields registry is available
    if (!strapi.customFields) {
      console.error(`[${PLUGIN_ID}] Custom fields registry not available`);
      return;
    }
    
    // Register custom fields with proper error handling
    customFields.forEach((field) => {
      try {
        console.log(`[${PLUGIN_ID}] Registering field: ${field.name} (type: ${field.type})`);
        strapi.customFields.register({
          name: field.name,
          plugin: PLUGIN_ID,
          type: field.type,
        });
        console.log(`[${PLUGIN_ID}] Successfully registered field: ${field.name}`);
      } catch (error) {
        console.error(`[${PLUGIN_ID}] Failed to register field ${field.name}:`, error.message);
      }
    });
    
    console.log(`[${PLUGIN_ID}] All custom fields registration completed`);
  },

  bootstrap({ strapi }) {
    console.log(`[${PLUGIN_ID}] Bootstrap starting...`);
    
    // Wait longer for registration to complete
    setTimeout(() => {
      // Verify all fields are registered only if customFields.get is available
      if (strapi.customFields && typeof strapi.customFields.get === 'function') {
        customFields.forEach((field) => {
          try {
            const registeredField = strapi.customFields.get(`${PLUGIN_ID}.${field.name}`);
            if (registeredField) {
              console.log(`[${PLUGIN_ID}] ✅ Field verified: ${field.name}`);
            } else {
              console.error(`[${PLUGIN_ID}] ❌ Field not found in registry: ${field.name}`);
            }
          } catch (error) {
            console.error(`[${PLUGIN_ID}] Error verifying field ${field.name}:`, error.message);
          }
        });
      } else {
        console.log(`[${PLUGIN_ID}] Skipping field verification (customFields.get not available)`);
      }
    }, 1000);
    
    console.log(`[${PLUGIN_ID}] Bootstrap completed`);
  },
};
