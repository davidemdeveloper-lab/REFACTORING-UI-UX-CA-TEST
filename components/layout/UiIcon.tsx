'use client';

import { memo } from 'react';
import * as Icons from 'lucide-react-native';
import { palette } from '@/design/palette';
import { SvgProps } from 'react-native-svg';

interface UiIconProps {
  name: keyof typeof Icons;
  size?: number;
  color?: string;
  opacity?: number;
}

const UiIconComponent = ({ name, size = 20, color = palette.textSecondary, opacity = 1 }: UiIconProps) => {
  const LucideIcon = Icons[name] as React.ComponentType<SvgProps> | undefined;

  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon width={size} height={size} color={color} opacity={opacity} />;
};

export const Icon = memo(UiIconComponent);
