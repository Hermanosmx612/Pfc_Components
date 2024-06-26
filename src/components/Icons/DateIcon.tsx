import React from 'react';
import { IconProps } from './Icons.types';

import { IconMain } from './Icon';

const DateIcon = (props: IconProps) => {
  return (
    <IconMain {...props}>
      <svg
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="EditCalendarIcon"
      >
        <path d="M12 22H5c-1.11 0-2-.9-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2v6h-2v-2H5v10h7zm10.13-5.01.71-.71c.39-.39.39-1.02 0-1.41l-.71-.71a.9959.9959 0 0 0-1.41 0l-.71.71zm-.71.71-5.3 5.3H14v-2.12l5.3-5.3z"></path>
      </svg>
    </IconMain>
  );
};

export default DateIcon;
