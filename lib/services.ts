export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  navLabel: string;
  eyebrow: string;
  headline: string[];
  accentWord: string;
  lead: string;
  summary: string;
  homeDesc: string;
  panelLabel: string;
  panelCopy: string;
  offerings: { title: string; desc: string }[];
  fits: { label: string; title: string; desc: string }[];
};

export const services: Service[] = [
  {
    slug: "outsourcing",
    title: "Outsourcing Services",
    shortTitle: "Outsourcing",
    navLabel: "Outsourcing",
    eyebrow: "Outsourcing",
    headline: ["Dedicated talent,", "on your terms."],
    accentWord: "your terms",
    lead: "Flexible outsourcing for operations, delivery, and specialized roles — so you scale capacity without the overhead of full-time hiring.",
    summary:
      "Whether you need a dedicated pod, overflow capacity, or specialized roles you can't fill locally, we assemble and manage teams that plug into your workflows. Clear ownership, measurable output, and the flexibility to scale up or down as demand shifts.",
    homeDesc:
      "Dedicated teams and flexible capacity for operations, delivery, and specialized roles — without full-time hiring overhead.",
    panelLabel: "Plug in capacity",
    panelCopy: "People who join your tools and rituals — and leave when you no longer need them.",
    offerings: [
      {
        title: "Dedicated remote teams",
        desc: "Cross-functional pods that work inside your systems as an extension of your company.",
      },
      {
        title: "Process & operations outsourcing",
        desc: "Back-office, admin, and recurring workflows run to agreed SLAs and quality standards.",
      },
      {
        title: "Specialist staffing",
        desc: "Designers, analysts, coordinators, and other roles matched to a brief — not a generic bench.",
      },
      {
        title: "Managed delivery",
        desc: "We own outcomes with clear milestones, reporting, and a single point of contact.",
      },
    ],
    fits: [
      {
        label: "Growing teams",
        title: "Need capacity before headcount",
        desc: "The roadmap is longer than the team. You need skilled people now, not after a six-month hiring cycle.",
      },
      {
        label: "Agencies",
        title: "Overflow for client work",
        desc: "Client demand spikes and you need reliable partners who can take work without dropping quality.",
      },
      {
        label: "Operators",
        title: "Offloading repeatable work",
        desc: "Recurring operational tasks are eating senior time that should go to strategy and growth.",
      },
    ],
  },
  {
    slug: "real-customer-support",
    title: "Real Customer Support",
    shortTitle: "Real Customer Support",
    navLabel: "Real Customer Support",
    eyebrow: "Real customer support",
    headline: ["Support that", "feels like your team."],
    accentWord: "your team",
    lead: "Responsive, brand-aligned customer support across channels — so your clients feel heard and your team stays focused on growth.",
    summary:
      "We staff and run customer support that matches your voice, hours, and quality bar. From first response to resolution, every interaction is tracked, reported, and improved — without you hiring and managing a full in-house team overnight.",
    homeDesc:
      "Multichannel support that answers fast, resolves issues cleanly, and protects your brand at every touchpoint.",
    panelLabel: "Always on",
    panelCopy: "Coverage that matches your customers' hours — with clear SLAs and weekly reporting.",
    offerings: [
      {
        title: "Inbound support desks",
        desc: "Email, chat, and ticket queues handled with your scripts, knowledge base, and escalation paths.",
      },
      {
        title: "Live chat & helpdesk coverage",
        desc: "Real-time replies during peak hours so leads and customers never wait in silence.",
      },
      {
        title: "Onboarding & retention support",
        desc: "Guided setup, proactive check-ins, and renewal touches that reduce churn.",
      },
      {
        title: "QA & performance reporting",
        desc: "Scorecards, CSAT tracking, and weekly summaries so you always know how support is performing.",
      },
    ],
    fits: [
      {
        label: "SaaS",
        title: "Scaling support without hiring chaos",
        desc: "Volume is climbing and you need trained agents who already know how to work a ticket queue.",
      },
      {
        label: "E-commerce",
        title: "Handling order & returns volume",
        desc: "Seasonal spikes and routine order questions shouldn't pull your core team off product work.",
      },
      {
        label: "Founders",
        title: "Getting out of the inbox",
        desc: "You're still answering every customer email yourself — and it's crowding out everything else.",
      },
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    shortTitle: "Web Development",
    navLabel: "Web Development",
    eyebrow: "Web development",
    headline: ["Websites & apps", "built to perform."],
    accentWord: "perform",
    lead: "Custom websites, web apps, and digital platforms designed around your business — fast, reliable, and ready to grow with you.",
    summary:
      "From marketing sites to full product platforms, we design and build web experiences that look sharp, load fast, and convert. You get a senior team, clear scope, and demos you can click through — not slide decks describing progress.",
    homeDesc:
      "Custom websites, web apps, and digital platforms — designed around your business, not a template.",
    panelLabel: "Ship in weeks",
    panelCopy: "Scoped, priced, and built in short cycles you can see from day one.",
    offerings: [
      {
        title: "Marketing & corporate websites",
        desc: "Fast, SEO-ready sites that tell your story clearly and turn visitors into enquiries.",
      },
      {
        title: "Web applications",
        desc: "Dashboards, portals, and tools tailored to how your team and customers actually work.",
      },
      {
        title: "E-commerce & booking platforms",
        desc: "Stores and booking flows with payments, inventory, and admin tools that stay maintainable.",
      },
      {
        title: "Ongoing care & iteration",
        desc: "Post-launch updates, performance work, and feature releases so your site keeps improving.",
      },
    ],
    fits: [
      {
        label: "Startups",
        title: "Launching a first product or site",
        desc: "You need a credible web presence or MVP without burning months of runway on the wrong build.",
      },
      {
        label: "SMEs",
        title: "Replacing an outdated website",
        desc: "Your current site is slow, hard to update, or no longer reflects the business you've become.",
      },
      {
        label: "Operators",
        title: "Building internal web tools",
        desc: "Spreadsheets and manual processes need a proper web app your team can rely on every day.",
      },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortTitle: "Digital Marketing",
    navLabel: "Digital Marketing",
    eyebrow: "Digital marketing",
    headline: ["Content that", "builds an audience."],
    accentWord: "audience",
    lead: "Strategy, content, and community management that grow your presence — with reporting that shows what actually moved the needle.",
    summary:
      "We plan, create, and run digital marketing programs that match your brand voice and business goals. From content calendars to paid amplification and community replies, you get a consistent presence without stitching together freelancers every month.",
    homeDesc:
      "Strategy, content, and community management that grow your presence with clear reporting on what works.",
    panelLabel: "Consistent presence",
    panelCopy: "A calendar, a voice, and weekly metrics — so marketing stops being an afterthought.",
    offerings: [
      {
        title: "Strategy & channel planning",
        desc: "Audience research, positioning, and a channel mix tied to leads, awareness, or community goals.",
      },
      {
        title: "Content creation & calendars",
        desc: "Posts, reels, carousels, and captions planned and produced on a reliable publishing rhythm.",
      },
      {
        title: "Community management",
        desc: "Replies, comments, and DMs handled in your brand voice so engagement never goes cold.",
      },
      {
        title: "Paid campaigns & reporting",
        desc: "Targeted campaigns and clear monthly reports on reach, engagement, and conversion signals.",
      },
    ],
    fits: [
      {
        label: "Brands",
        title: "Building a consistent digital presence",
        desc: "You know marketing matters, but posting is inconsistent and nobody owns the strategy.",
      },
      {
        label: "Product teams",
        title: "Turning launches into attention",
        desc: "Features ship, but the announcement lands flat without content and distribution behind it.",
      },
      {
        label: "Local businesses",
        title: "Getting found where customers scroll",
        desc: "Your customers are on Instagram, Facebook, or LinkedIn — and competitors already show up there daily.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
