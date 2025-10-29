'use client';

import { useMemo, useState } from 'react';
import {
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  InputField,
  Badge,
  ScrollView,
  Button,
} from '@gluestack-ui/themed';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { templates } from '@/data/templates';
import { formatTimeDistance } from '@/utils/format';
import { GlassCard } from '@/components/common/GlassCard';

const categories = ['tutte', 'offerta', 'conferma', 'promemoria'];

export default function TemplatesPage() {
  const [category, setCategory] = useState('tutte');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTemplates = useMemo(() => {
    const normalized = searchTerm.toLowerCase();
    return templates.filter((template) => {
      const matchesCategory = category === 'tutte' || template.category === category;
      const matchesSearch =
        template.name.toLowerCase().includes(normalized) ||
        template.description.toLowerCase().includes(normalized);
      return matchesCategory && matchesSearch;
    });
  }, [category, searchTerm]);

  return (
    <ScrollView>
      <VStack space="xl">
        <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap" space="lg">
          <VStack space="xs">
            <Heading size="lg" color="white">
              Template Email
            </Heading>
            <Text color="rgba(148, 163, 184, 0.85)">
              Gestisci e modifica i messaggi automatici per le comunicazioni con i clienti.
            </Text>
          </VStack>
          <Button asChild variant="solid" bg="rgba(79, 140, 255, 0.9)" borderColor="transparent">
            <Link href="/templates/template-offerta-hotel">
              <HStack space="sm" alignItems="center">
                <Sparkles size={16} color="white" />
                <Text color="white" fontWeight="$semibold">
                  Nuovo template AI
                </Text>
              </HStack>
            </Link>
          </Button>
        </HStack>

        <HStack space="md" flexWrap="wrap" alignItems="center">
          {categories.map((item) => (
            <Button
              key={item}
              variant={category === item ? 'solid' : 'outline'}
              bg={category === item ? 'rgba(79, 140, 255, 0.85)' : 'rgba(255,255,255,0.05)'}
              borderColor={category === item ? 'transparent' : 'rgba(255,255,255,0.18)'}
              px="$4"
              py="$2"
              onPress={() => setCategory(item)}
            >
              <Text color="white" fontWeight="$semibold">
                {item === 'tutte' ? 'Tutte' : item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </Button>
          ))}
          <Input
            width={260}
            bg="rgba(255, 255, 255, 0.08)"
            borderColor="rgba(255, 255, 255, 0.2)"
            rounded="$full"
            px="$4"
          >
            <InputField
              placeholder="Cerca template"
              value={searchTerm}
              onChangeText={setSearchTerm}
              color="rgba(226,232,240,0.92)"
            />
          </Input>
        </HStack>

        <HStack space="lg" flexWrap="wrap">
          {filteredTemplates.map((template) => (
            <GlassCard key={template.id} flexBasis="320px" flexGrow={1}>
              <VStack space="md">
                <HStack justifyContent="space-between" alignItems="center">
                  <Text color="rgba(226,232,240,0.95)" fontWeight="$semibold">
                    {template.name}
                  </Text>
                  <Badge variant="outline" borderColor="rgba(79,140,255,0.5)" bg="rgba(79,140,255,0.12)">
                    <Text color="#8CB6FF">{template.category.toUpperCase()}</Text>
                  </Badge>
                </HStack>
                <Text color="rgba(148,163,184,0.85)" fontSize="$sm">
                  {template.description}
                </Text>
                <Text color="rgba(148,163,184,0.75)" fontSize="$xs">
                  Aggiornato {formatTimeDistance(template.updatedAt)}
                </Text>
                <Link href={`/templates/${template.id}`}>
                  <Text color="rgba(148,163,184,0.9)" fontSize="$sm">
                    Apri editor →
                  </Text>
                </Link>
              </VStack>
            </GlassCard>
          ))}
        </HStack>
      </VStack>
    </ScrollView>
  );
}
