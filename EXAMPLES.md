# Example Workflows

Copy these examples into your project's `.github/workflows/` directory.

## Basic Local Scan

Scan your build artifacts after building:

```yaml
# .github/workflows/security-scan.yml
name: Security Scan

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build project
        run: npm run build
      
      - name: Scan for malware
        uses: pompelmi/pompelmi-action@v1
        with:
          path: dist/
          mode: local
          fail_on_detection: true
```

## Scan Uploaded Files

Scan files before releasing:

```yaml
# .github/workflows/scan-release.yml
name: Scan Release Artifacts

on:
  release:
    types: [created]

jobs:
  scan-artifacts:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Download release assets
        run: |
          # Your download logic here
          gh release download ${{ github.event.release.tag_name }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Scan downloaded files
        uses: pompelmi/pompelmi-action@v1
        with:
          path: .
          mode: local
```

## API Mode (Premium)

Use the hosted API for scanning:

```yaml
# .github/workflows/api-scan.yml
name: API Malware Scan

on:
  push:
    branches: [main]

jobs:
  api-scan:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Build
        run: npm run build
      
      - name: Scan with API
        uses: pompelmi/pompelmi-action@v1
        with:
          path: dist/
          mode: api
          api_base_url: https://api.pompelmi.io/v1
          api_key: ${{ secrets.POMPELMI_API_KEY }}
          fail_on_detection: true
```

## Scheduled Scans

Run periodic scans of your repository:

```yaml
# .github/workflows/scheduled-scan.yml
name: Weekly Security Scan

on:
  schedule:
    # Run every Monday at 9 AM UTC
    - cron: '0 9 * * 1'
  workflow_dispatch: # Allow manual triggers

jobs:
  scheduled-scan:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Scan entire repository
        uses: pompelmi/pompelmi-action@v1
        with:
          path: .
          mode: local
          fail_on_detection: false  # Don't fail scheduled scans
      
      - name: Create issue if malicious
        if: steps.scan.outputs.verdict == 'malicious'
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: '🚨 Malware detected in scheduled scan',
              body: 'The scheduled security scan detected malicious content. Please investigate immediately.',
              labels: ['security', 'urgent']
            })
```

## Multi-Platform Scan

Scan on multiple operating systems:

```yaml
# .github/workflows/multi-platform.yml
name: Multi-Platform Scan

on: [push, pull_request]

jobs:
  scan:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Build
        run: npm run build
      
      - name: Scan
        uses: pompelmi/pompelmi-action@v1
        with:
          path: dist/
          mode: local
```

## Scan Only Suspicious Files

Only fail on malicious, warn on suspicious:

```yaml
# .github/workflows/warn-suspicious.yml
name: Scan with Warnings

on: [push]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Build
        run: npm run build
      
      - name: Scan for malware
        id: scan
        uses: pompelmi/pompelmi-action@v1
        with:
          path: dist/
          mode: local
          fail_on_detection: true
      
      - name: Comment on PR if suspicious
        if: github.event_name == 'pull_request' && steps.scan.outputs.verdict == 'suspicious'
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: '⚠️ Suspicious files detected. Please review the scan results.'
            })
```

## Use Scan Results in Subsequent Steps

Access outputs for custom logic:

```yaml
# .github/workflows/custom-logic.yml
name: Custom Scan Logic

on: [push]

jobs:
  scan-and-notify:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Scan
        id: malware_scan
        uses: pompelmi/pompelmi-action@v1
        with:
          path: .
          mode: local
          fail_on_detection: false
      
      - name: Print results
        run: |
          echo "Verdict: ${{ steps.malware_scan.outputs.verdict }}"
          echo "Files scanned: ${{ steps.malware_scan.outputs.scanned_files }}"
      
      - name: Send Slack notification
        if: steps.malware_scan.outputs.verdict != 'clean'
        uses: slackapi/slack-github-action@v1
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK }}
          payload: |
            {
              "text": "⚠️ Security scan found issues",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Verdict:* ${{ steps.malware_scan.outputs.verdict }}\n*Files:* ${{ steps.malware_scan.outputs.scanned_files }}"
                  }
                }
              ]
            }
```

## Setting Up API Key Secret

To use API mode, add your API key to GitHub Secrets:

1. Go to your repository settings
2. Navigate to **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `POMPELMI_API_KEY`
5. Value: Your API key from pompelmi.io
6. Click **Add secret**

Then reference it in workflows as `${{ secrets.POMPELMI_API_KEY }}`
