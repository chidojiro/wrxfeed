// got import cycle
export type TableProps = React.DetailedHTMLProps<
  React.TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
> & {
  variant?: 'noBorder';
  sort?: string;
  onSortChange?: (sort: string) => void;
};
