'use client';

import React from 'react';
import { hstack } from '../../../styled-system/patterns';
import { css } from '../../../styled-system/css';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = (props: IProps) => {
  const [isFocus, setIsFocus] = React.useState<boolean>(false);

  return (
    <div
      className={`${props.className} 
      ${hstack({
        position: 'relative',
        padding: '15px 10px',
        border: isFocus ? 'secondaryBorder' : 'grayBorder',
        borderRadius: 'lg',
        transitionDuration: '0.2s',
        _hover: {
          shadow: 'secondaryAround',
          transitionDuration: '0.2s',
          border: 'secondaryBorder',
        },
      })}`}
    >
      <input
        {...props}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        className={css({
          border: 'none',
          alignSelf: 'center',
          width: '100%',
          outline: 'none',
          fontSize: 'inherit',
        })}
      />
    </div>
  );
};

export default Input;
