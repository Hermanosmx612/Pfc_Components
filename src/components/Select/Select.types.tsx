import { CSSObject } from 'styled-components';

export interface SelectProps {
  options: SelectOptions[];
  label?: string;
  value?: string;
  onChange?: (value: SelectOptions) => void;
  placeholder?: string;
  istyle?: CSSObject;
  search?: boolean;
  disabled?: boolean;
}

export interface SelectOptions {
  label: string;
  value: string | number | boolean | string[] | number[] | boolean[];
  separador?: boolean;
}
