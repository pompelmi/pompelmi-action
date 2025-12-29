<div align="center">

<a href="https://github.com/pompelmi/pompelmi-action" target="_blank" rel="noopener noreferrer">
  <img src="https://raw.githubusercontent.com/pompelmi/pompelmi/refs/heads/main/assets/logo.svg" alt="pompelmi logo" width="360" />
</a>

# Pompelmi Malware Scan (GitHub Action)

[![GitHub Action](https://img.shields.io/badge/GitHub-Action-2088FF?logo=github-actions&logoColor=white)](https://github.com/marketplace/actions/pompelmi-malware-scan)
[![npm version](https://img.shields.io/npm/v/pompelmi?label=version&color=0a7ea4&logo=npm)](https://www.npmjs.com/package/pompelmi)
[![CI Status](https://img.shields.io/github/actions/workflow/status/pompelmi/pompelmi-action/ci.yml?branch=main&label=CI&logo=github)](https://github.com/pompelmi/pompelmi-action/actions)
[![License: MIT](https://img.shields.io/npm/l/pompelmi?color=blue)](https://github.com/pompelmi/pompelmi-action/blob/main/LICENSE)
[![node](https://img.shields.io/badge/node-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org)

[![GitHub stars](https://img.shields.io/github/stars/pompelmi/pompelmi?style=social)](https://github.com/pompelmi/pompelmi/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/pompelmi/pompelmi?style=social)](https://github.com/pompelmi/pompelmi/network/members)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/pompelmi/pompelmi-action/blob/main/CONTRIBUTING.md)

Scan files/folders in CI using **pompelmi** in-process (local mode) or via an optional Premium API (api mode).

**Privacy-first** • **Zero-config** • **TypeScript-ready** • **Serverless-friendly**

[📚 Documentation](https://pompelmi.github.io/pompelmi/) • [🚀 Quick Start](#modes) • [💬 Discussions](https://github.com/pompelmi/pompelmi-action/discussions) • [☁️ Cloud API](https://rapidapi.com/SonoTommy/api/pompelmi-malware-scanner)

</div>

---

## ⚡ Why Use This Action?

<table>
<tr>
<td align="center">🔒<br><b>Privacy-First</b></td>
<td align="center">⚡<br><b>Fast & Efficient</b></td>
<td align="center">🧩<br><b>Easy Integration</b></td>
</tr>
<tr>
<td>All scanning happens in-process. No cloud calls, no data leaks. Your files never leave your infrastructure.</td>
<td>In-process scanning with zero network latency. Configurable concurrency for high-throughput scenarios.</td>
<td>Drop-in GitHub Action with zero-config defaults. Get started in under 5 minutes.</td>
</tr>
</table>

## Modes

- **Local (free):** runs inside the runner (no outbound calls) - privacy-first, processes everything in-memory
- **API (optional):** sends files to a configured endpoint using an API key - serverless-ready, ideal for teams without heavy native tooling

## Usage (Local)

```yaml
- uses: pompelmi/pompelmi-action@v1
  with:
    path: dist/
    mode: local
```

## Usage (API)

```yaml
- uses: pompelmi/pompelmi-action@v1
  with:
    path: upload.zip
    mode: api
    api_base_url: https://YOUR_API_BASE
    api_key: ${{ secrets.POMPELMI_API_KEY }}
```

## Complete Workflow Example

```yaml
name: Security Scan
on: [push, pull_request]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build artifacts
        run: npm run build
      
      - name: Scan for malware
        uses: pompelmi/pompelmi-action@v1
        with:
          path: dist/
          mode: local
          fail_on_detection: true
```

## Inputs

| Name | Required | Default | Description |
|------|----------|---------|-------------|
| `path` | yes | - | File or directory to scan |
| `mode` | no | `local` | Scan mode: `local` or `api` |
| `api_base_url` | no* | - | API endpoint URL (required if `mode=api`) |
| `api_key` | no* | - | API authentication key (required if `mode=api`, use secrets) |
| `fail_on_detection` | no | `true` | Fail the workflow if malicious content is detected |

\* Required when `mode=api`

## Outputs

| Name | Description |
|------|-------------|
| `verdict` | Scan result: `clean`, `suspicious`, `malicious`, or `error` |
| `scanned_files` | Number of files scanned |

## Security & Privacy Notes

- **Local mode** processes all files within the GitHub Actions runner. No data leaves your environment.
- **API mode** transmits file contents to the configured endpoint for analysis. Ensure you have the rights to upload the scanned content and trust the API provider.
- Always use GitHub Secrets for storing `api_key` - never commit it to your repository.
- Files in `.git` and `node_modules` directories are automatically excluded from scanning.

## Verdict Priority

When scanning multiple files, the action aggregates results using this priority:
1. `malicious` (highest priority - any malicious file fails the scan)
2. `suspicious` (medium priority)
3. `clean` (lowest priority - all files must be clean)
4. `error` (indicates scan failures)

## Supported Platforms

- ✅ Linux (ubuntu-latest, ubuntu-22.04, ubuntu-20.04)
- ✅ macOS (macos-latest, macos-13, macos-12)
- ✅ Windows (windows-latest, windows-2022, windows-2019)

## 🏆 Community & Recognition

<div align="center">

[![Featured in Detection Engineering Weekly](https://img.shields.io/badge/Featured%20in-Detection%20Engineering%20Weekly-0A84FF?style=for-the-badge&logo=substack)](https://www.detectionengineering.net/p/det-eng-weekly-issue-124-the-defcon)
[![Featured in Node Weekly](https://img.shields.io/badge/Featured%20in-Node%20Weekly-FF6600?style=for-the-badge&logo=node.js)](https://nodeweekly.com/issues/594)
[![Featured in Bytes](https://img.shields.io/badge/Featured%20in-Bytes-111111?style=for-the-badge)](https://bytes.dev/archives/429)

</div>

pompelmi has been featured in leading developer publications and is trusted by teams worldwide for secure file handling.

## License

MIT. See [LICENSE](LICENSE).

## 📞 Support

- 🐛 [Report Issues](https://github.com/pompelmi/pompelmi-action/issues)
- 💬 [GitHub Discussions](https://github.com/pompelmi/pompelmi-action/discussions)
- 📖 [Pompelmi Documentation](https://pompelmi.github.io/pompelmi/)
- 🔒 [Security Policy](SECURITY.md)

## Related Projects

- [pompelmi](https://github.com/pompelmi/pompelmi) - The core Node.js/TypeScript malware detection toolkit
- [Cloud API](https://rapidapi.com/SonoTommy/api/pompelmi-malware-scanner) - Official hosted scanning API

---

<div align="center">

Made with ❤️ by the [pompelmi](https://github.com/pompelmi) team

[![GitHub stars](https://img.shields.io/github/stars/pompelmi/pompelmi?style=social)](https://github.com/pompelmi/pompelmi/stargazers)
[![Twitter Follow](https://img.shields.io/twitter/follow/pompelmi?style=social)](https://twitter.com/pompelmi)

[⬆ Back to top](#pompelmi-malware-scan-github-action)

</div>
