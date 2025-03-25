'use client';

import LoginForm from '@/features/auth/ui/LoginForm';
import { container } from '../../styled-system/patterns';
import { center } from '../../styled-system/patterns';
import AuthSpace from '@/features/auth/ui/AuthSpace';
import React from 'react';
import RegisterForm from '@/features/auth/ui/RegisterForm';
import { css } from '../../styled-system/css';

export default function Auth() {
  const [isReg, setIsReg] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<'login' | 'signup' | null>(null);

  React.useEffect(() => {
    if (show === null) {
      setShow('login');
      return;
    }
    setTimeout(() => {
      if (show === 'login') setShow('signup');
      else setShow('login');
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReg]);

  return (
    <div
      className={center({
        width: '100vw',
        height: '100vh',
        position: 'relative',
      })}
    >
      <div
        className={container({
          width: '1000px',
          height: '800px',
          background: 'primary',
          shadow: 'around',
          display: 'flex',
          alignItems: 'center',
          flexDirection: show === 'signup' ? 'row-reverse' : 'row',
        })}
      >
        <AuthSpace
          className={css({
            position: 'absolute',
            right: '0',
            transform: !isReg ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 1s',
          })}
        />
        {show === 'login' ? (
          <LoginForm
            changeReg={setIsReg}
            className={css({
              opacity: !isReg ? '1' : '0',
              transition: 'opacity 0.5s',
            })}
          />
        ) : (
          <RegisterForm
            changeReg={setIsReg}
            className={css({
              opacity: isReg ? '1' : '0',
              transition: 'opacity 0.5s',
            })}
          />
        )}
      </div>
    </div>
  );
}
