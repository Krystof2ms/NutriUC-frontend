export type Link = {
  name: string;
  href: string;
  isRoot?: boolean;
  icon: LucideIcon;
  subLinks?: Link[];
};