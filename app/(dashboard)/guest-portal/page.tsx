import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { Icon } from '@/components/ui/icon';
import { Sparkles, Wifi, Bath, ConciergeBell } from 'lucide-react-native';

export default function GuestPortalPage() {
  return (
    <div className="glass-panel p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <Text className="text-sm uppercase tracking-[0.3em] text-white/60">Esperienza ospite</Text>
          <Text className="mt-2 font-space-grotesk text-2xl text-white">Wireframe portale digitale</Text>
          <Text className="text-xs text-white/50">Un’unica interfaccia mobile-friendly per il cliente: chat, servizi e guida soggiorno.</Text>
        </div>
        <Button className="self-start rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/70">
          Condividi anteprima
        </Button>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <Text className="font-space-grotesk text-lg text-white">Struttura dell’app</Text>
          <div className="mt-4 space-y-4 text-sm text-white/70">
            <div>
              <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Header</Text>
              <p>Logo della struttura, data di arrivo, countdown al check-in.</p>
            </div>
            <div>
              <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Card riepilogo</Text>
              <p>Numero camera, ospiti, stato pagamenti, link chat diretta.</p>
            </div>
            <div>
              <Text className="text-xs uppercase tracking-[0.3em] text-white/50">Sezioni principali</Text>
              <ul className="mt-2 space-y-2">
                <li>• Chat con AI Concierge & operatori</li>
                <li>• Prenotazione servizi (spa, ristorante, transfer)</li>
                <li>• Documenti viaggio e password Wi-Fi</li>
                <li>• Suggerimenti personalizzati basati su preferenze</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <Text className="font-space-grotesk text-lg text-white">Componenti chiave</Text>
          <VStack space="md" className="mt-4">
            <PortalTile icon={Sparkles} title="Chat Concierge" description="Canale unico con risposte AI, storico conversazioni e quick actions." />
            <PortalTile icon={Wifi} title="Utility" description="Wi-Fi, mappe della struttura, richieste housekeeping on-demand." />
            <PortalTile icon={Bath} title="Benessere" description="Prenota spa, massaggi e servizi in camera con disponibilità reale." />
            <PortalTile icon={ConciergeBell} title="Esperienze" description="Suggerimenti dinamici per tour, ristoranti, attività family-friendly." />
          </VStack>
        </div>
      </div>
    </div>
  );
}

function PortalTile({ icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/70">
      <Box className="rounded-full border border-white/10 bg-white/5 p-3">
        <Icon as={icon} size="sm" color="rgba(255,255,255,0.8)" />
      </Box>
      <div>
        <Text className="font-space-grotesk text-lg text-white">{title}</Text>
        <Text className="text-sm text-white/70">{description}</Text>
      </div>
    </div>
  );
}
