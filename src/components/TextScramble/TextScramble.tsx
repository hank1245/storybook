import { useCallback, useEffect, useRef, useState } from "react";
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
  background: var(--sb-background, #212121);
  font-family: "Roboto Mono", monospace;
`;

const Text = styled.div<{ $color?: string; fontSize: string }>`
  font-weight: 100;
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.$color ?? '#fff'};

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

const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!<>-_/[]{}—=+*^?#";

const randomChar = () => {
  const index = Math.floor(Math.random() * SCRAMBLE_CHARS.length);
  return SCRAMBLE_CHARS[index];
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
  const timeoutRef = useRef<number>();
  const queueRef = useRef<QueueItem[]>([]);
  const frameCountRef = useRef(0);
  const counterRef = useRef(0);
  const resolveRef = useRef<() => void>();
  const currentTextRef = useRef("");

  const update = useCallback(() => {
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
      frameRef.current = undefined;
      const resolve = resolveRef.current;
      resolveRef.current = undefined;
      resolve?.();
      return;
    }

    frameCountRef.current += 1;
    frameRef.current = requestAnimationFrame(update);
  }, []);

  const setText = useCallback(
    (newText: string) => {
      const oldText = currentTextRef.current;
      const length = Math.max(oldText.length, newText.length);

      return new Promise<void>((resolve) => {
        resolveRef.current = () => {
          currentTextRef.current = newText;
          resolve();
        };
        queueRef.current = [];

        for (let i = 0; i < length; i++) {
          const from = oldText[i] ?? "";
          const to = newText[i] ?? "";
          const start = Math.floor(Math.random() * 40);
          const end = start + Math.floor(Math.random() * 40);
          queueRef.current.push({ from, to, start, end });
        }

        if (frameRef.current !== undefined) {
          cancelAnimationFrame(frameRef.current);
        }
        frameCountRef.current = 0;
        update();
      });
    },
    [update],
  );

  useEffect(() => {
    if (!phrases.length) {
      setOutput([]);
      currentTextRef.current = "";
      return () => undefined;
    }

    let cancelled = false;
    counterRef.current = 0;

    const safeInterval = Math.max(0, interval);

    const next = () => {
      if (cancelled) return;
      const phrase = phrases[counterRef.current] ?? "";
      setText(phrase).then(() => {
        if (cancelled) return;
        timeoutRef.current = window.setTimeout(next, safeInterval);
      });
      counterRef.current = (counterRef.current + 1) % phrases.length;
    };

    next();
    return () => {
      cancelled = true;
      if (frameRef.current !== undefined) {
        cancelAnimationFrame(frameRef.current);
      }
      if (timeoutRef.current !== undefined) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [phrases, interval, setText]);

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
