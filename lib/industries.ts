export type Industry = {
  id: string;
  name: string;
  desc: string;
  tags: string[];
};

export const industries: Industry[] = [
  {
    id: "health",
    name: "Health",
    desc: "Practices, clinics, and health services get a remote front desk that answers every call, scheduling that cuts no-shows, and authorizations followed through to approval.",
    tags: ["Clinics & practices", "Patient scheduling", "Prior authorization", "Patient questions"],
  },
  {
    id: "legal",
    name: "Legal",
    desc: "Law firms and in-house legal teams get paralegal support, document preparation, and case files kept in order by staff who understand the paperwork and the confidentiality that comes with it.",
    tags: ["Law firms", "Paralegal support", "Case files", "Contract drafting"],
  },
  {
    id: "engineering",
    name: "Engineering",
    desc: "Engineering and construction firms get bid and proposal documentation, drawing and revision admin, and the project coordination that keeps a job moving between the field and the office.",
    tags: ["Consulting firms", "Bid documentation", "Drawing admin", "Project coordination"],
  },
  {
    id: "finance",
    name: "Finance",
    desc: "Accounting firms, brokers, and financial services get bookkeeping, reconciliations, and accounts management handled to a standard that holds up under audit.",
    tags: ["Accounting", "Bookkeeping", "Reconciliation", "Accounts management"],
  },
  {
    id: "hospitality",
    name: "Hospitality",
    desc: "Hotels, restaurants, and travel operators get reservations and guest messaging covered around the clock, reviews answered, and a social presence that fills rooms and tables.",
    tags: ["Hotels & resorts", "Reservations", "Guest support", "Review management"],
  },
];
