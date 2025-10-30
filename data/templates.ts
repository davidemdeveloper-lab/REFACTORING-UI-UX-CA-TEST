import type { Template } from '@/types';

export const templates: Template[] = [
  {
    id: 'tmp-early-bird',
    name: 'Email Offerta Hotel',
    description:
      'Coinvolgi prospect con tariffe dinamiche, disponibilità camere premium e benefit esclusivi.',
    category: 'offerte',
    updatedAt: '2025-01-02T09:00:00Z',
    subject: 'Offerta Aurora Resort ✨ - prenota prima e risparmia il 20%',
    previewHtml:
      '<h1 style="margin:0 0 12px;color:#0f172a;font-family:Geist,sans-serif;">Gentile Matia Rossi</h1><p style="margin:0 0 8px;color:#334155;">La ringraziamo per aver scelto Alpine Abyss Resort. Qui sotto trova la sua proposta personalizzata.</p>',
    content: `Gentile {{cliente.nome}},\n\nGrazie per aver scelto {{hotel.nome}}.\n\nI tuoi dati\n- Check-in: {{prenotazione.checkIn}}\n- Check-out: {{prenotazione.checkOut}}\n- Camera: {{prenotazione.camera}}\n\nInformazioni sul soggiorno\n{{#if prenotazione.servizi}}\nServizi inclusi:\n{{#each prenotazione.servizi}}\n- {{this}}\n{{/each}}\n{{/if}}\n\nRichieste speciali\n{{prenotazione.note}}\n\nA presto,\nIl team {{hotel.nome}}`,
    blocks: [
      {
        label: 'Variabile Cliente',
        description: 'Accedi ai dati del CRM e personalizza saluti e messaggi.',
        type: 'variabile',
      },
      {
        label: 'Loop Servizi',
        description: 'Itera i servizi acquistati o suggeriti nel soggiorno.',
        type: 'loop',
      },
      {
        label: 'Condizione Upsell',
        description: 'Mostra blocchi dinamici se il cliente è VIP o ha voucher.',
        type: 'condizione',
      },
    ],
  },
  {
    id: 'tmp-confirm',
    name: 'Email Conferma Prenotazione',
    description:
      'Template base per confermare in modo elegante prenotazioni e upgrade acquistati.',
    category: 'pre-stay',
    updatedAt: '2025-01-04T12:10:00Z',
    subject: 'Conferma prenotazione - il tuo soggiorno è ufficiale!',
    previewHtml:
      '<p style="margin:0;color:#334155;font-family:Geist,sans-serif;">La tua prenotazione è confermata. Trovi dettagli e suggerimenti in allegato.</p>',
    content: `Ciao {{cliente.nome}},\n\nSiamo felici di confermare la tua prenotazione dal {{prenotazione.checkIn}} al {{prenotazione.checkOut}}.\n\nDettagli camera: {{prenotazione.camera}}\nImporto garantito: {{prenotazione.importo}}\n\nRicordati di completare il pre check-in online e di segnalarci eventuali intolleranze.\n\nA prestissimo!`,
    blocks: [
      {
        label: 'Richiamo pre stay',
        description: 'Suggerisci azioni prioritarie (pre check-in, preferenze camera).',
        type: 'blocco',
      },
    ],
  },
  {
    id: 'tmp-checkin',
    name: 'Email Promemoria Check-in',
    description: 'Mantieni alto il tasso di check-in online e raccogli informazioni rilevanti.',
    category: 'pre-stay',
    updatedAt: '2025-01-06T18:45:00Z',
    subject: 'Manca poco al tuo arrivo: completa il pre check-in',
    previewHtml:
      '<p style="margin:0;color:#334155;font-family:Geist,sans-serif;">Completa il pre check-in per saltare la fila al tuo arrivo.</p>',
    content: `Gentile {{cliente.nome}},\n\nPer offrirti un check-in senza attese completa ora il form digitale.\nTi dedicheremo una corsia preferenziale e prepareremo la camera con le tue preferenze.\n\nSe hai dubbi rispondi pure a questa email o scrivici su WhatsApp.`,
    blocks: [
      {
        label: 'CTA Pre Check-in',
        description: 'Call to action con link personalizzato per il pre check-in.',
        type: 'blocco',
      },
    ],
  },
];
