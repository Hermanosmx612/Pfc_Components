import React from 'react';
import { IconProps } from './Icons.types';

import { IconMain } from './Icon';

const PlegarIcon = (props: IconProps) => {
  return (
    <IconMain small {...props}>
      <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" width="128" height="128">
        <path d="m7 14 5-5 5 5z"></path>
      </svg>
    </IconMain>
  );
};

export default PlegarIcon;
