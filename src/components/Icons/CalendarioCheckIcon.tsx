import React from 'react';
import { IconMain } from './Icon';
import { IconProps } from './Icons.types';

const CalendarioCheckIcon = (props: IconProps) => {
  return (
    <IconMain {...props}>
      <svg
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="EventAvailableIcon"
      >
        <path d="M16.53 11.06 15.47 10l-4.88 4.88-2.12-2.12-1.06 1.06L10.59 17zM19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H5V8h14z"></path>
      </svg>
    </IconMain>
  );
};

export default CalendarioCheckIcon;
