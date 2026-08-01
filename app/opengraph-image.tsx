import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt = "Kalika Nuovaestetica";
export const size = { width: 1200, height: 630 };
// ImageResponse always rasterises to PNG regardless of this export's value —
// it only affects the og:image:type meta tag, so it must match reality.
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/logo-kalika-nuovaestetica.jpg"),
    "base64",
  );
  const logoSrc = `data:image/jpeg;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={720} height={480} style={{ objectFit: "contain" }} />
      </div>
    ),
    { ...size },
  );
}
