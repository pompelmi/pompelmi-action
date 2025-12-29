# 📖 File Guide - What Each File Does

Quick reference for understanding the purpose of each file in this repository.

## 🎯 Essential Action Files (Required)

### `action.yml` ⭐
**What:** GitHub Action metadata and interface definition  
**Purpose:** Tells GitHub how to run the action, what inputs it accepts, and what outputs it provides  
**Key Content:** Input/output definitions, branding, Node.js runtime specification  
**Edit When:** Adding/changing inputs or outputs

### `dist/index.js` ⭐
**What:** Bundled JavaScript action (958KB)  
**Purpose:** The actual code that runs when someone uses the action  
**Key Content:** Compiled TypeScript + all dependencies bundled together  
**Edit When:** Never directly - regenerate with `npm run build`  
**⚠️ MUST BE COMMITTED:** GitHub Actions can't install dependencies

### `package.json` ⭐
**What:** Node.js project configuration  
**Purpose:** Lists dependencies and build scripts  
**Key Content:** Dependencies (@actions/core, pompelmi), build scripts  
**Edit When:** Adding dependencies or changing build process

## 💻 Source Code

### `src/index.ts` ⭐
**What:** Main action implementation (TypeScript)  
**Purpose:** Core logic for scanning files, handling modes, setting outputs  
**Key Content:** 
- `scanLocal()` - Local mode implementation
- `scanAPI()` - API mode implementation  
- `run()` - Main entry point
- File traversal, verdict aggregation, error handling

**Edit When:** Changing action behavior or adding features

### `tsconfig.json`
**What:** TypeScript compiler configuration  
**Purpose:** Tells TypeScript how to compile `src/` to JavaScript  
**Edit When:** Changing TypeScript settings or target version

## 📚 User-Facing Documentation

### `README.md` ⭐ (Most Important)
**What:** Main documentation  
**Purpose:** First thing users see - explains what the action does and how to use it  
**Key Content:** Quick examples, inputs/outputs table, security notes  
**Edit When:** Changing features or usage patterns

### `QUICKSTART.md`
**What:** 5-minute getting started guide  
**Purpose:** Help users get running immediately  
**Key Content:** Minimal example, common use cases, troubleshooting  
**Edit When:** Improving onboarding experience

### `EXAMPLES.md`
**What:** Collection of real-world workflow examples  
**Purpose:** Copy-paste solutions for common scenarios  
**Key Content:** 8+ complete workflow files for different use cases  
**Edit When:** Adding new example scenarios

## 📋 Project Management

### `CHANGELOG.md`
**What:** Version history and changes  
**Purpose:** Track what changed between versions  
**Key Content:** Version numbers, dates, changes grouped by type  
**Edit When:** Before each release

### `CONTRIBUTING.md`
**What:** Contributor guidelines  
**Purpose:** Help developers contribute to the project  
**Key Content:** Setup instructions, PR guidelines, code style  
**Edit When:** Changing development workflow

### `RELEASE.md`
**What:** Release process documentation  
**Purpose:** Step-by-step guide for publishing new versions  
**Key Content:** Git tagging, GitHub release creation, testing  
**Edit When:** Improving release process

### `PUBLISHING_CHECKLIST.md`
**What:** Pre-publication checklist  
**Purpose:** Ensure nothing is forgotten before initial publish  
**Key Content:** Step-by-step tasks from code to Marketplace  
**Edit When:** Adding new pre-publication requirements

## 🔐 Legal & Security

### `LICENSE`
**What:** MIT License text  
**Purpose:** Define how others can use the code  
**Key Content:** Standard MIT license with copyright  
**Edit When:** Rarely (license changes)

### `TERMS.md`
**What:** Terms of use  
**Purpose:** Set expectations and limit liability  
**Key Content:** "AS IS" disclaimer, privacy notes, acceptable use  
**Edit When:** Adding new modes or changing functionality

### `SECURITY.md`
**What:** Security policy  
**Purpose:** How to report vulnerabilities and security best practices  
**Key Content:** Reporting email, supported versions, best practices  
**Edit When:** Changing security contact or supported versions

## 📊 Project Information

### `MVP_COMPLETE.md`
**What:** MVP completion summary  
**Purpose:** Document what was built and what's left to do  
**Key Content:** Feature list, next steps, status checklist  
**Edit When:** After MVP, update for v1.1, v2, etc.

### `PROJECT_OVERVIEW.md`
**What:** Comprehensive project overview  
**Purpose:** High-level understanding of entire project  
**Key Content:** Architecture, decisions, future plans, metrics  
**Edit When:** Major changes or new versions

## 🔧 Configuration Files

### `.gitignore`
**What:** Git ignore rules  
**Purpose:** Tell Git which files to exclude from version control  
**Key Content:** `node_modules/`, `lib/` (but NOT `dist/`)  
**Edit When:** Adding new generated files to ignore

### `package-lock.json`
**What:** Dependency version lock file  
**Purpose:** Ensure consistent dependency versions across installs  
**Key Content:** Exact versions of all dependencies and sub-dependencies  
**Edit When:** Automatically updated by npm

## 📦 Build Artifacts (Generated)

### `dist/index.js.map`
**What:** Source map for debugging  
**Purpose:** Maps bundled code back to original TypeScript  
**Edit When:** Never - regenerated by build

### `dist/sourcemap-register.js`
**What:** Source map loader  
**Purpose:** Enables source maps in Node.js  
**Edit When:** Never - added by ncc bundler

### `dist/licenses.txt`
**What:** Dependency license information  
**Purpose:** Legal compliance - list all dependency licenses  
**Edit When:** Never - regenerated by ncc

### `lib/` (Generated, Not Committed)
**What:** TypeScript compilation output  
**Purpose:** Intermediate files before bundling  
**Edit When:** Never - regenerated by `tsc`

## 🗂️ Quick Reference

| Want to... | Edit this file |
|------------|----------------|
| Change action behavior | `src/index.ts` |
| Add/remove inputs | `action.yml` |
| Update documentation | `README.md` |
| Add example | `EXAMPLES.md` |
| Add dependency | `package.json` |
| Prepare for release | `PUBLISHING_CHECKLIST.md` |
| Change security policy | `SECURITY.md` |
| Update license | `LICENSE` |

## 🔄 Build Workflow

Understanding how files relate:

```
src/index.ts
    ↓ [tsc compile]
lib/index.js
    ↓ [ncc bundle]
dist/index.js  ← This runs in GitHub Actions
```

## ⚠️ Critical Files (Never Delete)

1. `action.yml` - Action won't work without it
2. `dist/index.js` - Action won't run without it
3. `LICENSE` - Legal requirement
4. `README.md` - Users need documentation
5. `package.json` - Can't build without it

## 📝 Optional Files (Can Delete if Needed)

These are helpful but not strictly required:
- `EXAMPLES.md`
- `QUICKSTART.md`
- `MVP_COMPLETE.md`
- `PROJECT_OVERVIEW.md`
- `RELEASE.md`
- `PUBLISHING_CHECKLIST.md`

## 🎯 For Different Audiences

### For Users
Start with: `README.md` → `QUICKSTART.md` → `EXAMPLES.md`

### For Contributors  
Start with: `CONTRIBUTING.md` → `src/index.ts` → `action.yml`

### For Maintainers
Start with: `RELEASE.md` → `PUBLISHING_CHECKLIST.md` → `CHANGELOG.md`

---

**Tip:** Most day-to-day work happens in `src/index.ts` and `README.md`. Everything else supports these two files!
