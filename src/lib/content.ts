export type CaseStudy = {
  title: string;
  vertical: string;
  challenge: string;
  solution: string;
  deployment: string;
  results: string[];
};

export const navItems = [
  { label: "Utilities", href: "/utilities" },
  { label: "Industrial IoT", href: "/industrial-iot" },
  { label: "Nexavia Platform", href: "/nexavia-platform" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Partner Program", href: "/partner-program" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const metrics = [
  { value: "180K+", label: "Connected utility endpoints" },
  { value: "99.95%", label: "Platform uptime target" },
  { value: "24/7", label: "Operational monitoring" },
  { value: "12", label: "EU regions with active deployments" }
];

export const caseStudies: CaseStudy[] = [
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
    results: ["18% drop in non-revenue water", "Meter data availability above 99%", "Customer complaint volume reduced by 27%"]
  },
  {
    title: "Pumping Station Monitoring",
    vertical: "Infrastructure Monitoring",
    challenge:
      "A water infrastructure operator had unplanned downtime due to delayed fault detection at remote stations.",
    solution:
      "KUEM added sensor telemetry, condition thresholds, and maintenance alerts through Nexavia dashboards.",
    deployment: "84 pumping stations connected with secure telemetry and automated maintenance ticket triggers.",
    results: ["Unplanned downtime reduced by 31%", "Service trips reduced by 19%", "Maintenance planning accuracy improved"]
  }
];

export const utilityUseCases = [
  "Remote meter reads with high data availability",
  "Leak, tamper, and pressure anomaly detection",
  "District metered area visibility for NRW reduction",
  "Consumption analytics for demand forecasting",
  "SCADA and billing integration through open APIs"
];

export const industrialUseCases = [
  "Temperature monitoring for cold chain and facilities",
  "Energy monitoring for production and utilities",
  "Environmental sensing for compliance and safety",
  "Asset tracking for mobile equipment and tools",
  "Custom IoT projects for specialized operational needs"
];
