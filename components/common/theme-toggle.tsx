'use client';

import { useThemeAccent } from '@/components/theme/theme-provider';
import { Button } from '@/components/ui/button';
import { ButtonText } from '@/components/ui/button';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { MoonStar, Sun } from 'lucide-react-native';

export function ThemeToggle() {
  const { mode, toggleMode } = useThemeAccent();
  const isDark = mode === 'dark';
  return (
    <Button
      size="sm"
      variant="outline"
      action="secondary"
      onPress={toggleMode}
      className="flex-row items-center gap-2 rounded-2xl border border-white/10 bg-background-0/40 px-4 py-3"
    >
      <Box className="rounded-xl bg-primary-500/20 p-2">
        {isDark ? (
          <Sun color="rgb(var(--color-primary-500))" size={18} />
        ) : (
          <MoonStar color="rgb(var(--color-primary-500))" size={18} />
        )}
      </Box>
      <Box className="items-start">
        <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">
          {isDark ? 'Tema' : 'Tema'}
        </Text>
        <ButtonText className="text-sm font-semibold text-typography-0">
          {isDark ? 'Notte Metallica' : 'Aurora Chiara'}
        </ButtonText>
      </Box>
    </Button>
  );
}
