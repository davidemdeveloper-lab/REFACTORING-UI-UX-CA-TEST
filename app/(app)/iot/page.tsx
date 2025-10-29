import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { GlassCard, GlassPanel } from '@/components/common/glass-card';
import { PageHeader } from '@/components/common/page-header';
import { Button, ButtonText } from '@/components/ui/button';
import { iotWidgets, reservations } from '@/lib/mock-data';
import { StatusPill } from '@/components/common/status-pill';
import { GaugeCircle, Power, Settings } from 'lucide-react-native';

export default function IoTPage() {
  const groupedByRoom = iotWidgets.reduce<Record<string, typeof iotWidgets>>((acc, widget) => {
    const room = widget.room;
    acc[room] = acc[room] ? [...acc[room], widget] : [widget];
    return acc;
  }, {});

  return (
    <Box className="flex flex-col gap-8">
      <PageHeader
        title="IoT & Comfort"
        subtitle="Controlla i dispositivi delle camere, monitora comfort e attiva scenari automatici."
        actions={
          <Button size="md" action="primary" className="rounded-2xl bg-primary-500 px-6 py-3">
            <Settings color="rgb(var(--color-typography-0))" size={18} />
            <ButtonText className="font-semibold text-typography-0">Configura dispositivi</ButtonText>
          </Button>
        }
      />

      <GlassPanel className="grid gap-6 p-8 lg:grid-cols-[1.6fr_1fr]">
        <Box className="flex flex-col gap-4">
          {Object.entries(groupedByRoom).map(([room, devices]) => (
            <GlassCard key={room} padding="p-6" className="bg-background-0/40">
              <Box className="flex items-center justify-between">
                <Box>
                  <Text className="text-xl font-semibold text-typography-0">{room}</Text>
                  <Text className="text-xs text-typography-300">
                    Collegata a {reservations.find((res) => res.roomType.includes(room.split(' ')[0]))?.guestName ?? 'N/D'}
                  </Text>
                </Box>
                <StatusPill label={`${devices.length} sensori`} tone="info" />
              </Box>
              <Box className="mt-4 grid gap-3 md:grid-cols-2">
                {devices.map((device) => (
                  <GlassCard key={device.id} padding="p-4" className="bg-background-0/30">
                    <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">{device.metric}</Text>
                    <Text className="text-2xl font-semibold text-typography-0">
                      {device.value}
                      {device.unit ? ` ${device.unit}` : ''}
                    </Text>
                    <StatusPill
                      label={device.status === 'ok' ? 'Stabile' : device.status === 'warning' ? 'Attenzione' : 'Critico'}
                      tone={device.status === 'ok' ? 'success' : device.status === 'warning' ? 'warning' : 'danger'}
                    />
                    {typeof device.trend === 'number' ? (
                      <Text className={`text-xs ${device.trend > 0 ? 'text-success-400' : 'text-warning-400'}`}>
                        Trend {device.trend > 0 ? '+' : ''}
                        {device.trend}
                        {typeof device.value === 'number' ? '%' : ''}
                      </Text>
                    ) : null}
                    <Button size="sm" variant="outline" action="secondary" className="mt-3 rounded-2xl border-white/20 px-4 py-2">
                      <Power color="rgb(var(--color-primary-500))" size={16} />
                      <ButtonText className="text-sm font-semibold text-typography-0">Toggle dispositivo</ButtonText>
                    </Button>
                  </GlassCard>
                ))}
              </Box>
            </GlassCard>
          ))}
        </Box>
        <GlassCard padding="p-6" className="bg-background-0/30">
          <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">Scenari rapidi</Text>
          <Box className="mt-4 flex flex-col gap-3 text-sm text-typography-200">
            <Box className="rounded-2xl border border-white/10 bg-background-0/40 p-3">
              <Text className="text-sm font-semibold text-typography-0">Accoglienza romantica</Text>
              <Text className="text-xs text-typography-300">
                Luci soffuse, temperatura 22°C, playlist lounge, minibar rifornito.
              </Text>
            </Box>
            <Box className="rounded-2xl border border-white/10 bg-background-0/40 p-3">
              <Text className="text-sm font-semibold text-typography-0">Business focus</Text>
              <Text className="text-xs text-typography-300">
                Illuminazione smart, scrivania pronta, reminder meeting sul portale ospite.
              </Text>
            </Box>
            <Button variant="outline" action="secondary" size="sm" className="rounded-2xl border-white/20 px-4 py-2">
              <GaugeCircle color="rgb(var(--color-primary-500))" size={16} />
              <ButtonText className="text-sm font-semibold text-typography-0">Crea scenario personalizzato</ButtonText>
            </Button>
          </Box>
        </GlassCard>
      </GlassPanel>
    </Box>
  );
}
