export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
  /**
   * Tooltip position
   * @default "top"
   * */
  position?: 'top' | 'bottom' | 'left' | 'right';
}
