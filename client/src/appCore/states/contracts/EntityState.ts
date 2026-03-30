export interface EntityState<T> {
  items: T[];
  selectedItem?: T | null;
}
