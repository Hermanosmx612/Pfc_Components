import React from 'react';
import { IconProps } from './Icons.types';

import { IconMain } from './Icon';

const BloquearIcon = (props: IconProps) => {
  return (
    <IconMain {...props}>
      <svg  aria-hidden="true" viewBox="0 0 24 24"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m0 12H6V10h12z"></path></svg>
    </IconMain>
  );
};

export default BloquearIcon;
