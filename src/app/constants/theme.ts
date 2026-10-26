import { LucideSun, LucideMoon, LucideMonitor, LucideIcon } from '@lucide/angular';
import { Theme } from '../types/theme';

export const themeMap: Record<Theme, { name: string; icon: LucideIcon }> = {
  light: { name: 'Claro', icon: LucideSun },
  dark: { name: 'Oscuro', icon: LucideMoon },
  system: { name: 'Sistema', icon: LucideMonitor },
};
