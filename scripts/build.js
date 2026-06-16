const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "dist");
const files = [
  "index.html",
  "cms.html",
  "aviso-legal.html",
  "politica-privacidad.html",
  "cookies.html",
  "styles.css",
  "script.js",
  "content.js",
  "cms.js",
  "assets",
];

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const file of files) {
  const source = path.join(root, file);
  const target = path.join(outDir, file);

  if (!fs.existsSync(source)) {
    throw new Error(`No existe el archivo requerido: ${file}`);
  }

  fs.cpSync(source, target, { recursive: true });
}

console.log("Build listo en dist/");
