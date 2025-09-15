import { CSSProperties } from "react";
import styles from "./TypingEffect.module.css";

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
  const blinkSec = 0.5; // 원본 CSS 그대로 유지

  const wrapperClass = [center ? styles.wrapper : undefined, className]
    .filter(Boolean)
    .join(" ");

  const typingStyle: CSSProperties = {
    // width를 최종 상태로 두고 keyframes에서 from { width: 0 }로 시작
    width: `${chars}ch`,
    // steps(글자수)로 글자 단위로 진행, blink는 무한 반복
    animation: `typing ${durationSec}s steps(${Math.max(
      chars,
      1
    )}), blink ${blinkSec}s step-end infinite alternate`,
  };

  return (
    <div className={wrapperClass}>
      <div
        key={`${text}-${speed}`}
        className={styles.typing}
        style={typingStyle}
        aria-label={text}
      >
        {text}
      </div>
    </div>
  );
}

export default TypingEffect;
