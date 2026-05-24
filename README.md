<div align="center">

# 🧩 wealthywidgets

**A production-ready React component library with AI-powered generation built in.**

[![CI](https://github.com/AceAnomDev/wealthywidgets/actions/workflows/ci.yml/badge.svg)](https://github.com/AceAnomDev/wealthywidgets/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/wealthywidgets.svg)](https://www.npmjs.com/package/wealthywidgets)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-blue.svg)](https://www.typescriptlang.org/)

</div>

---

## ✨ What's inside

| Component        | Description                                                          | AI-powered |
| ---------------- | -------------------------------------------------------------------- | :--------: |
| `Button`         | Interactive element with variants, sizes, icons, and loading state   |            |
| `Card`           | Flexible content container with image, header, body, and actions     |            |
| `Input`          | Text field with icon, validation, hint, and **inline AI generation** |     ✦      |
| `Modal`          | Accessible dialog with backdrop, keyboard handling, and size presets |            |
| `Dropdown`       | Single / multi-select with search and option descriptions            |            |
| `ProgressBar`    | Status-coloured progress indicator with label and striped mode       |            |
| `Tooltip`        | Lightweight hover hint with placement and variant options            |            |
| `ActivityWidget` | Scrollable event timeline with live AI feed generation               |     ✦      |
| `WeatherWidget`  | Current conditions + 7-day forecast card with AI data generation     |     ✦      |
| `CodeWidget`     | Syntax-highlighted code block with editing and AI snippet generation |     ✦      |

Every widget is:

- ✅ **Independent** — import only what you need, zero forced bundle
- ✅ **Accessible** — ARIA roles, keyboard nav, focus traps where needed
- ✅ **Fully typed** — complete TypeScript definitions for props and slots
- ✅ **Tested** — Jest + React Testing Library
- ✅ **Customisable** — props + SCSS variables

---

## 📦 Installation

```bash
npm install wealthywidgets
# or
yarn add wealthywidgets
# or
pnpm add wealthywidgets
```

Add the styles once at the root of your app:

```tsx
import 'wealthywidgets/dist/styles.css';
```

---

## 🚀 Quick Start

```tsx
import { Button, Card, Input } from 'wealthywidgets';
import 'wealthywidgets/dist/styles.css';

export default function App() {
  return (
    <Card
      title="Welcome"
      description="Start building with WealthyWidgets."
      actions={<Button variant="primary">Get Started</Button>}
    />
  );
}
```

---

## 📖 Components

### Button

```tsx
import { Button } from 'wealthywidgets';

// Variants: primary | secondary | outline | ghost | danger | success
// Sizes:    xs | sm | md | lg | xl

<Button variant="primary" size="md" onClick={handleSave}>Save</Button>
<Button variant="outline" loading>Saving…</Button>
<Button variant="danger" rounded leftIcon={<TrashIcon />}>Delete</Button>
```

| Prop        | Type            | Default     | Description                       |
| ----------- | --------------- | ----------- | --------------------------------- |
| `variant`   | `ButtonVariant` | `'primary'` | Visual style                      |
| `size`      | `ButtonSize`    | `'md'`      | Size preset                       |
| `loading`   | `boolean`       | `false`     | Show spinner, disable interaction |
| `leftIcon`  | `ReactNode`     | —           | Icon before the label             |
| `rightIcon` | `ReactNode`     | —           | Icon after the label              |
| `fullWidth` | `boolean`       | `false`     | Stretch to container              |
| `rounded`   | `boolean`       | `false`     | Pill shape                        |

---

### Card

```tsx
import { Card } from 'wealthywidgets';

<Card
  title="Article Title"
  subtitle="Technology"
  imageSrc="/cover.jpg"
  imageAlt="Cover photo"
  description="A brief summary of the article."
  variant="elevated"
  clickable
  onClick={() => navigate('/article')}
  actions={<Button size="sm">Read more</Button>}
/>;
```

| Prop               | Type                                    | Default     | Description                |
| ------------------ | --------------------------------------- | ----------- | -------------------------- |
| `title`            | `string`                                | —           | Card heading               |
| `subtitle`         | `string`                                | —           | Sub-heading                |
| `imageSrc`         | `string`                                | —           | Header image URL           |
| `imageAspectRatio` | `string`                                | `'16/9'`    | CSS aspect ratio           |
| `description`      | `string`                                | —           | Body text                  |
| `actions`          | `ReactNode`                             | —           | Footer slot (buttons etc.) |
| `headerExtra`      | `ReactNode`                             | —           | Top-right header slot      |
| `variant`          | `'default' \| 'elevated' \| 'outlined'` | `'default'` | Visual variant             |
| `noPadding`        | `boolean`                               | `false`     | Remove body padding        |
| `clickable`        | `boolean`                               | `false`     | Add hover/pointer styles   |

---

### Input ✦

The Input widget supports **AI-powered content generation** via `onAiGenerate`. When provided, a ✦ button appears inside the field. Clicking it calls your handler with the current value as a prompt.

```tsx
import { Input } from 'wealthywidgets';

// Basic
<Input label="Email" type="email" placeholder="you@example.com" />

// Validation
<Input
  label="Username"
  status="error"
  message="Username already taken"
  value={username}
  onChange={e => setUsername(e.target.value)}
/>

// ✦ AI-powered autocomplete
<Input
  label="Product description"
  placeholder="Start typing or click ✦ to generate…"
  value={desc}
  onChange={e => setDesc(e.target.value)}
  onAiGenerate={async (prompt) => {
    const result = await myAI.complete(prompt);
    return result; // returned string replaces the field value
  }}
  aiLoading={loading}
/>
```

| Prop           | Type                                          | Default     | Description                         |
| -------------- | --------------------------------------------- | ----------- | ----------------------------------- |
| `label`        | `string`                                      | —           | Field label                         |
| `hint`         | `string`                                      | —           | Helper text below field             |
| `message`      | `string`                                      | —           | Validation message                  |
| `status`       | `InputStatus`                                 | `'default'` | `'error' \| 'success' \| 'warning'` |
| `leftIcon`     | `ReactNode`                                   | —           | Leading icon                        |
| `rightElement` | `ReactNode`                                   | —           | Trailing element                    |
| `size`         | `'sm' \| 'md' \| 'lg'`                        | `'md'`      | Size preset                         |
| `fullWidth`    | `boolean`                                     | `false`     | Stretch to container                |
| `onAiGenerate` | `(prompt: string) => Promise<string \| void>` | —           | AI generate handler                 |
| `aiLoading`    | `boolean`                                     | `false`     | Loading state on AI button          |

---

### Modal

```tsx
import { Modal, Button } from 'wealthywidgets';

<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Confirm deletion"
  description="This action cannot be undone."
  size="sm"
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </>
  }
>
  <p>Are you sure you want to delete this item?</p>
</Modal>;
```

| Prop                   | Type                                     | Default | Description                  |
| ---------------------- | ---------------------------------------- | ------- | ---------------------------- |
| `isOpen`               | `boolean`                                | —       | Visibility toggle            |
| `onClose`              | `() => void`                             | —       | Close handler                |
| `title`                | `string`                                 | —       | Dialog heading               |
| `description`          | `string`                                 | —       | Sub-heading                  |
| `footer`               | `ReactNode`                              | —       | Action buttons               |
| `size`                 | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`  | Width preset                 |
| `disableBackdropClose` | `boolean`                                | `false` | Prevent backdrop-click close |
| `hideCloseButton`      | `boolean`                                | `false` | Hide × button                |

---

### Dropdown

```tsx
import { Dropdown } from 'wealthywidgets';

const options = [
  { value: 'react', label: 'React', description: 'UI library' },
  { value: 'vue', label: 'Vue', description: 'Progressive framework' },
  { value: 'svelte', label: 'Svelte', icon: <SvelteIcon /> },
];

// Single select
<Dropdown
  label="Framework"
  options={options}
  value={selected}
  onChange={val => setSelected(val as string)}
  searchable
  placeholder="Choose framework…"
/>

// Multi-select
<Dropdown
  options={options}
  multiple
  value={selections}
  onChange={vals => setSelections(vals as string[])}
/>
```

| Prop          | Type                 | Default | Description              |
| ------------- | -------------------- | ------- | ------------------------ |
| `options`     | `DropdownOption[]`   | —       | Available options        |
| `value`       | `string \| string[]` | —       | Selected value(s)        |
| `onChange`    | `(value) => void`    | —       | Selection change handler |
| `multiple`    | `boolean`            | `false` | Enable multi-select      |
| `searchable`  | `boolean`            | `false` | Show search field        |
| `placeholder` | `string`             | —       | Empty-state text         |
| `label`       | `string`             | —       | Field label              |
| `disabled`    | `boolean`            | `false` | Disable control          |
| `fullWidth`   | `boolean`            | `false` | Stretch to container     |

---

### ProgressBar

```tsx
import { ProgressBar } from 'wealthywidgets';

<ProgressBar value={65} />
<ProgressBar value={90} status="danger" showLabel title="Disk usage" />
<ProgressBar value={40} status="info" striped showLabel labelPosition="right" />
```

| Prop            | Type                           | Default     | Description                                    |
| --------------- | ------------------------------ | ----------- | ---------------------------------------------- |
| `value`         | `number`                       | —           | Progress 0–100                                 |
| `max`           | `number`                       | `100`       | Maximum value                                  |
| `status`        | `ProgressBarStatus`            | `'default'` | `'success' \| 'warning' \| 'danger' \| 'info'` |
| `size`          | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'`      | Bar thickness                                  |
| `showLabel`     | `boolean`                      | `false`     | Display percentage                             |
| `labelPosition` | `'right' \| 'top' \| 'inside'` | `'right'`   | Label placement                                |
| `title`         | `string`                       | —           | Text above bar                                 |
| `striped`       | `boolean`                      | `false`     | Animated shimmer                               |
| `formatLabel`   | `(value, max) => string`       | —           | Custom label format                            |

---

### Tooltip

```tsx
import { Tooltip, Button } from 'wealthywidgets';

<Tooltip content="Save your work" placement="top">
  <Button>Save</Button>
</Tooltip>

<Tooltip content={<span><b>Shortcut:</b> ⌘S</span>} placement="right" variant="light">
  <InfoIcon />
</Tooltip>
```

| Prop        | Type                                     | Default  | Description             |
| ----------- | ---------------------------------------- | -------- | ----------------------- |
| `content`   | `ReactNode`                              | —        | Tooltip text or element |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`  | Preferred placement     |
| `variant`   | `'dark' \| 'light'`                      | `'dark'` | Colour scheme           |
| `showDelay` | `number`                                 | `300`    | ms before show          |
| `hideDelay` | `number`                                 | `100`    | ms before hide          |
| `disabled`  | `boolean`                                | `false`  | Disable tooltip         |
| `maxWidth`  | `number \| string`                       | `240`    | Max bubble width        |

---

### ActivityWidget ✦

A scrollable timeline of activity events. Pass `onAiGenerate` to let users describe the feed they want and have it generated on the fly.

```tsx
import { ActivityWidget } from 'wealthywidgets';

const [items, setItems] = useState([
  { id: 1, label: 'PR merged', description: 'feat: dark mode', status: 'success', timestamp: '3m ago' },
  { id: 2, label: 'Build failed', status: 'danger', timestamp: new Date() },
  { id: 3, label: 'Deploy started', status: 'info', timestamp: '12m ago' },
]);

// Static
<ActivityWidget title="Recent Activity" items={items} maxVisible={3} />

// ✦ AI-powered
<ActivityWidget
  title="Team Activity"
  items={items}
  onAiGenerate={async (prompt) => {
    const generated = await myAI.generateActivity(prompt);
    setItems(generated);
  }}
  bordered
/>
```

| Prop           | Type                                | Default      | Description              |
| -------------- | ----------------------------------- | ------------ | ------------------------ |
| `items`        | `ActivityItem[]`                    | —            | Timeline entries         |
| `title`        | `string`                            | `'Activity'` | Widget heading           |
| `compact`      | `boolean`                           | `false`      | Reduced vertical spacing |
| `bordered`     | `boolean`                           | `false`      | Left-border item style   |
| `maxVisible`   | `number`                            | `5`          | Items before "show more" |
| `onAiGenerate` | `(prompt: string) => Promise<void>` | —            | AI generate handler      |
| `loading`      | `boolean`                           | `false`      | Loading state            |

**`ActivityItem` shape:**

```ts
interface ActivityItem {
  id: string | number;
  label: string;
  description?: string;
  timestamp?: string | Date; // Date auto-formatted as relative time
  icon?: ReactNode;
  status?: 'success' | 'warning' | 'danger' | 'info' | 'default';
}
```

---

### WeatherWidget ✦

Current conditions card with a 7-day forecast strip. The condition drives a beautiful gradient background. Pass `onAiGenerate` to let users request weather for any city or scenario.

```tsx
import { WeatherWidget } from 'wealthywidgets';

// Static
<WeatherWidget
  location="San Francisco, CA"
  temperature={18}
  unit="C"
  condition="partly-cloudy"
  feelsLike={15}
  humidity={72}
  windSpeed={14}
  showForecast
  forecast={[
    { day: 'Mon', high: 19, low: 12, condition: 'sunny' },
    { day: 'Tue', high: 16, low: 10, condition: 'rainy' },
    { day: 'Wed', high: 21, low: 14, condition: 'partly-cloudy' },
  ]}
/>

// ✦ AI-powered
<WeatherWidget
  location={city}
  temperature={temp}
  condition={cond}
  onAiGenerate={async (prompt) => {
    const data = await myAI.getWeather(prompt);
    applyWeather(data);
  }}
/>
```

| Prop           | Type                                | Default         | Description           |
| -------------- | ----------------------------------- | --------------- | --------------------- |
| `location`     | `string`                            | `'My Location'` | City / place name     |
| `temperature`  | `number`                            | —               | Current temp          |
| `unit`         | `'C' \| 'F'`                        | `'C'`           | Temperature unit      |
| `condition`    | `WeatherCondition`                  | `'sunny'`       | Current condition     |
| `feelsLike`    | `number`                            | —               | Perceived temperature |
| `humidity`     | `number`                            | —               | Humidity %            |
| `windSpeed`    | `number`                            | —               | Wind speed            |
| `windUnit`     | `string`                            | `'km/h'`        | Wind speed unit label |
| `visibility`   | `number`                            | —               | Visibility km         |
| `uvIndex`      | `number`                            | —               | UV index              |
| `forecast`     | `WeatherForecastDay[]`              | `[]`            | 7-day forecast data   |
| `showForecast` | `boolean`                           | `false`         | Show forecast strip   |
| `onAiGenerate` | `(prompt: string) => Promise<void>` | —               | AI generate handler   |
| `loading`      | `boolean`                           | `false`         | Loading state         |

**Available conditions:** `sunny` · `cloudy` · `partly-cloudy` · `rainy` · `stormy` · `snowy` · `windy` · `foggy` · `hail`

---

### CodeWidget ✦

A dark-themed code viewer with macOS-style toolbar, line numbers, copy button, and optional inline editing. The AI bar lets users describe snippets they want generated.

```tsx
import { CodeWidget } from 'wealthywidgets';

const snippet = `import { useState } from 'react';

export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  return { count, inc: () => setCount(c => c + 1) };
}`;

// Read-only with copy
<CodeWidget
  title="useCounter.ts"
  language="typescript"
  code={snippet}
  showCopy
  showLineNumbers
  highlightLines={[4]}
/>

// Editable pad
<CodeWidget
  language="python"
  code={code}
  editable
  onChange={setCode}
  maxHeight="500px"
/>

// ✦ AI-powered snippet generator
<CodeWidget
  title="Generated snippet"
  language="typescript"
  code={snippet}
  showCopy
  onAiGenerate={async (prompt) => {
    const result = await myAI.generateCode(prompt);
    setSnippet(result);
  }}
/>
```

| Prop              | Type                                | Default       | Description                    |
| ----------------- | ----------------------------------- | ------------- | ------------------------------ |
| `code`            | `string`                            | `''`          | Source code                    |
| `language`        | `CodeLanguage`                      | `'plaintext'` | Language badge                 |
| `title`           | `string`                            | —             | File name in toolbar           |
| `showCopy`        | `boolean`                           | `true`        | Show copy button               |
| `showLineNumbers` | `boolean`                           | `false`       | Line number gutter             |
| `maxHeight`       | `string`                            | `'400px'`     | Scroll container height        |
| `highlightLines`  | `number[]`                          | `[]`          | Lines to highlight (1-indexed) |
| `editable`        | `boolean`                           | `false`       | Inline editable textarea       |
| `onChange`        | `(code: string) => void`            | —             | Edit change handler            |
| `onAiGenerate`    | `(prompt: string) => Promise<void>` | —             | AI generate handler            |
| `loading`         | `boolean`                           | `false`       | Loading state                  |

**Supported languages:** `typescript` · `javascript` · `python` · `rust` · `go` · `bash` · `json` · `css` · `html` · `sql` · `plaintext`

---

## 🎨 Customisation

### SCSS variables

Override variables before importing the library:

```scss
// your-theme.scss
$color-primary: #7c3aed;
$color-primary-hover: #6d28d9;
$font-family-base: 'Geist', sans-serif;
$radius-md: 0.5rem;

@use 'wealthywidgets/src/styles/variables' as *;
```

### CSS custom properties

All colour tokens are available as CSS variables in the distributed stylesheet:

```css
:root {
  --ww-color-primary: #7c3aed;
  --ww-radius-md: 0.5rem;
}
```

---

## 🤖 AI Integration Pattern

All AI-powered widgets follow the same `onAiGenerate` interface — you supply the async handler, we supply the UI:

```tsx
// 1. User types a description in the ✦ prompt bar
// 2. onAiGenerate is called with their prompt
// 3. Your handler fetches / generates data and updates state
// 4. The widget re-renders with the new data

async function generateActivity(prompt: string) {
  const res = await fetch('/api/ai/activity', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  });
  const data = await res.json();
  setItems(data.items);
}

<ActivityWidget items={items} onAiGenerate={generateActivity} />;
```

This pattern is provider-agnostic — use OpenAI, Anthropic, a local model, or any API.

---

## 🛠 Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test

# Watch mode
npm run test -- --watch
```

### Project structure

```
src/
├── components/
│   ├── Button/
│   ├── Card/
│   ├── Dropdown/
│   ├── Input/
│   ├── Modal/
│   ├── ProgressBar/
│   ├── Tooltip/
│   ├── ActivityWidget/   ← new
│   ├── WeatherWidget/    ← new
│   └── CodeWidget/       ← new
├── styles/
│   └── _variables.scss
└── index.ts
```

Each component folder contains: `Component.tsx` · `Component.types.ts` · `Component.scss` · `Component.test.tsx` · `index.ts`

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding new components, SCSS conventions, and the testing requirements.

---

## 📄 License

MIT © [AceAnomDev](https://github.com/AceAnomDev)
