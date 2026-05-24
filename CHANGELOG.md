# Changelog

All notable changes to WealthyWidgets are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- `ActivityWidget` — scrollable event timeline with relative timestamps, status dots, "show more" collapse, and `onAiGenerate` AI prompt bar
- `WeatherWidget` — current conditions card with condition-driven gradient backgrounds, detail stats (humidity, wind, UV), 7-day forecast strip, and `onAiGenerate` AI prompt bar
- `CodeWidget` — dark-themed code block with macOS toolbar chrome, copy button, line numbers, line highlighting, inline editable mode, and `onAiGenerate` AI snippet generation
- `Input.onAiGenerate` — inline ✦ AI generation button added to the existing `Input` widget; returns a string to replace the field value
- `Input.aiLoading` — loading state prop for the new AI button
- `.github/workflows/ci.yml` — matrix test on Node 18 + 20, coverage upload
- `.github/workflows/release.yml` — automated npm publish on git tags
- `.github/ISSUE_TEMPLATE/bug_report.yml` — structured bug report form
- `.github/ISSUE_TEMPLATE/feature_request.yml` — feature request form
- `.github/PULL_REQUEST_TEMPLATE.md` — PR checklist with component requirements
- `.prettierrc` + `.prettierignore` — Prettier config for consistent formatting
- `.editorconfig` — cross-editor whitespace / line-ending rules
- `.vscode/settings.json` — recommended editor config for contributors
- `CHANGELOG.md` — this file
- `SECURITY.md` — responsible disclosure policy

---

## [1.0.1] — 2026-01-15

### Fixed
- `Dropdown` — fixed keyboard navigation skipping disabled options
- `Modal` — resolved focus-trap leak when `isOpen` toggled rapidly

### Changed
- `ProgressBar` — `animated` prop now correctly maps to a CSS animation class instead of an inline style (breaking: remove `animated` from `<style>` if overriding)

---

## [1.0.0] — 2025-12-01

### Added
- Initial release with `Button`, `Card`, `Input`, `Modal`, `Dropdown`, `ProgressBar`, `Tooltip`
- Full TypeScript definitions
- SCSS variable system via `src/styles/_variables.scss`
- Jest + React Testing Library test suite (>80% coverage)
- Rollup dual-format build (CJS + ESM) with extracted `styles.css`
- MIT licence

[Unreleased]: https://github.com/AceAnomDev/wealthywidgets/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/AceAnomDev/wealthywidgets/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/AceAnomDev/wealthywidgets/releases/tag/v1.0.0
