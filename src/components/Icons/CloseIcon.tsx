import React from 'react';
import { IconProps } from './Icons.types';

import { IconMain } from './Icon';

const CloseIcon = (props: IconProps) => {
  return (
    <IconMain {...props}>
      <svg
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="CloseIcon"
      >
        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
      </svg>
    </IconMain>
  );
};

export default CloseIcon;
