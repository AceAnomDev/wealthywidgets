# Contributing to WealthyWidgets

Thank you for your interest in contributing! 🎉

## Development setup

```bash
git clone https://github.com/YOUR_USERNAME/wealthywidgets.git
cd wealthywidgets
npm install
```

## Project structure

```
wealthywidgets/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx          # Component
│   │   │   ├── Button.types.ts     # TypeScript interfaces
│   │   │   ├── Button.scss         # Styles
│   │   │   ├── Button.test.tsx     # Tests
│   │   │   └── index.ts            # Barrel export
│   │   └── ...
│   ├── styles/
│   │   └── _variables.scss         # Global SCSS tokens
│   └── index.ts                    # Public API
├── .github/
│   └── workflows/
│       └── ci.yml                  # Type check, test, build on every push/PR
├── docs/                           # Storybook static site (GitHub Pages)
└── ...
```

## Adding a new widget

1. Create a folder under `src/components/MyWidget/`
2. Add these files:
   - `MyWidget.types.ts` — prop interfaces and exported types
   - `MyWidget.scss` — scoped BEM styles using `_variables.scss`
   - `MyWidget.tsx` — React component with JSDoc examples
   - `MyWidget.test.tsx` — Jest + Testing Library tests
   - `index.ts` — barrel export
3. Export from `src/index.ts`
4. Document in `README.md`

### Widget checklist

- [ ] All props are typed and documented
- [ ] Component has a `displayName`
- [ ] Accessible: ARIA roles, keyboard support, focus management
- [ ] SCSS uses variables from `_variables.scss`
- [ ] Tests cover happy path, edge cases, and accessibility
- [ ] JSDoc `@example` blocks in the component file
- [ ] Storybook stories covering Default, variants, and edge cases

## Scripts

| Command              | Description                    |
|----------------------|--------------------------------|
| `npm run build`      | Build the library              |
| `npm test`           | Run all tests                  |
| `npm run test:watch` | Watch mode                     |
| `npm run test:coverage` | Coverage report             |
| `npm run lint`       | ESLint                         |
| `npm run lint:fix`   | ESLint with auto-fix           |
| `npm run type-check` | TypeScript type check          |
| `npm run storybook`  | *(requires separate: `npm install storybook @storybook/react-vite`)* |

## Commit conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(dropdown): add clearable prop
fix(modal): restore scroll on unmount
docs(readme): update ProgressBar examples
test(input): add validation message tests
chore(deps): update rollup to 4.x
```

## Pull Request process

1. Make sure `npm test` and `npm run build` pass locally.
2. Keep PRs focused — one feature/fix per PR.
3. Update `README.md` if you add or change a public API.
4. A maintainer will review and merge.

## Code style

- TypeScript strict mode is enabled — no `any` without justification.
- SCSS: BEM naming with `ww-` prefix, use variables from `_variables.scss`.
- React: functional components with hooks; use `forwardRef` for DOM-facing components.
- Accessibility first: every interactive element must be keyboard-reachable.