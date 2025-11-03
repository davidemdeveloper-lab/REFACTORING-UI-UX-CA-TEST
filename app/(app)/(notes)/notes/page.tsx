// Scopo: organizzare le note post-it per preset e assegnarle rapidamente al team.
'use client';

import { useMemo } from 'react';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageToolbar } from '@/components/shared/page-toolbar';
import { useGetNotesQuery } from '@/services/mockApi';
import { Note, NotePreset } from '@/types';

const columns: { preset: NotePreset; title: string; description: string }[] = [
  {
    preset: 'Turno',
    title: 'Note di turno',
    description: 'Passaggio di consegne tra turni e promemoria rapidi.',
  },
  {
    preset: 'Richiesta cliente',
    title: 'Richieste clienti',
    description: 'Personalizzazioni, preferenze e follow-up prioritari.',
  },
  {
    preset: 'Manutenzione',
    title: 'Manutenzione',
    description: 'Segnalazioni tecniche e ticket con problema aperto.',
  },
  {
    preset: 'Oggetto smarrito',
    title: 'Oggetti smarriti',
    description: 'Cose recuperate e in attesa di riconsegna.',
  },
];

function NoteCard({ note }: { note: Note }) {
  return (
    <Box className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4 shadow-sm">
      <Text className="text-sm font-semibold text-[var(--color-neutral-900)]">
        {note.title}
      </Text>
      <Text className="mt-2 text-xs leading-5 text-[var(--color-neutral-600)]">
        {note.content}
      </Text>
      <HStack className="mt-4 flex-row flex-wrap gap-2">
        <Badge
          size="sm"
          action="muted"
          className="rounded-full bg-[rgba(148,163,184,0.18)] px-3 py-1 text-xs font-semibold text-[var(--color-neutral-600)]"
        >
          <Text className="text-xs font-semibold text-[var(--color-neutral-600)]">
            {note.createdBy}
          </Text>
        </Badge>
        <Badge
          size="sm"
          action="muted"
          className="rounded-full bg-[rgba(196,123,44,0.16)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-600)]"
        >
          <Text className="text-xs font-semibold text-[var(--color-primary-600)]">
            Stato · {note.status}
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
  );
}

export default function NotesPage() {
  const { data: notes = [] } = useGetNotesQuery();

  const groupedNotes = useMemo(() => {
    const map: Record<NotePreset, Note[]> = {
      Turno: [],
      'Richiesta cliente': [],
      Manutenzione: [],
      'Oggetto smarrito': [],
    };
    notes.forEach((note) => {
      map[note.preset].push(note);
    });
    return map;
  }, [notes]);

  return (
    <Box className="pb-16">
      <PageToolbar
        searchPlaceholder="Cerca note per turno, tag o assegnatario..."
        primaryActionLabel="Crea nuova nota"
        onPrimaryAction={() => {}}
      />
      <HStack className="gap-6 overflow-x-auto pb-4">
        {columns.map((column) => (
          <Box
            key={column.preset}
            className="min-w-[260px] flex-1 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-5 shadow-[var(--shadow-card)]"
          >
            <Text className="text-lg font-semibold text-[var(--color-neutral-900)]">
              {column.title}
            </Text>
            <Text className="mt-1 text-xs uppercase tracking-[0.3em] text-[var(--color-neutral-600)]">
              {column.description}
            </Text>
            <VStack space="md" className="mt-5">
              {groupedNotes[column.preset].map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
              {groupedNotes[column.preset].length === 0 ? (
                <Box className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-background)] px-4 py-8">
                  <Text className="text-center text-xs text-[var(--color-neutral-600)]">
                    Nessuna nota in questa colonna.
                  </Text>
                </Box>
              ) : null}
            </VStack>
            <Button
              size="sm"
              variant="outline"
              action="default"
              className="mt-4 w-full border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <Text className="text-xs font-semibold text-[var(--color-neutral-600)]">
                Aggiungi nota {column.preset.toLowerCase()}
              </Text>
            </Button>
          </Box>
        ))}
      </HStack>
    </Box>
  );
}

// mock: notesMock
// actions: createNote(preset), assignNote(noteId)
// assumptions: board drag & drop non implementato, layout mock
