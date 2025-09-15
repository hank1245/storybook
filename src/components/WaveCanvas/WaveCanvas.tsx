import { useEffect, useMemo, useRef } from 'react';

type Point = {
  index: number;
  x: number;
  y: number;
  baseY: number;
  cur: number;
  speed: number;
  max: number;
};

const createPoint = (index: number, x: number, y: number, speed: number, max: number): Point => ({
  index,
  x,
  y,
  baseY: y,
  cur: index,
  speed,
  max,
});

type Wave = {
  color: string;
  width: number;
  height: number;
  points: Point[];
};

const movePoint = (point: Point) => {
  point.cur += point.speed;
  point.y = point.baseY + Math.sin(point.cur) * point.max * 0.3;
};

const createWave = (
  width: number,
  height: number,
  color: string,
  numberOfPoints: number,
  speed: number,
  ampMin: number,
  ampMax: number
): Wave => {
  const pointGap = width / (numberOfPoints - 1);
  const center = height / 2;

  const points = Array.from({ length: numberOfPoints }, (_, i) =>
    createPoint(
      i,
      pointGap * i,
      center,
      speed,
      Math.random() * (ampMax - ampMin) + ampMin
    )
  );

  return { color, width, height, points };
};

const drawWave = (ctx: CanvasRenderingContext2D, wave: Wave) => {
  ctx.beginPath();
  ctx.fillStyle = wave.color;
  ctx.moveTo(wave.points[0].x, wave.points[0].y);

  let prevX = wave.points[0].x;
  let prevY = wave.points[0].y;

  for (let i = 1; i < wave.points.length; i++) {
    const cx = (prevX + wave.points[i].x) / 2;
    const cy = (prevY + wave.points[i].y) / 2;
    ctx.quadraticCurveTo(prevX, prevY, cx, cy);
    prevX = wave.points[i].x;
    prevY = wave.points[i].y;
  }

  ctx.lineTo(prevX, prevY);
  ctx.lineTo(wave.width, wave.height);
  ctx.lineTo(0, wave.height);
  ctx.lineTo(wave.points[0].x, wave.points[0].y);
  ctx.fill();
  ctx.closePath();
};

const moveWave = (wave: Wave) => {
  for (let i = 1; i < wave.points.length - 1; i++) {
    movePoint(wave.points[i]);
  }
};

export type WaveCanvasProps = {
  colors?: string[];
  points?: number; // number of control points
  speed?: number; // point phase speed
  amplitudeMin?: number; // min amplitude baseline
  amplitudeMax?: number; // max amplitude baseline
};

export const WaveCanvas = ({
  colors = [
    'rgba(255,0,0,0.3)',
    'rgba(0,0,255,0.3)',
    'rgba(0,255,150,0.3)',
    'rgba(255,255,0,0.2)'
  ],
  points = 6,
  speed = 0.04,
  amplitudeMin = 150,
  amplitudeMax = 250
}: WaveCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wavesRef = useRef<Wave[]>([]);
  const rafRef = useRef<number>();
  const params = useMemo(() => ({ points, speed, amplitudeMin, amplitudeMax }), [points, speed, amplitudeMin, amplitudeMax]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const buildWaves = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      wavesRef.current = colors.map((c) =>
        createWave(
          canvas.width,
          canvas.height,
          c,
          params.points,
          params.speed,
          params.amplitudeMin,
          params.amplitudeMax
        )
      );
    };

    const onResize = () => buildWaves();
    buildWaves();
    window.addEventListener('resize', onResize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const waves = wavesRef.current;
      for (const w of waves) {
        drawWave(ctx, w);
        moveWave(w);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [colors, params]);

  return <canvas ref={canvasRef} style={{ display: 'block' }} />;
};

export default WaveCanvas;
