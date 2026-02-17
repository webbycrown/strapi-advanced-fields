# 🚀 Advanced Fields for Strapi

[![npm version](https://badge.fury.io/js/%40webbycrown%2Fadvanced-fields.svg)](https://badge.fury.io/js/%40webbycrown%2Fadvanced-fields)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Strapi](https://img.shields.io/badge/Strapi-5.x-blue.svg)](https://strapi.io/)

Professional custom fields for Strapi CMS that provide advanced functionality with comprehensive validation, dynamic options, and user-friendly interfaces.

📦 **NPM Package**: [@webbycrown/advanced-fields](https://www.npmjs.com/package/@webbycrown/advanced-fields)

## 🎥 Overview & Usage Demo

A short introduction and quick overview of **Advanced Fields for Strapi**, showcasing available field types, configuration options, and real-world usage inside the Strapi admin panel.

[![Watch the demo](https://raw.githubusercontent.com/webbycrown/strapi-advanced-fields/main/assets/advanced-field-play-img.png)](https://www.youtube.com/watch?v=-WRuUEWwGfk)

▶️ **[Watch Full Video on YouTube](https://www.youtube.com/watch?v=-WRuUEWwGfk)**

---       

## ✨ Features

### 🔤 Advanced Input
- **Text Input Field**: Simple, clean text input with advanced validation
- **Comprehensive Validation**: Min/max length, regex patterns, required fields
- **Custom Error Messages**: User-friendly validation feedback
- **Default Values**: Pre-filled content for new entries
- **Placeholder Support**: Helpful hints for content creators
- **Field Notes**: Display helpful notes below the field
- **Private Fields**: Hide sensitive data from API responses

### ☑️ Advanced Checkbox
- **Single & Multiple Modes**: Toggle between single checkbox or multiple selections
- **Dynamic Options**: Define options with value|label format
- **Min/Max Validation**: Control minimum and maximum selections
- **Layout Options**: Vertical, horizontal, or grid layouts
- **Default Selections**: Pre-select options for new entries
- **Field Notes**: Display helpful notes below the field

### 🔘 Advanced Radio
- **Single & Multiple Selection**: Choose between single or multiple radio selections
- **Dynamic Options**: Flexible option configuration
- **Selection Limits**: Control minimum and maximum choices
- **Layout Flexibility**: Multiple visual layouts
- **Custom Validation**: Tailored error messages
- **Field Notes**: Display helpful notes below the field

## 🛠️ Installation

### Via npm
```bash
npm install @webbycrown/advanced-fields
```

### Via yarn
```bash
yarn add @webbycrown/advanced-fields
```

## ⚙️ Configuration

1. **Install the plugin** in your Strapi project
2. **Restart your Strapi server**
3. **Navigate to Content-Type Builder**
4. **Add a new field** and select one of the Advanced Fields:
   - Advanced Input
   - Advanced Checkbox
   - Advanced Radio


## 📖 Usage Examples

### Advanced Input Configuration

```javascript
// Example: Text validation with custom error message and field note
{
  "required": true,
  "maxLength": 255,
  "minLength": 3,
  "regex": "^[a-zA-Z0-9\\s]+$",
  "options": {
    "customErrorMessage": "Please enter valid text",
    "placeholder": "Enter your text here",
    "defaultValue": "Default text",
    "fieldNote": "This field accepts alphanumeric characters and spaces only"
  }
}
```

### Advanced Checkbox Configuration

```javascript
// Example: Multiple checkbox with validation and field note
{
  "required": true,
  "options": {
    "checkboxType": "multiple",
    "checkboxOptions": "1|Option 1\n2|Option 2\n3|Option 3",
    "minChoices": 1,
    "maxChoices": 2,
    "layout": "vertical",
    "defaultSelected": "1\n2",
    "fieldNote": "Please select at least 1 and at most 2 options"
  }
}
```

### Advanced Radio Configuration

```javascript
// Example: Single radio with dynamic options and field note
{
  "required": true,
  "options": {
    "selectionType": "single",
    "radioOptions": "small|Small\nmedium|Medium\nlarge|Large",
    "layout": "horizontal",
    "defaultSelected": "medium",
    "fieldNote": "Choose the size that best fits your needs"
  }
}
```

## 🎯 Field Options Reference

### Advanced Input Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `required` | boolean | Field is required | `false` |
| `unique` | boolean | Values must be unique | `false` |
| `maxLength` | number | Maximum character length | `0` (unlimited) |
| `minLength` | number | Minimum character length | `0` |
| `regex` | string | Validation pattern | `""` |
| `options.defaultValue` | string | Pre-filled value | `""` |
| `options.placeholder` | string | Placeholder text | `""` |
| `options.customErrorMessage` | string | Custom error message | `""` |
| `options.fieldNote` | string | Helpful note displayed below field | `""` |
| `private` | boolean | Hide from API | `false` |

### Advanced Checkbox Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `required` | boolean | Field is required | `false` |
| `options.checkboxType` | string | `single` or `multiple` | `single` |
| `options.checkboxOptions` | string | Options in `value\|label` format | `""` |
| `options.defaultSelected` | string | Pre-selected options | `""` |
| `options.minChoices` | number | Minimum selections | `0` |
| `options.maxChoices` | number | Maximum selections | `0` |
| `options.layout` | string | `vertical`, `horizontal`, or `grid` | `vertical` |
| `options.customErrorMessage` | string | Custom error message | `""` |
| `options.fieldNote` | string | Helpful note displayed below field | `""` |
| `private` | boolean | Hide from API | `false` |

### Advanced Radio Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `required` | boolean | Field is required | `false` |
| `options.selectionType` | string | `single` or `multiple` | `single` |
| `options.radioOptions` | string | Options in `value\|label` format | `""` |
| `options.defaultSelected` | string | Pre-selected options | `""` |
| `options.minChoices` | number | Minimum selections | `0` |
| `options.maxChoices` | number | Maximum selections | `0` |
| `options.layout` | string | `vertical`, `horizontal`, or `grid` | `vertical` |
| `options.customErrorMessage` | string | Custom error message | `""` |
| `options.fieldNote` | string | Helpful note displayed below field | `""` |
| `private` | boolean | Hide from API | `false` |

## 🔧 API Usage

### Retrieving Data

```javascript
// GET /api/articles
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Sample Article",
        "advancedInput": "user@example.com",
        "advancedCheckbox": ["1", "2"],
        "advancedRadio": ["medium"]
      }
    }
  ]
}
```

### Creating/Updating Data

```javascript
// POST /api/articles
{
  "data": {
    "title": "New Article",
    "advancedInput": "new@example.com",
    "advancedCheckbox": ["1", "3"],
    "advancedRadio": ["large"]
  }
}
```

## 🎨 Layout Options

### Vertical Layout
Options are stacked vertically for easy scanning.

### Horizontal Layout
Options are arranged in a horizontal row for compact forms.

### Grid Layout
Options are displayed in a responsive grid for better space utilization.

## ✅ Validation Features

- **Real-time Validation**: Immediate feedback during content creation
- **Custom Error Messages**: Tailored validation messages for better UX
- **Required Field Validation**: Prevents saving without required data
- **Pattern Validation**: Regex support for complex validation rules
- **Selection Limits**: Control minimum and maximum choices
- **Unique Value Validation**: Ensure data uniqueness across entries

## 🚀 Performance

- **Optimized Rendering**: Efficient React components
- **Lazy Loading**: Components loaded only when needed
- **Minimal Bundle Size**: Lightweight implementation
- **Memory Efficient**: Optimized for large datasets

## 🔒 Security

- **Input Sanitization**: Automatic data sanitization
- **XSS Protection**: Built-in security measures
- **Private Fields**: Hide sensitive data from API responses
- **Validation**: Server-side validation for data integrity

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/webbycrown/strapi-advanced-fields.git

# Install dependencies
npm install

# Start development
npm run develop
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [GitHub Wiki](https://github.com/webbycrown/strapi-advanced-fields/wiki)
- **Issues**: [GitHub Issues](https://github.com/webbycrown/strapi-advanced-fields/issues)
- **Discussions**: [GitHub Discussions](https://github.com/webbycrown/strapi-advanced-fields/discussions)
- **Email**: info@webbycrown.com

## 🙏 Acknowledgments

- Built for the amazing [Strapi](https://strapi.io/) community
- Inspired by modern form design principles
- Thanks to all contributors and users

## 📊 Changelog

### v1.0.7
- 📝 Updated Plugin for latest version.

### v1.0.6
- 📝 Updated the README to properly display the YouTube preview image in Any documentation.

### v1.0.5
- 📝 Updated the README to include the YouTube demo video link.

### v1.0.4
- 🐛 Fixed minor bugs in field validation
- 📝 Updated README to include Demo Video section
- ⚡ Improved documentation clarity for plugin setup and usage

### v1.0.3
- 📝 Documentation updates and minor formatting improvements.

### v1.0.2
- 🐛 Fixed bugs.
- 🛠️ Resolved minor issues affecting

### v1.0.1
- 📝 Updated the README file.
- ✨ Improved clarity and formatting for better readability.

### v1.0.0
- ✨ Initial release  
- 🔤 Advanced Input field with validation
- ☑️ Advanced Checkbox (single/multiple)
- 🔘 Advanced Radio (single/multiple)
- 🎨 Multiple layout options
- ✅ Comprehensive validation system
- 📝 Field notes support for all field types
- 📱 Responsive design
- 🌐 Internationalization support
- 🚀 Published to NPM: [@webbycrown/advanced-fields](https://www.npmjs.com/package/@webbycrown/advanced-fields)

---

<div align="center">
  <strong>Made with ❤️ by <a href="https://webbycrown.com">WebbyCrown</a></strong>
</div>