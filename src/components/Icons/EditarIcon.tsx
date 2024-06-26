import React from 'react';
import { IconProps } from './Icons.types';
import { IconMain } from './Icon';

const EditarIcon = (props: IconProps) => {
  return (
    <IconMain {...props}>
      <svg
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="EditIcon"
      >
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"></path>
      </svg>
    </IconMain>
  );
};

export default EditarIcon;
