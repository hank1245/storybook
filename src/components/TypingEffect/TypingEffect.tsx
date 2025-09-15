import styled, { css, keyframes } from "styled-components";

export interface TypingEffectProps {
  /** 표시할 텍스트 */
  text: string;
  /** 속도: 초당 글자수 (기본값 12) */
  speed?: number;
  /** 래퍼 중앙정렬 컨테이너 사용 여부 (기본값 true) */
  center?: boolean;
  /** 래퍼에 추가할 클래스 */
  className?: string;
}

/**
 * 타이핑 애니메이션 컴포넌트
 * - `speed`(초당 글자수)로 타이핑 속도를 조절합니다.
 */
export function TypingEffect({
  text,
  speed = 12,
  center = true,
  className,
}: TypingEffectProps) {
  const chars = Math.max(0, text?.length ?? 0);
  // 총 재생 시간(초) = 글자수 / 초당 글자수
  const durationSec = Math.max(0.1, chars / Math.max(1e-6, speed));

  return (
    <Wrapper $center={center} className={className}>
      <Typing
        key={`${text}-${speed}`}
        aria-label={text}
        $sizeCh={chars}
        $durationSec={durationSec}
      >
        {text}
      </Typing>
    </Wrapper>
  );
}

export default TypingEffect;

// styled-components
const typingKF = keyframes`
  from { width: 0 }
`;

const blinkKF = keyframes`
  50% { border-color: transparent }
`;

const Wrapper = styled.div<{ $center: boolean }>`
  ${(p) =>
    p.$center &&
    css`
      height: 100vh;
      display: grid;
      place-items: center;
      text-align: center;
    `}
`;

const Typing = styled.div<{ $sizeCh: number; $durationSec: number }>`
  color: var(--typing-color, inherit);
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid;
  border-right-color: currentColor;
  font-family: monospace;
  font-size: 2em;
  width: ${(p) => p.$sizeCh}ch;
  animation: ${typingKF} ${(p) => p.$durationSec}s
      steps(${(p) => Math.max(p.$sizeCh, 1)}),
    ${blinkKF} 0.5s step-end infinite alternate;

  @media (prefers-color-scheme: light) {
    color: #000; /* 시스템 라이트 모드 기본값 */
  }
`;
