import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = `${site.name} — outsourcing, customer support, and digital growth`;

/**
 * The renderer runs inside satori, which cannot reach the filesystem or the
 * network, so the mark is inlined as a data URI read at build time. A missing
 * file degrades to the wordmark alone rather than failing the build.
 */
function markDataUri(): string | null {
  try {
    const file = fs.readFileSync(path.join(process.cwd(), "public/logo/logo-mark.png"));
    return `data:image/png;base64,${file.toString("base64")}`;
  } catch {
    return null;
  }
}

/* Every node carries an explicit display — satori has no block layout and
   throws on any element with multiple children that isn't flex. */
export function renderOgImage() {
  const mark = markDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #171429 0%, #2A1C5C 55%, #4C1D95 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* magenta bloom, bottom-right — echoes --magenta in the site palette */}
        <div
          style={{
            position: "absolute",
            right: -180,
            bottom: -220,
            width: 620,
            height: 620,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,61,217,0.42) 0%, rgba(255,61,217,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* satori renders this, not the browser — next/image has no meaning
              here and the source is already an inlined data URI */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {mark && <img src={mark} width={86} height={86} alt="" />}
          <span
            style={{
              fontSize: 46,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            Valentisys
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
          <span
            style={{
              fontSize: 78,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
              display: "flex",
            }}
          >
            Staff, support &amp; grow
          </span>
          <span
            style={{
              fontSize: 78,
              fontWeight: 700,
              color: "#C4B5FD",
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
              display: "flex",
            }}
          >
            your business.
          </span>
          <span
            style={{
              marginTop: 26,
              fontSize: 27,
              color: "rgba(255,255,255,0.74)",
              lineHeight: 1.45,
              display: "flex",
            }}
          >
            Trained remote teams for health, legal, engineering, finance and hospitality.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: 26,
          }}
        >
          <span style={{ fontSize: 25, color: "rgba(255,255,255,0.62)", display: "flex" }}>
            valentisys.com
          </span>
          <span style={{ fontSize: 25, color: "rgba(255,255,255,0.62)", display: "flex" }}>
            Outsourcing · Support · Marketing · Apps · Web · AI
          </span>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
