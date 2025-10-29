import { Template } from '@/types';

export const templates: Template[] = [
  {
    id: 't1',
    name: 'Email Offerta Hotel',
    description: 'Template per proporre upgrade e servizi aggiuntivi ai lead caldi.',
    category: 'offerta',
    updatedAt: '2025-03-11',
    subject: 'La tua esperienza su misura al Costa Azure Resort',
    previewData: {
      nome: 'Giovanni',
      struttura: 'Costa Azure Resort',
      arrival: '5 aprile 2025',
    },
    html: `<h1>Gentile {{nome}},</h1>
<p>La aspettiamo al {{struttura}} il {{arrival}}. Abbiamo riservato per lei una selezione di upgrade esclusivi:</p>
<ul>
  <li>Accesso spa panoramica</li>
  <li>Transfer privato con champagne di benvenuto</li>
  <li>Cena degustazione 6 portate</li>
</ul>
<p>Confermi entro 48 ore per assicurarti la disponibilità.</p>`,
  },
  {
    id: 't2',
    name: 'Email Conferma Prenotazione',
    description: 'Sequenza automatica post-pagamento per rassicurare gli ospiti.',
    category: 'prenotazione',
    updatedAt: '2025-03-13',
    subject: 'La tua prenotazione è confermata – Benvenuto!',
    previewData: {
      nome: 'Francesca',
      room: 'Suite Presidenziale',
      checkIn: '1 maggio',
    },
    html: `<h1>Conferma prenotazione</h1>
<p>Ciao {{nome}},</p>
<p>La tua {{room}} ti aspetta dal {{checkIn}}. Puoi completare il pre-check-in digitale cliccando qui sotto.</p>
<p>Hai bisogno di supporto? Il nostro concierge digitale risponde in tempo reale.</p>`,
  },
  {
    id: 't3',
    name: 'Email Promemoria Check-in',
    description: "Promemoria automatizzato 72h prima dell'arrivo con suggerimenti di esperienza.",
    category: 'promemoria',
    updatedAt: '2025-03-09',
    subject: 'Manca poco al tuo soggiorno – Personalizza il tuo arrivo',
    previewData: {
      nome: 'Luigi',
      upgrade: 'Late check-out',
      code: 'CA-8732',
    },
    html: `<h1>È quasi ora, {{nome}}!</h1>
<p>Completa il tuo arrivo anticipando preferenze e scegliendo extra come {{upgrade}}.</p>
<p>Codice ospite: {{code}}</p>
<p>Ti aspettiamo.</p>`,
  },
];
