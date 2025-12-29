# Security Policy

## Reporting a Vulnerability

Please do not open public issues for security reports.

**Email:** security@pompelmi.io

Alternatively, you can use [GitHub Security Advisories](https://github.com/pompelmi/pompelmi-action/security/advisories) if enabled for this repository.

## Supported Versions

Only the latest major version tag (e.g., `v1`) is supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| v1.x    | :white_check_mark: |
| < 1.0   | :x:                |

## Security Best Practices

When using this action:

1. **Never commit secrets** - Always use GitHub Secrets for `api_key`
2. **Use local mode** when processing sensitive data that should not leave your infrastructure
3. **Review permissions** - Ensure the action only has necessary repository access
4. **Keep updated** - Use `@v1` to automatically get the latest security patches
5. **Validate sources** - Only use this action from the official `pompelmi/pompelmi-action` repository

## Known Limitations

- Scanning is heuristic-based and may not detect all malware variants
- Large files or directories may impact runner performance
- API mode depends on network connectivity and API availability
