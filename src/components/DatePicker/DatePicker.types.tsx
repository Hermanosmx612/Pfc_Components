export interface DatePickerProps {
  label?: string;
  placeholder?: string;

  /**
   * @description The value of the date picker
   * @type Date
   * @example
   * <DatePicker valueDate={new Date()} />
   */
  valueDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange?: (event: any) => void;
  style?: React.CSSProperties;
  format?: 'YYYY-MM-DD' | 'DD-MM-YYYY' | 'MM-DD-YYYY';
  disabled?: boolean;
  required?: boolean;
}
