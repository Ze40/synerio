'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import LOGO from '@/../public/image/logo.png';
import { vstack } from '../../../../styled-system/patterns';
import { css } from '../../../../styled-system/css';

interface IProps {
  className?: string;
}

const AuthSpace = ({ className }: IProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
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

    // Класс Particle
    class Particle {
      angle: number;
      radius: number;
      opacity: number;
      distance: number;
      speed: number;
      position: { x: number; y: number };

      constructor(x: number, y: number, distance: number) {
        this.angle = Math.random() * 2 * Math.PI;
        this.radius = Math.random() * 6;
        this.opacity = (Math.random() * 5 + 2) / 10;
        this.distance = (1 / this.opacity) * distance;
        this.speed = this.distance * 0.00003;

        this.position = {
          x: x + this.distance * Math.cos(this.angle),
          y: y + this.distance * Math.sin(this.angle),
        };
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(250,95,28,' + this.opacity + ')';
        ctx.beginPath();
        ctx.arc(
          this.position.x,
          this.position.y,
          this.radius,
          0,
          Math.PI * 2,
          false,
        );
        ctx.fill();
        ctx.closePath();
      }

      update(x: number, y: number) {
        this.angle += this.speed;
        this.position = {
          x: x + this.distance * Math.cos(this.angle),
          y: y + this.distance * Math.sin(this.angle),
        };
        this.draw();
      }
    }

    // Класс Emitter
    class Emitter {
      position: { x: number; y: number };
      radius: number;
      count: number;
      particles: Particle[];

      constructor(x: number, y: number) {
        this.position = { x, y };
        this.radius = 186;
        this.count = 2000;
        this.particles = [];

        for (let i = 0; i < this.count; i++) {
          this.particles.push(new Particle(x, y, this.radius));
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.beginPath();
        ctx.arc(
          this.position.x,
          this.position.y,
          this.radius,
          0,
          Math.PI * 2,
          false,
        );
        ctx.fill();
        ctx.closePath();
      }

      update() {
        this.particles.forEach((particle) => {
          particle.update(this.position.x, this.position.y);
        });
        this.draw();
      }
    }

    // Создаем Emitter
    const emitter = new Emitter(canvas.width / 2, canvas.height / 2);

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
    <div
      className={`${vstack({
        width: '50%',
        paddingTop: '50%',
        height: '0',
        position: 'relative',
      })} ${className}`}
    >
      <canvas
        ref={canvasRef}
        className={css({
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '75%',
          height: '65%',
          borderRadius: '50%',
          translate: 'auto',
          translateX: '-50%',
          translateY: '-50%',
        })}
      />
      <Image
        priority={true}
        src={LOGO}
        alt="SYNERIO"
        width={196}
        height={196}
        className={css({
          position: 'absolute',
          top: '50%',
          left: '50%',
          translate: 'auto',
          translateX: '-50%',
          translateY: '-50%',
          animation: 'spin',
        })}
      />
    </div>
  );
};

export default AuthSpace;
