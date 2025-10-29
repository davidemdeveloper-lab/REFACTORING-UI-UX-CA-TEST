'use client';

import { notifications } from '@/data/notifications';
import { PageHeader } from '@/components/common/PageHeader';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { BellRing, Check } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Notifiche"
        description="Controlla automazioni, alert tecnici e aggiornamenti importanti"
        actions={
          <Button action="secondary" variant="outline" size="md" className="border-white/20 bg-white/5">
            <ButtonIcon as={Check} className="text-white/70" />
            <ButtonText className="text-white">Segna tutto come letto</ButtonText>
          </Button>
        }
      />
      <div className="space-y-4">
        {notifications.map((notification) => (
          <article
            key={notification.id}
            className={`flex flex-col gap-3 rounded-3xl border px-5 py-4 transition ${
              notification.read
                ? 'border-white/10 bg-white/5 text-white/70'
                : 'border-[#f29c50]/40 bg-[#f29c50]/15 text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                  <BellRing className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{notification.title}</h3>
                  <p className="text-xs text-white/60">{notification.time}</p>
                </div>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/50">
                {notification.category}
              </span>
            </div>
            <p className="text-sm">{notification.description}</p>
            {notification.action ? (
              <button className="self-start text-xs font-semibold text-[#f29c50]">
                {notification.action}
              </button>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
