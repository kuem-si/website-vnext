# Stran Rešitve – implementacija in preverjanje

Nova samostojna stran je na `/resitve`. Uporablja obstoječi Astro projekt, lokalni pisavi Space Grotesk in Source Sans 3 ter širine, gumbe, obrobe, header in footer, skladne s homepageom. Homepage je pri tej nalogi spremenjen samo pri navigacijski povezavi Rešitve, ki zdaj vodi na `/resitve`.

## Datoteke

Spremenjeni:

- `src/pages/resitve.astro`: obstoječa Astro pot zdaj izriše `SolutionsOverview`.
- `src/data/homepage.ts`: povezava Rešitve v navigaciji homepagea vodi na `/resitve`.

Dodani:

- `src/components/solutions/SolutionsOverview.astro`: celotna stran, SEO, vsebinski sklopi 01–05, originalni dashboard s povečavo, KAI panel, zaključni tok, panoge in CTA.
- `src/components/solutions/SiteChrome.astro`: header in footer po homepageu; aktivna stran Rešitve ter dostopen mobilni meni.
- `src/components/solutions/ServiceCards.astro`: skupni prikaz kartic.
- `src/components/solutions/ServiceIcon.astro`: uporaba obstoječih linearnih ikon in nekaj dodatnih SVG poti.
- `src/components/solutions/ServiceFlow.astro`: hero in zaključni podatkovni tok.
- `src/components/solutions/FieldNetwork.astro`: tehnična ilustracija terenskih naprav ter povezljivosti.
- `src/components/solutions/IntegrationFlow.astro`: ločen vhod obstoječih sistemov prek API v Nexavio.
- `src/components/solutions/NocNetwork.astro`: prikaz naprav, prehodov in stanj omrežja.
- `src/data/solutionsOverview.ts`: strukturirana vsebina navigacije, kartic in tokov.
- `src/styles/solutions-overview.css`: slogi nove strani; obstoječi slogi homepagea niso spremenjeni.

## Navigacija in diagrami

- Header in footer povezujeta na `/resitve`, `/#nexavia`, `/#panoge`, `/#zgodbe` ter `/#o-nas`.
- Uspešne zgodbe uporabljajo dejanski obstoječi ID `zgodbe`; za delujočo povezavo ni bilo treba spreminjati homepagea.
- Logo vodi na `/`, glavni CTA-ji na `/#kontakt`, e-pošta na `mailto:info@kuem.si`.
- Povezava Oglejte si panoge uporablja obstoječo samostojno stran `/panoge`.
- Pas pod herojem vodi na pet lokalnih sklopov. Na telefonu se vodoravno pomika znotraj svojega pasu; ni sticky, zato ne prekriva glavne navigacije.
- Hero: Zajem → Povezljivost → Integracije → Nexavia + KAI → NOC; ERP · SCADA · GIS ima lasten vhod neposredno v Integracije.
- Integracije: obstoječi sistemi → API → Nexavia.
- Zaključek: Naprava → Prenos podatkov → Nexavia → KAI → NOC in ukrep.
- Diagrami so HTML/CSS in SVG, brez dodatnih knjižnic. Na telefonu se glavni tokovi postavijo navpično. Podatkovne točke se samodejno premikajo po povezavah s CSS animacijami; `prefers-reduced-motion` jih izključi.
- NOC uporablja kroge za naprave in rombe za prehode ter zahtevane barve stanj. Omrežje in KAI opozorilo sta označena kot ponazoritev oziroma primer.

## Originalna sredstva

- `src/assets/brand/kuem/KUEM_Official_Wordmark.svg`
- `src/assets/brand/nexavia/Nexavia_Logo_Light.svg`
- `src/assets/brand/nexavia/nexavia-noc-dashboard.png` – original 2197 × 1224 px, brez dodatnega stiskanja, s pravilnim razmerjem, lazy loadingom in določeno širino/višino.
- Obstoječe lokalne pisave in favicon.

Za to stran dodatna originalna grafična sredstva niso potrebna. Mockup ni uporabljen kot ozadje ali vsebinska slika.

## Preverjanje

- Lokalno zagnana in pregledana `/resitve`, nato preverjena tudi produkcijska različica na `http://127.0.0.1:4444/resitve`.
- Vizualni in avtomatizirani pregled pri 2276, 1920, 1440, 1024, 768 ter 390 px.
- Vseh šest širin: brez horizontalnega drsenja strani, brez izstopajoče vsebine ali manjkajočih slik, en h1, veljaven canonical, pravilno aktivna navigacija in deset ikon v obeh glavnih tokovih.
- Preverjeni vsi lokalni cilji navigacije ter povezane poti (HTTP 200), prehod iz Rešitev na zgodbe homepagea in nazaj, neposredno odprtje in osvežitev `/resitve`.
- Preverjeni hamburger s tipkovnico, Escape in vračanje fokusa, razmiki pod sticky headerjem ter odpiranje/zapiranje originalnega dashboarda.
- Brez napak v konzoli. Animacije se izvajajo samodejno; pri zmanjšanem gibanju ni aktivnih animacij.
- `npm run check`: 0 napak, 0 opozoril, en predhodni namig za `LeadForm.astro`.
- `npm run build`: uspešno, 80 strani. Ostaja predhodno opozorilo za statično pot `/api/lead`, ki nima GET-handlerja.
- Projekt nima ločenega lint skripta. `npm run format:check` je bil zagnan in odpove zaradi obstoječe težave namestitve npm (`Cannot find module './signal-manager.js'`). Neposreden pregled z lokalnim Prettierjem za vse datoteke te spremembe je uspešen.

Dokazi v tej mapi: `solutions-review.json`, `solutions-browser.log`, `solutions-typecheck.log`, `solutions-build.log` in posnetki `solutions-{širina}.png`. Ponovljiv pregled za to lokalno okolje je v `solutions-review.cjs`.
