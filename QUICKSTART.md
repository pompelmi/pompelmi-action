# 🚀 Quick Start Guide

Get the Pompelmi Malware Scan Action running in 5 minutes!

## Step 1: Add to Your Workflow

Create `.github/workflows/security-scan.yml` in your repository:

```yaml
name: Security Scan
on: [push, pull_request]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pompelmi/pompelmi-action@v1
        with:
          path: .
          mode: local
```

## Step 2: Commit and Push

```bash
git add .github/workflows/security-scan.yml
git commit -m "Add malware scanning"
git push
```

## Step 3: Watch It Run

Go to your repository's **Actions** tab and watch the scan run!

---

## 📊 What Happens?

1. ✅ Action checks out your code
2. 🔍 Scans all files (excluding `.git` and `node_modules`)
3. 📋 Creates a job summary with results
4. ✅ Passes if clean, fails if malicious

## 🎯 Common Use Cases

### Scan Build Artifacts Only

```yaml
- name: Build
  run: npm run build

- name: Scan
  uses: pompelmi/pompelmi-action@v1
  with:
    path: dist/
```

### Don't Fail on Detection (Warn Only)

```yaml
- uses: pompelmi/pompelmi-action@v1
  with:
    path: .
    fail_on_detection: false
```

### Use API Mode (Premium)

```yaml
- uses: pompelmi/pompelmi-action@v1
  with:
    path: dist/
    mode: api
    api_base_url: https://api.pompelmi.io/v1
    api_key: ${{ secrets.POMPELMI_API_KEY }}
```

## 🔐 Security Tips

- ✅ Always use GitHub Secrets for API keys
- ✅ Use `local` mode for sensitive data
- ✅ Review scan results in job summaries
- ✅ Don't commit API keys to your repository

## 📖 Need More?

- [Full README](README.md) - Complete documentation
- [Examples](EXAMPLES.md) - More workflow examples
- [Contributing](CONTRIBUTING.md) - Development guide

## 🆘 Troubleshooting

### "Action not found"
Make sure the action is published and the tag exists: `pompelmi/pompelmi-action@v1`

### "Path not found"
Check that the path exists after previous steps. Use `ls -la` to debug:
```yaml
- run: ls -la dist/
- uses: pompelmi/pompelmi-action@v1
  with:
    path: dist/
```

### "API mode failing"
Ensure you've set the `POMPELMI_API_KEY` secret in repository settings.

## 🎉 That's It!

You're now scanning for malware in CI. Check the Actions tab for results!
