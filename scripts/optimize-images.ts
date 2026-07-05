import { readdir, rename as moveFile, stat, unlink, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const RASTER = new Set([".jpg", ".jpeg", ".png", ".webp"]);

type RenameEntry = { from: string; to: string };

function maxWidthFor(relativePath: string): number {
  const p = relativePath.toLowerCase().replace(/\\/g, "/");

  if (p.includes("2560") || p.includes("headspa") || p.includes("areaspa.jpg")) {
    return 2560;
  }
  if (p.includes("logo")) return 512;
  if (p.includes("laser-bodies")) return 960;
  if (
    p.includes("card") ||
    p.includes("/viso") ||
    p.includes("corpo") ||
    p.includes("massaggi") ||
    p.includes("ritual") ||
    p.includes("epilazione") ||
    p.includes("mani") ||
    p.includes("sguardo") ||
    p.includes("coppia") ||
    p.includes("percorsi") ||
    p.includes("gift card")
  ) {
    return 1200;
  }
  return 1600;
}

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
      continue;
    }
    if (RASTER.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }

  return files;
}

async function hasTransparency(file: string): Promise<boolean> {
  const { hasAlpha, channels } = await sharp(file).metadata();
  if (hasAlpha) return true;
  if (channels !== 4) return false;

  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 3; i < data.length; i += info.channels) {
    if (data[i]! < 255) return true;
  }
  return false;
}

async function optimizeFile(absPath: string): Promise<{
  saved: number;
  before: number;
  after: number;
  rename?: RenameEntry;
}> {
  const relative = path.relative(PUBLIC_DIR, absPath);
  const before = (await stat(absPath)).size;
  const ext = path.extname(absPath).toLowerCase();
  const maxWidth = maxWidthFor(relative);
  const transparent = ext === ".png" ? await hasTransparency(absPath) : false;

  let pipeline = sharp(absPath).rotate().resize({
    width: maxWidth,
    withoutEnlargement: true,
  });

  const targetPath =
    ext === ".png" && !transparent
      ? absPath.replace(/\.png$/i, ".jpg")
      : absPath;

  if (ext === ".png" && !transparent) {
    pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true, progressive: true });
  } else if (ext === ".png") {
    pipeline = pipeline.png({
      compressionLevel: 9,
      quality: 80,
      effort: 10,
      palette: maxWidth <= 1200,
    });
  } else if (ext === ".webp") {
    pipeline = pipeline.webp({ quality: 80, effort: 6 });
  } else {
    pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true, progressive: true });
  }

  const tempPath = path.join(
    path.dirname(absPath),
    `.opt-${path.basename(absPath)}.tmp`,
  );

  try {
    await pipeline.toFile(tempPath);
    const after = (await stat(tempPath)).size;

    if (after >= before && targetPath === absPath) {
      await unlink(tempPath).catch(() => undefined);
      return { saved: 0, before, after: before };
    }

    if (targetPath !== absPath) {
      await unlink(absPath).catch(() => undefined);
    }

    await moveFile(tempPath, targetPath);
  } catch (error) {
    await unlink(tempPath).catch(() => undefined);
    throw error;
  }

  const finalSize = (await stat(targetPath)).size;

  const renameEntry =
    targetPath !== absPath
      ? {
          from: `/${relative.replace(/\\/g, "/")}`,
          to: `/${path.relative(PUBLIC_DIR, targetPath).replace(/\\/g, "/")}`,
        }
      : undefined;

  return {
    saved: Math.max(0, before - finalSize),
    before,
    after: finalSize,
    rename: renameEntry,
  };
}

async function main() {
  const files = await walk(PUBLIC_DIR);
  const renames: RenameEntry[] = [];
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files.sort()) {
    try {
      const { saved, before, after, rename } = await optimizeFile(file);
      totalBefore += before;
      totalAfter += after;
      if (rename) renames.push(rename);

      const rel = path.relative(PUBLIC_DIR, file);
      const pct = before ? Math.round((saved / before) * 100) : 0;
      console.log(
        `${saved > 0 ? "✓" : "·"} ${rel}${rename ? ` → ${path.basename(rename.to)}` : ""} (${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB${saved > 0 ? `, -${pct}%` : ""})`,
      );
    } catch (error) {
      let before = 0;
      try {
        before = (await stat(file)).size;
      } catch {
        console.error(`✗ ${path.relative(PUBLIC_DIR, file)} (missing)`);
        continue;
      }
      totalBefore += before;
      totalAfter += before;
      console.error(`✗ ${path.relative(PUBLIC_DIR, file)}`, error);
    }
  }

  if (renames.length) {
    const manifest = path.join(process.cwd(), "scripts", "image-renames.json");
    await writeFile(manifest, `${JSON.stringify(renames, null, 2)}\n`);
    console.log(`\nRenames written to scripts/image-renames.json (${renames.length} files)`);
  }

  const savedTotal = totalBefore - totalAfter;
  console.log(
    `\nTotal: ${Math.round(totalBefore / 1024 / 1024)}MB → ${Math.round(totalAfter / 1024 / 1024)}MB (saved ${Math.round(savedTotal / 1024 / 1024)}MB)`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
