import sharp from "sharp";
import path from "path";

const width = 1012;
const height = 638;

const sources = {
  estetica: "public/EsteticaHome.png",
  spa: "public/Areaspa.jpg",
  coppia: "public/Suite.JPG",
};

const overlays = {
  estetica: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(250,247,242,0.18)" />
        <stop offset="55%" stop-color="rgba(201,123,178,0.10)" />
        <stop offset="100%" stop-color="rgba(107,58,42,0.12)" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#g)" />
  </svg>`,
  spa: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(44,24,16,0.20)" />
        <stop offset="55%" stop-color="rgba(155,94,138,0.12)" />
        <stop offset="100%" stop-color="rgba(250,247,242,0.06)" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#g)" />
  </svg>`,
  coppia: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(250,247,242,0.12)" />
        <stop offset="50%" stop-color="rgba(201,123,178,0.14)" />
        <stop offset="100%" stop-color="rgba(143,82,111,0.16)" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#g)" />
  </svg>`,
};

async function makeFront(name, source, overlay) {
  const out = path.join("public", `gift-card-${name}.jpg`);
  await sharp(source)
    .resize(width, height, { fit: "cover", position: "centre" })
    .modulate({
      brightness: name === "spa" ? 0.95 : 1.03,
      saturation: name === "spa" ? 0.9 : 1.08,
    })
    .composite([{ input: Buffer.from(overlay) }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(out);
}

for (const [name, source] of Object.entries(sources)) {
  await makeFront(name, source, overlays[name]);
}
