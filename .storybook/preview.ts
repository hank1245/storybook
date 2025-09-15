import type { Preview } from "@storybook/react";
import "../src/index.css";

// Infer a light/dark hint from Storybook backgrounds and expose it via
// data attribute + CSS variable for components to react to.
const setBackgroundThemeHint = (bg?: string) => {
  const root = document.documentElement;
  let theme: "light" | "dark" | undefined;

  const parseRgb = (s: string) => {
    const m = s.match(/rgba?\(([^)]+)\)/i);
    if (!m) return undefined;
    const [r, g, b] = m[1]
      .split(",")
      .slice(0, 3)
      .map((v) => parseFloat(v.trim()));
    if ([r, g, b].some((n) => Number.isNaN(n))) return undefined;
    return { r, g, b } as const;
  };

  const parseHex = (s: string) => {
    const m = s.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (!m) return undefined;
    let hex = m[1];
    if (hex.length === 3)
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { r, g, b } as const;
  };

  const isLight = (color?: string) => {
    if (!color) return undefined;
    const rgb = color.startsWith("#") ? parseHex(color) : parseRgb(color);
    if (!rgb) return undefined;
    const { r, g, b } = rgb;
    // Relative luminance approximation (sRGB)
    const L = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
    return L > 0.6; // threshold tuned for white-ish backgrounds
  };

  const light = isLight(bg);
  if (light === true) theme = "light";
  if (light === false) theme = "dark";

  if (theme) {
    root.setAttribute("data-sb-theme", theme);
    // Choose high-contrast colors against the selected background
    const contrast = theme === "light" ? "#000" : "#fff";
    root.style.setProperty("--fg-contrast", contrast);
    root.style.setProperty("--typing-color", contrast);
    root.style.setProperty("--glitch-color", contrast);
    root.style.setProperty("--scramble-color", contrast);
  } else {
    root.removeAttribute("data-sb-theme");
    root.style.removeProperty("--fg-contrast");
    root.style.removeProperty("--typing-color");
    root.style.removeProperty("--glitch-color");
    root.style.removeProperty("--scramble-color");
  }

  // Pass selected background color down so components can match band color
  if (bg) {
    root.style.setProperty("--sb-background", bg);
    root.style.setProperty("--glitch-band-bg", bg);
  } else {
    root.style.removeProperty("--sb-background");
    root.style.removeProperty("--glitch-band-bg");
  }
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    a11y: { disable: false },
    backgrounds: {
      default: "Dark",
      values: [
        { name: "Light", value: "#ffffff" },
        { name: "Dark", value: "#000" },
      ],
    },
  },
  decorators: [
    (Story: any, context: any) => {
      try {
        const globalsBg = context.globals?.backgrounds?.value as string | undefined;
        const p = context.parameters?.backgrounds as
          | { default?: string; values?: Array<{ name: string; value: string }> }
          | undefined;
        let paramDefault: string | undefined;
        if (p?.default && Array.isArray(p.values)) {
          const found = p.values.find((v) => v.name === p.default);
          paramDefault = found?.value;
        }
        setBackgroundThemeHint(globalsBg ?? paramDefault);
      } catch {}
      return Story();
    },
  ],
};

export default preview;
