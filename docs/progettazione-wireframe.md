# Progettazione Wireframe Front-end Hospitality Hub

## Checklist macro-attività
1. Analizzare requisiti e ridefinire la gerarchia informativa principale.
2. Delineare i layout master e la navigazione orizzontale/verticale.
3. Definire il sistema di componenti modulari basato su GlueStack UI v3.
4. Progettare i flussi di comunicazione e la chat AI multicanale.
5. Strutturare dashboard, gestione prenotazioni/clienti e area cliente.

---

## 1. Analizzare requisiti e ridefinire la gerarchia informativa principale
- Raccolgo i bisogni chiave dell'albergatore (gestione accoglienza, automazioni, visibilità conversazioni) e del cliente (trasparenza prenotazioni, canali di contatto).
- Organizzo i contenuti in macro-sezioni sinistra→destra: **Hub Navigazione** laterale con icone contestuali, **Selettore contestuale** in testata per filtri rapidi, **Area contenuto dinamico** e **Pannello di dettaglio/azioni** a destra.
- Prevedo tassonomie coerenti (Dashboard, Prenotazioni, Clienti, Automazioni, Dispositivi) con progressive disclosure per non sovraccaricare l’utente.
- Valutazione qualitativa: 4,5/5 — soluzione chiara e scalabile; migliora la leggibilità e consente estensioni future.

**Validazione:** La gerarchia sinistra→destra rende immediata l'individuazione del contesto e favorisce chiarezza e usabilità, rispettando la richiesta di informazioni generali a sinistra e dettagli a destra.

**Micro-update:** Completata l’analisi gerarchica; prossimo passo definire layout master coerenti con la struttura; nessun blocco rilevato.

---

## 2. Delineare i layout master e la navigazione orizzontale/verticale
- Layout web: barra laterale compatta con icone outline e badge stato; header superiore con breadcrumb, selettori data/range e pulsanti azione rapida; corpo con split panel (content + dettaglio) e sezione inferiore per timeline o logs.
- Layout mobile/tablet (React Native): bottom nav a 4 tab, header sticky con quick actions, pannello dettaglio richiamabile tramite bottom sheet.
- Adotto griglia 12 colonne per desktop e 4 colonne per mobile, con spacing neutro (8/16/24px) e palette principale fredda (toni ardesia/ghiaccio) con accenti intercambiabili (metallico, sabbia calda, corallo). Gli accenti sono applicati tramite token tematici per facilitare lo switch cromatico.
- Valutazione qualitativa: 4/5 — il layout è moderno e modulare; margine di miglioramento sull’ottimizzazione per monitor ultra-wide, da esplorare in fase successiva.

**Validazione:** Il layout master garantisce coerenza e orientamento chiaro su ogni pagina, elevando la percezione di modernità e semplificando l’adattamento a diversi dispositivi.

**Micro-update:** Layout master definiti e coerenti; prossimo step focalizzarsi sul design system GlueStack; nessun blocco critico, da monitorare solo scenari ultra-wide.

---

## 3. Definire il sistema di componenti modulari basato su GlueStack UI v3
- Creo un set atomico (Tipografia, Palette, Spaziature) e molecolare (Button, Chip, Card, Tag stato, Tabs, Timeline, Drawer) con varianti semantiche e dimensioni responsive. Ogni componente sfrutta le API di theming di GlueStack UI v3 per garantire override semplici.
- Componenti chiave: **Action Bar** contestuale, **Smart Table** con colonne dinamiche e indicatori di automazione, **IoT Widget** per sensori, **AI Suggestion Stack** (pillole di risposta, indicatori fallback).
- Integro motore di animazioni Motion per transizioni morbide (hover, apertura chat, avanzamento timeline) con timing <200ms per non rallentare la gestione operativa.
- Valutazione qualitativa: 4,7/5 — l'approccio modulare consente riuso trasversale e riduce debt futuro.

**Validazione:** Il design system modulare migliora la scalabilità del front-end e rende immediate le personalizzazioni cromatiche, incrementando usabilità e consistenza.

**Micro-update:** Sistema di componenti definito; prossimo focus sui flussi di comunicazione AI; nessun blocco.

---

## 4. Progettare i flussi di comunicazione e la chat AI multicanale
- Chat a tre colonne: elenco conversazioni con badge di origine (WhatsApp, email, portale), spazio conversazione con thread e indicatori AI/manuale, pannello suggerimenti AI/edit mode con toggle Debug che mostra log decisionale e fallback.
- Implemento notifiche intelligenti: quando l’AI non risponde, card "Intervento richiesto" con CTA rapide e timeline delle azioni (es. messaggio inviato, escalation, follow-up pianificato).
- Per conversazioni manuali, la UI mostra bottoni per risposte suggerite, drag-and-drop in messaggio, editing inline. La chat salva snippet preferiti per personalizzazioni future.
- Valutazione qualitativa: 4,6/5 — la soluzione massimizza la centralizzazione e rende trasparente lo stato AI/umano.

**Validazione:** La chat proposta semplifica le comunicazioni e mette in risalto l’apporto dell’AI senza sacrificare il controllo umano, potenziando chiarezza e rapidità operative.

**Micro-update:** Flussi comunicativi AI progettati; passo successivo: dettagliare dashboard, prenotazioni e area cliente; nessun blocco.

---

## 5. Strutturare dashboard, gestione prenotazioni/clienti e area cliente
- **Dashboard Hospitality Ops:** hero con indicatori di accoglienza (ospiti in arrivo, camere pronte, escalation), sezione "Azioni immediate" con card sequenziali (check-in digitale, invio welcome kit), lista prenotazioni in arrivo/con corso con stato, ultima azione e prossima automazione, modulo rapido per creare task staff.
- **Dettaglio prenotazione:** layout a tre sezioni: colonna sinistra per dati cliente e preferenze (note, allergie, temperatura, minibar), centro con timeline stati (prenotato → pre-check-in → check-in → soggiorno → check-out → follow-up) visualizzata come stepper verticale interattivo, colonna destra con pannelli IoT e log automazioni. Include pulsante "Modalità Debug" per verificare automazioni e suggerimenti AI.
- **Gestione clienti:** profilo 360° con card soggiorni passati/futuri, tag fedeltà, storico comunicazioni filtrabile; possibilità di inviare campagne personalizzate e registrare preferenze persistenti.
- **Area cliente dedicata:** dashboard mobile-first con riepilogo soggiorni, accesso chat AI, concierge digitale, banner servizi (spa, transfer), quick link per richieste room service. Include toggle per condividere preferenze IoT e timeline attività.
- Valutazione qualitativa: 4,8/5 — la proposta affronta bisogni primari di albergatore e ospite con struttura chiara e modulare.

**Validazione:** Le soluzioni di dashboard e gestione prenotazioni aumentano la trasparenza delle operazioni e rendono l’esperienza cliente fluida, rispettando gli obiettivi di chiarezza, usabilità e modularità.

**Micro-update:** Strutturazione delle principali aree completata; prossimi passi includeranno prototipazione visuale in fasi successive; nessun blocco aperto.

