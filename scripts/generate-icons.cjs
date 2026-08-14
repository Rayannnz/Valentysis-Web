/**
 * Regenerates the full icon set from public/logo/logo-mark.png.
 * Run from the repo root: node <this file>
 */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
/* the script lives outside the repo, so resolve sharp from the project instead */
const sharp = require(require.resolve("sharp", { paths: [ROOT] }));
const SRC = path.join(ROOT, "public/logo/logo-mark.png");
const BRAND = "#6D28D9";

/** Trim the source's transparent margin once so every output frames identically. */
const trimmed = () => sharp(SRC).trim({ threshold: 10 });

/**
 * Mark centered on `bg`, inset so it never touches the edge.
 *
 * `palette` must stay false for anything destined for the .ico: Next decodes
 * app/favicon.ico at build time to read its dimensions and rejects non-RGBA
 * PNG frames outright ("The PNG is not in RGBA format"), failing every route.
 */
async function badge(size, bg, insetRatio, palette = true) {
  const inner = Math.round(size * (1 - insetRatio * 2));
  const mark = await trimmed()
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: bg },
  })
    /* "center" and "centre" are the same constant in sharp (both 0). US spelling
       here to match the rest of the project */
    .composite([{ input: mark, gravity: "center" }])
    /* palette quantization. A flat two-tone mark loses nothing and drops ~80% */
    .png({ compressionLevel: 9, palette, quality: 90 })
    .toBuffer();
}

/** Transparent square, mark inset. */
async function transparentMark(size, insetRatio) {
  return badge(size, { r: 0, g: 0, b: 0, alpha: 0 }, insetRatio);
}

/**
 * ICO is a 6-byte header + one 16-byte directory entry per image. Since Vista,
 * an entry's payload may be a whole PNG file, so the frames go in verbatim.
 */
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(pngs.length, 4);

  let offset = 6 + pngs.length * 16;
  const entries = [];
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // 0 means 256
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // palette size
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

const write = (rel, buf) => {
  const abs = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, buf);
  console.log(`  ${rel}  ${(buf.length / 1024).toFixed(1)} KB`);
};

(async () => {
  console.log("icons:");

  // Browser tab / Next `icon` convention. Transparent, tight crop.
  write("app/icon.png", await transparentMark(256, 0.04));

  // iOS home screen. Flattened, iOS masks the corners itself.
  write("app/apple-icon.png", await badge(180, "#ffffff", 0.12));

  // PWA manifest.
  write("public/icons/icon-192.png", await badge(192, "#ffffff", 0.1));
  write("public/icons/icon-512.png", await badge(512, "#ffffff", 0.1));
  // Maskable needs the mark inside a 60% safe zone. Android crops to a circle.
  // White, not BRAND: the mark is itself dark purple and disappears against it.
  write("public/icons/icon-maskable-512.png", await badge(512, "#ffffff", 0.22));

  // Legacy /favicon.ico probe. Three frames, flattened for dark tab strips.
  const frames = [];
  for (const size of [16, 32, 48]) {
    frames.push({ size, data: await badge(size, "#ffffff", 0.06, false) });
  }
  write("app/favicon.ico", buildIco(frames));
})();
