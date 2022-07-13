// got import cycle
export type TableProps = React.DetailedHTMLProps<
  React.TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
> & {
  sort?: string;
  onSortChange?: (sort: string) => void;
};
