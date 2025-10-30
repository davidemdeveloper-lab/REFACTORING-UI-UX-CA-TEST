import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { bookings, guestProfiles } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { StatusBadge } from '@/components/common/status-badge';
import { ChannelIcon } from '@/components/common/channel-icon';
import { AutomationFlow } from '@/components/common/automation-flow';
import { IoTDeviceCard } from '@/components/common/iot-device-card';
import { GlassCard } from '@/components/common/glass-card';
import { Bot, ExternalLink, NotebookPen, ShieldCheck, Sparkles } from 'lucide-react-native';

export default function ReservationDetail({ params }: { params: { id: string } }) {
  const booking = bookings.find((item) => item.id === params.id);

  if (!booking) {
    notFound();
  }

  const guest = guestProfiles.find((profile) => profile.id === booking.guestId);

  return (
    <AppShell
      title={`Dettaglio ${booking.code}`}
      description="Visione olistica di conversazioni, servizi e IoT"
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/clients/${booking.guestId}`}
            className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white/80"
          >
            Vedi cliente
          </Link>
          <button className="rounded-2xl bg-[var(--accent-color)] px-4 py-2 text-xs font-semibold text-[#07131e] shadow-md shadow-[var(--accent-glow)]">
            Invia messaggio
          </button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <GlassCard>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Riepilogo soggiorno</p>
                <h2 className="text-2xl font-semibold text-white">{guest?.name}</h2>
                <p className="text-sm text-white/70">
                  {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)} • {booking.roomType}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={booking.status} />
                <ChannelIcon channel={booking.channel} />
                <span className="badge-pill bg-white/10 text-white/70">{formatCurrency(booking.total)}</span>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/50">Camere & ospiti</p>
                <p className="mt-2 text-sm text-white/80">
                  {booking.rooms} camere — {booking.guests} ospiti
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/50">Tipologia</p>
                <p className="mt-2 text-sm text-white/80">{booking.type}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/50">Confidence AI</p>
                <p className="mt-2 text-sm text-white/80">{Math.round(booking.aiConfidence * 100)}%</p>
              </div>
            </div>
          </GlassCard>
          <AutomationFlow steps={booking.automations} />
          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <Bot size={22} color="rgba(255,255,255,0.9)" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Suggerimenti AI contestuali</p>
                <h3 className="text-lg font-semibold text-white">Risposte proattive da proporre</h3>
              </div>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-white/50">Follow-up WhatsApp</p>
                <p>
                  «Ciao {guest?.name?.split(' ')[0]}, posso prenotare la spa privata per la sera del 7 marzo e aggiungere un welcome kit per i bambini?»
                </p>
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-white/50">Upsell firma digitale</p>
                <p>
                  «Per garantire il check-in espresso, ti invio il link per completare i documenti e scegliere le fragranze in camera.»
                </p>
              </li>
            </ul>
          </GlassCard>
        </div>
        <div className="space-y-6 lg:col-span-4">
          <GlassCard>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Collegamenti rapidi</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {booking.externalLinks?.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 text-[var(--accent-color)]">
                    <ExternalLink size={16} /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </GlassCard>
          {booking.iotDevices.length ? (
            <GlassCard>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Dispositivi collegati</p>
              <div className="mt-3 space-y-3">
                {booking.iotDevices.map((device) => (
                  <IoTDeviceCard key={device.id} device={device} />
                ))}
              </div>
            </GlassCard>
          ) : null}
          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <NotebookPen size={18} color="rgba(255,255,255,0.85)" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Note operative</p>
                <h3 className="text-lg font-semibold text-white">Memo del team</h3>
              </div>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-white/50">16 feb • Concierge</p>
                <p>Richiesta champagne rosé e set-up romantico con luci soffuse.</p>
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-white/50">16 feb • AI</p>
                <p>Automazione propone upgrade navetta privata dall’aeroporto.</p>
              </li>
            </ul>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <ShieldCheck size={18} color="rgba(255,255,255,0.85)" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Guardrail attivi</p>
                <h3 className="text-lg font-semibold text-white">Controllo qualità AI</h3>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>• Escalation manuale se il cliente chiede personalizzazioni fuori catalogo.</li>
              <li>• Verifica umana per messaggi con valore superiore a 1.000€.</li>
              <li>• Analisi sentiment in tempo reale con suggerimenti tono.</li>
            </ul>
          </GlassCard>
          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <Sparkles size={18} color="rgba(255,255,255,0.85)" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Esperienza post-soggiorno</p>
                <h3 className="text-lg font-semibold text-white">Follow-up emozionale</h3>
              </div>
            </div>
            <p className="mt-3 text-sm text-white/70">
              Pianifica l’email “Ricordo del mare” con gallery fotografica personalizzata e invio voucher fedeltà.
            </p>
            <button className="mt-4 w-full rounded-2xl bg-[var(--accent-color)]/20 px-4 py-2 text-xs font-semibold text-white">
              Prepara bozza con AI
            </button>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}
