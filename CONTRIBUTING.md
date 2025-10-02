# Contributing to Advanced Fields

Thank you for your interest in contributing to Advanced Fields! We welcome contributions from the community and appreciate your help in making this plugin better.

## 🤝 How to Contribute

### Reporting Issues

1. **Check existing issues** first to avoid duplicates
2. **Use the issue template** provided
3. **Provide detailed information**:
   - Strapi version
   - Node.js version
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Suggesting Features

1. **Check existing feature requests**
2. **Describe the use case** clearly
3. **Explain the benefits** to the community
4. **Provide examples** if possible

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Add tests** if applicable
5. **Update documentation**
6. **Commit your changes**: `git commit -m 'Add amazing feature'`
7. **Push to the branch**: `git push origin feature/amazing-feature`
8. **Open a Pull Request**

## 🛠️ Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0
- Strapi >= 5.0.0

### Local Development

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/strapi-advanced-fields.git
cd strapi-advanced-fields

# Install dependencies
npm install

# Create a test Strapi project
npx create-strapi-app@latest test-project --quickstart

# Link the plugin for development
npm run watch:link

# In another terminal, start Strapi
cd test-project
npm run develop
```

### Building

```bash
# Build the plugin
npm run build

# Verify the build
npm run verify
```

## 📋 Code Standards

### JavaScript/TypeScript

- Use **ESLint** configuration
- Follow **Prettier** formatting
- Write **meaningful variable names**
- Add **JSDoc comments** for functions
- Use **const/let** instead of var

### React Components

- Use **functional components** with hooks
- Implement **PropTypes** or TypeScript
- Follow **Strapi design system** patterns
- Ensure **accessibility** compliance

### Testing

- Write **unit tests** for utilities
- Add **integration tests** for components
- Test **validation logic** thoroughly
- Ensure **cross-browser compatibility**

## 🎯 Contribution Areas

### High Priority

- **Bug fixes** and stability improvements
- **Performance optimizations**
- **Accessibility enhancements**
- **Documentation improvements**

### Medium Priority

- **New field types**
- **Additional validation options**
- **UI/UX improvements**
- **Internationalization**

### Low Priority

- **Advanced features**
- **Custom themes**
- **Third-party integrations**

## 📝 Pull Request Guidelines

### Before Submitting

- [ ] **Tests pass** locally
- [ ] **Code is formatted** with Prettier
- [ ] **No linting errors**
- [ ] **Documentation updated**
- [ ] **Changelog updated**

### PR Description

- **Clear title** describing the change
- **Detailed description** of what was changed
- **Reference related issues**
- **Screenshots** for UI changes
- **Testing instructions**

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** in different environments
4. **Approval** from at least one maintainer
5. **Merge** to main branch

## 🐛 Bug Reports

### Template

```markdown
**Bug Description**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Strapi Version: [e.g. 5.0.0]
- Node Version: [e.g. 18.0.0]
- Browser: [e.g. Chrome 91]
- OS: [e.g. macOS 12.0]

**Additional Context**
Any other context about the problem.
```

## 💡 Feature Requests

### Template

```markdown
**Feature Description**
A clear description of the feature you'd like to see.

**Use Case**
Describe the use case and why this feature would be valuable.

**Proposed Solution**
Describe how you think this feature should work.

**Alternatives**
Describe any alternative solutions you've considered.

**Additional Context**
Any other context or screenshots about the feature request.
```

## 🏷️ Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] **Update version** in package.json
- [ ] **Update CHANGELOG.md**
- [ ] **Run full test suite**
- [ ] **Build and verify**
- [ ] **Create release notes**
- [ ] **Publish to npm**
- [ ] **Create GitHub release**

## 📞 Communication

### Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Email**: info@webbycrown.com for private matters

### Response Times

- **Issues**: Within 48 hours
- **Pull Requests**: Within 72 hours
- **Discussions**: Within 24 hours

## 🙏 Recognition

Contributors will be:

- **Listed** in the README
- **Mentioned** in release notes
- **Credited** in the changelog
- **Invited** to the contributors team

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Advanced Fields! 🚀
