# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with Astro 5, featuring a blog with markdown content and a responsive layout. The site uses SCSS for styling and is configured with Prettier for code formatting.

## Development Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build production site to ./dist/
npm run preview   # Preview production build locally
```

## Code Formatting

Prettier is configured with:
- No semicolons
- Single quotes
- Astro plugin for .astro files

Format code before committing.

## Architecture

### Content System

Blog posts use Astro's content collections (v5):
- Blog posts are markdown files in `src/blog/`
- Content schema defined in `src/content.config.ts` with required `title` and `date` fields
- Each post frontmatter includes: `title`, `slug`, `date`
- Dynamic routes handled by `src/pages/blog/[slug].astro`

### Layout System

Three-tier layout structure:
1. `Site.astro` - Base HTML shell with global styles
2. `Page.astro` - Main page layout with sidebar/header navigation (responsive)
3. `ContentWithTitle.astro` - Content wrapper with title

Responsive breakpoint at 978px:
- Desktop: sidebar navigation on left
- Mobile: header navigation on top

### Utilities

`src/utils.ts` provides:
- `getSlugFromTitle()` - Convert titles to URL-friendly slugs
- `getDateStr()` - Format dates for display

### Styling

- Global styles in `src/styles/global.scss`
- Component styles use scoped `<style lang="scss">` blocks
- Background color variable: `$background-color: #f0f0f0`

### Syntax Highlighting

Markdown code blocks use Shiki with `github-light-default` theme (configured in `astro.config.mjs`).
