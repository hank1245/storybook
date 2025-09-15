import { FC, useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";

export type BoxLoadingProps = {
  background?: string;
  boxSize?: number; // px
  color?: string; // box color
  duration?: number; // seconds
  text?: string;
  textColor?: string;
  fontSize?: string | number;
  fullScreen?: boolean;
  className?: string;
  dotSteps?: number; // how many dots to cycle (e.g., 3 => ., .., ...)
  dotIntervalMs?: number; // interval between dot updates
};

const animate = keyframes`
  17% {
    border-bottom-right-radius: 3px;
  }
  25% {
    transform: translateY(9px) rotate(22.5deg);
  }
  50% {
    transform: translateY(18px) scale(1, .9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }
  75% {
    transform: translateY(9px) rotate(67.5deg);
  }
  100% {
    transform: translateY(0) rotate(90deg);
  }
`;

const shadow = keyframes`
  0%, 100% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1);
  }
`;

const Wrapper = styled.div<{ $bg: string; $full: boolean }>`
  background: ${(p) => p.$bg};
  overflow: hidden;
  height: ${(p) => (p.$full ? "100vh" : "auto")};
  width: ${(p) => (p.$full ? "100vw" : "100%")};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${(p) => (p.$full ? 0 : "24px")};
`;

const Box = styled.div<{ $size: number; $color: string; $duration: number }>`
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  margin: 20px auto;
  position: relative;

  &::before {
    content: "";
    width: ${(p) => p.$size}px;
    height: 5px;
    background: #000;
    opacity: 0.1;
    position: absolute;
    top: calc(${(p) => p.$size}px + 9px);
    left: 0;
    border-radius: 50%;
    animation: ${shadow} ${(p) => p.$duration}s linear infinite;
  }

  &::after {
    content: "";
    width: ${(p) => p.$size}px;
    height: ${(p) => p.$size}px;
    background: ${(p) => p.$color};
    animation: ${animate} ${(p) => p.$duration}s linear infinite;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 3px;
  }
`;

const Text = styled.div<{ $color: string; $fontSize: string }>`
  font-family: "Comic Sans MS", "Arial Rounded MT Bold", cursive;
  font-size: ${(p) => p.$fontSize};
  font-weight: bold;
  color: ${(p) => p.$color};
  margin-top: 12px;
  text-align: center;
`;

export const BoxLoading: FC<BoxLoadingProps> = ({
  background = "#f9f9f9",
  boxSize = 50,
  color = "#6136ca",
  duration = 0.5,
  text = "Loading..",
  textColor = "#6136ca",
  fontSize = "18px",
  fullScreen = true,
  className,
  dotSteps = 3,
  dotIntervalMs = 400,
}) => {
  const fontSizeStr = typeof fontSize === "number" ? `${fontSize}px` : fontSize;
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const steps = Math.max(1, Math.floor(dotSteps));
    const timer = window.setInterval(() => {
      setDotCount((c) => (c % steps) + 1);
    }, Math.max(100, dotIntervalMs));
    return () => window.clearInterval(timer);
  }, [dotSteps, dotIntervalMs]);

  const displayText = useMemo(() => {
    const base = (text ?? "").replace(/[.]+$/, "");
    return `${base}${".".repeat(dotCount)}`;
  }, [text, dotCount]);
  return (
    <Wrapper $bg={background} $full={fullScreen} className={className}>
      <Box $size={boxSize} $color={color} $duration={duration} />
      <Text $color={textColor} $fontSize={fontSizeStr}>
        {displayText}
      </Text>
    </Wrapper>
  );
};

export default BoxLoading;
