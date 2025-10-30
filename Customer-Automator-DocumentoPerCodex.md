# Customer Automator – Specifiche operative per Codex

---

## 0. Scopo del documento

Questo documento è pensato per essere **letto ed eseguito da un modello** (Codex / GPT con accesso al repository) e non da un utente finale. Per questo motivo:

* dichiariamo in modo esplicito il contesto e il perché del lavoro;
* blocchiamo le decisioni già prese (non devono essere rinegoziate dal modello);
* descriviamo testualmente lo stato attuale dell’interfaccia così da eliminare ambiguità sugli screenshot;
* forniamo un **framework di lavoro** da eseguire ogni volta che si implementa una pagina o una feature;
* elenchiamo lo **stack tecnico autorizzato** e le convenzioni di progetto;
* definiamo le **feature da implementare** con priorità e dipendenze;
* chiudiamo con un **piano operativo** che dice in che ordine generare le schermate e con quali vincoli.
  Se trovi differenze tra questo testo e ciò che deduci dalle immagini o dal codice esistente, **questo testo ha priorità più alta**.

---

## 1. Contesto e obiettivo

**Nome applicativo:** Customer Automator
**Dominio:** hospitality / hotel / catena alberghiera
**Utente principale:** albergatore / receptionist / backoffice
**Utente secondario:** ospite finale (solo per Guest Portal)

### 1.1 Problema da risolvere

L’applicativo attuale è funzionante dal punto di vista delle funzioni di base (lista clienti, lista prenotazioni, timeline delle comunicazioni, gestione dei template email), ma è stato sviluppato in **periodi differenti**, con **livelli di qualità visiva diversi** e **senza un design system dichiarato**. Questo comporta che:

* i layout sono piatti e non guidano l’occhio;
* i filtri sono tutti esposti contemporaneamente anche quando non servono;
* gli spazi e i margini cambiano da pagina a pagina;
* alcuni nomi non rispecchiano il dominio reale (es. “stato ultimo soggiorno” invece di **stato della comunicazione**);
* l’albergatore non percepisce che l’app lo sta aiutando a “coccolare” il cliente, ma solo che l’app gli mostra dei dati.

### 1.2 Motivazione di business

Il cliente ha rivisto l’interfaccia dopo tempo e l’ha percepita **vecchia** e **poco usabile**. L’azienda vuole:

1. dimostrare che il prodotto è vivo e mantenuto;
2. migliorare l’esperienza dell’hotel attuale;
3. portare l’interfaccia a un livello tale da poterla **rivendere** ad altre strutture in modo più semplice.

### 1.3 Obiettivo del redesign

Ricostruire **l’intero front-end** su un branch che contiene solo la base **Gluestack UI v3**, seguendo un concept unico:

> **“L’app ti fa coccolare il cliente con meno sforzo cognitivo.”**

Questo implica:

* ridurre i click per arrivare alle informazioni importanti;
* portare nella stessa vista il contesto (dati, comunicazioni, note, priorità);
* suggerire azioni e risposte già pronte;
* mantenere colori e gerarchie coerenti;
* predisporre la UI a nuove funzioni (chat unificata, centro notifiche, IoT, guest portal).

---

## 2. Fotografia dell’esistente (AS-IS)

Questa sezione è la **fonte di verità** sullo stato attuale dell’app. Serve per compensare eventuali errori di lettura degli screenshot.

> **Regola:** se la tua analisi delle immagini non coincide con questa descrizione, usa questa descrizione.

### 2.1 Dashboard attuale

* Due blocchi principali: **Stato Clienti** (tabella) e **Prenotazioni** (card verticali). L’ordine è corretto dal punto di vista del dominio ma la resa è piatta.
* Mancano una sezione **“oggi / da fare”** e gli indicatori di urgenza.
* Sidebar con: Home, Clienti, Template, Newsletters, Prenotazioni, più un toggle dark mode non contestualizzato.
* Nessuna azione rapida sulle tabelle; paginazione nascosta.

### 2.2 Lista clienti

