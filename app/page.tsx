'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Badge,
  Divider,
  ScrollView,
} from '@gluestack-ui/themed';
import { ArrowRight, Bot, CalendarClock, Sparkles, Workflow } from 'lucide-react';

const featureCards: { title: string; description: string; icon: ReactNode }[] = [
  {
    title: 'Gestione Centralizzata',
    description:
      'Un’unica cabina di regia per comunicazioni, automazioni e insight operativi sulle strutture.',
    icon: <Workflow size={28} color="var(--feature-icon-color, #8CB6FF)" />, 
  },
  {
    title: 'Comunicazioni Intelligenti',
    description:
      'Sequenze omnicanale con timeline visive e fallback automatici per prevenire le perdite.',
    icon: <Bot size={28} color="var(--feature-icon-color, #70D6FF)" />, 
  },
  {
    title: 'Proposte Personalizzate',
    description:
      'Template dinamici e motore di raccomandazione per upselling istantaneo sulle prenotazioni.',
    icon: <Sparkles size={28} color="var(--feature-icon-color, #FFB347)" />, 
  },
];

const highlightMetrics: { label: string; value: string; caption: string }[] = [
  { label: 'Riduzione no-show', value: '-32%', caption: 'campagna automatizzata di reminder' },
  { label: 'Tempi di risposta', value: '2m 10s', caption: 'media delle chat concierge' },
  { label: 'Conversione offerte', value: '+18%', caption: 'rispetto alla messaggistica manuale' },
];

export default function LandingPage() {
  return (
    <ScrollView>
      <Box
        px="$6"
        py="$12"
        sx={{
          width: '100%',
          maxWidth: 1280,
          marginHorizontal: 'auto',
        }}
      >
        <GlassHero />
        <Divider my="$12" opacity={0.15} />
        <FeatureSection />
        <Divider my="$12" opacity={0.15} />
        <MetricSection />
        <Divider my="$12" opacity={0.15} />
        <CTASection />
      </Box>
    </ScrollView>
  );
}

const GlassHero = () => (
  <Box
    px="$8"
    py="$12"
    bg="rgba(15, 23, 42, 0.65)"
    rounded="$2xl"
    borderWidth={1}
    borderColor="var(--glass-border)"
    shadowColor="transparent"
    sx={{
      backdropFilter: 'blur(var(--glass-blur))',
      boxShadow: 'var(--glass-shadow)',
    }}
  >
    <VStack space="lg">
      <Badge
        alignSelf="flex-start"
        variant="solid"
        bg="rgba(79, 140, 255, 0.15)"
        borderColor="transparent"
      >
        <HStack space="md" alignItems="center">
          <CalendarClock size={18} color="#8CB6FF" />
          <Text fontWeight="$semibold" color="white">
            Concierge AI per ospiti e staff
          </Text>
        </HStack>
      </Badge>
      <Heading size="3xl" color="white" fontFamily="var(--font-serif)">
        Customer Automator
      </Heading>
      <Text size="lg" maxWidth="720px" color="rgba(226, 232, 240, 0.88)">
        Dalla landing all’esperienza in camera: orchestri ogni touchpoint con clienti, team e dispositivi IoT.
        Le tue strutture diventano organismi digitali proattivi.
      </Text>
      <HStack space="lg" flexWrap="wrap">
        <Button asChild variant="solid" bg="rgba(79, 140, 255, 0.9)" borderColor="transparent">
          <Link href="/dashboard">
            <HStack space="md" alignItems="center">
              <Text color="white" fontWeight="$semibold">
                Accedi all’area di gestione
              </Text>
              <ArrowRight size={18} color="white" />
            </HStack>
          </Link>
        </Button>
        <Button
          variant="outline"
          borderColor="rgba(255, 255, 255, 0.35)"
          bg="rgba(255, 255, 255, 0.04)"
          action="secondary"
          asChild
        >
          <Link href="/templates">
            <Text color="rgba(226, 232, 240, 0.85)" fontWeight="$medium">
              Esplora i template dinamici
            </Text>
          </Link>
        </Button>
      </HStack>
    </VStack>
  </Box>
);

