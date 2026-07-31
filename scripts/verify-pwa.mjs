import { access, readFile } from "node:fs/promises";

const outputDir = "public-pages";
const required = [
  `${outputDir}/index.html`,
  `${outputDir}/manifest.webmanifest`,
  `${outputDir}/sw.js`,
];

for (const file of required) {
  await access(file).catch(() => {
    throw new Error(`Missing required PWA output: ${file}`);
  });
}

const manifest = JSON.parse(
  await readFile(`${outputDir}/manifest.webmanifest`, "utf8"),
);

if (!manifest.name || !manifest.short_name || !manifest.start_url || !manifest.display) {
  throw new Error("PWA manifest is incomplete.");
}
if (!Array.isArray(manifest.icons) || manifest.icons.length === 0) {
  throw new Error("PWA manifest requires at least one icon.");
}

const html = await readFile(`${outputDir}/index.html`, "utf8");
if (!html.includes("manifest")) {
  throw new Error("Built HTML does not reference a web manifest.");
}

console.log("Project 220 PWA verification passed.");
