'use client';

import { CommunicationEvent } from '@/types';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { MessageSquare, Mail, PhoneCall, MessageCircle } from 'lucide-react';

const iconMap = {
  email: Mail,
  sms: MessageCircle,
  whatsapp: MessageSquare,
  telefonata: PhoneCall,
};

export function Timeline({ events }: { events: CommunicationEvent[] }) {
  return (
    <ol className="relative flex flex-col gap-6 before:absolute before:bottom-0 before:left-5 before:top-1 before:w-px before:bg-white/20">
      {events.map((event) => {
        const Icon = iconMap[event.channel];
        return (
          <li key={event.id} className="relative flex gap-4 pl-12">
            <span className="absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur">
              <Icon className="h-4 w-4 text-white/80" strokeWidth={1.7} />
            </span>
            <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-semibold text-white">{event.title}</p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-widest text-white/60">
                  {event.channel}
                </span>
                <span className="text-xs text-white/50">
                  {format(new Date(event.at), "d MMMM yyyy '·' HH:mm", { locale: it })}
                </span>
              </div>
              <p className="text-sm text-white/70">{event.note}</p>
              <p className="text-xs text-white/50">{event.actor}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
