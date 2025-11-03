'use client';

import { memo } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { navigationItems } from '@/constants/navigation';
import { SidebarRoute } from '@/store/slices/uiSlice';

type SidebarProps = {
  activeRoute: SidebarRoute;
  onNavigate?: (route: SidebarRoute) => void;
};

function SidebarComponent({ activeRoute, onNavigate }: SidebarProps) {
  const router = useRouter();

  const handleNavigate = (route: SidebarRoute, href: string) => {
    onNavigate?.(route);
    router.push(href);
  };

  return (
    <Box className="sticky top-0 hidden h-screen w-[228px] shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-8 shadow-sm md:flex">
      <VStack space="lg" className="flex-1">
        <Box>
          <Text className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[var(--color-neutral-600)]">
            Customer Automator
          </Text>
          <Text className="mt-1 text-xl font-semibold text-[var(--color-neutral-900)]">
            Central Hotel
          </Text>
        </Box>
        <VStack space="xs">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = item.route === activeRoute;
            return (
              <Pressable
                key={item.route}
                onPress={() => handleNavigate(item.route, item.href)}
                accessibilityRole="button"
                accessibilityLabel={`Vai a ${item.label}`}
              >
                <Box
                  className={`flex-row items-center gap-3 rounded-xl px-4 py-2.5 transition-all duration-150 ${
                    isActive
                      ? 'bg-[rgba(196,123,44,0.18)] shadow-sm'
                      : 'bg-transparent hover:bg-[rgba(196,123,44,0.08)]'
                  }`}
                >
                  <IconComponent
                    size={20}
                    color={
                      isActive
                        ? 'var(--color-primary-600)'
                        : 'rgba(99, 112, 128, 1)'
                    }
                  />
                  <Text
                    className={`text-sm font-semibold ${
                      isActive
                        ? 'text-[var(--color-primary-600)]'
                        : 'text-[var(--color-neutral-600)]'
                    }`}
                  >
                    {item.label}
                  </Text>
                </Box>
              </Pressable>
            );
          })}
        </VStack>
        <Box className="mt-auto rounded-2xl bg-[rgba(196,123,44,0.1)] px-4 py-5">
          <Text className="text-sm font-semibold text-[var(--color-primary-600)]">
            Coccola i tuoi ospiti
          </Text>
          <Text className="mt-1.5 text-xs leading-5 text-[var(--color-neutral-600)]">
            Riepilogo rapido di clienti prioritari, note di turno e notifiche
            vive per il team.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}

export const Sidebar = memo(SidebarComponent);
