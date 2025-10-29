# Customer Automator

Applicazione front-end realizzata con Next.js (App Router) e TypeScript per digitalizzare la gestione dei clienti alberghieri. L'interfaccia sfrutta GlueStack UI v3 con un tema "metal-glassy" personalizzato, mock data realistici e componenti pensati per le principali esigenze operative.

## Caratteristiche principali
- **Landing page** dedicata alla presentazione del prodotto.
- **Dashboard** con stato clienti, comunicazioni recenti e panoramica delle prenotazioni.
- Gestione **Clienti**: elenco, creazione veloce e dettaglio con timeline delle interazioni.
- Flusso **Prenotazioni**: lista, nuova segnalazione di prenotazione persa e dettaglio con comunicazioni.
- Gestione **Template email** con editor drag & drop, anteprima e blocchi logici.
- **Chat** con layout a tre colonne per conversazioni dirette o legate alle prenotazioni.
- Centro **Notifiche** per aggiornamenti operativi e flotta **IoT** per dispositivi connessi.
- Stato utente leggero con Zustand per preferenze locali.

## Struttura del progetto
```
app/              # Routing Next.js con layout pubblici e autenticati
components/       # Componenti UI riutilizzabili e layout
data/             # Mock data tipizzati
stores/           # Stato locale (Zustand)
theme/            # Configurazione GlueStack UI
lib/              # Utility condivise
```

## Requisiti
- Node.js 18+
- npm (o pnpm/yarn) per la gestione dei pacchetti

## Script disponibili
```bash
npm run dev        # Avvia il server di sviluppo su http://localhost:3000
npm run build      # Compila il progetto per la produzione
npm run start      # Avvia il server in modalità production
npm run lint       # Esegue ESLint con la configurazione personalizzata
npm run typecheck  # Verifica i tipi TypeScript
```

## Mock data e integrazioni
Tutti i dati sono fittizi e generati localmente. Non sono presenti integrazioni reali con servizi esterni: l'app è pronta per collegarsi ad API reali tramite fetch o client GraphQL restando però totalmente stand-alone.

## Accessibilità e UX
- Colori e contrasti ottimizzati per la leggibilità.
- Navigazione da tastiera curata per menu laterale e controlli principali.
- Rispetto dell'impostazione `prefers-reduced-motion` per animazioni.

## Licenza
Questo repository è distribuito con licenza MIT. Consulta il file `LICENSE` (se presente) o definisci la licenza desiderata prima del rilascio pubblico.
