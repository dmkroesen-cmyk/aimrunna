/* AImAthlete — Legal Texts, multilingual
 * Covers: de, nl, no, fr, it, pl, es, zh, sv, da
 * Sections: imprint, privacy, terms, disclaimer, cookies
 * Version: 2026-04-05 (Beta)
 *
 * Notes:
 * - DE is the authoritative source (§§ DDG/MStV, DSGVO).
 * - Other languages are good-faith professional translations; before live
 *   operation, localize jurisdiction-specific legal references.
 */
window.LEGAL_I18N = (function () {
  const TXT = {};

  // ─── DEUTSCH (DE) ─────────────────────────────────────────────────────────
  TXT.de = {
    imprint: `Impressum

Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz) und § 18 MStV

[Anbieter / Firma / Name]
[Straße Hausnummer]
[PLZ Ort]
Deutschland

Vertreten durch: [Name]
Kontakt:
  E-Mail: kontakt@aimathlete.app
  Telefon: [optional]

Registereintrag: [Amtsgericht, HRB-Nr. — falls zutreffend]
Umsatzsteuer-ID nach § 27a UStG: [falls vorhanden]

Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:
[Name, Anschrift wie oben]

— EU-Streitschlichtung —
Plattform der EU-Kommission: https://ec.europa.eu/consumers/odr
Wir sind nicht verpflichtet, an Streitbeilegungsverfahren teilzunehmen.

— Haftung für Inhalte / Links / Urheberrecht —
Es gelten die allgemeinen Vorschriften nach §§ 7-10 DDG.
Inhalte dieser Website unterliegen dem deutschen Urheberrecht.

Hinweis (Beta): Vor Livegang mit Rechtsberatung finalisieren.`,
    privacy: `Datenschutzerklärung

Stand: 05.04.2026 · Version 1.0 (Beta)

1. VERANTWORTLICHER
[Name / Firma], [Anschrift], E-Mail: datenschutz@aimathlete.app

2. VERARBEITETE DATEN
Stammdaten · Trainingsdaten (Aktivitäten, Distanz, Pace, Puls, GPS, Leistung) ·
Gesundheitsnahe Daten (HRV, Ruhepuls, VO2max, Schlaf, Recovery) ·
Connector-Tokens (Strava, Garmin, WHOOP) · Nutzungs- und Fehlerlogs.

3. ZWECKE & RECHTSGRUNDLAGEN (Art. 6 DSGVO)
• Art. 6(1)(b): Vertragserfüllung — Account, Planung, Analyse
• Art. 6(1)(f): Berechtigtes Interesse — Sicherheit, Verbesserung
• Art. 6(1)(a) / 9(2)(a): Einwilligung — Gesundheitsdaten, Connectors, Analyse

4. EMPFÄNGER / AUFTRAGSVERARBEITER
Supabase (Hosting/DB), Vercel (Frontend), OAuth-Provider. EU-SCCs bei Drittlandtransfers.

5. SPEICHERDAUER
Account-Daten bis Löschung · Logs max. 90 Tage · gesetzliche Aufbewahrungspflichten bleiben unberührt.

6. DEINE RECHTE (Art. 15-22 DSGVO)
Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch,
Widerruf erteilter Einwilligungen. Beschwerderecht bei der Aufsichtsbehörde.
Kontakt: datenschutz@aimathlete.app

7. SICHERHEIT
TLS 1.2+, Passwort-Hashing, Row-Level-Security, verschlüsselte Token-Speicherung.

8. AUTOMATISIERTE EMPFEHLUNGEN
Trainingspläne sind algorithmische Empfehlungen, keine verbindlichen Einzelentscheidungen
i.S.d. Art. 22 DSGVO.`,
    terms: `Nutzungsbedingungen

Stand: 05.04.2026 · Version 1.0 (Beta)

§1 Geltungsbereich — regelt die Nutzung von AImAthlete (Beta).
§2 Leistung — KI-Trainingsplanung, Analyse, Recovery, Connectors, Community.
§3 Konto — ein Konto pro Person, Zugangsdaten geheim halten.
§4 Pflichten — wahre Angaben, keine rechtswidrigen/irreführenden Inhalte,
    keine Gesundheitsversprechen gegenüber anderen, kein Scraping.
§5 IP — Rechte am Dienst verbleiben beim Anbieter. Nutzer-Inhalte: einfache Lizenz.
§6 KEINE MEDIZINISCHE BERATUNG — siehe Health Disclaimer.
§7 Haftung — unbeschränkt bei Vorsatz/grober Fahrlässigkeit und Körperschäden;
    bei leichter Fahrlässigkeit begrenzt auf vorhersehbare Schäden; im Übrigen
    ausgeschlossen soweit zulässig.
§8 Kündigung — jederzeit durch Nutzer; Sperrung bei Verstößen möglich.
§9 Änderungen — wesentliche Änderungen mit 14 Tagen Vorlauf per E-Mail.
§10 Schlussbestimmungen — deutsches Recht; Gerichtsstand Sitz des Anbieters.`,
    disclaimer: `Health & Training Disclaimer

1. KEIN MEDIZINISCHER RAT — ersetzt keine ärztliche/physiotherapeutische/
   ernährungsmedizinische Beratung, Diagnose oder Behandlung.

2. ABKLÄRUNG VOR START — konsultiere einen Arzt bei Alter >35 + Inaktivität,
   chronischen Erkrankungen, Bluthochdruck, Diabetes, Schwangerschaft, Verletzungen.

3. TRAINING SOFORT ABBRECHEN bei: Brustschmerz, Atemnot, Schwindel,
   unregelmäßigem Puls, Sehstörungen, Ohnmachtsgefühl, Übelkeit.

4. EIGENVERANTWORTUNG — du trainierst auf eigene Gefahr. AImAthlete haftet nicht
   für Verletzungen oder Überlastungsschäden aus der Umsetzung von Empfehlungen.

5. SCHÄTZUNGEN — alle Kennzahlen (VO2max, Fitness-Alter, Recovery, Prognosen)
   sind algorithmische Schätzungen mit Unsicherheit. Kein Ersatz für Labormessung.

6. BETA — Modelle/Algorithmen werden weiterentwickelt; Ergebnisse ändern sich.

7. NOTFALL — europäischer Notruf: 112.`,
    cookies: `Cookies & Tracking

Wir setzen Cookies sparsam und transparent ein.

• TECHNISCH NOTWENDIG (ohne Einwilligung, § 25 Abs. 2 TDDDG):
  Login-Session, CSRF-Schutz, Spracheinstellung, Consent-Status.

• PRÄFERENZEN: Einheiten, Dashboard-Konfiguration (localStorage).

• ANALYSE (optional, nur mit Einwilligung): anonyme Nutzungsstatistik.

• MARKETING: aktuell keines.

Deine Einwilligung kannst du jederzeit im Einstellungsbereich widerrufen.`,
  };

  // ─── NEDERLANDS (NL) ──────────────────────────────────────────────────────
  TXT.nl = {
    imprint: `Colofon

Aanbieder: [Naam / Bedrijf]
[Straat en huisnummer] · [Postcode, Plaats] · Nederland
Contact: kontakt@aimathlete.app

KvK: [indien van toepassing]
BTW: [indien van toepassing]

EU-geschillenplatform: https://ec.europa.eu/consumers/odr
Wij zijn niet verplicht deel te nemen aan buitengerechtelijke geschilbeslechting.

Aansprakelijkheid / links / auteursrecht — algemene wettelijke bepalingen.
Opmerking (bèta): vóór livegang juridisch laten controleren.`,
    privacy: `Privacyverklaring

Versie: 05-04-2026 · v1.0 (bèta)

1. VERANTWORTLICHE: [Naam], e-mail: datenschutz@aimathlete.app
2. VERWERKTE GEGEVENS: accountdata, trainingsdata (afstand, tempo, hartslag, GPS,
   vermogen), gezondheidsgerelateerde data (HVR, rustpols, VO2max, slaap, recovery),
   connector-tokens (Strava/Garmin/WHOOP), gebruiks- en foutlogs.
3. DOELEN & GRONDSLAGEN (AVG art. 6): contractuitvoering, gerechtvaardigd belang
   (veiligheid, verbetering), toestemming (gezondheidsdata art. 9(2)(a), analyse).
4. ONTVANGERS: Supabase (hosting), Vercel (frontend), OAuth-providers. EU-SCC's bij
   derdelandtransfers.
5. BEWAARTERMIJN: accountdata tot verwijdering, logs max. 90 dagen.
6. JOUW RECHTEN (AVG art. 15-22): inzage, rectificatie, verwijdering, beperking,
   overdraagbaarheid, bezwaar, intrekking toestemming. Klachtrecht bij de
   Autoriteit Persoonsgegevens. Contact: datenschutz@aimathlete.app
7. BEVEILIGING: TLS 1.2+, wachtwoord-hashing, row-level security, versleutelde tokens.
8. GEEN GEAUTOMATISEERDE BESLUITEN i.d.z.v. art. 22 AVG — trainingsplannen zijn
   algoritmische aanbevelingen.`,
    terms: `Gebruiksvoorwaarden

Versie: 05-04-2026 · v1.0 (bèta)

§1 Toepassing — gebruik van AImAthlete (bèta).
§2 Dienst — AI-trainingsplanning, analyse, recovery, connectors, community.
§3 Account — één account per persoon; inloggegevens geheim houden.
§4 Plichten — waarachtige gegevens, geen onrechtmatige/misleidende content,
   geen gezondheidsbeloftes aan derden, geen scraping.
§5 IP — rechten blijven bij de aanbieder; gebruikerscontent onder eenvoudige licentie.
§6 GEEN MEDISCH ADVIES — zie Health Disclaimer.
§7 Aansprakelijkheid — onbeperkt bij opzet/grove nalatigheid en lichamelijk letsel;
   bij lichte nalatigheid beperkt tot voorzienbare schade; overigens uitgesloten voor
   zover wettelijk toegestaan.
§8 Beëindiging — op elk moment door gebruiker; blokkering bij overtredingen.
§9 Wijzigingen — met 14 dagen vooraankondiging per e-mail.
§10 Slotbepalingen — Nederlands recht; bevoegde rechtbank: zetel aanbieder.`,
    disclaimer: `Health & Training Disclaimer

1. GEEN MEDISCH ADVIES — vervangt geen medische, fysiotherapeutische of
   voedingskundige zorg.
2. MEDISCH CHECK-UP VOOR START bij leeftijd >35 + inactiviteit, chronische
   aandoeningen, hypertensie, diabetes, zwangerschap, blessures.
3. STOP TRAINING DIRECT bij: pijn op de borst, kortademigheid, duizeligheid,
   onregelmatige pols, gezichtsverlies, flauwvallen, misselijkheid.
4. EIGEN VERANTWOORDELIJKHEID — je traint op eigen risico. AImAthlete is niet
   aansprakelijk voor letsel of overbelasting.
5. SCHATTINGEN — alle waarden (VO2max, fitnessleeftijd, recovery, prognoses) zijn
   algoritmische schattingen met onzekerheid; geen vervanging van labmeting.
6. BÈTA — modellen evolueren; resultaten kunnen veranderen.
7. NOODGEVAL — Europees alarmnummer: 112.`,
    cookies: `Cookies & Tracking

Wij gebruiken cookies spaarzaam en transparant.

• TECHNISCH NOODZAKELIJK (zonder toestemming): inlog-sessie, CSRF, taalkeuze, consent.
• VOORKEUREN: eenheden, dashboardconfiguratie (localStorage).
• ANALYSE (optioneel, met toestemming): anonieme gebruiksstatistiek.
• MARKETING: momenteel geen.

Toestemming kan op elk moment in de instellingen worden ingetrokken.`,
  };

  // ─── NORSK (NO) ───────────────────────────────────────────────────────────
  TXT.no = {
    imprint: `Kolofon

Tilbyder: [Navn / Firma]
[Adresse] · [Postnr. Sted] · Norge
Kontakt: kontakt@aimathlete.app
Org.nr.: [hvis relevant] · MVA: [hvis relevant]

EU-tvisteløsning: https://ec.europa.eu/consumers/odr
Vi er ikke forpliktet til å delta i utenrettslig tvisteløsning.

Ansvar for innhold/lenker/opphavsrett — alminnelige lovbestemmelser.
Merk (beta): skal gjennomgås juridisk før lansering.`,
    privacy: `Personvernerklæring

Versjon: 05.04.2026 · v1.0 (beta)

1. BEHANDLINGSANSVARLIG: [Navn], e-post: datenschutz@aimathlete.app
2. BEHANDLEDE DATA: kontodata, treningsdata (distanse, tempo, puls, GPS, watt),
   helserelaterte data (HRV, hvilepuls, VO2maks, søvn, restitusjon),
   connector-tokens (Strava/Garmin/WHOOP), bruks- og feillogg.
3. FORMÅL & GRUNNLAG (GDPR art. 6): avtaleoppfyllelse, berettiget interesse
   (sikkerhet, forbedring), samtykke (helsedata art. 9(2)(a), analyse).
4. MOTTAKERE: Supabase (hosting), Vercel (frontend), OAuth-leverandører.
   EU-standardavtaler ved tredjelandoverføringer.
5. LAGRINGSTID: kontodata til sletting, logger maks 90 dager.
6. DINE RETTIGHETER (GDPR art. 15-22): innsyn, retting, sletting, begrensning,
   dataportabilitet, innsigelse, trekk tilbake samtykke. Klagerett til Datatilsynet.
   Kontakt: datenschutz@aimathlete.app
7. SIKKERHET: TLS 1.2+, passord-hashing, row-level security, krypterte tokens.
8. INGEN AUTOMATISKE ENKELTVEDTAK etter art. 22 GDPR — treningsplaner er
   algoritmiske anbefalinger.`,
    terms: `Vilkår for bruk

Versjon: 05.04.2026 · v1.0 (beta)

§1 Omfang — bruk av AImAthlete (beta).
§2 Tjeneste — AI-treningsplan, analyse, restitusjon, connectors, fellesskap.
§3 Konto — én konto per person; innlogging holdes hemmelig.
§4 Plikter — sanne opplysninger, ingen ulovlig/villedende innhold, ingen
   helseløfter til andre, ingen skraping.
§5 IP — rettighetene ligger hos tilbyder; brukerinnhold med enkel lisens.
§6 INGEN MEDISINSK RÅD — se Health Disclaimer.
§7 Ansvar — ubegrenset ved forsett/grov uaktsomhet og personskade; ved lett
   uaktsomhet begrenset til påregnelig tap; ellers utelukket så langt loven tillater.
§8 Oppsigelse — når som helst av bruker; sperring ved brudd.
§9 Endringer — med 14 dagers varsel via e-post.
§10 Sluttbestemmelser — norsk rett; verneting: tilbyders sete.`,
    disclaimer: `Helse & Treningsforbehold

1. IKKE MEDISINSK RÅD — erstatter ikke lege, fysioterapeut eller ernæringsfaglig hjelp.
2. MEDISINSK VURDERING FØR OPPSTART hvis du er >35 og inaktiv, har kroniske
   sykdommer, høyt blodtrykk, diabetes, er gravid eller skadet.
3. AVBRYT TRENINGEN UMIDDELBART ved brystsmerter, tungpust, svimmelhet,
   uregelmessig puls, synsforstyrrelser, besvimelsesfølelse eller kvalme.
4. EGET ANSVAR — du trener på eget ansvar. AImAthlete hefter ikke for skader.
5. ESTIMATER — alle tall (VO2maks, treningsalder, restitusjon, prognoser) er
   algoritmiske estimater; ingen erstatning for labmåling.
6. BETA — modeller endres; resultater kan variere.
7. NØDSITUASJON — nødnummer: 112.`,
    cookies: `Informasjonskapsler

Vi bruker cookies sparsomt og transparent.

• NØDVENDIGE (uten samtykke): innlogging, CSRF, språk, samtykkestatus.
• PREFERANSER: enheter, dashboardoppsett (localStorage).
• ANALYSE (valgfritt, med samtykke): anonym bruksstatistikk.
• MARKEDSFØRING: ingen p.t.

Samtykke kan trekkes tilbake når som helst i innstillingene.`,
  };

  // ─── FRANÇAIS (FR) ────────────────────────────────────────────────────────
  TXT.fr = {
    imprint: `Mentions légales

Éditeur: [Nom / Société]
[Rue et numéro] · [Code postal, Ville] · [Pays]
Contact: kontakt@aimathlete.app
RCS/SIRET: [le cas échéant] · TVA: [le cas échéant]
Directeur de la publication: [Nom]

Hébergement: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.

Médiation à la consommation (art. L.612-1 Code de la consommation):
Plateforme européenne ODR: https://ec.europa.eu/consumers/odr

Responsabilité contenu/liens/droit d'auteur — dispositions légales générales.
Remarque (bêta): à finaliser avec conseil juridique avant mise en production.`,
    privacy: `Politique de confidentialité

Version: 05/04/2026 · v1.0 (bêta)

1. RESPONSABLE: [Nom], e-mail: datenschutz@aimathlete.app
2. DONNÉES TRAITÉES: données de compte, données d'entraînement (distance, allure,
   FC, GPS, puissance), données de santé (VFC, FC repos, VO2max, sommeil, récupération),
   jetons de connecteurs (Strava/Garmin/WHOOP), logs d'utilisation et d'erreur.
3. FINALITÉS & BASES (RGPD art. 6): exécution du contrat, intérêt légitime
   (sécurité, amélioration), consentement (santé art. 9(2)(a), analyse).
4. DESTINATAIRES: Supabase (hébergement), Vercel (frontend), fournisseurs OAuth.
   CCT européennes pour les transferts hors UE.
5. DURÉE: données de compte jusqu'à suppression, logs max. 90 jours.
6. VOS DROITS (RGPD art. 15-22): accès, rectification, effacement, limitation,
   portabilité, opposition, retrait du consentement. Droit de réclamation auprès
   de la CNIL. Contact: datenschutz@aimathlete.app
7. SÉCURITÉ: TLS 1.2+, hachage des mots de passe, row-level security, tokens chiffrés.
8. AUCUNE DÉCISION AUTOMATISÉE au sens de l'art. 22 RGPD — les plans d'entraînement
   sont des recommandations algorithmiques.`,
    terms: `Conditions Générales d'Utilisation

Version: 05/04/2026 · v1.0 (bêta)

Art. 1 Objet — utilisation d'AImAthlete (bêta).
Art. 2 Service — planification IA, analyse, récupération, connecteurs, communauté.
Art. 3 Compte — un compte par personne; identifiants confidentiels.
Art. 4 Obligations — informations sincères, pas de contenus illégaux/trompeurs,
   pas de promesses santé à autrui, pas de scraping.
Art. 5 Propriété intellectuelle — droits réservés à l'éditeur; contenu utilisateur
   sous licence simple.
Art. 6 PAS DE CONSEIL MÉDICAL — voir Health Disclaimer.
Art. 7 Responsabilité — illimitée en cas de faute intentionnelle/lourde et dommages
   corporels; en cas de faute légère, limitée aux dommages prévisibles; autrement
   exclue dans les limites légales.
Art. 8 Résiliation — à tout moment par l'utilisateur; suspension possible en cas
   de manquement.
Art. 9 Modifications — préavis 14 jours par e-mail.
Art. 10 Droit applicable — droit français; tribunaux compétents: siège de l'éditeur.`,
    disclaimer: `Avertissement santé & entraînement

1. PAS DE CONSEIL MÉDICAL — ne remplace pas consultation médicale, kinésithérapie
   ou conseil nutritionnel.
2. EXAMEN MÉDICAL AVANT DÉMARRAGE si vous avez >35 ans après inactivité, maladies
   chroniques, hypertension, diabète, grossesse, blessures récentes.
3. ARRÊTEZ IMMÉDIATEMENT en cas de: douleur thoracique, essoufflement intense,
   vertiges, pouls irrégulier, troubles visuels, évanouissement, nausées.
4. RESPONSABILITÉ PERSONNELLE — entraînement à vos risques. AImAthlete n'est pas
   responsable des blessures ou surcharges.
5. ESTIMATIONS — toutes les valeurs (VO2max, âge de forme, récupération, prédictions)
   sont algorithmiques; ne remplacent pas des mesures en laboratoire.
6. BÊTA — modèles évolutifs; résultats susceptibles de varier.
7. URGENCE — numéro d'urgence européen: 112.`,
    cookies: `Cookies & Traceurs

Nous utilisons les cookies avec parcimonie et transparence.

• STRICTEMENT NÉCESSAIRES (sans consentement): session, CSRF, langue, consentement.
• PRÉFÉRENCES: unités, configuration du tableau de bord (localStorage).
• MESURE D'AUDIENCE (optionnel, avec consentement): statistiques anonymes.
• MARKETING: aucun actuellement.

Le consentement peut être retiré à tout moment dans les paramètres.`,
  };

  // ─── ITALIANO (IT) ────────────────────────────────────────────────────────
  TXT.it = {
    imprint: `Informazioni legali (Colophon)

Titolare: [Nome / Società]
[Via e numero] · [CAP, Città] · Italia
Contatto: kontakt@aimathlete.app
P.IVA / C.F.: [se applicabile] · REA: [se applicabile]

Piattaforma ODR UE: https://ec.europa.eu/consumers/odr
Non siamo obbligati a partecipare a procedure di risoluzione stragiudiziale.

Responsabilità contenuti/link/diritto d'autore — norme generali.
Nota (beta): da revisionare legalmente prima del go-live.`,
    privacy: `Informativa sulla Privacy

Versione: 05/04/2026 · v1.0 (beta)

1. TITOLARE: [Nome], e-mail: datenschutz@aimathlete.app
2. DATI TRATTATI: dati account, dati di allenamento (distanza, ritmo, FC, GPS,
   potenza), dati sanitari (HRV, FC riposo, VO2max, sonno, recupero),
   token connettori (Strava/Garmin/WHOOP), log di utilizzo ed errore.
3. FINALITÀ & BASI (GDPR art. 6): esecuzione contratto, legittimo interesse
   (sicurezza, miglioramento), consenso (dati sanitari art. 9(2)(a), analisi).
4. DESTINATARI: Supabase (hosting), Vercel (frontend), provider OAuth. SCC UE per
   trasferimenti extra-UE.
5. CONSERVAZIONE: dati account fino a cancellazione, log max 90 giorni.
6. I TUOI DIRITTI (GDPR art. 15-22): accesso, rettifica, cancellazione, limitazione,
   portabilità, opposizione, revoca del consenso. Reclamo al Garante Privacy.
   Contatto: datenschutz@aimathlete.app
7. SICUREZZA: TLS 1.2+, password hash, row-level security, token cifrati.
8. NESSUNA DECISIONE AUTOMATIZZATA ex art. 22 GDPR — i piani sono raccomandazioni
   algoritmiche.`,
    terms: `Condizioni d'Uso

Versione: 05/04/2026 · v1.0 (beta)

Art. 1 Ambito — utilizzo di AImAthlete (beta).
Art. 2 Servizio — pianificazione AI, analisi, recupero, connettori, community.
Art. 3 Account — uno per persona; credenziali riservate.
Art. 4 Obblighi — dati veritieri, nessun contenuto illecito/ingannevole, nessuna
   promessa sanitaria a terzi, niente scraping.
Art. 5 Proprietà intellettuale — diritti al titolare; contenuti utente in licenza
   semplice.
Art. 6 NESSUNA CONSULENZA MEDICA — vedi Health Disclaimer.
Art. 7 Responsabilità — illimitata per dolo/colpa grave e danni alla persona; per
   colpa lieve limitata a danni prevedibili; altrimenti esclusa nei limiti di legge.
Art. 8 Recesso — in qualsiasi momento dall'utente; sospensione in caso di violazioni.
Art. 9 Modifiche — preavviso 14 giorni via e-mail.
Art. 10 Legge applicabile — legge italiana; foro: sede del titolare.`,
    disclaimer: `Disclaimer Salute & Allenamento

1. NESSUN CONSIGLIO MEDICO — non sostituisce il parere di medico, fisioterapista
   o nutrizionista.
2. VISITA MEDICA PRIMA DI INIZIARE se >35 anni dopo inattività, malattie croniche,
   ipertensione, diabete, gravidanza, infortuni recenti.
3. INTERROMPI SUBITO L'ALLENAMENTO in caso di: dolore toracico, dispnea, vertigini,
   battito irregolare, disturbi visivi, sensazione di svenimento, nausea.
4. RESPONSABILITÀ PERSONALE — ti alleni a tuo rischio. AImAthlete non risponde
   di infortuni o sovraccarichi.
5. STIME — tutti i valori (VO2max, età di forma, recupero, previsioni) sono stime
   algoritmiche; non sostituiscono misurazioni di laboratorio.
6. BETA — modelli in evoluzione; risultati soggetti a variazioni.
7. EMERGENZA — numero unico europeo: 112.`,
    cookies: `Cookie & Tracking

Usiamo i cookie con parsimonia e trasparenza.

• NECESSARI (senza consenso): sessione login, CSRF, lingua, stato del consenso.
• PREFERENZE: unità, configurazione dashboard (localStorage).
• ANALISI (opzionale, con consenso): statistiche di utilizzo anonime.
• MARKETING: nessuno al momento.

Il consenso può essere revocato in qualsiasi momento dalle impostazioni.`,
  };

  // ─── POLSKI (PL) ──────────────────────────────────────────────────────────
  TXT.pl = {
    imprint: `Informacje prawne

Usługodawca: [Nazwa / Firma]
[Ulica, numer] · [Kod, Miasto] · Polska
Kontakt: kontakt@aimathlete.app
NIP: [jeśli dotyczy] · REGON/KRS: [jeśli dotyczy]

Platforma ODR UE: https://ec.europa.eu/consumers/odr
Nie jesteśmy zobowiązani do uczestnictwa w pozasądowym rozstrzyganiu sporów.

Odpowiedzialność za treści/linki/prawa autorskie — przepisy ogólne.
Uwaga (beta): do finalizacji prawnej przed uruchomieniem.`,
    privacy: `Polityka prywatności

Wersja: 05.04.2026 · v1.0 (beta)

1. ADMINISTRATOR: [Nazwa], e-mail: datenschutz@aimathlete.app
2. PRZETWARZANE DANE: dane konta, dane treningowe (dystans, tempo, tętno, GPS, moc),
   dane zdrowotne (HRV, tętno spoczynkowe, VO2max, sen, regeneracja),
   tokeny konektorów (Strava/Garmin/WHOOP), logi użycia i błędów.
3. CELE & PODSTAWY (RODO art. 6): wykonanie umowy, uzasadniony interes (bezpieczeństwo,
   ulepszenia), zgoda (dane zdrowotne art. 9(2)(a), analityka).
4. ODBIORCY: Supabase (hosting), Vercel (frontend), dostawcy OAuth. SCC UE dla
   przekazań do państw trzecich.
5. OKRES: dane konta do usunięcia, logi maks. 90 dni.
6. TWOJE PRAWA (RODO art. 15-22): dostęp, sprostowanie, usunięcie, ograniczenie,
   przenoszenie, sprzeciw, cofnięcie zgody. Skarga do Prezesa UODO.
   Kontakt: datenschutz@aimathlete.app
7. BEZPIECZEŃSTWO: TLS 1.2+, haszowanie haseł, row-level security, szyfrowane tokeny.
8. BRAK AUTOMATYCZNYCH DECYZJI w rozumieniu art. 22 RODO — plany treningowe to
   rekomendacje algorytmiczne.`,
    terms: `Regulamin (Warunki Użytkowania)

Wersja: 05.04.2026 · v1.0 (beta)

§1 Zakres — korzystanie z AImAthlete (beta).
§2 Usługa — AI-planowanie, analiza, regeneracja, konektory, społeczność.
§3 Konto — jedno konto na osobę; dane logowania poufne.
§4 Obowiązki — prawdziwe dane, zakaz treści bezprawnych/wprowadzających w błąd,
   brak obietnic zdrowotnych wobec innych, brak scrapingu.
§5 Własność intelektualna — prawa u Usługodawcy; treści użytkownika na zwykłej licencji.
§6 BRAK PORADY MEDYCZNEJ — zob. Health Disclaimer.
§7 Odpowiedzialność — nieograniczona za winę umyślną/rażące niedbalstwo i szkody na
   osobie; przy lekkim niedbalstwie ograniczona do szkód przewidywalnych; poza tym
   wyłączona w granicach prawa.
§8 Wypowiedzenie — w każdej chwili przez użytkownika; blokada przy naruszeniach.
§9 Zmiany — z 14-dniowym wyprzedzeniem e-mailem.
§10 Prawo właściwe — prawo polskie; sąd właściwy: siedziba Usługodawcy.`,
    disclaimer: `Disclaimer zdrowotny & treningowy

1. BRAK PORADY MEDYCZNEJ — nie zastępuje konsultacji lekarskiej, fizjoterapeutycznej
   ani dietetycznej.
2. KONSULTACJA LEKARSKA PRZED STARTEM jeśli: wiek >35 po bezczynności, choroby
   przewlekłe, nadciśnienie, cukrzyca, ciąża, świeże urazy.
3. NATYCHMIAST PRZERWIJ TRENING przy: bólu w klatce piersiowej, duszności, zawrotach
   głowy, nieregularnym tętnie, zaburzeniach widzenia, omdleniu, nudnościach.
4. ODPOWIEDZIALNOŚĆ WŁASNA — trenujesz na własne ryzyko. AImAthlete nie odpowiada
   za urazy ani przeciążenia.
5. SZACUNKI — wszystkie wskaźniki (VO2max, wiek sprawnościowy, regeneracja, prognozy)
   to szacunki algorytmiczne; nie zastępują pomiarów laboratoryjnych.
6. BETA — modele rozwijane; wyniki mogą się zmieniać.
7. NAGŁE PRZYPADKI — europejski numer alarmowy: 112.`,
    cookies: `Cookies & Śledzenie

Używamy cookies oszczędnie i transparentnie.

• NIEZBĘDNE (bez zgody): sesja logowania, CSRF, język, status zgody.
• PREFERENCJE: jednostki, konfiguracja pulpitu (localStorage).
• ANALITYKA (opcjonalnie, za zgodą): anonimowe statystyki użycia.
• MARKETING: obecnie brak.

Zgodę można wycofać w dowolnej chwili w ustawieniach.`,
  };

  // ─── ESPAÑOL (ES) ─────────────────────────────────────────────────────────
  TXT.es = {
    imprint: `Aviso Legal

Prestador: [Nombre / Empresa]
[Calle y número] · [Código Postal, Ciudad] · España
Contacto: kontakt@aimathlete.app
NIF/CIF: [si procede] · Registro Mercantil: [si procede]

Plataforma ODR UE: https://ec.europa.eu/consumers/odr
No estamos obligados a participar en procedimientos extrajudiciales.

Responsabilidad contenidos/enlaces/derechos de autor — disposiciones legales generales.
Nota (beta): pendiente de revisión jurídica antes del lanzamiento.`,
    privacy: `Política de Privacidad

Versión: 05/04/2026 · v1.0 (beta)

1. RESPONSABLE: [Nombre], e-mail: datenschutz@aimathlete.app
2. DATOS TRATADOS: datos de cuenta, datos de entrenamiento (distancia, ritmo, FC,
   GPS, potencia), datos de salud (VFC, FC reposo, VO2max, sueño, recuperación),
   tokens de conectores (Strava/Garmin/WHOOP), logs de uso y error.
3. FINES & BASES (RGPD art. 6): ejecución contractual, interés legítimo (seguridad,
   mejora), consentimiento (datos de salud art. 9(2)(a), analítica).
4. DESTINATARIOS: Supabase (hosting), Vercel (frontend), proveedores OAuth. CCT UE
   para transferencias a terceros países.
5. PLAZO: datos de cuenta hasta supresión, logs máx. 90 días.
6. TUS DERECHOS (RGPD art. 15-22): acceso, rectificación, supresión, limitación,
   portabilidad, oposición, retirada del consentimiento. Reclamación ante la AEPD.
   Contacto: datenschutz@aimathlete.app
7. SEGURIDAD: TLS 1.2+, hash de contraseñas, row-level security, tokens cifrados.
8. SIN DECISIONES AUTOMATIZADAS en el sentido del art. 22 RGPD — los planes son
   recomendaciones algorítmicas.`,
    terms: `Condiciones de Uso

Versión: 05/04/2026 · v1.0 (beta)

Art. 1 Ámbito — uso de AImAthlete (beta).
Art. 2 Servicio — planificación IA, análisis, recuperación, conectores, comunidad.
Art. 3 Cuenta — una cuenta por persona; credenciales confidenciales.
Art. 4 Obligaciones — datos veraces, sin contenidos ilícitos/engañosos, sin
   promesas de salud a terceros, sin scraping.
Art. 5 Propiedad intelectual — derechos del Prestador; contenido de usuario bajo
   licencia simple.
Art. 6 SIN ASESORAMIENTO MÉDICO — véase Health Disclaimer.
Art. 7 Responsabilidad — ilimitada por dolo/culpa grave y daños personales; por culpa
   leve limitada a daños previsibles; en lo demás excluida en lo legalmente admisible.
Art. 8 Resolución — en cualquier momento por el usuario; suspensión ante infracciones.
Art. 9 Modificaciones — preaviso de 14 días por e-mail.
Art. 10 Ley aplicable — ley española; fuero: sede del Prestador.`,
    disclaimer: `Descargo de responsabilidad · Salud & Entrenamiento

1. SIN CONSEJO MÉDICO — no sustituye consulta médica, fisioterapéutica ni nutricional.
2. REVISIÓN MÉDICA ANTES DE EMPEZAR si tienes >35 años tras inactividad, enfermedades
   crónicas, hipertensión, diabetes, embarazo o lesiones recientes.
3. DETÉN EL ENTRENAMIENTO INMEDIATAMENTE ante: dolor torácico, disnea, mareo, pulso
   irregular, alteraciones visuales, desmayo, náuseas.
4. RESPONSABILIDAD PROPIA — entrenas bajo tu propio riesgo. AImAthlete no responde
   por lesiones ni sobrecargas.
5. ESTIMACIONES — todos los valores (VO2max, edad de forma, recuperación, predicciones)
   son estimaciones algorítmicas; no sustituyen mediciones de laboratorio.
6. BETA — modelos evolutivos; resultados sujetos a cambios.
7. EMERGENCIA — número europeo: 112.`,
    cookies: `Cookies & Seguimiento

Usamos cookies de forma moderada y transparente.

• NECESARIAS (sin consentimiento): sesión, CSRF, idioma, estado de consentimiento.
• PREFERENCIAS: unidades, configuración del panel (localStorage).
• ANALÍTICA (opcional, con consentimiento): estadísticas anónimas de uso.
• MARKETING: ninguna actualmente.

Puedes retirar tu consentimiento en cualquier momento desde los ajustes.`,
  };

  // ─── 中文 (ZH) ────────────────────────────────────────────────────────────
  TXT.zh = {
    imprint: `法律信息 (Impressum)

服务提供者：[名称 / 公司]
[地址] · [邮编, 城市] · [国家]
联系方式：kontakt@aimathlete.app
注册号：[如适用] · 税号：[如适用]

欧盟在线争议解决平台：https://ec.europa.eu/consumers/odr
我们没有义务参与消费者仲裁程序。

内容/链接/版权责任 — 适用一般法律规定。
注意（测试版）：上线前需完成法律审查。`,
    privacy: `隐私政策

版本：2026-04-05 · v1.0（测试版）

1. 数据控制者：[名称]，邮箱：datenschutz@aimathlete.app
2. 处理的数据类型：账户数据、训练数据（距离、配速、心率、GPS、功率）、
   健康相关数据（HRV、静息心率、VO2max、睡眠、恢复）、
   连接器令牌（Strava / Garmin / WHOOP）、使用和错误日志。
3. 处理目的与法律依据（GDPR 第 6 条）：履行合同、正当利益（安全与改进）、
   同意（健康数据 第 9(2)(a) 条、分析）。
4. 数据接收方：Supabase（托管）、Vercel（前端）、OAuth 提供商。
   对第三国转移采用欧盟标准合同条款 (SCC)。
5. 保留期限：账户数据至删除，日志最长 90 天。
6. 你的权利（GDPR 第 15-22 条）：访问、更正、删除、限制、可携带性、
   反对、撤回同意。可向主管监管机构投诉。
   联系：datenschutz@aimathlete.app
7. 安全措施：TLS 1.2+、密码哈希、行级安全、令牌加密存储。
8. 无 GDPR 第 22 条意义上的自动化个人决策 — 训练计划是算法建议。`,
    terms: `使用条款

版本：2026-04-05 · v1.0（测试版）

§1 适用范围 — AImAthlete（测试版）的使用。
§2 服务内容 — AI 训练规划、分析、恢复、连接器、社区功能。
§3 账户 — 每人一个账户；登录凭据须保密。
§4 义务 — 如实填写信息、不发布违法/误导内容、不得对他人作健康承诺、禁止抓取。
§5 知识产权 — 权利属服务提供者；用户内容授予简单许可。
§6 非医疗建议 — 见健康免责声明。
§7 责任 — 故意/重大过失及人身损害无限责任；轻微过失限于可预见损害；
   其他在法律允许范围内排除。
§8 终止 — 用户可随时终止；违规可被封禁。
§9 变更 — 重大变更提前 14 天通过邮件通知。
§10 其他 — 适用德国法律；管辖法院：服务提供者所在地。`,
    disclaimer: `健康与训练免责声明

1. 非医疗建议 — 不可替代医生、物理治疗师或营养师的专业咨询。
2. 开始前请先就医：年龄 >35 岁且长期不活动、慢性病、高血压、糖尿病、
   怀孕或近期受伤者。
3. 立即停止训练 — 如出现胸痛、严重呼吸困难、头晕、心律不齐、视觉异常、
   昏厥感或恶心。
4. 个人责任 — 训练风险自负。AImAthlete 对伤病或过度训练不承担责任。
5. 估算值 — 所有指标（VO2max、体能年龄、恢复、预测）均为算法估算，
   不能替代实验室测量。
6. 测试版 — 模型持续迭代；结果可能变化。
7. 紧急情况 — 欧洲统一紧急电话：112。`,
    cookies: `Cookie 与跟踪

我们谨慎且透明地使用 Cookie。

• 必要 Cookie（无需同意）：登录会话、CSRF、语言、同意状态。
• 偏好 Cookie：单位、仪表板配置（localStorage）。
• 分析 Cookie（可选，需同意）：匿名使用统计。
• 营销 Cookie：目前无。

你可以随时在设置中撤回同意。`,
  };

  // ─── SVENSKA (SV) ─────────────────────────────────────────────────────────
  TXT.sv = {
    imprint: `Kolofon

Leverantör: [Namn / Företag]
[Gatuadress] · [Postnr. Ort] · Sverige
Kontakt: kontakt@aimathlete.app
Org.nr.: [om tillämpligt] · Moms: [om tillämpligt]

EU:s ODR-plattform: https://ec.europa.eu/consumers/odr
Vi är inte skyldiga att delta i tvistlösning utanför domstol.

Ansvar för innehåll/länkar/upphovsrätt — allmänna rättsregler gäller.
Obs (beta): juridisk granskning krävs före lansering.`,
    privacy: `Integritetspolicy

Version: 2026-04-05 · v1.0 (beta)

1. PERSONUPPGIFTSANSVARIG: [Namn], e-post: datenschutz@aimathlete.app
2. BEHANDLADE UPPGIFTER: kontodata, träningsdata (distans, tempo, puls, GPS, watt),
   hälsorelaterade data (HRV, vilopuls, VO2max, sömn, återhämtning),
   connector-tokens (Strava/Garmin/WHOOP), användnings- och felloggar.
3. ÄNDAMÅL & RÄTTSLIG GRUND (GDPR art. 6): avtalsuppfyllelse, berättigat intresse
   (säkerhet, förbättring), samtycke (hälsodata art. 9(2)(a), analys).
4. MOTTAGARE: Supabase (hosting), Vercel (frontend), OAuth-leverantörer.
   EU-SCC vid tredjelandsöverföring.
5. LAGRINGSTID: kontodata till radering, loggar max 90 dagar.
6. DINA RÄTTIGHETER (GDPR art. 15-22): tillgång, rättelse, radering, begränsning,
   dataportabilitet, invändning, återkalla samtycke. Klagorätt till IMY.
   Kontakt: datenschutz@aimathlete.app
7. SÄKERHET: TLS 1.2+, lösenordshashning, row-level security, krypterade tokens.
8. INGA AUTOMATISERADE BESLUT enligt art. 22 GDPR — träningsplaner är
   algoritmiska rekommendationer.`,
    terms: `Användarvillkor

Version: 2026-04-05 · v1.0 (beta)

§1 Tillämpning — användning av AImAthlete (beta).
§2 Tjänst — AI-träningsplan, analys, återhämtning, connectors, community.
§3 Konto — ett konto per person; inloggningsuppgifter hemliga.
§4 Skyldigheter — sanna uppgifter, inget olagligt/vilseledande innehåll, inga
   hälsolöften till andra, ingen scraping.
§5 Immaterialrätt — rättigheter hos leverantören; användarinnehåll under enkel licens.
§6 INGEN MEDICINSK RÅDGIVNING — se Health Disclaimer.
§7 Ansvar — obegränsat vid uppsåt/grov vårdslöshet och personskada; vid lindrig
   vårdslöshet begränsat till förutsebara skador; i övrigt uteslutet så långt lagen tillåter.
§8 Uppsägning — när som helst av användaren; avstängning vid överträdelser.
§9 Ändringar — 14 dagars förvarning via e-post.
§10 Slutbestämmelser — svensk rätt; behörig domstol: leverantörens säte.`,
    disclaimer: `Hälso- & Träningsförbehåll

1. INGEN MEDICINSK RÅDGIVNING — ersätter inte läkare, fysioterapeut eller dietist.
2. MEDICINSK BEDÖMNING FÖRE START vid ålder >35 + inaktivitet, kroniska sjukdomar,
   högt blodtryck, diabetes, graviditet, nyligen skada.
3. AVBRYT TRÄNINGEN OMEDELBART vid bröstsmärta, andnöd, yrsel, oregelbunden puls,
   synrubbningar, svimningskänsla, illamående.
4. EGET ANSVAR — du tränar på egen risk. AImAthlete ansvarar inte för skador.
5. UPPSKATTNINGAR — alla värden (VO2max, träningsålder, återhämtning, prognoser) är
   algoritmiska uppskattningar; ersätter inte labbmätningar.
6. BETA — modeller utvecklas; resultat kan ändras.
7. NÖDFALL — europeiskt nödnummer: 112.`,
    cookies: `Cookies & Spårning

Vi använder cookies sparsamt och transparent.

• NÖDVÄNDIGA (utan samtycke): inloggningssession, CSRF, språk, samtyckesstatus.
• INSTÄLLNINGAR: enheter, dashboardkonfiguration (localStorage).
• ANALYS (valfritt, med samtycke): anonym användningsstatistik.
• MARKNADSFÖRING: ingen för närvarande.

Samtycket kan återkallas när som helst i inställningarna.`,
  };

  // ─── DANSK (DA) ───────────────────────────────────────────────────────────
  TXT.da = {
    imprint: `Kolofon

Udbyder: [Navn / Firma]
[Gade og nummer] · [Postnr. By] · Danmark
Kontakt: kontakt@aimathlete.app
CVR: [hvis relevant] · Moms: [hvis relevant]

EU's ODR-platform: https://ec.europa.eu/consumers/odr
Vi er ikke forpligtet til at deltage i udenretlig tvistløsning.

Ansvar for indhold/links/ophavsret — almindelige lovbestemmelser gælder.
Bemærk (beta): juridisk gennemgang før lancering.`,
    privacy: `Privatlivspolitik

Version: 05.04.2026 · v1.0 (beta)

1. DATAANSVARLIG: [Navn], e-mail: datenschutz@aimathlete.app
2. BEHANDLEDE DATA: kontodata, træningsdata (distance, tempo, puls, GPS, watt),
   sundhedsrelaterede data (HRV, hvilepuls, VO2max, søvn, restitution),
   connector-tokens (Strava/Garmin/WHOOP), bruger- og fejllogs.
3. FORMÅL & RETSGRUNDLAG (GDPR art. 6): kontraktopfyldelse, legitim interesse
   (sikkerhed, forbedring), samtykke (sundhedsdata art. 9(2)(a), analyse).
4. MODTAGERE: Supabase (hosting), Vercel (frontend), OAuth-udbydere.
   EU-SCC ved tredjelandsoverførsler.
5. OPBEVARINGSPERIODE: kontodata indtil sletning, logs maks. 90 dage.
6. DINE RETTIGHEDER (GDPR art. 15-22): indsigt, berigtigelse, sletning, begrænsning,
   dataportabilitet, indsigelse, tilbagekaldelse af samtykke. Klageret til Datatilsynet.
   Kontakt: datenschutz@aimathlete.app
7. SIKKERHED: TLS 1.2+, kodeords-hashing, row-level security, krypterede tokens.
8. INGEN AUTOMATISKE AFGØRELSER iht. art. 22 GDPR — træningsplaner er
   algoritmiske anbefalinger.`,
    terms: `Brugervilkår

Version: 05.04.2026 · v1.0 (beta)

§1 Omfang — brug af AImAthlete (beta).
§2 Tjeneste — AI-træningsplan, analyse, restitution, connectors, fællesskab.
§3 Konto — én konto pr. person; login holdes hemmeligt.
§4 Forpligtelser — sande oplysninger, intet ulovligt/vildledende indhold, ingen
   sundhedsløfter til andre, ingen scraping.
§5 IP — rettigheder hos udbyderen; brugerindhold under simpel licens.
§6 INGEN LÆGELIG RÅDGIVNING — se Health Disclaimer.
§7 Ansvar — ubegrænset ved forsæt/grov uagtsomhed og personskade; ved let
   uagtsomhed begrænset til forudsigeligt tab; i øvrigt udelukket så vidt loven
   tillader.
§8 Opsigelse — til enhver tid af brugeren; lukning ved overtrædelser.
§9 Ændringer — 14 dages varsel via e-mail.
§10 Slutbestemmelser — dansk ret; værneting: udbyderens hjemsted.`,
    disclaimer: `Sundheds- & Træningsforbehold

1. INGEN LÆGELIG RÅDGIVNING — erstatter ikke læge, fysioterapeut eller diætist.
2. LÆGEUNDERSØGELSE FØR START hvis alder >35 efter inaktivitet, kroniske sygdomme,
   forhøjet blodtryk, diabetes, graviditet, nylige skader.
3. AFBRYD TRÆNING STRAKS ved brystsmerter, åndenød, svimmelhed, uregelmæssig puls,
   synsforstyrrelser, besvimelsesfølelse, kvalme.
4. EGET ANSVAR — du træner på eget ansvar. AImAthlete hæfter ikke for skader.
5. ESTIMATER — alle værdier (VO2max, træningsalder, restitution, prognoser) er
   algoritmiske estimater; erstatter ikke laboratoriemålinger.
6. BETA — modeller under udvikling; resultater kan ændre sig.
7. NØDSITUATION — europæisk nødnummer: 112.`,
    cookies: `Cookies & Tracking

Vi bruger cookies sparsomt og gennemsigtigt.

• NØDVENDIGE (uden samtykke): login-session, CSRF, sprog, samtykkestatus.
• PRÆFERENCER: enheder, dashboardopsætning (localStorage).
• ANALYSE (valgfrit, med samtykke): anonym brugsstatistik.
• MARKETING: ingen p.t.

Samtykke kan til enhver tid tilbagekaldes i indstillingerne.`,
  };

  // API
  function get(lang, section) {
    const l = (lang || "de").toLowerCase();
    const candidates = [l, l.split("-")[0], "de"];
    for (const c of candidates) {
      if (TXT[c] && TXT[c][section]) return TXT[c][section];
    }
    return TXT.de[section] || "";
  }

  function hasLang(lang) {
    return Boolean(TXT[(lang || "").toLowerCase()]);
  }

  function availableLangs() {
    return Object.keys(TXT);
  }

  return { get, hasLang, availableLangs, _texts: TXT };
})();
