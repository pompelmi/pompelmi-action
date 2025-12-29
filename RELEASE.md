# Release Instructions

Follow these steps to create a new release of the action:

## 1. Pre-release Checklist

- [ ] All changes committed and tested
- [ ] `CHANGELOG.md` updated with new version
- [ ] `package.json` version bumped
- [ ] Run `npm run build` and commit `dist/`
- [ ] All documentation updated (README, etc.)

## 2. Create Git Tag

```bash
# For a new major/minor/patch version
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Update the major version tag (v1) to point to latest
git tag -fa v1 -m "Update v1 to latest release"
git push origin v1 --force
```

## 3. Create GitHub Release

1. Go to https://github.com/pompelmi/pompelmi-action/releases/new
2. Select the tag you just created (e.g., `v1.0.0`)
3. Title: `v1.0.0` (match the tag)
4. Description: Copy relevant section from `CHANGELOG.md`
5. Click "Publish release"

## 4. Version Tags

GitHub Actions users can reference the action using:

- `pompelmi/pompelmi-action@v1` - always points to latest v1.x release (recommended)
- `pompelmi/pompelmi-action@v1.0.0` - specific version (pinned)
- `pompelmi/pompelmi-action@main` - bleeding edge (not recommended)

## Important Notes

- **Always commit `dist/`** - GitHub Actions needs the bundled code
- **No workflows in action repo** - Keep `.github/workflows/` empty or non-existent per Marketplace rules
- **Moving tags** - Update `v1` tag after each release so users on `@v1` get updates automatically
- **Breaking changes** - Bump major version (v2, v3, etc.) for breaking changes

## Testing Before Release

Test the action in a separate repository:

```yaml
# In a test repo's .github/workflows/test.yml
- uses: your-username/pompelmi-action@your-branch
  with:
    path: .
    mode: local
```

## Marketplace Publishing

The action will automatically appear in GitHub Marketplace after:
1. Repository is public
2. First release tag is created
3. `action.yml` exists at repository root
4. Repository has a description and topics
