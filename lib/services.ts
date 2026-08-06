export type DetailItem = { title: string; desc: string };

export type DetailGroup = {
  id: string;
  name: string;
  tagline: string;
  blurb: string;
  items: DetailItem[];
};

export type ServiceDetail = {
  eyebrow: string;
  title: string;
  note: string;
  groups: DetailGroup[];
};

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
  detail?: ServiceDetail;
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
    lead: "Flexible outsourcing for operations, delivery, and specialized roles, so you scale capacity without the overhead of full-time hiring.",
    summary:
      "Whether you need a dedicated pod, overflow capacity, or specialized roles you can't fill locally, we assemble and manage teams that plug into your workflows. Clear ownership, measurable output, and the flexibility to scale up or down as demand shifts.",
    homeDesc:
      "Dedicated teams and flexible capacity for operations, delivery, and specialized roles, without full-time hiring overhead.",
    panelLabel: "Plug in capacity",
    panelCopy: "People who join your tools and rituals, and leave when you no longer need them.",
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
        desc: "Designers, analysts, coordinators, and other roles matched to a brief, not a generic bench.",
      },
      {
        title: "Managed delivery",
        desc: "We own outcomes with clear milestones, reporting, and a single point of contact.",
      },
    ],
    fits: [
      {
        label: "Practices & firms",
        title: "Need capacity before headcount",
        desc: "The caseload is growing faster than you can hire. You need trained people now, not after a six-month recruitment cycle.",
      },
      {
        label: "Multi-site operators",
        title: "Cover across sites and hours",
        desc: "Reception, admin, and back office need coverage across locations and time zones without duplicating staff at every one.",
      },
      {
        label: "Owner-led businesses",
        title: "Senior time going to admin",
        desc: "Recurring operational work is eating the hours that should go to clients, strategy, and growth.",
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
    lead: "Trained remote staff for real estate, law firms, medical practices, accounting, and ecommerce, handling the work your front desk and back office can't keep up with.",
    summary:
      "This isn't a generic call center. We place people who already understand your industry's paperwork, deadlines, and tone: paralegals, front desk staff, schedulers, bookkeepers, and support agents who work inside your systems and follow your process. You keep control and oversight; we handle the volume.",
    homeDesc:
      "Trained remote staff for real estate, legal, medical, accounting, and ecommerce teams: paralegal work, front desk, scheduling, books, and buyer care.",
    panelLabel: "Always on",
    panelCopy: "Coverage that matches your clients' hours, with clear SLAs and weekly reporting.",
    offerings: [
      {
        title: "Real estate support",
        desc: "Remote paralegal work: contracts, lease and purchase agreements, research, and client files kept in order.",
      },
      {
        title: "Law firm support",
        desc: "Legal and paralegal assistants handling paperwork, case studies, file maintenance, and mortgage files.",
      },
      {
        title: "Medical practice support",
        desc: "Remote front desk, patient scheduling, prior authorization, and patient queries answered promptly.",
      },
      {
        title: "Accounting support",
        desc: "Bookkeeping and accounts management kept current, reconciled, and reported on your schedule.",
      },
    ],
    fits: [
      {
        label: "Real estate",
        title: "Deals stuck behind paperwork",
        desc: "Agreements, disclosures, and client files pile up while your agents should be closing, not formatting documents.",
      },
      {
        label: "Legal",
        title: "Billable hours lost to admin",
        desc: "Attorneys are doing paralegal work because hiring locally is slow and expensive.",
      },
      {
        label: "Medical",
        title: "A front desk that can't keep up",
        desc: "Calls go unanswered, authorizations sit pending, and patients wait, while your staff is already at capacity.",
      },
    ],
    detail: {
      eyebrow: "In detail",
      title: "What we cover, by industry",
      note: "Every task below is work we take on directly. Pick the ones you need. You're not buying a bundle.",
      groups: [
        {
          id: "law-firms",
          name: "Law Firms",
          tagline: "Remote legal & paralegal staff",
          blurb:
            "Experienced legal assistants working inside your practice management system, so attorney time goes to billable work, not document prep.",
          items: [
            {
              title: "Real Estate Purchase Agreements",
              desc: "Purchase agreements prepared with the correct parties, dates, contingencies, and disclosures attached before they reach the table.",
            },
            {
              title: "Real Estate Lease Agreements",
              desc: "Residential and commercial leases drafted, updated at renewal, and checked line by line against your standard terms.",
            },
            {
              title: "Real Estate Review, Formatting & Completeness",
              desc: "A second set of eyes before signature: missing exhibits, blank fields, broken numbering, and inconsistent defined terms caught early.",
            },
            {
              title: "Remote Legal & Paralegal Support",
              desc: "Trained legal assistants and paralegals working your matters remotely, following your firm's process and confidentiality standards.",
            },
            {
              title: "Draft Contracts",
              desc: "First-draft contracts built from your templates and deal terms, ready for your attorney to review and sign off.",
            },
            {
              title: "Case Studies",
              desc: "Matter summaries and case write-ups prepared for internal review, client pitches, or publication, structured and consistent.",
            },
            {
              title: "Paperwork",
              desc: "Routine filings, forms, correspondence, and document preparation handled end to end and returned ready for review.",
            },
            {
              title: "Files Maintenance",
              desc: "Matter files kept current: new documents indexed, closed files archived, and nothing lost between systems or handoffs.",
            },
            {
              title: "Mortgage Files",
              desc: "Mortgage and closing files assembled, checked for completeness against your checklist, and tracked through to funding.",
            },
          ],
        },
        {
          id: "medical",
          name: "Medical",
          tagline: "Remote front desk & patient support",
          blurb:
            "A remote front desk that answers every call, books every appointment, and follows authorizations through to approval.",
          items: [
            {
              title: "Remote Front Desk",
              desc: "A trained remote receptionist answering your practice line, greeting patients, routing calls, and taking messages that actually get acted on.",
            },
            {
              title: "Patient Scheduling",
              desc: "Appointments booked, rescheduled, and confirmed in your practice software, with reminder calls that cut no-show rates.",
            },
            {
              title: "Prior Authorization",
              desc: "Authorizations submitted, followed up with payers, and tracked until you have an approval on file, not left pending.",
            },
            {
              title: "Patient Questions / Support",
              desc: "Patient questions about visits, billing, and follow-ups answered promptly, with anything clinical escalated straight to your staff.",
            },
          ],
        },
        {
          id: "accounting",
          name: "Accounting",
          tagline: "Books & accounts management",
          blurb:
            "Day-to-day bookkeeping and account management taken off your plate: current, reconciled, and ready at close.",
          items: [
            {
              title: "Bookkeeping",
              desc: "Daily and monthly books kept current: transactions categorized, accounts reconciled, and records clean before every close.",
            },
            {
              title: "Accounts Management",
              desc: "Payables, receivables, invoicing, and follow-up on what's owed, reported back on a schedule you set.",
            },
          ],
        },
        {
          id: "ecommerce",
          name: "Ecommerce",
          tagline: "Store accounts & buyer care",
          blurb:
            "Storefront and marketplace accounts kept in order, and buyers looked after: orders tracked, questions answered, and returns closed out before they turn into bad reviews.",
          items: [
            {
              title: "Account Handling",
              desc: "Day-to-day management of your store and marketplace accounts: listings, stock levels, orders, and pricing kept accurate and up to date.",
            },
            {
              title: "Customer Support",
              desc: "Buyers looked after across email, chat, and marketplace messages: order status, delivery, and post-purchase issues handled in your brand's tone.",
            },
            {
              title: "Complaints and Refund Handling",
              desc: "Returns, disputes, and refund requests worked through against your policy, resolved quickly, logged properly, and escalated only when they need you.",
            },
            {
              title: "Customer Questions and Answers",
              desc: "Pre-sale questions, product details, and marketplace Q&A answered accurately and fast, so buyers get what they need before they leave the page.",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortTitle: "Digital Marketing",
    navLabel: "Digital Marketing",
    eyebrow: "Digital marketing",
    headline: ["Marketing that", "brings in customers."],
    accentWord: "customers",
    lead: "Social media, content, paid ads, and lead generation run as one program, with reporting that shows exactly what brought in the business.",
    summary:
      "We plan and run digital marketing built around leads and sales, not impressions. Social presence, content, paid campaigns, search visibility, and brand positioning handled by one team, so the channels reinforce each other instead of being stitched together from freelancers every month.",
    homeDesc:
      "Social media, content, paid ads, and lead generation, run as one program with reporting tied to sales.",
    panelLabel: "Built for leads",
    panelCopy: "Every channel measured against pipeline, not likes, reach, or vanity metrics.",
    offerings: [
      {
        title: "Search & visibility",
        desc: "SEO and local search work that gets you found by people already looking for what you sell.",
      },
      {
        title: "Paid acquisition",
        desc: "Google and Meta campaigns managed against a target cost per lead, with spend you can see.",
      },
      {
        title: "Conversion & content",
        desc: "Landing pages, content, and social built to turn attention into inquiries and sales.",
      },
      {
        title: "Brand & strategy",
        desc: "Positioning, messaging, and a channel plan so every campaign says the same clear thing.",
      },
    ],
    fits: [
      {
        label: "Local businesses",
        title: "Not showing up where customers search",
        desc: "Competitors appear in map results and search ads while your business is invisible to nearby buyers.",
      },
      {
        label: "Service firms",
        title: "Ad spend without a pipeline",
        desc: "You're paying for clicks, but the leads are thin and nobody can say which channel is actually working.",
      },
      {
        label: "Brands",
        title: "Inconsistent presence",
        desc: "Posting is sporadic, the messaging shifts every month, and nobody owns the strategy behind it.",
      },
    ],
    detail: {
      eyebrow: "In detail",
      title: "What we run for you",
      note: "Take the full program or a single channel. Each one is scoped, priced, and reported on separately.",
      groups: [
        {
          id: "social-media",
          name: "Social Media Marketing",
          tagline: "A presence that stays consistent",
          blurb:
            "Posting, engagement, and community management in your brand voice across the platforms your customers actually use.",
          items: [
            {
              title: "Channel strategy",
              desc: "The platforms worth your effort, the content that suits each, and a posting rhythm you can sustain.",
            },
            {
              title: "Post production & scheduling",
              desc: "Posts, reels, and carousels produced and scheduled ahead so your feed never goes quiet.",
            },
            {
              title: "Community management",
              desc: "Comments, replies, and DMs handled in your voice so engagement turns into conversations.",
            },
            {
              title: "Performance reporting",
              desc: "Monthly reporting on reach, engagement, and the traffic and inquiries social actually drove.",
            },
          ],
        },
        {
          id: "content-creation",
          name: "Content Creation",
          tagline: "Content that earns the click",
          blurb:
            "Written and visual content produced on a calendar you can rely on, planned around what your audience searches for and shares.",
          items: [
            {
              title: "Blog & article writing",
              desc: "Long-form pieces written to rank and to be worth reading: researched, structured, and in your voice.",
            },
            {
              title: "Visual & video assets",
              desc: "Graphics, carousels, and short-form video produced to match your brand and each platform's format.",
            },
            {
              title: "Email & newsletter copy",
              desc: "Campaigns and sequences that keep your list warm and move subscribers toward a purchase.",
            },
            {
              title: "Content calendar & planning",
              desc: "A publishing schedule agreed in advance, so content ships consistently instead of whenever someone has time.",
            },
          ],
        },
        {
          id: "google-meta-ads",
          name: "Ads: Google & Meta",
          tagline: "Paid traffic that pays back",
          blurb:
            "Search and social campaigns built, launched, and managed against a target cost per lead, with full visibility on where the budget goes.",
          items: [
            {
              title: "Campaign build & launch",
              desc: "Account structure, tracking, and conversion setup done properly before a single dollar of budget goes live.",
            },
            {
              title: "Audience & keyword targeting",
              desc: "Targeting built around buying intent and refined weekly on what's converting, not what's cheapest.",
            },
            {
              title: "Creative & ad copy testing",
              desc: "Multiple angles tested against each other so the winning ad is proven, not assumed.",
            },
            {
              title: "Budget pacing & reporting",
              desc: "Spend managed to your monthly cap, with clear reporting on cost per lead and return.",
            },
          ],
        },
        {
          id: "seo",
          name: "Search Engine Optimization (SEO)",
          tagline: "Rank for what your buyers actually search",
          blurb:
            "Technical, on-page, and content work that gets your site found for searches that lead to revenue, not vanity keywords nobody buys from.",
          items: [
            {
              title: "Technical audit & fixes",
              desc: "Crawl errors, site speed, indexing, and structure problems found and fixed so search engines can read your site properly.",
            },
            {
              title: "Keyword & intent mapping",
              desc: "The terms your buyers use at each stage, mapped to the pages that should rank for them.",
            },
            {
              title: "On-page optimization",
              desc: "Titles, headings, internal links, and copy tuned page by page against the keywords they're meant to win.",
            },
            {
              title: "Authority & link building",
              desc: "Earned mentions and quality backlinks that build the domain trust rankings depend on.",
            },
          ],
        },
        {
          id: "landing-pages",
          name: "Landing Page Design & Optimization",
          tagline: "Built to convert, not just to look good",
          blurb:
            "Pages designed around a single action, then tested and tuned until the conversion rate justifies the traffic you're paying for.",
          items: [
            {
              title: "Conversion-focused design",
              desc: "One page, one goal: layout, hierarchy, and calls to action built to move visitors toward it.",
            },
            {
              title: "Copy & offer structure",
              desc: "Headlines, proof, and offer framing written to answer objections before the visitor leaves.",
            },
            {
              title: "A/B testing",
              desc: "Headlines, forms, and layouts tested against live traffic so improvements are measured, not guessed.",
            },
            {
              title: "Speed & mobile optimization",
              desc: "Fast loads and a clean mobile experience, where most of your paid traffic will actually land.",
            },
          ],
        },
        {
          id: "local-seo",
          name: "Local SEO & Google Business Profile",
          tagline: "Show up when they search nearby",
          blurb:
            "Get found in map results and local searches: profile fully optimized, listings consistent everywhere, and reviews working for you.",
          items: [
            {
              title: "Google Business Profile optimization",
              desc: "Categories, services, hours, photos, and posts set up and maintained so your profile ranks and converts.",
            },
            {
              title: "Local keyword & map ranking",
              desc: "Targeted work to lift your position in the local pack for the searches that bring people through the door.",
            },
            {
              title: "Citations & listing consistency",
              desc: "Name, address, and phone details corrected and aligned across directories so search engines trust them.",
            },
            {
              title: "Review generation & response",
              desc: "A steady flow of genuine reviews, with every review answered, good or bad, in your brand voice.",
            },
          ],
        },
        {
          id: "lead-generation",
          name: "Lead Generation",
          tagline: "A pipeline, not just traffic",
          blurb:
            "Campaigns, capture flows, and follow-up sequences built to put qualified leads in front of your sales team.",
          items: [
            {
              title: "Lead magnets & offers",
              desc: "Guides, quotes, audits, and consultations packaged as offers people are willing to trade details for.",
            },
            {
              title: "Forms & capture flows",
              desc: "Capture forms and funnels designed to ask enough to qualify without losing the visitor.",
            },
            {
              title: "Outreach & nurture sequences",
              desc: "Automated email and message sequences that keep new leads engaged until they're ready to talk.",
            },
            {
              title: "Lead qualification & handoff",
              desc: "Leads screened and passed to your team with the context they need for the first call.",
            },
          ],
        },
        {
          id: "brand-strategy",
          name: "Brand Strategy & Positioning",
          tagline: "Say the thing only you can say",
          blurb:
            "The work that comes before campaigns: who you're for, what you stand for, and why anyone should choose you over the alternative.",
          items: [
            {
              title: "Positioning & messaging",
              desc: "A clear position in your market and the core messages every channel repeats consistently.",
            },
            {
              title: "Audience & competitor research",
              desc: "Who your buyers are, what they respond to, and where competitors have left an opening.",
            },
            {
              title: "Visual identity direction",
              desc: "Color, type, and imagery direction so your brand is recognizable before anyone reads a word.",
            },
            {
              title: "Brand guidelines",
              desc: "A practical guide your team and ours can apply: tone, visuals, and dos and don'ts in one place.",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "app-development",
    title: "App Development",
    shortTitle: "App Development",
    navLabel: "App Development",
    eyebrow: "App development",
    headline: ["Mobile apps people", "actually keep."],
    accentWord: "keep",
    lead: "iOS, Android, and cross-platform apps built around a real workflow, taken through store submission and kept current as your business changes.",
    summary:
      "We build apps for businesses that need one thing done properly: bookings, patient access, field reporting, orders, or an internal tool your team relies on every day. Scoped and priced before the build, submitted to the stores by us, and supported afterward, so you're not left holding a binary nobody can update.",
    homeDesc:
      "iOS, Android, and cross-platform apps, built around one job, submitted to the stores, and supported after launch.",
    panelLabel: "Store to stay",
    panelCopy: "We handle submission, review feedback, and the updates that keep the app compliant.",
    offerings: [
      {
        title: "iOS & Android apps",
        desc: "Native-quality builds from one codebase, so both platforms ship together instead of six months apart.",
      },
      {
        title: "Customer & booking apps",
        desc: "Appointments, orders, and accounts in your customers' pockets, with payments and notifications wired in.",
      },
      {
        title: "Internal & field tools",
        desc: "Apps for staff on the move: checklists, site reports, and data capture that works offline and syncs later.",
      },
      {
        title: "Store submission & upkeep",
        desc: "App Store and Play submission handled end to end, then OS updates and fixes kept on a schedule.",
      },
    ],
    fits: [
      {
        label: "Service businesses",
        title: "Customers are stuck calling to book",
        desc: "Bookings, reschedules, and reminders run through your phone line when an app could take most of the volume.",
      },
      {
        label: "Field teams",
        title: "Paper forms coming back from site",
        desc: "Staff record work on paper or WhatsApp and someone re-types it later, losing a day and half the detail.",
      },
      {
        label: "Operators",
        title: "An app nobody can update",
        desc: "You have an app, but the developer is gone, it breaks on new phones, and the stores are warning you about compliance.",
      },
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    shortTitle: "Web Development",
    navLabel: "Web Development",
    eyebrow: "Web development",
    headline: ["Websites built", "to perform."],
    accentWord: "perform",
    lead: "Custom websites, portals, and web platforms designed around your business: fast, reliable, and ready to grow with you.",
    summary:
      "From marketing sites to client portals, we design and build web experiences that look sharp, load fast, and convert. Clear scope, a fixed price agreed before the work starts, and something you can click through every week, not slide decks describing progress.",
    homeDesc:
      "Custom websites, portals, and web platforms, designed around your business, not a template.",
    panelLabel: "Ship in weeks",
    panelCopy: "Scoped, priced, and built in short cycles you can see from day one.",
    offerings: [
      {
        title: "Marketing & corporate websites",
        desc: "Fast, SEO-ready sites that tell your story clearly and turn visitors into inquiries.",
      },
      {
        title: "Client portals & dashboards",
        desc: "Secure logins where your customers check status, share documents, and stop emailing for updates.",
      },
      {
        title: "Ecommerce & booking platforms",
        desc: "Stores and booking flows with payments, inventory, and admin tools that stay maintainable.",
      },
      {
        title: "Ongoing care & iteration",
        desc: "Post-launch updates, performance work, and feature releases so your site keeps improving.",
      },
    ],
    fits: [
      {
        label: "Established firms",
        title: "A site that undersells the business",
        desc: "Your practice has grown but the website still looks like the one you launched years ago, and clients notice.",
      },
      {
        label: "Small businesses",
        title: "Nobody can update it",
        desc: "Every text change goes through a developer, so the site sits stale for months at a time.",
      },
      {
        label: "Operators",
        title: "Running the business on spreadsheets",
        desc: "Manual processes and shared files need a proper portal your team and clients can rely on every day.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
