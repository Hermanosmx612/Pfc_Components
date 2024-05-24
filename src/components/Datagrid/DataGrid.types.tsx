import React, { ReactElement, RefCallback } from 'react';

export interface Column {
  field: string;
  label: string;
  minWidth?: string;
  maxWidth?: string;
  sort?: boolean;
  filter?: {
    type: 'string' | 'date' | 'multiselector' | 'number';
    placeHolder: String[];
    valuesSelector?: { label: string; value: string }[];
  };
  blockColumn?: boolean;
  editable?: boolean;
  type: 'date' | 'number' | 'string' | 'selector';
  selectorOptions?: { label: string; value: string }[];
}
export interface Row {
  id: any;
  [key: string]: any;
}

export interface DataGridProps extends React.TableHTMLAttributes<HTMLTableElement> {
  rows: Row[];
  columns: Column[];
  position?: 'flex-start' | 'center' | 'flex-end';
  initialState?: {
    pagination?: { page: number; pageSize: number };
  };
  pageSizeOptions?: number[];
  checkboxSelection?: boolean;
  stickyHead?: boolean;
  actions?: { label: string; icon: React.JSX.Element; action: (e: Row) => void }[];
  checkBoxSelections?: { action: (e: Row[]) => void };
  saveButton?: { action: (e: Row[]) => void; label: string; icon?: React.JSX.Element };
  resetButton?: { label: string; icon?: React.JSX.Element };
  buttons?: { label: string; icon?: React.JSX.Element; action: (e: Row[]) => void }[];
  viewTooltip?: number;
}
