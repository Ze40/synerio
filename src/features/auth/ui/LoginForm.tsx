'use client';

import Image from 'next/image';
import React from 'react';

import LOGO from '@/../public/image/logo.png';

import { flex, hstack, vstack } from '../../../../styled-system/patterns';
import { css } from '../../../../styled-system/css';
import InputPass from '@/entities/form/InputPass';
import InputEmail from '@/entities/form/InputEmail';
import { subtitle } from '@/shared/recipes/text';
import Link from 'next/link';
import GoogleLogin from '@/entities/form/GoogleLogin';
import { button } from '@/shared/recipes/btn';
import ForgotPassWindow from './ForgotPassWindow';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputErrorMsg from '@/shared/InputErrorMsg';

interface IProps {
  className?: string;
  changeReg: (v: boolean) => void;
}

interface IForm {
  email: string;
  password: string;
}

const LoginForm = ({ className, changeReg }: IProps) => {
  const [isForgotWindow, setIsForgotWindow] = React.useState<boolean>(false);

  const close = () => setIsForgotWindow(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  const { register, handleSubmit, formState } = useForm<IForm>({
    mode: 'onChange',
  });
  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
  };

  return (
    <>
      {isForgotWindow && <ForgotPassWindow close={close} />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${flex({ direction: 'column', alignItems: 'center', gap: '25px', width: '50%', position: 'relative', padding: '50px' })} ${className}`}
      >
        <Image src={LOGO} alt="logo" width={128} height={128} priority={true} />
        <h3
          className={css({
            fontSize: '5xl',
            fontWeight: 'bold',
            lineHeight: '1',
          })}
        >
          Log in
        </h3>
        <p className={subtitle()}>
          Welcome to{' '}
          <span className={css({ color: 'secondary', fontWeight: 'medium' })}>
            SYNERIO
          </span>
        </p>

        <div className={vstack({ width: '100%', gap: '30px' })}>
          <div className={css({ position: 'relative', width: '100%' })}>
            <InputEmail
              className={css({ width: '100%', fontSize: 'lg' })}
              {...register('email', {
                required: 'This field is required',
                pattern: {
                  value: emailRegex,
                  message: 'Invalid email adress',
                },
              })}
            />
            {formState.errors['email'] && (
              <InputErrorMsg
                msg={formState.errors['email'].message || ''}
                position={'bottom'}
              />
            )}
          </div>
          <div className={css({ position: 'relative', width: '100%' })}>
            <InputPass
              className={css({ width: '100%', fontSize: 'lg' })}
              {...register('password', {
                required: 'This field is required',
                pattern: {
                  value: passwordRegex,
                  message:
                    'The password must contain from 8 to 16 characters, lowercase and uppercase letters, and special characters',
                },
              })}
            />
            {formState.errors['password'] && (
              <InputErrorMsg
                msg={formState.errors['password'].message || ''}
                position={'bottom'}
              />
            )}
          </div>
          <Link
            href={'#'}
            onClick={() => setIsForgotWindow(true)}
            className={css({
              alignSelf: 'end',
              color: 'secondary',
              lineHeight: '1',
              transitionDuration: '0.2s',
              _hover: {
                textDecoration: 'underline',
                transitionDuration: '0.2s',
              },
            })}
          >
            forgot password?
          </Link>
          <div className={hstack()}>
            <div
              className={css({ width: '30px', borderBottom: '1px solid #000' })}
            />
            or
            <div
              className={css({ width: '30px', borderBottom: '1px solid #000' })}
            />
          </div>
        </div>
        <GoogleLogin />
        <button
          type="submit"
          className={`${button()} ${css({ width: '100%', padding: '20px 45px' })}`}
        >
          Login
        </button>
        <button
          onClick={() => changeReg(true)}
          type="button"
          className={css({
            color: 'dark',
            cursor: 'pointer',
            transitionDuration: '0.2s',
            _hover: { textDecoration: 'underline', transitionDuration: '0.2s' },
          })}
        >
          Don`t have an account?{' '}
          <span className={css({ color: 'secondary' })}>Sign up</span>
        </button>
      </form>
    </>
  );
};

export default LoginForm;
