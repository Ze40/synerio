import React from 'react';
import Image from 'next/image';

import { hstack } from '../../../styled-system/patterns';

import G from '@/../public/image/g.svg';

export default function GoogleLogin() {
  return (
    <button
      type="button"
      className={hstack({
        outline: 'grayBorder',
        borderRadius: 'xl',
        padding: '15px',
        width: '100%',
        justifyContent: 'center',
        fontSize: '18px',
        fontWeight: 'medium',
        color: 'dark',
        transitionDuration: '0.2s',
        _hover: {
          outline: 'none',
          shadow: 'secondaryAround',
          transitionDuration: '0.2s',
          color: 'secondary',
        },
      })}
    >
      Log in with Google
      <Image src={G} alt="G" />
    </button>
  );
}
