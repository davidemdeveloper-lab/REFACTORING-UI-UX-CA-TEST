'use client';

import Link from 'next/link';
import { HStack, Text } from '@gluestack-ui/themed';
import { ChevronRight } from 'lucide-react';
import { palette } from '@/theme/palette';

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => (
  <HStack alignItems="center" space="xs" aria-label="Breadcrumb">
    {items.map((item, index) => (
      <HStack key={item.label} alignItems="center" space="xs">
        {item.href ? (
          <Link href={item.href}>
            <Text fontSize={12} color={palette.accent[400]}>
              {item.label}
            </Text>
          </Link>
        ) : (
          <Text fontSize={12} color={palette.steel[200]}>
            {item.label}
          </Text>
        )}
        {index < items.length - 1 ? <ChevronRight size={14} color={palette.steel[300]} aria-hidden /> : null}
      </HStack>
    ))}
  </HStack>
);
