import HeaderClient from "@/components/HeaderClient";
import { industries } from "@/lib/industries";
import { services } from "@/lib/services";

/*
 * Server wrapper. The nav lists are derived here and passed down as plain
 * label/href pairs, so lib/services.ts (the whole content tree, ~34 kB of it)
 * stays out of the client bundle. The interactive header is HeaderClient.tsx.
 * Every page keeps rendering <Header /> exactly as before.
 */
const serviceNav = services.map(({ slug, navLabel }) => ({
  label: navLabel,
  href: `/services/${slug}`,
}));

const industryNav = industries.map(({ id, name }) => ({
  label: name,
  href: `/industries#${id}`,
}));

export default function Header() {
  return <HeaderClient serviceNav={serviceNav} industryNav={industryNav} />;
}
