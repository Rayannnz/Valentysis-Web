export type Industry = {
  id: string;
  name: string;
  desc: string;
  tags: string[];
};

export const industries: Industry[] = [
  {
    id: "fintech",
    name: "Fintech",
    desc: "Payments, dashboards, and financial tooling built with the audit trails, access controls, and careful data handling that money work demands.",
    tags: ["Digital banking", "Payments", "Wealthtech", "Compliance"],
  },
  {
    id: "healthtech",
    name: "Healthtech",
    desc: "Patient platforms, telemedicine, and clinical workflow tools — designed around strict privacy requirements and the integrations healthcare systems demand.",
    tags: ["Telemedicine", "EHR / EMR", "Patient portals", "Medical devices"],
  },
  {
    id: "edtech",
    name: "Edtech",
    desc: "Learning platforms, assessment engines, and classroom tools built to grow from a pilot cohort to a full institution without a rewrite.",
    tags: ["LMS", "Assessment", "Gamification", "Analytics"],
  },
  {
    id: "ecommerce",
    name: "Ecommerce",
    desc: "Headless storefronts, marketplace platforms, and checkout flows tuned for conversion — and for the traffic spike that arrives with a sale.",
    tags: ["Headless commerce", "Marketplaces", "Checkout", "Logistics"],
  },
  {
    id: "proptech",
    name: "Proptech",
    desc: "Property management suites, listing platforms, and IoT-connected building software for a smarter built world.",
    tags: ["Listings", "Property management", "Smart buildings", "Valuation"],
  },
  {
    id: "ai-data",
    name: "AI & Data",
    desc: "LLM-powered features, retrieval pipelines, and the data plumbing behind them — taken from prototype to something you can safely put in front of users.",
    tags: ["Generative AI", "ML engineering", "Data platforms", "MLOps"],
  },
];
