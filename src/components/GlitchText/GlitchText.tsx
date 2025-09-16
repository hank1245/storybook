import { useMemo } from "react";
import styled, { keyframes } from "styled-components";

export interface GlitchTextProps {
  text: string;
  fontSize?: string | number;
  width?: string | number;
  steps?: number;
  maxClip?: number;
  speed1?: number;
  speed2?: number;
  color?: string;
  className?: string;
}

const toCssSize = (v: string | number | undefined, fallback: string): string =>
  v == null ? fallback : typeof v === "number" ? `${v}px` : v;

const generateClipSteps = (steps = 20, max = 100) => {
  return Array.from({ length: steps }, (_, i) => {
    const top = Math.floor(Math.random() * max);
    const bottom = Math.floor(Math.random() * max);
    const percentage = Math.round((i / steps) * 100);
    return `${percentage}% { clip: rect(${top}px, 9999px, ${bottom}px, 0); }`;
  }).join("\n");
};

const createNoise = (steps: number, max: number) =>
  keyframes`${generateClipSteps(steps, max)}`;

export function GlitchText({
  text,
  fontSize = "100px",
  width = "400px",
  steps = 20,
  maxClip = 100,
  speed1 = 2,
  speed2 = 3,
  color,
  className,
}: GlitchTextProps) {
  const safeSteps = Math.max(1, Math.floor(steps));
  const safeMaxClip = Math.max(0, Math.floor(maxClip));
  const [noise1, noise2] = useMemo(
    () => [
      createNoise(safeSteps, safeMaxClip),
      createNoise(safeSteps, safeMaxClip),
    ],
    [safeSteps, safeMaxClip],
  );

  const size = useMemo(() => toCssSize(fontSize, "100px"), [fontSize]);
  const w = useMemo(() => toCssSize(width, "400px"), [width]);
  const safeSpeed1 = Math.max(0, speed1);
  const safeSpeed2 = Math.max(0, speed2);

  return (
    <GlitchWrapper
      className={className}
      data-text={text}
      $fontSize={size}
      $width={w}
      $noise1={noise1}
      $noise2={noise2}
      $speed1={safeSpeed1}
      $speed2={safeSpeed2}
      $color={color}
    >
      {text}
    </GlitchWrapper>
  );
}

export default GlitchText;

const GlitchWrapper = styled.div<{
  $fontSize: string;
  $width: string;
  $noise1: ReturnType<typeof keyframes>;
  $noise2: ReturnType<typeof keyframes>;
  $speed1: number;
  $speed2: number;
  $color?: string;
}>`
  position: relative;
  margin: 0 auto;
  font-family: "Varela", ui-sans-serif, system-ui, -apple-system, Segoe UI,
    Roboto, Ubuntu, Cantarell, "Noto Sans", Arial, sans-serif;
  color: ${({ $color }) => $color ?? '#fff'};
  :root[data-sb-theme='light'] & {
    color: ${({ $color }) => $color ?? '#000'};
  }
  :root[data-sb-theme='dark'] & {
    color: ${({ $color }) => $color ?? '#fff'};
  }
  font-size: ${({ $fontSize }) => $fontSize};
  width: ${({ $width }) => $width};

  &::after,
  &::before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    color: inherit;
    background: var(--glitch-band-bg, transparent);
    overflow: hidden;
  }

  &::after {
    left: 2px;
    text-shadow: -1px 0 red;
    animation: ${({ $noise1 }) => $noise1} ${({ $speed1 }) => $speed1}s infinite
      linear alternate-reverse;
  }

  &::before {
    left: -2px;
    text-shadow: 1px 0 blue;
    animation: ${({ $noise2 }) => $noise2} ${({ $speed2 }) => $speed2}s infinite
      linear alternate-reverse;
  }
`;
