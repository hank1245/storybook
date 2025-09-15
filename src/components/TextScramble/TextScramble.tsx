import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export type TextScrambleProps = {
  phrases: string[];
  color?: string;
  interval?: number; // 한 문장 유지 시간 (ms)
  fontSize?: string;
  className?: string;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* Storybook 배경과 어울리도록 선택된 배경을 따라가고, 기본은 원본 색 */
  background: var(--sb-background, #212121);
  font-family: "Roboto Mono", monospace;
`;

const Text = styled.div<{ $color?: string; fontSize: string }>`
  font-weight: 100;
  font-size: ${(props) => props.fontSize};
  /* Default to dark-mode friendly (white) */
  color: ${(props) => props.$color ?? '#fff'};

  /* Storybook theme attribute overrides */
  :root[data-sb-theme='light'] & {
    color: ${(props) => props.$color ?? '#000'};
  }
  :root[data-sb-theme='dark'] & {
    color: ${(props) => props.$color ?? '#fff'};
  }


  .dud {
    color: #757575;
  }
`;

const randomChar = () => {
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  return chars[Math.floor(Math.random() * chars.length)];
};

type QueueItem = {
  from: string;
  to: string;
  start: number;
  end: number;
  char?: string;
};

export function TextScramble({
  phrases,
  color,
  interval = 800,
  fontSize = "28px",
  className,
}: TextScrambleProps) {
  const [output, setOutput] = useState<(string | { dud: string })[]>([]);
  const frameRef = useRef<number>();
  const queueRef = useRef<QueueItem[]>([]);
  const frameCountRef = useRef(0);
  const counterRef = useRef(0);
  const resolveRef = useRef<() => void>();

  const setText = (newText: string) => {
    const oldText = output
      .map((item) => (typeof item === "string" ? item : item.dud))
      .join("");
    const length = Math.max(oldText.length, newText.length);

    return new Promise<void>((resolve) => {
      resolveRef.current = resolve;
      queueRef.current = [];

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        queueRef.current.push({ from, to, start, end });
      }

      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameCountRef.current = 0;
      update();
    });
  };

  const update = () => {
    let complete = 0;
    const out: (string | { dud: string })[] = [];

    for (let i = 0; i < queueRef.current.length; i++) {
      let { from, to, start, end, char } = queueRef.current[i];
      if (frameCountRef.current >= end) {
        complete++;
        out.push(to);
      } else if (frameCountRef.current >= start) {
        if (!char || Math.random() < 0.28) {
          char = randomChar();
          queueRef.current[i].char = char;
        }
        out.push({ dud: char });
      } else {
        out.push(from);
      }
    }

    setOutput(out);

    if (complete === queueRef.current.length) {
      resolveRef.current?.();
    } else {
      frameRef.current = requestAnimationFrame(update);
      frameCountRef.current++;
    }
  };

  useEffect(() => {
    let mounted = true;

    const next = () => {
      if (!mounted) return;
      setText(phrases[counterRef.current]).then(() => {
        setTimeout(next, interval);
      });
      counterRef.current = (counterRef.current + 1) % phrases.length;
    };

    next();
    return () => {
      mounted = false;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phrases, interval]);

  return (
    <Container className={className}>
      <Text $color={color} fontSize={fontSize}>
        {output.map((item, i) =>
          typeof item === "string" ? (
            <span key={i}>{item}</span>
          ) : (
            <span key={i} className="dud">
              {item.dud}
            </span>
          )
        )}
      </Text>
    </Container>
  );
}

export default TextScramble;
