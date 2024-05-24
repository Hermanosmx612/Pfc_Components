import { CSSObject } from 'styled-components';

export interface MultiselectorProps {
  options: MultiselectorOptions[];
  label?: string;
  value?: MultiselectorOptions[];
  onChange: (value: MultiselectorOptions[]) => void;
  placeholder?: string;
  search?: boolean;
  istyle?: CSSObject;
  disabled?: boolean;
}

export interface MultiselectorOptions {
  label: string;
  value: string | number | boolean | string[] | number[] | boolean[];
}
