import { GlassCard } from '@/components/layout/GlassCard';
import { palette } from '@/design/palette';
import { mockClients } from '@/components/data/mockData';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Icon } from '@/components/layout/UiIcon';

const filters = ['Ultimo aggiornamento', 'Numero soggiorni', 'Adesione newsletter', 'Stato automazioni'];

export default function ClientsListPage() {
  return (
    <VStack space="lg">
      <HStack className="items-center justify-between">
        <VStack>
          <Text className="text-2xl font-semibold" style={{ color: palette.textPrimary }}>
            Lista clienti
          </Text>
          <Text className="text-sm" style={{ color: palette.textSecondary }}>
            Visualizza stato automazioni e approfondisci il profilo di ogni ospite.
          </Text>
        </VStack>
        <Link href="/clients/add">
          <Button
            style={{
              borderRadius: 16,
              paddingHorizontal: 20,
              paddingVertical: 12,
              background: palette.surfaceAlt,
              borderColor: palette.borderHighlight,
            }}
          >
            <HStack space="sm" className="items-center">
              <Icon name="UserPlus" size={18} color={palette.accentPrimary} />
              <Text className="text-sm font-medium" style={{ color: palette.accentPrimary }}>
                Nuovo cliente
              </Text>
            </HStack>
          </Button>
        </Link>
      </HStack>
      <GlassCard>
        <HStack className="flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <HStack className="flex-1 items-center gap-4">
            <Box className="flex-1" style={{ position: 'relative' }}>
              <Input
                placeholder="Cerca per nome, email o preferenze"
                className="pl-10 pr-4 py-2 rounded-xl"
                style={{
                  backgroundColor: 'rgba(17, 24, 38, 0.65)',
                  borderColor: palette.glassStroke,
                  color: palette.textPrimary,
                }}
              />
              <Box style={{ position: 'absolute', padding: 12 }}>
                <Icon name="Search" size={16} color={palette.textMuted} />
              </Box>
            </Box>
            <Button
              style={{
                borderRadius: 14,
                paddingHorizontal: 16,
                paddingVertical: 10,
                background: 'transparent',
                borderColor: palette.borderSoft,
              }}
            >
              <HStack space="sm" className="items-center">
                <Text className="text-xs" style={{ color: palette.textSecondary }}>
                  Ordina per
                </Text>
                <Icon name="ChevronsUpDown" size={14} color={palette.textSecondary} />
              </HStack>
            </Button>
          </HStack>
          <HStack className="flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter}
                style={{
                  borderRadius: 999,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  background: 'transparent',
                  borderColor: palette.borderSoft,
                }}
              >
                <Text className="text-xs" style={{ color: palette.textSecondary }}>
                  {filter}
                </Text>
              </Button>
            ))}
          </HStack>
        </HStack>
      </GlassCard>
      <GlassCard>
        <Box className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr>
                {['Cliente', 'Ultimo soggiorno', 'Stato automazioni', 'Soggiorni', 'Newsletter', 'Azioni'].map(
                  (header) => (
                    <th
                      key={header}
                      className="text-left text-xs font-medium uppercase"
                      style={{ color: palette.textMuted }}
                    >
                      {header}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {mockClients.map((client) => (
                <tr key={client.id} style={{ background: 'rgba(5, 17, 30, 0.35)' }}>
                  <td className="rounded-l-2xl p-4">
                    <VStack space="xs">
                      <Text className="text-sm font-medium" style={{ color: palette.textPrimary }}>
                        {client.name}
                      </Text>
                      <Text className="text-xs" style={{ color: palette.textSecondary }}>
                        {client.email}
                      </Text>
                    </VStack>
                  </td>
                  <td className="p-4">
                    <Text className="text-xs" style={{ color: palette.textSecondary }}>
                      {client.lastStay}
                    </Text>
                  </td>
                  <td className="p-4">
                    <Text className="text-xs" style={{ color: palette.accentSecondary }}>
                      {client.status}
                    </Text>
                  </td>
                  <td className="p-4 text-center">
                    <Text className="text-xs" style={{ color: palette.textSecondary }}>
                      {client.stays}
                    </Text>
                  </td>
                  <td className="p-4 text-center">
                    <Text className="text-xs" style={{ color: client.newsletter ? palette.accentSecondary : palette.textMuted }}>
                      {client.newsletter ? 'Iscritto' : 'Non iscritto'}
                    </Text>
                  </td>
                  <td className="rounded-r-2xl p-4">
                    <Link href={`/clients/${client.id}`}>
                      <Button
                        style={{
                          borderRadius: 12,
                          paddingHorizontal: 16,
                          paddingVertical: 8,
                          background: 'transparent',
                          borderColor: palette.borderSoft,
                        }}
                      >
                        <HStack space="sm" className="items-center">
                          <Icon name="Eye" size={16} color={palette.textSecondary} />
                          <Text className="text-xs" style={{ color: palette.textSecondary }}>
                            Dettagli
                          </Text>
                        </HStack>
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </GlassCard>
    </VStack>
  );
}
