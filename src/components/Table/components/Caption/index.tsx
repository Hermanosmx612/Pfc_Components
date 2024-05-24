import React from 'react';
import { CaptionProps } from '../../Table.types';

const Caption = (props: CaptionProps) => {
  return <caption>{props.children}</caption>;
};

export default Caption;
