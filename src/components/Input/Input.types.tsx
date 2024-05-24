import { CSSObject } from 'styled-components';

export interface InputProps {
  label?: string;
  type?: 'text' | 'password' | 'textarea' | 'search';
  placeholder?: string;
  value?: string;
  width?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rows?: number;
  cols?: number;
  style?: React.CSSProperties;
  autoFocus?: boolean;
}

export interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  textError?: string;
  debouncedCallback?: boolean;
  debounceTime?: number;
  istyle?: CSSObject;
}

export interface InputPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  textError?: string;
  generatePassword?: boolean;
  value?: string;
}

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  textError?: string;
  value?: string;
}

export interface InputSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  triggerButton?: boolean;
  debouncedCallback?: boolean;
  debounceTime?: number;
  value?: string;
  istyle?: CSSObject;
}

export interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  textError?: string;
  value?: string;
  istyle?: CSSObject;
}
