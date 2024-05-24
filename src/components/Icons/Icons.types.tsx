export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Icon color
   * @default "black"
   * */
  color?: string;
  /**
   * Icon size
   * @default "1rem"
   * */
  size?: string;
  disabled?: boolean;
  inactive?: boolean;
  active?: boolean;
  style?: React.CSSProperties;
  small?: boolean;
}
