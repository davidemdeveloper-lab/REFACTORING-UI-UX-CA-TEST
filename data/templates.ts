import type { Template } from '@/types';

export const templates: Template[] = [
  {
    id: 'template-1',
    name: 'Email Offerta Hotel',
    description: 'Template per proposte soggiorno e upgrade opzionali',
    subject: 'La tua prossima esperienza al Costa Alya Resort',
    content: `<p>Cara {{ nome }},</p>
<p>Siamo felici di inviarti una proposta personalizzata per il tuo prossimo soggiorno al Costa Alya Resort.</p>
<ul>
  <li>Periodo: {{ checkIn }} - {{ checkOut }}</li>
  <li>Camera suggerita: {{ camera }}</li>
  <li>Benefit esclusivi: accesso SPA, transfer premium, colazione gourmet</li>
</ul>
<p>Conferma entro 48h per bloccare l'offerta.</p>
<p>A presto,<br/>Il tuo Concierge digitale</p>`,
    updatedAt: '2024-09-12',
  },
  {
    id: 'template-2',
    name: 'Email Conferma Prenotazione',
    description: 'Email automatica di conferma con riepilogo servizi inclusi',
    subject: 'Prenotazione confermata - Costa Alya Resort',
    content: `<p>Ciao {{ nome }},</p>
<p>La tua prenotazione è confermata. Troverai di seguito tutti i dettagli principali:</p>
<ol>
  <li>Numero prenotazione: {{ bookingId }}</li>
  <li>Check-in digitale attivo dalle 48h precedenti.</li>
  <li>Preferenze registrate: {{ preferenze }}</li>
</ol>
<p>Per qualsiasi esigenza rispondi a questa email o contattaci via WhatsApp.</p>`,
    updatedAt: '2024-09-05',
  },
  {
    id: 'template-3',
    name: 'Email Promemoria Check-in',
    description: 'Promemoria automatico 72h prima dell’arrivo',
    subject: 'Il tuo soggiorno è dietro l’angolo',
    content: `<p>Ciao {{ nome }},</p>
<p>Non vediamo l'ora di darti il benvenuto. Ricordati di completare il check-in digitale e scegliere gli extra che preferisci:</p>
<ul>
  <li>Spa ritual in coppia</li>
  <li>Esperienza gourmet al ristorante panoramico</li>
  <li>Transfer privato da/per aeroporto</li>
</ul>
<p>Fai click qui per personalizzare ora il tuo soggiorno.</p>`,
    updatedAt: '2024-09-22',
  },
];

export function getTemplateById(id: string): Template | undefined {
  return templates.find((template) => template.id === id);
}
