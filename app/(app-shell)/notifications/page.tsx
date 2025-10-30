import { BellRing, Zap } from 'lucide-react';
import { notifications } from '@/data/notifications';
import { StatusPill } from '@/components/common/StatusPill';
import { formatDate } from '@/lib/utils';

const levelTone: Record<string, 'emerald' | 'amber' | 'sky' | 'rose'> = {
  success: 'emerald',
  warning: 'amber',
  info: 'sky',
  critical: 'rose',
};

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="glass-panel-soft flex flex-col gap-4 rounded-3xl border border-white/10 p-6">
        <header className="flex flex-col gap-3">
          <StatusPill label="Centro notifiche" tone="sky" />
          <h1 className="text-2xl font-semibold text-white">Rimani allineato con automazioni e alert</h1>
          <p className="text-sm text-slate-300">
            Filtra rapidamente insight provenienti da revenue, marketing, IoT e customer success.
          </p>
        </header>
        <div className="grid gap-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="glass-panel-soft flex flex-col gap-3 rounded-3xl border border-white/10 p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
                    <BellRing className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white">{notification.title}</h2>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{notification.source}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusPill label={notification.level} tone={levelTone[notification.level]} />
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {formatDate(notification.createdAt, "d MMM 'alle' HH:mm")}
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-200">{notification.description}</p>
              {notification.actionLabel && (
                <button className="self-start rounded-full border border-amber-400/50 bg-amber-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-amber-200">
                  {notification.actionLabel}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
        <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
          <Zap className="h-4 w-4" /> Suggerimento operativo
        </div>
        <p>
          Configura regole di priorità per inviare automaticamente task al team giusto quando un alert IoT resta aperto oltre le
          2 ore.
        </p>
      </div>
    </div>
  );
}
