import type { Preview } from 'storybook';
import '../src/index.css';

// Infer a light/dark hint from Storybook backgrounds and expose it via
// data attribute + CSS variable for components to react to.
const setBackgroundThemeHint = (bg?: string) => {
  const root = document.documentElement;
  let theme: 'light' | 'dark' | undefined;

  const parseRgb = (s: string) => {
    const m = s.match(/rgba?\(([^)]+)\)/i);
    if (!m) return undefined;
    const [r, g, b] = m[1].split(',').slice(0, 3).map((v) => parseFloat(v.trim()));
    if ([r, g, b].some((n) => Number.isNaN(n))) return undefined;
    return { r, g, b } as const;
  };

  const parseHex = (s: string) => {
    const m = s.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (!m) return undefined;
    let hex = m[1];
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { r, g, b } as const;
  };

  const isLight = (color?: string) => {
    if (!color) return undefined;
    const rgb = color.startsWith('#') ? parseHex(color) : parseRgb(color);
    if (!rgb) return undefined;
    const { r, g, b } = rgb;
    // Relative luminance approximation (sRGB)
    const L = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
    return L > 0.6; // threshold tuned for white-ish backgrounds
  };

  const light = isLight(bg);
  if (light === true) theme = 'light';
  if (light === false) theme = 'dark';

  if (theme) {
    root.setAttribute('data-sb-theme', theme);
    if (theme === 'light') {
      root.style.setProperty('--typing-color', '#000');
    } else {
      root.style.removeProperty('--typing-color');
    }
  } else {
    root.removeAttribute('data-sb-theme');
    root.style.removeProperty('--typing-color');
  }
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    a11y: { disable: false }
  },
  decorators: [
    (Story, context) => {
      try {
        setBackgroundThemeHint(context.globals?.backgrounds?.value);
      } catch {}
      return Story();
    }
  ]
};

export default preview;
