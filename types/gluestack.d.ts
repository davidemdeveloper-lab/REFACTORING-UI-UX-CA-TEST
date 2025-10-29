declare module '@gluestack-ui/themed' {
  import type { GSConfig } from '@gluestack-style/react';
  import type { ComponentType, ReactNode } from 'react';

  type GluestackComponent = ComponentType<Record<string, unknown>>;

  // Runtime config exposed by the themed package (missing from published types).
  export const config: GSConfig;

  export const GluestackUIProvider: ComponentType<{ config: GSConfig; colorMode?: 'light' | 'dark'; children?: ReactNode }>;

  export const Box: GluestackComponent;
  export const VStack: GluestackComponent;
  export const HStack: GluestackComponent;
  export const Text: GluestackComponent;
  export const Button: GluestackComponent;
  export const Badge: GluestackComponent;
  export const Divider: GluestackComponent;
  export const Progress: GluestackComponent;
  export const ProgressFilledTrack: GluestackComponent;
  export const FormControl: GluestackComponent;
  export const FormControlLabel: GluestackComponent;
  export const FormControlHelper: GluestackComponent;
  export const FormControlError: GluestackComponent;
  export const Input: GluestackComponent;
  export const InputField: GluestackComponent;
  export const Textarea: GluestackComponent;
  export const TextareaInput: GluestackComponent;
  export const Switch: GluestackComponent;
  export const Icon: GluestackComponent;
  export const Avatar: GluestackComponent;
  export const AvatarImage: GluestackComponent;
  export const Tabs: GluestackComponent;
  export const TabsTabList: GluestackComponent;
  export const TabsTab: GluestackComponent;
  export const TabsTabPanels: GluestackComponent;
  export const TabsTabPanel: GluestackComponent;
  export const Select: GluestackComponent;
  export const SelectTrigger: GluestackComponent;
  export const SelectInput: GluestackComponent;
  export const SelectPortal: GluestackComponent;
  export const SelectContent: GluestackComponent;
  export const SelectItem: GluestackComponent;
  export const SelectIcon: GluestackComponent;
  export const SelectDragIndicatorWrapper: GluestackComponent;
  export const SelectDragIndicator: GluestackComponent;
  export const ScrollView: GluestackComponent;
  export const BadgeText: GluestackComponent;
  export const SimpleGrid: GluestackComponent;
}
