# 📋 Publishing Checklist

Complete this checklist before publishing to GitHub Marketplace.

## ✅ Pre-Publication

- [x] All files created and committed
- [x] `dist/index.js` built and committed (958KB)
- [x] TypeScript compiles without errors
- [x] `action.yml` has all required fields
- [x] README.md has usage examples
- [x] LICENSE file present (MIT)
- [x] TERMS.md present
- [x] SECURITY.md present
- [ ] Code reviewed and tested

## 🔧 Repository Setup

- [ ] Create GitHub repository: `https://github.com/pompelmi/pompelmi-action`
- [ ] Set repository to **Public**
- [ ] Add repository description: "GitHub Action for malware scanning using pompelmi"
- [ ] Add topics: `github-actions`, `security`, `malware`, `scanning`, `pompelmi`, `ci-cd`
- [ ] Initialize repository with README (can skip if pushing existing)
- [ ] Ensure NO `.github/workflows/` directory exists (Marketplace requirement)

## 📦 Initial Commit

```bash
cd /Users/tommy/pompelmi-action
git init
git add .
git commit -m "Initial commit: Pompelmi Malware Scan Action v1.0.0"
git branch -M main
git remote add origin https://github.com/pompelmi/pompelmi-action.git
git push -u origin main
```

## 🏷️ Create Release

### 1. Create Tags

```bash
# Create version tag
git tag -a v1.0.0 -m "Release v1.0.0: Initial release with local and API modes"
git push origin v1.0.0

# Create major version tag (recommended)
git tag -a v1 -m "v1 - Latest stable release"
git push origin v1
```

### 2. GitHub Release

- [ ] Go to `https://github.com/pompelmi/pompelmi-action/releases/new`
- [ ] Choose tag: `v1.0.0`
- [ ] Release title: `v1.0.0 - Initial Release`
- [ ] Description: Copy from CHANGELOG.md
- [ ] Check: "Set as the latest release"
- [ ] Click: "Publish release"

### 3. Verify Release

- [ ] Release appears in Releases page
- [ ] Tag `v1.0.0` exists
- [ ] Tag `v1` exists and points to `v1.0.0`

## 🎪 Marketplace Publication

### Automatic Publication
Once you create the first release, GitHub will automatically:
- Detect the `action.yml` file
- List the action in GitHub Marketplace
- Make it searchable

### Manual Steps (if needed)
- [ ] Go to repository Settings → General
- [ ] Scroll to "GitHub Actions permissions"
- [ ] Ensure "Allow all actions and reusable workflows" is selected
- [ ] Go to Marketplace (will appear after first release)
- [ ] Verify listing appears correctly

## 🧪 Testing

### Test in Separate Repository

Create a test repository and add this workflow:

```yaml
# .github/workflows/test-action.yml
name: Test Pompelmi Action
on: [push]

jobs:
  test-local:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Test local mode
        uses: pompelmi/pompelmi-action@v1
        with:
          path: .
          mode: local
      - name: Verify outputs
        run: |
          echo "Test passed!"
```

### What to Test
- [ ] Action runs without errors
- [ ] Scans complete successfully
- [ ] Job summary appears
- [ ] Outputs are set correctly
- [ ] Local mode works
- [ ] (Optional) API mode works with test credentials

## 🔍 Final Verification

- [ ] Action appears in Marketplace: `https://github.com/marketplace/actions/pompelmi-malware-scan`
- [ ] README renders correctly on Marketplace
- [ ] Badge/icon appears (shield, orange)
- [ ] Search finds the action (search: "pompelmi malware scan")
- [ ] Test workflow completes successfully
- [ ] Tags `v1` and `v1.0.0` both work:
  - `uses: pompelmi/pompelmi-action@v1`
  - `uses: pompelmi/pompelmi-action@v1.0.0`

## 📣 Announcement (Optional)

After successful publication:
- [ ] Tweet/announce on social media
- [ ] Post in relevant communities (r/github, etc.)
- [ ] Update main pompelmi repository to reference the action
- [ ] Create example repositories showing usage

## 🔄 Post-Publication

- [ ] Monitor GitHub Issues for bug reports
- [ ] Watch Discussions for questions
- [ ] Set up repository notifications
- [ ] Plan for v1.1.0 improvements (see roadmap)

## 🚨 Critical Reminders

1. **MUST commit `dist/`** - Action won't work without it!
2. **NO workflows** in action repo - Marketplace requirement
3. **Public repo** - Must be public to list on Marketplace
4. **Moving tag v1** - Update after each release for users on `@v1`
5. **Test first** - Always test in separate repo before promoting

## 📊 Success Metrics

After 24 hours:
- [ ] Action has been successfully run at least once
- [ ] No critical issues reported
- [ ] Marketplace listing is live

After 1 week:
- [ ] Gather user feedback
- [ ] Plan improvements based on usage
- [ ] Consider adding features for v1.1.0

## ✨ You're Ready!

Once all boxes are checked, your action is ready for the world! 🎉

---

**Current Status:** All code complete ✅ | Repository setup pending ⏳
