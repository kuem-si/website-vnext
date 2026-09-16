# KUEM homepage – končni pregled

Datum: 14. september 2026.

Obstoječa zasnova je ohranjena. Vsebinska širina na namizju je `min(88vw, 1600px)`, z manjšimi odmiki na tablicah in telefonih. Hero naslov doseže 88 px, naslovi sekcij 52 px. Navigacija uporablja 14–16 px, opisi kartic najmanj 14 px. Povečani so odmiki, ikone in površine interaktivnih elementov. Oranžni gumbi imajo temno besedilo za boljši kontrast.

## Datoteke

- `src/styles/homepage.css`: odzivna tipografija, širina, kartice, kontrast, navigacija, reference, API-povezava in prikaz logotipa.
- `src/components/homepage/KuemHomepage.astro`: razširjen uvod O nas, kontaktni možnosti, odstranjeno stikalo EN, originalni dashboard brez dodatnega stiskanja, dostopnost in natančno umeščanje API-povezave.
- `src/components/homepage/DataFlow.astro`: ohranjen dvojni vhod v Nexavio in vidne smerne puščice.
- `src/data/homepage.ts`: NOC in upravljane storitve z zahtevanim opisom.
- `src/components/homepage/LineIcon.astro`: skupne linearne ikone iz začetne implementacije.
- `src/pages/index.astro` in `src/pages/sl/index.astro`: vstopni strani za novi homepage iz začetne implementacije.

## Povezave in kontakt

| Element                                             | Cilj                                                             |
| --------------------------------------------------- | ---------------------------------------------------------------- |
| Rešitve / Nexavia / Panoge / Uspešne zgodbe / O nas | `#resitve` / `#nexavia` / `#panoge` / `#zgodbe` / `#o-nas`       |
| Poglejte Nexavio                                    | `#nexavia`                                                       |
| Pogovorimo se / Dogovorite se za predstavitev       | `#kontakt`                                                       |
| Spoznajte Nexavio                                   | `#kontakt`, s fokusom na možnost predstavitve Nexavie            |
| Dogovorite se za uvodni sestanek                    | `mailto:info@kuem.si?subject=Dogovor%20za%20uvodni%20sestanek`   |
| Želim predstavitev Nexavie                          | `mailto:info@kuem.si?subject=Predstavitev%20platforme%20Nexavia` |
| Več o KAI / Kako deluje zaznava                     | `/kai`                                                           |
| Raziščite rešitev – voda                            | `/sl/resitve/daljinsko-odcitavanje-stevcev`                      |
| Raziščite rešitev – energija                        | `/resitve/napredna-analitika`                                    |
| Raziščite rešitev – mobilnost                       | `/sl/resitve/promet-in-mobilnost`                                |
| Reference / zasebnost                               | `/reference` / `/zasebnost`                                      |

Kontaktni endpoint ni konfiguriran, zato CTA uporablja e-pošto in ne prikazuje lažne potrditve oddaje. E-pošta v nogi je klikljiva. EN je odstranjen iz navigacije in noge novega homepagea, ker obstoječa angleška stran še nima vseh njegovih sekcij. Obstoječe angleške podstrani ostajajo dostopne po svojih poteh.

## Preverjanje

- Production preview: `http://127.0.0.1:4444/`.
- Chromium: pregled pri 1440, 1920, 2276, 1024, 768 in 390 px; posnetki `home-polished-{širina}.png` v tej mapi.
- Na vseh šestih širinah: brez horizontalnega drsenja, brez zaznanih izstopajočih vsebinskih elementov, brez manjkajočih slik, en h1, veljavni cilji vseh sekcijskih povezav.
- Preverjeni hamburger s tipkovnico, Escape, zapiranje po kliku, razmik pod sticky navigacijo, fokus pri povprašševanju za Nexavio, odpiranje/zapiranje dashboarda in vračanje fokusa ter razpiranje referenc.
- Vse povezane lokalne poti in originalni dashboard vrnejo HTTP 200.
- Konzola: brez napak. `prefers-reduced-motion`: brez aktivnih animacij. V običajnem načinu se podatkovne animacije izvajajo samodejno.
- Vizualni pregled je odpravil podedovan absolutni položaj navigacije v nogi na mobilniku in obrezan Nexavia logotip na širokem zaslonu.
- `npm run check`: 0 napak, 0 opozoril; ostaja en že obstoječ namig za skript v `src/components/LeadForm.astro`.
- `npm run build`: uspešno, 80 strani. Ostaja že obstoječe opozorilo, da `/api/lead` v statični gradnji nima GET-handlerja (ima POST).
- Projekt nima ločenega lint ali test skripta. `npm run format:check` je bil zagnan, a odpove zaradi manjkajočega internega modula npm `signal-manager.js`. Neposreden zagon lokalnega Prettierja potrdi, da so vse spremenjene produkcijske datoteke pravilno oblikovane. Pregled celotnega projekta dodatno pokaže predhodne slogovne razlike in težavo parserja v nespremenjenem `StandardPage.astro`.
- Podrobnosti avtomatiziranega pregleda: `homepage-review.json`; ponovljiv pregled za to lokalno okolje: `homepage-review.cjs`.

## Originalne datoteke

KUEM in Nexavia logotipa, pisavi in originalni dashboard so prisotni in uporabljeni. Originalnih logotipov referenc ni; ostajajo dovoljena, kontrastnejša tipografska imena. Za trenutno izvedbo ni potrebnih dodatnih grafičnih datotek. Potrjena telefonska številka in ulični naslov nista bila najdena; nista izmišljena ali objavljena, v kodi ostaja TODO.