* Pagina pensata per **ricercare e consultare** clienti esistenti.
* Grande blocco filtri con criteri di ordinamento, filtri temporali, stato cliente e newsletter **tutti visibili**.
* Search presente ma non primaria.
* Colonne corrette (Cliente, Ultimo aggiornamento, Stato comunicazione, N. soggiorni, Newsletter) ma con naming migliorabile e senza badge.
* Problema principale: i filtri non sono raggruppati per logica (tempo / stato / marketing).

### 2.3 Dettaglio cliente

* Contiene: anagrafica, lista prenotazioni, timeline comunicazioni, link recensioni.
* Azioni principali (aggiungi prenotazione, modifica, elimina) hanno lo stesso peso visivo anche se hanno rischio diverso.
* Timeline è una buona idea ma ha uno stile troppo giocoso e non coerente con il resto.
* Tutto è sullo stesso livello: manca la struttura a 2 colonne (contenuto + pannello laterale).

### 2.4 Lista prenotazioni

* Stesso impianto della lista clienti ma con soggetto “prenotazione”.
* Filtri e search non ordinati, poca leggibilità.
* Ogni prenotazione mostra numero, cliente, date, stanze, ospiti, importo e stato pagamento.
* È una pagina **utility**: va tenuta e resa coerente.

### 2.5 Dettaglio prenotazione

* Riassunto in alto con dati operativi (check-in, check-out, n. camere, n. ospiti, stato pagamento, metodo).
* Sotto: timeline di comunicazione (va unificata con quella del cliente).
* Utile, da mantenere, ma con componente timeline condiviso.

### 2.6 Template email (lista)

* Pagina più recente e più pulita.
* Card per template con nome, descrizione, data modifica, “apri in editor”.
* Mancano search e stato (bozza/attivo) ma la base è buona.

### 2.7 Editor template

* Layout a 3 zone: blocchi (sx), canvas (centro), proprietà (dx).
* Toolbar troppo vicina al canvas: spostare in alto.
* È il miglior riferimento visivo dell’attuale applicativo.

---

## 3. Framework di lavoro per Codex

Questa è la procedura da eseguire **ogni volta** che generi o modifichi una pagina. Non saltare passaggi.

### 3.1 Regole base

1. **Lavora per pagina o componente**, mai per “tutto insieme”. Ogni ciclo deve chiudere qualcosa di navigabile.
2. **Direzione sinistra → destra** obbligatoria: a sinistra elementi generali/elenco, al centro contenuto, a destra dettagli/timeline/note/IoT.
3. **Nessun backend collegato:** tutti i dati sono mock e vivono in file separati (`/mocks/...`).
4. **Stack fisso:** Next.js 16, Gluestack UI v3, Redux Toolkit + RTK Query, icone compatibili. Nient’altro.
5. **Stop rule sulle duplicazioni:** se riscrivi la stessa card o la stessa timeline, fermati e crea un componente condiviso.
6. **Documento > screenshot:** in caso di dubbio, prevale questo documento.

### 3.2 Step obbligatori

**Step 0 – Carica il contesto**

* Leggi gli screenshot.
* Leggi questo documento.
* Allinea i nomi dei campi.

**Step 1 – Definisci lo scopo**
Aggiungi in cima al file un commento del tipo: `// Scopo: mostrare al receptionist le prenotazioni di oggi e permettere l'apertura del dettaglio`.
Se non riesci a riassumere lo scopo in una riga, la pagina è troppo generica → spezzala.

**Step 2 – Disegna il layout logico**

* Decidi 2 o 3 colonne.
* Se è chat → 3 colonne obbligatorie.
* Metti sempre in alto: search + filtri + azione primaria.

**Step 3 – Implementa con Gluestack**

* Usa `Box`, `VStack`, `HStack`, `Card`, `Button`, `Input`, `Badge`, `ScrollView`.
* Usa i token disponibili (`$background`, `$primary500`, `$muted700`, `$lg`, `$4`).
* Non hardcodare valori se esiste un token.
* I componenti grandi vanno separati in `components/`.

**Step 4 – Verifica**

* Testo leggibile su superfici chiare.
* Almeno 1 azione primaria.
* Dati mock provenienti da file separato.
* Nessun `TODO:` senza spiegazione.

