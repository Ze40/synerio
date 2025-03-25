import { cva } from '../../../styled-system/css';

export const button = cva({
  base: {
    fontSize: '18px',
    color: 'primary',
    lineHeight: '1',
    padding: '15px 45px',
    background: 'secondary',
    fontWeight: 'medium',
    transitionDuration: '0.2s',
    borderRadius: 'xl',
    _hover: {
      color: 'secondary',
      shadow: 'secondaryAround',
      transitionDuration: '0.2s',
      background: 'none',
    },
  },
});