const FeatureSection = () => (
  <VStack space="lg">
    <Heading size="2xl" color="white">
      Tutto l’ecosistema ospitalità sotto controllo
    </Heading>
    <HStack space="lg" flexWrap="wrap">
      {featureCards.map((feature) => (
        <Box
          key={feature.title}
          flexBasis="320px"
          flexGrow={1}
          px="$6"
          py="$8"
          bg="rgba(15, 23, 42, 0.6)"
          rounded="$xl"
          borderWidth={1}
          borderColor="rgba(255, 255, 255, 0.1)"
          sx={{
            backdropFilter: 'blur(calc(var(--glass-blur) - 6px))',
            transition: 'transform 320ms ease, border 320ms ease',
          }}
          _hover={{
            borderColor: 'rgba(79, 140, 255, 0.45)',
            transform: 'translateY(-6px)',
          }}
        >
          <VStack space="md">
            <HStack space="md" alignItems="center">
              {feature.icon}
              <Heading size="lg" color="white">
                {feature.title}
              </Heading>
            </HStack>
            <Text color="rgba(226, 232, 240, 0.82)" lineHeight="$lg">
              {feature.description}
            </Text>
          </VStack>
        </Box>
      ))}
    </HStack>
  </VStack>
);

const MetricSection = () => (
  <Box
    px="$6"
    py="$8"
    rounded="$2xl"
    borderWidth={1}
    borderColor="rgba(255, 255, 255, 0.08)"
    bg="linear-gradient(120deg, rgba(15,23,42,0.7) 0%, rgba(12,22,37,0.6) 100%)"
    sx={{ backdropFilter: 'blur(calc(var(--glass-blur) - 4px))' }}
  >
    <Heading size="xl" color="white" mb="$6">
      Risultati osservati dagli early adopters
    </Heading>
    <HStack space="lg" flexWrap="wrap">
      {highlightMetrics.map((metric) => (
        <VStack
          key={metric.label}
          flexBasis="200px"
          flexGrow={1}
          px="$4"
          py="$5"
          rounded="$xl"
          bg="rgba(255, 255, 255, 0.04)"
          borderWidth={1}
          borderColor="rgba(255, 255, 255, 0.12)"
          space="sm"
        >
          <Text color="rgba(226, 232, 240, 0.75)" fontWeight="$medium">
            {metric.label}
          </Text>
          <Heading size="xl" color="#8CB6FF">
            {metric.value}
          </Heading>
          <Text size="sm" color="rgba(148, 163, 184, 0.85)">
            {metric.caption}
          </Text>
        </VStack>
      ))}
    </HStack>
  </Box>
);

const CTASection = () => (
  <Box
    px="$8"
    py="$10"
    rounded="$2xl"
    bg="rgba(255, 255, 255, 0.08)"
    borderWidth={1}
    borderColor="rgba(255, 255, 255, 0.2)"
    sx={{ backdropFilter: 'blur(var(--glass-blur))' }}
  >
    <VStack space="lg" alignItems="flex-start">
      <Heading size="xl" color="white">
        Pronto a stupire gli ospiti con un concierge aumentato?
      </Heading>
      <Text maxWidth="680px" color="rgba(226, 232, 240, 0.85)">
        Collega Customer Automator al PMS, configura i template e lascia che l’intelligenza suggerisca il prossimo
        passo ideale per ogni ospite.
      </Text>
      <Button
        asChild
        variant="solid"
        bg="rgba(79, 140, 255, 0.9)"
        borderColor="transparent"
      >
        <Link href="/dashboard">
          <HStack space="md" alignItems="center">
            <Text color="white" fontWeight="$semibold">
              Prosegui verso la dashboard
            </Text>
            <ArrowRight size={18} color="white" />
          </HStack>
        </Link>
      </Button>
    </VStack>
  </Box>
);