**Step 5 – Documenta**
In coda al file scrivi:

* quali mock usi: `// mock: customersMock`;
* quali azioni vanno collegate in seguito: `// actions: openCustomerDetail(id)`;
* quali assunzioni hai fatto.

### 3.3 Best practice di progetto

* **Pochi colori, ben scelti** (less is more).
* **Nessun codice duplicato.**
* **Naming identico** su tutte le pagine: “Prossimo invio” non può diventare “Prossimo evento”.
* **Responsive by default**: Gluestack è anche mobile, non usare layout rigidi.
* **Contrast AA** per i testi su superfici colorate.
* **Ogni pagina deve avere qualcosa da fare** (bottone, link, azione).

---

## 4. Stack tecnico e convenzioni

**Stack autorizzato:**

* Next.js 16 (App Router)
* React 19.x
* Gluestack UI v3 (presente nel branch di partenza)
* Redux Toolkit + RTK Query
* Icone: Lucide o compatibili
* Framer Motion (solo micro-animazioni)

**Perché questo stack:**

* è moderno, supportato e compatibile con Context7;
* è adatto alla generazione di UI cross-device;
* è facilmente mantenibile dal team FE.

**Routing suggerito:**

* `app/(dashboard)/dashboard/page.tsx`
* `app/(customers)/customers/page.tsx`
* `app/(customers)/customers/[id]/page.tsx`
* `app/(bookings)/bookings/page.tsx`
* `app/(bookings)/bookings/[id]/page.tsx`
* `app/(comms)/chat/page.tsx`
* `app/(settings)/templates/page.tsx`
* `app/(settings)/templates/[id]/page.tsx`
* `app/(extra)/guest-portal/page.tsx`
* `app/(extra)/iot/page.tsx`

Se trovi una struttura diversa nella repo, **mappa** questi percorsi sulla struttura esistente mantenendo i nomi delle pagine.

---

## 5. Linee di design e componenti comuni

### 5.1 Pilastro visivo

* Tema chiaro “hotel”: bianco/sabbia + arancio/marrone come primary.
* Verde solo per stati positivi (pagato, confermato, riuscito).
* Layering/glass **solo** per pannelli e widget (non per liste e tabelle).
* Spaziatura 8-based: 4 / 8 / 12 / 16 / 24.
* Direzione sinistra → destra sempre.

### 5.2 Componenti da creare una sola volta

1. **Timeline comunicazioni**

   * evento, descrizione, data, stato (inviato / pianificato / fallito), azioni (reinvia, apri);
   * usata in: Dettaglio cliente, Dettaglio prenotazione, pannello destro Chat;
   * stile identico in tutti i contesti.
2. **Card elenco (cliente/prenotazione)**

   * titolo (nome cliente o “Prenotazione n° …”);
   * riga info (date, stanze, ospiti, importo);
   * badge stato;
   * azione a destra (icona o “…”).
3. **Note / Post-it**

   * testo libero;
   * preset: `turno`, `oggetto smarrito`, `richiesta cliente`, `manutenzione`;
   * target: dashboard / cliente / prenotazione;
   * ricercabili per preset;
   * possono generare il tag “Problema aperto”.
4. **Centro notifiche**

   * icona in header;
   * lista notifiche con tipo e azione;
   * deve ricevere: AI fallback, cliente ad alta attenzione, nota assegnata, IoT fuori soglia.
5. **Tag cliente**

   * manuali: VIP, Famiglia, Coppia, Allergie;
   * da evento: Problema aperto (creato da azione “Segnala problema”);
   * da AI: suggerito → l’utente lo conferma.

### 5.3 IoT (UI only)

* **Dashboard → card “Comfort camere”**: mostra la % di stanze nel range ideale (es. “87% camere in comfort”).
* **Dashboard → card “Minibar da riempire”**: mostra quante stanze hanno minibar sotto soglia (es. “3 stanze: 204, 305, 411”).
* **Dettaglio prenotazione → mini card IoT**: slider temperatura + percentuale minibar.
* **Menu → voce “IoT”**: porta a pagina mock con elenco stanze e stato.
* Nessuna integrazione reale: è front-end dimostrativo.

