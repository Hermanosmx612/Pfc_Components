import React from 'react';
import { InputProps } from './Input.types';
import InputText from './InputText/InputText';
import InputSearch from './InputSearch/InputSearch';

const Input = (props: InputProps) => {
  switch (props.type) {
    case 'search':
      return <InputSearch {...props} />;
    case 'text':
    default:
      return <InputText {...props} />;
  }
};

export default Input;
