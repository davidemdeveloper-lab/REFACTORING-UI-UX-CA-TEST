import type { TimelineEvent } from '@/types';
import { timelineColor, formatDate } from '@/lib/utils';

interface TimelineProps {
  events: TimelineEvent[];
  orientation?: 'vertical' | 'horizontal';
}

export function Timeline({ events, orientation = 'vertical' }: TimelineProps) {
  if (orientation === 'horizontal') {
    return (
      <div className="relative flex items-start justify-between gap-6 overflow-x-auto rounded-3xl border border-white/10 bg-white/5 px-8 py-6">
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/10" />
        {events.map((event) => (
          <div key={event.id} className="relative flex min-w-[180px] flex-col items-center gap-3 text-center">
            <div
              className={`z-10 flex h-12 w-12 items-center justify-center rounded-full border ${timelineColor(event)}`}
            >
              {event.channel.toUpperCase()}
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
              {formatDate(event.timestamp, "d MMM 'alle' HH:mm")}
            </p>
            <p className="text-sm font-semibold text-white">{event.title}</p>
            {event.description && <p className="text-xs text-slate-400">{event.description}</p>}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-8 rounded-3xl border border-white/10 bg-white/5 px-6 py-8">
      <div className="absolute left-8 top-6 bottom-6 w-px bg-white/10" />
      {events.map((event, index) => (
        <div key={event.id} className="relative flex items-start gap-6">
          <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border bg-slate-900/70 text-[11px] font-semibold tracking-[0.25em] text-slate-200">
            <span>{event.channel.toUpperCase()}</span>
            <span
              className={`absolute -bottom-1.5 left-1/2 h-8 w-px -translate-x-1/2 ${
                index === events.length - 1 ? 'hidden' : 'bg-white/15'
              }`}
            />
          </div>
          <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-900/40 p-5">
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.3em] ${timelineColor(event)}`}
              >
                {event.status}
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-slate-400">
                {formatDate(event.timestamp, "d MMM yyyy '•' HH:mm")}
              </span>
            </div>
            <p className="text-base font-semibold text-white">{event.title}</p>
            {event.description && <p className="text-sm text-slate-300">{event.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