### 5.4 Guest Portal (UI only)

* Pagina separata, mobile-first.
* Card per: Prenota ristorante, Prenota spa, Escursioni, Prodotti tipici, Contatti hotel.
* Se IoT è disponibile → card “Imposta temperatura camera”.
* È pensata per l’ospite, non per l’albergatore: stile più “public” ma coerente col tema.

---

## 6. Feature da implementare

### 6.1 Core (obbligatorie)

1. **Chat unificata**

   * layout a 3 colonne (sx: conversazioni, centro: messaggi, dx: pannello cliente);
   * canali: Booking (email trasformata in chat), email, futuro WhatsApp;
   * ogni conversazione è legata a un cliente esistente;
   * nel pannello destro mostra: dati cliente, tag, timeline comunicazioni, note.
2. **AI in chat con suggerimenti e fallback**

   * se l’intento è chiaro → proponi la risposta;
   * se l’intento non è chiaro → genera 2–3 suggerimenti cliccabili/modificabili;
   * se non riesci a rispondere → crea una notifica nel centro notifiche;
   * sotto l’input mostra 2–3 azioni rapide fisse (Invia orari hotel, Invia link app ospite, Invia recap prenotazione).
3. **Note / Post-it contestuali**

   * widget in dashboard per info di turno;
   * sezione note in dettaglio cliente e prenotazione;
   * preset nota (turno, oggetto smarrito, richiesta cliente, manutenzione);
   * le note possono generare il tag “Problema aperto”.
4. **Clienti ad alta attenzione / priorità**

   * regole minime: troppi messaggi in poco tempo; richiesta sensibile (pagamento, accessibilità, late checkout); ospite in house;
   * mostra i clienti prioritari in dashboard (“Da gestire ora”) e in alto nella chat;
   * genera sempre una notifica.
5. **Centro notifiche**

   * icona in header;
   * lista notifiche con tipo e azione;
   * riceve: AI fallback, cliente prioritario, nota assegnata, IoT fuori soglia.
6. **Tag cliente**

   * manuali: VIP, Famiglia, Coppia, Allergie;
   * da evento: Problema aperto;
   * da AI: suggerito → va confermato.

### 6.2 Mock obbligatori

7. **IoT (UI)**

   * card “Comfort camere” in dashboard;
   * card “Minibar da riempire” in dashboard;
   * mini card IoT in dettaglio prenotazione;
   * pagina mock `app/(extra)/iot/page.tsx`.
8. **Guest Portal (UI)**

   * pagina mock `app/(extra)/guest-portal/page.tsx`;
   * card servizi;
   * stile coerente ma più pubblico.

### 6.3 Fase 2 / evolutivo

9. **Libreria microflussi**

   * elenco azioni pronte: late checkout, sposta pulizia, invia reminder pagamento;
   * pulsante “Esegui flusso”;
   * stato “inviato” o “programmato”.

---

## 7. Piano operativo

1. Ricrea tutte le schermate esistenti (dashboard, clienti, prenotazioni, template, editor) applicando le regole di questo documento.
2. Aggiungi le schermate nuove (chat unificata, centro notifiche, guest portal, IoT) seguendo le convenzioni di routing.
3. Per ogni schermata applica il framework: Step 0 → Step 5.
4. Usa solo dati mock, in file separati, con nomi realistici e struttura coerente.
5. Non collegare backend reali: lasciati gli hook RTK Query pronti ma con endpoint finti.
6. Mantieni i nomi dei campi sempre uguali: “Stato comunicazione”, “Ultimo evento”, “Prossimo invio”, “Newsletter”.
7. Se hai dubbi, torna a questo documento e applica la regola più restrittiva.
8. Commenta nel codice le assunzioni fatte guardando gli screenshot.

---

## 8. Validazione

Il testo è coerente con il pilastro **“coccola il cliente con meno sforzo”**, dichiara con chiarezza il contesto, descrive lo stato attuale, fornisce un metodo di lavoro ripetibile, definisce lo stack e le convenzioni, classifica le feature e chiude con un piano operativo concreto. È pronto per essere salvato ed eseguito dal modello.
