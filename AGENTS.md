# AGENTS.md

These instructions apply to the frontend in this directory.

## Icons

Use `@lucide/angular` for interface icons. Do not add another icon library or hand-written icon SVGs when a Lucide icon is available.

For a static icon, import its component from `@lucide/angular` and add it to the standalone Angular component's `imports` array. Place its lower-camel-case selector on an `<svg>` element; for example, `LucideFileText` uses `lucideFileText`. Apply sizing and styling through the project's existing CSS or Tailwind classes on the `<svg>` element.

For an icon selected at runtime, use `LucideDynamicIcon` with `[lucideIcon]` bound to a `LucideIcon` value, following existing components such as `CardLink`.

Static icon example:

```ts
import { Component } from '@angular/core';
import { LucideFileText } from '@lucide/angular';

@Component({
  selector: 'app',
  template: '<svg lucideFileText></svg>',
  imports: [LucideFileText],
})
export class App {}
```
