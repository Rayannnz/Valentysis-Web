import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/ServicePage";
import { buildMetadata } from "@/lib/seo";
import { getService, services } from "@/lib/services";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

/* any slug outside generateStaticParams is a 404, not an on-demand render */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  /* returning {} here would leave the page inheriting the site-wide title and
     canonical, which is a duplicate-metadata bug waiting to happen */
  if (!service) {
    return { title: { absolute: "Service not found | Valentisys" }, robots: { index: false } };
  }

  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
