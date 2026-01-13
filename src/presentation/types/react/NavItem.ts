export interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
  children?: NavItem[];
}