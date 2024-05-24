import { CSSObject } from 'styled-components';

export interface PadlockProps {
  isLocked?: boolean;
  onClick: (value: boolean) => void;
  label?: string;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
  istyle?: CSSObject;
}
