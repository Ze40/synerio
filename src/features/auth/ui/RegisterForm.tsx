import Image from 'next/image';
import React from 'react';

import LOGO from '@/../public/image/logo.png';

import { flex, hstack, vstack } from '../../../../styled-system/patterns';
import { css } from '../../../../styled-system/css';
import InputPass from '@/entities/form/InputPass';
import InputEmail from '@/entities/form/InputEmail';
import { subtitle } from '@/shared/recipes/text';
import GoogleLogin from '@/entities/form/GoogleLogin';
import { button } from '@/shared/recipes/btn';
import Input from '@/entities/form/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputErrorMsg from '@/shared/InputErrorMsg';

interface IProps {
  className?: string;
  changeReg: (v: boolean) => void;
}

interface IForm {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  code: number;
}

const RegisterForm = ({ className, changeReg }: IProps) => {
  const [page, setPage] = React.useState<number>(1);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/_]).{8,}$/;

  const { register, handleSubmit, formState, watch } = useForm<IForm>({
    mode: 'onChange',
  });
  const password = watch('password');

  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
    switch (page) {
      case 1:
        if (formState.errors['first_name'] || formState.errors['last_name'])
          return;
        setPage(2);
        break;
      case 2:
        if (
          formState.errors['email'] ||
          formState.errors['password'] ||
          formState.errors['confirm_password']
        )
          return;
        setPage(3);
        break;
    }
  };

  return (
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
        Sign Up
      </h3>
      <p className={subtitle()}>
        Welcome to{' '}
        <span className={css({ color: 'secondary', fontWeight: 'medium' })}>
          SYNERIO
        </span>
      </p>

      <div className={vstack({ width: '100%', gap: '15px' })}>
        <div className={vstack({ width: 'inherit', gap: '30px' })}>
          {page === 1 && (
            <>
              <Input
                placeholder="First name"
                className={css({ width: 'inherit', fontSize: 'lg' })}
                {...register('first_name', {
                  required: 'This field is required',
                })}
              />
              <Input
                placeholder="Last name"
                className={css({ width: 'inherit', fontSize: 'lg' })}
                {...register('last_name', {
                  required: 'This field is required',
                })}
              />
            </>
          )}
          {page === 2 && (
            <>
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
              <div className={css({ position: 'relative', width: '100%' })}>
                <InputPass
                  placeholder="Confirm password"
                  className={css({ width: '100%', fontSize: 'lg' })}
                  {...register('confirm_password', {
                    required: 'This field is required',
                    validate: (value: string) =>
                      value === password || "Passwords don't match",
                  })}
                />
                {formState.errors['confirm_password'] && (
                  <InputErrorMsg
                    msg={formState.errors['confirm_password'].message || ''}
                    position={'top'}
                  />
                )}
              </div>
            </>
          )}
          {page === 3 && (
            <>
              <p>
                A confirmation code has been sent to your{' '}
                <span className={css({ color: 'secondary' })}>email.</span>
              </p>
              <Input
                placeholder="Code"
                className={css({ width: 'inherit', fontSize: 'lg' })}
                {...register('code', {
                  required: 'This field is required',
                })}
              />
            </>
          )}
        </div>
        <div className={hstack({ width: '100%' })}>
          {page === 1 && (
            <button
              type="submit"
              className={`${button()} ${css({ width: '100%', padding: '20px 45px' })}`}
            >
              Next
            </button>
          )}
          {page === 2 && (
            <>
              <button
                type="button"
                onClick={() => setPage(1)}
                className={`${button()} ${css({ width: '100%', padding: '20px 45px' })}`}
              >
                Previous
              </button>
              <button
                type="submit"
                className={`${button()} ${css({ width: '100%', padding: '20px 45px' })}`}
              >
                Next
              </button>
            </>
          )}
          {page === 3 && (
            <>
              <button
                type="button"
                onClick={() => setPage(2)}
                className={`${button()} ${css({ width: '100%', padding: '20px 45px' })}`}
              >
                Previous
              </button>
              <button
                type="submit"
                className={`${button()} ${css({ width: '100%', padding: '20px 45px' })}`}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
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
        onClick={() => changeReg(false)}
        type="button"
        className={css({
          color: 'dark',
          cursor: 'pointer',
          transitionDuration: '0.2s',
          _hover: { textDecoration: 'underline', transitionDuration: '0.2s' },
        })}
      >
        Already have an account?{' '}
        <span className={css({ color: 'secondary' })}>Log in</span>
      </button>
    </form>
  );
};

export default RegisterForm;
