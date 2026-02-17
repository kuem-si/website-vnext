import type { Locale } from "./i18n";

export type CaseStudy = {
  title: string;
  vertical: string;
  challenge: string;
  solution: string;
  deployment: string;
  results: string[];
};

const navItemsEn = [
  { label: "Utilities", href: "/utilities" },
  { label: "Industrial IoT", href: "/industrial-iot" },
  { label: "Nexavia Platform", href: "/nexavia-platform" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Partner Program", href: "/partner-program" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

const navItemsSl = [
  { label: "Komunala", href: "/utilities" },
  { label: "Industrijski IoT", href: "/industrial-iot" },
  { label: "Platforma Nexavia", href: "/nexavia-platform" },
  { label: "Primeri projektov", href: "/case-studies" },
  { label: "Partnerski program", href: "/partner-program" },
  { label: "O nas", href: "/about" },
  { label: "Kontakt", href: "/contact" }
];

const metricsEn = [
  { value: "180K+", label: "Connected utility endpoints" },
  { value: "99.95%", label: "Platform uptime target" },
  { value: "24/7", label: "Operational monitoring" },
  { value: "12", label: "EU regions with active deployments" }
];

const metricsSl = [
  { value: "180K+", label: "Povezanih komunalnih naprav" },
  { value: "99.95%", label: "Ciljna razpolozljivost platforme" },
  { value: "24/7", label: "Operativni nadzor" },
  { value: "12", label: "Regij EU z aktivnimi uvedbami" }
];

const caseStudiesEn: CaseStudy[] = [
  {
    title: "NB-IoT Gas Metering Rollout",
    vertical: "Gas Utility",
    challenge:
      "A regional gas utility needed remote readings to reduce manual routes and improve billing accuracy.",
    solution:
      "KUEM deployed NB-IoT meters through Nexavia with alarm rules for leakage and pressure anomalies.",
    deployment: "32,000 meters across 3 service zones integrated with existing billing and SCADA workflows.",
    results: ["43% fewer manual visits", "22% faster billing cycle", "Leak response time reduced by 35%"]
  },
  {
    title: "LoRaWAN Water Metering Program",
    vertical: "Water Utility",
    challenge:
      "A municipal water operator needed better visibility on consumption and non-revenue water losses.",
    solution:
      "KUEM implemented LoRaWAN smart metering with district metered area analytics and event-based alerts.",
    deployment: "57,000 endpoints and 240 gateways connected to Nexavia with API links to utility ERP.",
    results: [
      "18% drop in non-revenue water",
      "Meter data availability above 99%",
      "Customer complaint volume reduced by 27%"
    ]
  },
  {
    title: "Pumping Station Monitoring",
    vertical: "Infrastructure Monitoring",
    challenge:
      "A water infrastructure operator had unplanned downtime due to delayed fault detection at remote stations.",
    solution:
      "KUEM added sensor telemetry, condition thresholds, and maintenance alerts through Nexavia dashboards.",
    deployment: "84 pumping stations connected with secure telemetry and automated maintenance ticket triggers.",
    results: [
      "Unplanned downtime reduced by 31%",
      "Service trips reduced by 19%",
      "Maintenance planning accuracy improved"
    ]
  }
];

const caseStudiesSl: CaseStudy[] = [
  {
    title: "Uvedba NB-IoT merjenja plina",
    vertical: "Plinska komunala",
    challenge:
      "Regionalni dobavitelj plina je potreboval daljinsko odcitavanje za manj terenskih obiskov in natancnejse obracunavanje.",
    solution:
      "KUEM je prek Nexavie uvedel NB-IoT stevce z alarmnimi pravili za zaznavanje puscanj in odstopanj tlaka.",
    deployment:
      "32.000 stevcev v 3 oskrbnih obmocjih, povezanih z obstojecimi obracunskimi in SCADA procesi.",
    results: ["43% manj rocnih obiskov", "22% hitrejsi obracunski cikel", "35% hitrejsi odziv na puscanja"]
  },
  {
    title: "LoRaWAN program merjenja vode",
    vertical: "Vodna komunala",
    challenge:
      "Mestni upravljavec vodovoda je potreboval boljsi vpogled v porabo in izgube neobracunske vode.",
    solution:
      "KUEM je uvedel LoRaWAN pametno merjenje z analitiko DMA obmocij in opozorili na dogodke.",
    deployment: "57.000 naprav in 240 prehodov povezanih v Nexavio z API povezavami v komunalni ERP.",
    results: ["18% manj neobracunske vode", "Razpolozljivost merilnih podatkov nad 99%", "27% manj pritozb uporabnikov"]
  },
  {
    title: "Nadzor crpalnih postaj",
    vertical: "Nadzor infrastrukture",
    challenge:
      "Upravljavec vodne infrastrukture je imel nenacrtovane izpade zaradi poznega zaznavanja napak na oddaljenih postajah.",
    solution:
      "KUEM je dodal senzorsko telemetrijo, pragove stanj in vzdrzevalna opozorila prek nadzornih plosc Nexavia.",
    deployment:
      "84 crpalnih postaj povezanih z varno telemetrijo in avtomatiziranimi sprozilci vzdrzevalnih nalogov.",
    results: [
      "31% manj nenacrtovanih izpadov",
      "19% manj servisnih izhodov",
      "Bolj natancno planiranje vzdrzevanja"
    ]
  }
];

const utilityUseCasesEn = [
  "Remote meter reads with high data availability",
  "Leak, tamper, and pressure anomaly detection",
  "District metered area visibility for NRW reduction",
  "Consumption analytics for demand forecasting",
  "SCADA and billing integration through open APIs"
];

const utilityUseCasesSl = [
  "Daljinsko odcitavanje z visoko razpolozljivostjo podatkov",
  "Zaznavanje puscanj, manipulacij in odstopanj tlaka",
  "Vidljivost DMA obmocij za zmanjsevanje izgub vode",
  "Analitika porabe za napovedovanje potreb",
  "Integracija s SCADA in obracunom prek odprtih API-jev"
];

const industrialUseCasesEn = [
  "Temperature monitoring for cold chain and facilities",
  "Energy monitoring for production and utilities",
  "Environmental sensing for compliance and safety",
  "Asset tracking for mobile equipment and tools",
  "Custom IoT projects for specialized operational needs"
];

const industrialUseCasesSl = [
  "Nadzor temperature v hladni verigi in objektih",
  "Energetski nadzor proizvodnje in podpornih sistemov",
  "Okoljski senzorji za skladnost in varnost",
  "Sledenje mobilni opremi in orodjem",
  "Prilagojeni IoT projekti za posebne operativne potrebe"
];

export const navItems = navItemsEn;
export const metrics = metricsEn;
export const caseStudies = caseStudiesEn;
export const utilityUseCases = utilityUseCasesEn;
export const industrialUseCases = industrialUseCasesEn;

export function getNavItems(locale: Locale) {
  return locale === "sl" ? navItemsSl : navItemsEn;
}

export function getMetrics(locale: Locale) {
  return locale === "sl" ? metricsSl : metricsEn;
}

export function getCaseStudies(locale: Locale) {
  return locale === "sl" ? caseStudiesSl : caseStudiesEn;
}

export function getUtilityUseCases(locale: Locale) {
  return locale === "sl" ? utilityUseCasesSl : utilityUseCasesEn;
}

export function getIndustrialUseCases(locale: Locale) {
  return locale === "sl" ? industrialUseCasesSl : industrialUseCasesEn;
}
