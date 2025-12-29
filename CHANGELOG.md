# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-29

### Added

- Initial release of Pompelmi Malware Scan GitHub Action
- Local scanning mode using pompelmi Node.js library (free, privacy-first)
- API scanning mode for serverless/hosted scanning (premium, optional)
- Support for scanning individual files or entire directories
- Automatic exclusion of `.git` and `node_modules` directories
- Verdict aggregation across multiple files (malicious > suspicious > clean)
- GitHub Actions job summary with scan results
- Configurable `fail_on_detection` option
- Outputs: `verdict` and `scanned_files`
- Comprehensive documentation (README, SECURITY, TERMS, CONTRIBUTING)
- MIT License

### Security

- API keys must be stored in GitHub Secrets
- Local mode processes all data within the runner (no network calls)
- API mode clearly documented as transmitting file contents

[1.0.0]: https://github.com/pompelmi/pompelmi-action/releases/tag/v1.0.0
