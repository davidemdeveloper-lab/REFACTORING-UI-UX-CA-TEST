import Link from 'next/link';
import { Box, VStack, HStack, Text, Button } from '@gluestack-ui/themed';
import { GlassPanel } from '@/components/common/GlassPanel';
import { palette } from '@/theme/palette';

const testimonials = [
  {
    author: 'TripAdvisor',
    quote: '“Customer Automator ha aumentato il tasso di risposta del 45% nelle nostre strutture partner.”'
  },
  {
    author: 'Booking.com',
    quote: '“Automazioni chiare, esperienza ospite senza frizioni: una combinazione vincente.”'
  }
];

const features = [
  {
    title: 'Co-pilota AI per hospitality',
    description:
      'Automazioni e suggerimenti proattivi per prenotazioni, upsell e comunicazioni multi-canale.'
  },
  {
    title: 'Esperienza metal-glassy',
    description:
      'Interfaccia premium pensata per direttori d’hotel e revenue manager, sempre accessibile e reattiva.'
  },
  {
    title: 'Integrazione IoT e MADIP',
    description:
      'Dati ambientali, comandi stanza e servizi ancillari in un’unica vista sincrona.'
  }
];

export default function LandingPage() {
  return (
    <Box as="main" px={24} py={32}>
      <VStack space="xl" alignItems="center">
        <GlassPanel padding={32} className="hero" borderless>
          <VStack space="md" maxWidth={760} textAlign="center">
            <Text fontSize={46} fontWeight="800" lineHeight="120%">
              Customer Automator
            </Text>
            <Text fontSize={18} color={palette.steel[100]}>
              La piattaforma metal-glassy che unisce intelligenza artificiale, automazioni e IoT per un
              hospitality personalizzato e scalabile.
            </Text>
            <HStack space="md" justifyContent="center" flexWrap="wrap">
              <Link href="/dashboard">
                <Button size="lg" action="primary">
                  Entra nel dashboard
                </Button>
              </Link>
              <Link href="/landing#features">
                <Button size="lg" variant="outline">
                  Scopri di più
                </Button>
              </Link>
            </HStack>
          </VStack>
        </GlassPanel>
        <VStack id="features" space="lg" maxWidth={960}>
          <Text fontSize={28} fontWeight="700" textAlign="center">
            Perché gli hotel scelgono Customer Automator
          </Text>
          <HStack space="md" flexWrap="wrap" justifyContent="center">
            {features.map((feature) => (
              <GlassPanel key={feature.title} padding={24} className="feature" style={{ maxWidth: 300 }}>
                <Text fontSize={18} fontWeight="700">
                  {feature.title}
                </Text>
                <Text fontSize={14} mt={8} color={palette.steel[200]}>
                  {feature.description}
                </Text>
              </GlassPanel>
            ))}
          </HStack>
        </VStack>
        <VStack space="md" maxWidth={820} textAlign="center">
          <Text fontSize={26} fontWeight="700">
            Testimonianze dal settore
          </Text>
          <HStack space="md" flexWrap="wrap" justifyContent="center">
            {testimonials.map((testimonial) => (
              <GlassPanel key={testimonial.author} padding={24} className="testimonial" style={{ maxWidth: 380 }}>
                <Text fontSize={16} fontStyle="italic">
                  {testimonial.quote}
                </Text>
                <Text fontSize={14} mt={8} color={palette.teal[400]}>
                  {testimonial.author}
                </Text>
              </GlassPanel>
            ))}
          </HStack>
        </VStack>
        <GlassPanel padding={24} className="cta" style={{ maxWidth: 720 }}>
          <HStack space="md" alignItems="center" justifyContent="space-between" flexWrap="wrap">
            <VStack flex={1} minWidth={260}>
              <Text fontSize={22} fontWeight="700">
                Pronto a far brillare la tua struttura?
              </Text>
              <Text fontSize={14} color={palette.steel[200]}>
                Attiva il cockpit operativo e coordina marketing, sales e guest experience in un solo click.
              </Text>
            </VStack>
            <Link href="/dashboard">
              <Button size="lg" action="primary">
                Entra nel dashboard
              </Button>
            </Link>
          </HStack>
        </GlassPanel>
        <Text fontSize={12} color={palette.steel[300]} textAlign="center">
          © {new Date().getFullYear()} Customer Automator · Designed for timeless hospitality
        </Text>
      </VStack>
    </Box>
  );
}
