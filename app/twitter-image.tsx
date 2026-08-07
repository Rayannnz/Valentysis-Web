import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

/* Same artwork as opengraph-image. X falls back to og:image on its own, but an
   explicit twitter:image is what stops the card renderer guessing. */
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function TwitterImage() {
  return renderOgImage();
}
