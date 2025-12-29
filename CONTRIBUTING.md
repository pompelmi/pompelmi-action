# Contributing

Thank you for your interest in contributing to Pompelmi Malware Scan Action!

## Development Setup

### Prerequisites

- Node.js 20+
- npm 9+

### Getting Started

```bash
# Clone the repository
git clone https://github.com/pompelmi/pompelmi-action.git
cd pompelmi-action

# Install dependencies
npm install

# Build the action
npm run build

# The bundled output will be in dist/index.js
```

## Development Workflow

1. Make your changes in `src/`
2. Build with `npm run build`
3. Commit both `src/` and `dist/` changes (dist/ must be committed for the action to work)
4. Test locally or in a test repository

## Pull Requests

- Keep changes small and focused
- Include tests or manual testing steps when applicable
- Update README.md if you change behavior or add features
- Update CHANGELOG.md with your changes
- Ensure `npm run build` completes without errors
- Make sure `dist/` is updated and committed

## Code Style

- Follow existing TypeScript conventions
- Use meaningful variable names
- Add comments for complex logic
- Run TypeScript compiler to catch type errors

## Testing

Currently, testing is manual:

1. Create a test workflow in a separate repository
2. Reference your fork/branch: `uses: your-username/pompelmi-action@your-branch`
3. Verify both local and API modes work as expected
4. Check job summaries and outputs

## Commit Messages

Use clear, descriptive commit messages:

- ✅ "Add support for custom exclude patterns"
- ✅ "Fix verdict aggregation for empty directories"
- ❌ "Update code"
- ❌ "Fix bug"

## Questions?

Open a [Discussion](https://github.com/pompelmi/pompelmi-action/discussions) or comment on an existing issue.
