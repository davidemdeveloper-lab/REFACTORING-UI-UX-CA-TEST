import type { Template, TemplateBlock } from '@/types';

export const templateBlocks: TemplateBlock[] = [
  {
    id: 'block-guest-name',
    label: 'Nome Ospite',
    type: 'variabile',
    preview: '{{ospite.nome}}',
  },
  {
    id: 'block-stay-loop',
    label: 'Loop Servizi',
    type: 'loop',
    preview: '{% for servizio in soggiorno.servizi %}...{% endfor %}',
  },
  {
    id: 'block-condition-upgrade',
    label: 'Condizione Upgrade',
    type: 'condizione',
    preview: '{% if soggiorno.upgradeDisponibile %}Upgrade esclusivo{% endif %}',
  },
];

export const templates: Template[] = [
  {
    id: 'template-offerta-hotel',
    name: 'Email Offerta Hotel',
    description: 'Template per proporre upgrade e servizi aggiuntivi con dati dinamici.',
    category: 'offerta',
    updatedAt: '2025-01-16T09:20:00Z',
    previewHtml: `<h2 style="margin:0;color:#0f172a;font-family:var(--font-serif);">Ciao {{ospite.nome}},</h2>
<p style="color:#273349;line-height:1.6;">Ti aspettiamo all'Aurora Sky Suites. Abbiamo riservato per te:</p>
<ul style="padding-left:16px;color:#1f2937;">
  <li>Check-in espresso digitale</li>
  <li>Accesso lounge panoramica</li>
  <li>Upgrade a Suite Skyline se confermi entro 24 ore</li>
</ul>
<p style="color:#273349;">Rispondi a questa email o scrivici su WhatsApp per personalizzare ulteriormente il soggiorno.</p>`,
    variables: ['ospite.nome', 'soggiorno.dataArrivo', 'offerta.upgrade'],
  },
  {
    id: 'template-conferma-prenotazione',
    name: 'Email Conferma Prenotazione',
    description: 'Conferma automatica con riepilogo chiaro e invito al pre check-in.',
    category: 'conferma',
    updatedAt: '2025-01-08T11:50:00Z',
    previewHtml: `<h2 style="margin:0;color:#0f172a;font-family:var(--font-serif);">Prenotazione confermata!</h2>
<p style="color:#273349;">Soggiorno dal {{soggiorno.checkIn}} al {{soggiorno.checkOut}} presso Aurora Sky Suites.</p>
<p style="color:#273349;">Completa ora il pre check-in per saltare le code.</p>`,
    variables: ['soggiorno.checkIn', 'soggiorno.checkOut'],
  },
  {
    id: 'template-promemoria-checkin',
    name: 'Email Promemoria Check-in',
    description: 'Promemoria elegante per invitare gli ospiti al check-in digitale.',
    category: 'promemoria',
    updatedAt: '2025-01-19T17:05:00Z',
    previewHtml: `<p style="color:#273349;">Ciao {{ospite.nome}},</p>
<p style="color:#273349;">Manca poco al tuo arrivo. Il check-in digitale è pronto: bastano 2 minuti.</p>
<p style="color:#273349;">Ti aspettiamo con un welcome drink firmato dallo Chef.</p>`,
    variables: ['ospite.nome'],
  },
];
