export interface PopoverProps {
  // onToggle?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
  triggerElement?: React.ReactNode;
  trigger?: 'click' | 'hover';
}
