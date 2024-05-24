import { CSSObject } from 'styled-components';



export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  label?: string;
  disabled?: boolean;
  variant?: 'confirm' | 'reject';
  onClick?: (value: React.MouseEvent<HTMLButtonElement>) => void;
  isWaiting?: boolean;
  istyle?: CSSObject;
}
