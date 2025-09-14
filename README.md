# Storybook Design System Sandbox

A React + TypeScript design system sandbox with Vite, Storybook, Vitest (RTL), and Playwright. Includes accessible, reusable components: Button, Card, Modal, Input, Navbar.

## Getting Started

- Install deps: `npm install`
- Run app (Vite dev): `npm run dev`
- Open: http://localhost:5173

## Storybook

- Start: `npm run storybook`
- Build static: `npm run build-storybook`

## Unit Tests (Vitest + RTL)

- Watch: `npm run test`
- Run once: `npm run test:run`
- Coverage: `npm run test:coverage` (reports in `coverage/`)

## E2E Tests

이 프로젝트에서는 E2E 테스트(Playwright)를 사용하지 않습니다.
관련 스크립트와 설정은 제거되었습니다.

## Build

- Production build: `npm run build`
- Preview build: `npm run preview` (serves at http://localhost:4173)

## Project Structure

- `src/components/*`: UI components (CSS Modules + TS)
- `src/components/**/*.stories.tsx`: Storybook stories
- `src/components/**/*.test.tsx`: Unit tests (Vitest + RTL)
- `e2e/*.spec.ts`: Playwright tests
- `.storybook/*`: Storybook configuration
- `vite.config.ts`: Vite + Vitest config
- `playwright.config.ts`: Playwright config
  - 사용하지 않음 (삭제됨)

## Components & Accessibility

- Button: `variant`, `size`, `disabled`, `leadingIcon`, `trailingIcon` (keyboard focus-visible styling)
- Card: semantic `article` with `aria-labelledby` when `title` is provided
- Modal: `role="dialog"`, `aria-modal`, `aria-labelledby`, closes on ESC and overlay click, initial focus on open
- Input: label association, `aria-invalid` and `aria-describedby` for error/hint
- Navbar: `role="navigation"`, current item uses `aria-current="page"`

## Best Practices Used

- TypeScript-first components with explicit props
- CSS Modules for encapsulated styles
- Accessible roles/labels and keyboard interactions
- Stories with controls (args) for quick prop exploration
- Unit tests for rendering/props/events and coverage
- E2E tests simulating real user scenarios

## Notes

- Playwright tests assume preview server at `http://localhost:4173`. The `e2e` script builds first, then runs tests.
- For strict type checking, run `npm run typecheck`.
