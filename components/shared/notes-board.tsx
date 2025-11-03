'use client';

import { ReactNode } from 'react';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Note } from '@/types';

type NotesBoardProps = {
  notes: Note[];
  title?: string;
  onCreateNote?: () => void;
  actionSlot?: ReactNode;
};

const presetColors: Record<Note['preset'], string> = {
  Turno: 'bg-[rgba(59,130,246,0.14)] text-[#1d4ed8]',
  'Oggetto smarrito': 'bg-[rgba(236,118,46,0.16)] text-[#c2410c]',
  'Richiesta cliente': 'bg-[rgba(22,163,74,0.18)] text-[#15803d]',
  Manutenzione: 'bg-[rgba(239,68,68,0.18)] text-[#b91c1c]',
};

export function NotesBoard({
  notes,
  title = 'Note condivise',
  onCreateNote,
  actionSlot,
}: NotesBoardProps) {
  return (
    <Box className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-5 shadow-[var(--shadow-card)]">
      <HStack className="items-center justify-between pb-4">
        <Box>
          <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
            {title}
          </Text>
          <Text className="mt-1 text-xs uppercase tracking-[0.3em] text-[var(--color-neutral-600)]">
            Turni · richieste · problemi aperti
          </Text>
        </Box>
        {actionSlot ??
          (onCreateNote ? (
            <Button
              size="sm"
              action="primary"
              variant="outline"
              className="border-[var(--color-primary-600)] bg-transparent px-4 py-2"
              onPress={onCreateNote}
            >
              <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                Aggiungi nota
              </Text>
            </Button>
          ) : null)}
      </HStack>
      <VStack space="md">
        {notes.map((note) => (
          <Box
            key={note.id}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4"
          >
            <HStack className="items-center justify-between">
              <Badge
                size="sm"
                action="muted"
                className={`rounded-full px-3 py-1 text-xs font-semibold ${presetColors[note.preset]}`}
              >
                <Text className="text-xs font-semibold text-[var(--color-neutral-900)]">
                  {note.preset}
                </Text>
              </Badge>
              <Text className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-neutral-600)]">
                {new Date(note.createdAt).toLocaleString('it-IT', {
                  day: '2-digit',
                  month: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </HStack>
            <Text className="mt-3 text-base font-semibold text-[var(--color-neutral-900)]">
              {note.title}
            </Text>
            <Text className="mt-2 text-sm leading-6 text-[var(--color-neutral-600)]">
              {note.content}
            </Text>
            <HStack className="mt-4 flex-row flex-wrap gap-2">
              <Badge
                size="sm"
                action="muted"
                className="rounded-full bg-[rgba(148,163,184,0.18)] px-3 py-1 text-xs font-semibold text-[var(--color-neutral-600)]"
              >
                <Text className="text-xs font-semibold text-[var(--color-neutral-600)]">
                  Stato · {note.status}
                </Text>
              </Badge>
              <Badge
                size="sm"
                action="muted"
                className="rounded-full bg-[rgba(196,123,44,0.12)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-600)]"
              >
                <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
                  {note.createdBy}
                </Text>
              </Badge>
              {note.tags.map((tag) => (
                <Badge
                  key={`${note.id}-${tag}`}
                  size="sm"
                  action="muted"
                  className="rounded-full bg-[rgba(31,122,77,0.16)] px-3 py-1 text-xs font-semibold text-[#0f766e]"
                >
                  <Text className="text-xs font-semibold text-[#0f766e]">
                    {tag}
                  </Text>
                </Badge>
              ))}
            </HStack>
          </Box>
        ))}
        {notes.length === 0 ? (
          <Box className="items-center justify-center rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-background)] px-4 py-10">
            <Text className="text-sm text-[var(--color-neutral-600)]">
              Nessuna nota in questa sezione.
            </Text>
          </Box>
        ) : null}
      </VStack>
    </Box>
  );
}
