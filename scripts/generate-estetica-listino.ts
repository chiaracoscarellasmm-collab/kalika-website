import { writeFile } from "fs/promises";
import { generateEsteticaListinoPdf } from "../lib/estetica-listino-pdf";

async function main() {
  const pdf = await generateEsteticaListinoPdf();
  await writeFile("public/listino-estetica.pdf", pdf);
  console.log("Generated public/listino-estetica.pdf");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
