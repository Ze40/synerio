import { useEffect, useRef } from "react";

import { type Styles, css } from "styled-system/css";

import { Emitter } from "./animation.clsx";
import * as style from "./style";

interface AuthSpaceProps {
  className?: Styles | Styles[];
}

const AuthSpace = ({ className }: AuthSpaceProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Устанавливаем размеры canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Глобальная настройка анимации
    const requestAnimFrame =
      window.requestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };

    // Создаем Emitter
    const emitter = new Emitter(canvas.width / 2, canvas.height / 2, ctx);

    // Функция анимации
    let animationFrameId: number;
    const loop = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      emitter.update();
      animationFrameId = requestAnimFrame(loop);
    };

    // Запускаем анимацию
    loop();

    // Очистка при размонтировании
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className={css(style.container.raw(), className)}>
      <canvas ref={canvasRef} className={style.canvas()} />
      <img
        src={"/shared/logo.png"}
        alt="SYNERIO"
        width={196}
        height={196}
        className={style.logo()}
      />
    </div>
  );
};

export default AuthSpace;
