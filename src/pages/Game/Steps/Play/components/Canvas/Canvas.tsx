import { useRef, useEffect } from 'react';

const drawStart = (ctx: Nullable<CanvasRenderingContext2D> | undefined) => {
  if (!ctx) {
    return;
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Начало игры', 0, 0);
};

export const Canvas = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const ctx = canvas.current?.getContext('2d');

  useEffect(() => {
    drawStart(ctx);
  }, [ctx]);

  return (
    <canvas ref={canvas}>
      Для просмотра анимации воспользуйтесь браузером, который поддерживает технологию canvas
    </canvas>
  );
};