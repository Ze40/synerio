import React from 'react';
import { css } from '../../styled-system/css';
import { CircleAlert } from 'lucide-react';
import { hstack } from '../../styled-system/patterns';

interface IProps {
  msg: string;
  position: 'top' | 'bottom';
}

const InputErrorMsg = ({ msg, position }: IProps) => {
  return (
    <div
      className={hstack({
        position: 'absolute',
        height: 'min-content',
        gap: '4px',
        padding: '0 5px',
        top: position === 'top' ? '0' : 'auto',
        bottom: position === 'bottom' ? '0' : 'auto',
        translate: 'auto',
        translateY: position === 'top' ? '-105%' : '105%',
      })}
    >
      <CircleAlert className={css({ color: 'secondary' })} size={24} />
      <strong
        className={css({
          fontSize: 'smaller',
          fontWeight: 'normal',
          lineHeight: '1.05',
        })}
      >
        {msg}
      </strong>
    </div>
  );
};

export default InputErrorMsg;
