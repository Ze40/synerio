import InputEmail from '@/entities/form/InputEmail';
import { SquareX } from 'lucide-react';
import React from 'react';
import { css } from '../../../../styled-system/css';
import { button } from '@/shared/recipes/btn';
import { vstack } from '../../../../styled-system/patterns';
import Image from 'next/image';
import LOGO from '@/../public/image/logo.png';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputErrorMsg from '@/shared/InputErrorMsg';

interface IProps {
  className?: string;
  close: () => void;
}

interface IForm {
  email: string;
}

const ForgotPassWindow = ({ close }: IProps) => {
  const [isSend, setIsSend] = React.useState<boolean>(false);
  const modal = React.useRef<HTMLDivElement>(null);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const { register, handleSubmit, formState } = useForm<IForm>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IForm> = (data) => {
    setIsSend(true);
    console.log(data);
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modal.current instanceof HTMLElement) {
        if (
          e.target instanceof Node &&
          modal.current !== e.target &&
          !modal.current.contains(e.target)
        ) {
          close();
        }
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [close]);

  return (
    <div
      className={css({
        position: 'absolute',
        width: '100%',
        left: 0,
        top: 0,
        height: '100%',
        zIndex: 100,
        backdropFilter: 'auto',
        backdropBlur: '2xl',
      })}
    >
      <div
        ref={modal}
        className={vstack({
          position: 'absolute',
          top: '50%',
          left: '50%',
          translate: 'auto',
          translateX: '-50%',
          translateY: '-50%',
          background: 'primary',
          width: '600px',
          padding: '50px 40px',
          shadow: 'around',
          borderRadius: '10px',
        })}
      >
        <button
          type="button"
          onClick={close}
          className={css({
            position: 'absolute',
            right: '20px',
            top: '20px',
            transitionDuration: '0.2s',
            _hover: { scale: '1.2', transitionDuration: '0.2s' },
          })}
        >
          <SquareX className={css({ color: 'secondary' })} size={32} />
        </button>
        <Image src={LOGO} alt={'logo'} width={64} />
        {!isSend ? (
          <form
            action=""
            method="post"
            className={vstack({
              position: 'relative',
              gap: '15px',
              width: '100%',
            })}
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className={css({ fontSize: '3xl', fontWeight: 'medium' })}>
              Enter your email
            </p>
            <div className={css({ width: '100%', position: 'relative' })}>
              <InputEmail
                className={css({ width: '100%' })}
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
                  position="bottom"
                />
              )}
            </div>
            <button type="submit" className={button()}>
              Continue
            </button>
          </form>
        ) : (
          <div className={vstack({ gap: '20px' })}>
            <p
              className={css({
                fontSize: '2xl',
                fontWeight: 'medium',
                textAlign: 'center',
                lineHeight: '1.1',
                color: 'dark',
              })}
            >
              The link to confirm the password change has been sent to{' '}
              <span className={css({ color: 'secondary' })}>your email</span>
            </p>
            <button type="button" className={button()} onClick={close}>
              Exit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassWindow;
