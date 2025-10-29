import { GlassPanel } from '@/components/app/glass-panel';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Sparkles, Send, CalendarPlus, ClipboardList } from '@/components/icons';

const channels = ['Email', 'WhatsApp', 'SMS', 'Chat AI'];

export default function NewClientPage() {
  return (
    <Box className="flex flex-col gap-8">
      <GlassPanel
        title="Accogli un nuovo ospite"
        subtitle="Prepara la proposta perfetta collegando automazioni, canali e IoT camera."
      >
        <Box className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Box className="lg:col-span-3">
            <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {["Nome", "Cognome", "Email", "Telefono"].map((label) => (
                <Box key={label} className="flex flex-col gap-2">
                  <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">
                    {label}
                  </Text>
                  <input
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-typography-0 placeholder:text-typography-500 focus:border-primary-400 focus:outline-none"
                    placeholder={`Inserisci ${label.toLowerCase()}`}
                  />
                </Box>
              ))}
              <Box className="sm:col-span-2 flex flex-col gap-2">
                <Text className="text-xs uppercase tracking-[0.4em] text-typography-400">
                  Note personalizzazione
                </Text>
                <textarea
                  className="h-24 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-typography-0 placeholder:text-typography-500 focus:border-primary-400 focus:outline-none"
                  placeholder="Indica preferenze, allergie o esperienze richieste"
                />
              </Box>
            </Box>
          </Box>
          <Box className="flex flex-col gap-4 lg:col-span-2">
            <Box className="rounded-3xl border border-white/10 bg-black/20 px-5 py-4">
              <Text className="text-sm font-semibold text-typography-0">
                Canali di onboarding
              </Text>
              <Box className="mt-3 flex flex-wrap gap-2">
                {channels.map((channel) => (
                  <Badge key={channel}>
                    <BadgeText className="rounded-full bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-typography-200">
                      {channel}
                    </BadgeText>
                  </Badge>
                ))}
              </Box>
            </Box>
            <Box className="rounded-3xl border border-white/10 bg-black/20 px-5 py-4">
              <Text className="text-sm font-semibold text-typography-0">
                Template suggeriti
              </Text>
              <Box className="mt-3 flex flex-col gap-2 text-xs text-typography-300">
                <Box className="flex flex-row items-center gap-2">
                  <Sparkles size={14} color="rgb(var(--color-primary-300))" />
                  <Text>Welcome VIP con upsell SPA</Text>
                </Box>
                <Box className="flex flex-row items-center gap-2">
                  <Sparkles size={14} color="rgb(var(--color-primary-300))" />
                  <Text>Pre check-in digitale multilingua</Text>
                </Box>
                <Box className="flex flex-row items-center gap-2">
                  <Sparkles size={14} color="rgb(var(--color-primary-300))" />
                  <Text>Follow-up recensione TripAdvisor</Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </GlassPanel>

      <GlassPanel
        title="Azioni iniziali"
        subtitle="Coordina comunicazioni, attività interne e dispositivi camera."
      >
        <Box className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Box className="rounded-3xl border border-white/10 bg-black/20 px-5 py-4">
            <Text className="text-sm font-semibold text-typography-0">
              Sequenza comunicazioni
            </Text>
            <Box className="mt-3 flex flex-col gap-2 text-xs text-typography-300">
              <Text>• Email conferma con firma digitale</Text>
              <Text>• WhatsApp pre-arrivo con upsell transfer</Text>
              <Text>• Automazione AI per preferenze camera</Text>
            </Box>
            <Button variant="outline" action="secondary" className="mt-4 border-white/15 px-4">
              <ButtonIcon as={ClipboardList} />
              <ButtonText className="text-typography-100">
                Modifica timeline
              </ButtonText>
            </Button>
          </Box>
          <Box className="rounded-3xl border border-white/10 bg-black/20 px-5 py-4">
            <Text className="text-sm font-semibold text-typography-0">
              Attività interne
            </Text>
            <Box className="mt-3 flex flex-col gap-2 text-xs text-typography-300">
              <Text>• Blocco camera 701 con priorità VIP</Text>
              <Text>• Prepara welcome kit detox + amenities</Text>
              <Text>• Allerta concierge per transfer privato</Text>
            </Box>
            <Button variant="outline" action="secondary" className="mt-4 border-white/15 px-4">
              <ButtonIcon as={CalendarPlus} />
              <ButtonText className="text-typography-100">
                Crea to-do
              </ButtonText>
            </Button>
          </Box>
          <Box className="rounded-3xl border border-white/10 bg-black/20 px-5 py-4">
            <Text className="text-sm font-semibold text-typography-0">
              IoT & comfort camera
            </Text>
            <Box className="mt-3 flex flex-col gap-2 text-xs text-typography-300">
              <Text>• Temperatura iniziale 21°C</Text>
              <Text>• Minibar premium pronto al 90%</Text>
              <Text>• Accendi luci scenografiche all'arrivo</Text>
            </Box>
            <Button action="primary" className="mt-4 bg-primary-500/30 px-4">
              <ButtonIcon as={Send} />
              <ButtonText className="text-typography-0">
                Invia automazioni
              </ButtonText>
            </Button>
          </Box>
        </Box>
      </GlassPanel>
    </Box>
  );
}

// Validazione: form accoglienza cliente con sezioni automazioni, canali e IoT come da specifiche.
