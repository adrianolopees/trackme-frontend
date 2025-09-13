import type { SafeProfile } from "../schemas/profileSchemas";
export interface MenuItem {
  label: string;
  href: string;
}
export interface NavbarProps {
  isAuthenticated?: boolean;
  loading?: boolean;
  profile?: SafeProfile;
  brandName?: string;
  showMenuItems?: boolean;
  menuItems?: MenuItem[];
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
}
