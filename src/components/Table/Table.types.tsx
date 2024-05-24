export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode | null;
  stickyHead?: boolean;
}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode | null;
}

export interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode | null;
  minWidth?: string;
  maxWidth?: string;
}

export interface TableFootProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode | null;
}

export interface ThProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children: React.ReactNode | null;
  minWidth?: string;
  maxWidth?: string;
}

export interface TheadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode | null;
}

export interface TrProps extends React.ComponentPropsWithRef<'tr'> {
  children: React.ReactNode | null;
}

export interface CaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
  children: React.ReactNode | null;
}
