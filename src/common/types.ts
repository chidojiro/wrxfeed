export interface HOC<T> {
  (c: React.ComponentType<T>): React.ComponentType<T>;
}
