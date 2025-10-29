'use client';

import { motion } from 'framer-motion';
import NextLink from 'next/link';
import {
  Box,
  Button,
  ButtonText,
  Card,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

const highlights = [
  {
    title: 'Gestione Centralizzata',
    description:
      'Metti in regia clienti, prenotazioni e check-in con un’unica interfaccia impeccabile.',
    icon: Sparkles,
  },
  {
    title: 'Comunicazioni Automatiche',
    description:
      'Sequenze multicanale pronte che si aggiornano in base alle azioni del cliente.',
    icon: CheckCircle2,
  },
  {
    title: 'Proposte Personalizzate',
    description:
      'Suggerimenti dinamici di upsell creati sui dati del soggiorno e sulle preferenze.',
    icon: ArrowRight,
  },
];

export default function LandingPage() {
  return (
    <Box
      px="$12"
      py="$20"
      gap="$16"
      bgColor="rgba(10, 17, 30, 0.78)"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      <HStack justifyContent="space-between" alignItems="center">
        <Box>
          <Heading size="4xl" color="$background50" maxWidth="640px">
            Benvenuto in Customer Automator
          </Heading>
          <Text
            mt="$4"
            fontSize="$xl"
            lineHeight="$2xl"
            color="rgba(226, 235, 255, 0.82)"
            maxWidth="620px"
          >
            La suite all-in-one per automatizzare la gestione di ospiti, prenotazioni e
            comunicazioni in hotel. Concentrati sull’accoglienza, al resto pensiamo noi.
          </Text>
          <HStack gap="$4" mt="$8" flexWrap="wrap">
            <Button asChild bgColor="rgba(255,255,255,0.18)" borderColor="rgba(255,255,255,0.32)" borderWidth={1}>
              <NextLink href="/dashboard">
                <HStack alignItems="center" gap="$2">
                  <ButtonText color="$background50" fontSize="$lg">
                    Accedi all’area di gestione
                  </ButtonText>
                  <Icon as={ArrowRight} color="$background50" />
                </HStack>
              </NextLink>
            </Button>
            <Button
              variant="outline"
              borderColor="rgba(255,255,255,0.36)"
              bgColor="rgba(255,255,255,0.08)"
              asChild
            >
              <NextLink href="#funzionalita">
                <ButtonText color="rgba(226,235,255,0.82)">Scopri le funzionalità</ButtonText>
              </NextLink>
            </Button>
          </HStack>
        </Box>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}
        >
          <Card
            maxWidth="420px"
            bg="linear-gradient(160deg, rgba(79,111,255,0.45) 0%, rgba(17,35,61,0.9) 100%)"
            borderColor="rgba(255,255,255,0.25)"
            borderWidth={1}
            style={{ backdropFilter: 'blur(24px)' }}
          >
            <VStack space="lg">
              <Heading size="xl" color="$background50">
                Struttura Aurora Luxury
              </Heading>
              <Text color="rgba(226,235,255,0.82)">
                42 camere connesse, punteggio ospiti 4.9/5, automazioni attive 12.
              </Text>
              <VStack space="sm">
                {['Check-in virtuale', 'Upsell SPA', 'Campagna pre-soggiorno'].map((item) => (
                  <HStack
                    key={item}
                    px="$4"
                    py="$3"
                    borderRadius="$xl"
                    bgColor="rgba(255,255,255,0.08)"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text color="$background50">{item}</Text>
                    <Icon as={CheckCircle2} color="$success400" />
                  </HStack>
                ))}
              </VStack>
              <Text fontSize="$sm" color="rgba(226,235,255,0.62)">
                Dati aggiornati ogni 15 minuti grazie alle automazioni Customer Automator.
              </Text>
            </VStack>
          </Card>
        </motion.div>
      </HStack>

      <VStack id="funzionalita" gap="$8">
        <Heading size="xl" color="$background50">
          La potenza della tua nuova control room digitale
        </Heading>
        <HStack gap="$6" flexWrap="wrap">
          {highlights.map((item) => (
            <Card
              key={item.title}
              width="min(100%, 320px)"
              bgColor="rgba(18, 27, 44, 0.86)"
              borderColor="rgba(255,255,255,0.18)"
              style={{ backdropFilter: 'blur(16px)' }}
            >
              <VStack space="sm">
                <Icon as={item.icon} color="$primary300" size="lg" />
                <Heading size="lg" color="$background50">
                  {item.title}
                </Heading>
                <Text color="rgba(226,235,255,0.78)">{item.description}</Text>
              </VStack>
            </Card>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
}
