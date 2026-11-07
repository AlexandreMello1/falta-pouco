const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const contrato = fs.readFileSync("CONTRATO-DOM.md", "utf8");
const css = fs.readFileSync("estilos-v3.css", "utf8");

// 1) classes do contrato: tokens .foo dentro do bloco de estrutura
const contratoCls = new Set();
for (const m of contrato.matchAll(/\.([a-zA-Z][\w-]*)/g)) contratoCls.add(m[1]);

// 2) classes do HTML/JS atual
const usadas = new Set();
for (const m of html.matchAll(/class="([^"]+)"/g)) m[1].split(/\s+/).forEach(c => c && usadas.add(c));
for (const m of html.matchAll(/className\s*=\s*"([^"]+)"/g)) m[1].split(/\s+/).forEach(c => c && usadas.add(c));
for (const m of html.matchAll(/criar\("[a-z0-9]+",\s*"([^"]+)"/g)) m[1].split(/\s+/).forEach(c => c && usadas.add(c));
for (const m of html.matchAll(/classList\.(?:add|remove|toggle)\("([^"]+)"/g)) usadas.add(m[1]);
for (const m of html.matchAll(/"([a-z-]+--[a-z-]+)"/g)) usadas.add(m[1]); // classes com modificador em strings

// 3) classes com regra no CSS (fora de comentarios)
const cssLimpo = css.replace(/\/\*[\s\S]*?\*\//g, "");
const cssCls = new Set();
for (const m of cssLimpo.matchAll(/\.([a-zA-Z][\w-]*)/g)) cssCls.add(m[1]);

const faltandoContrato = [...contratoCls].filter(c => !cssCls.has(c)).sort();
const faltandoHtml = [...usadas].filter(c => !cssCls.has(c)).sort();
console.log("Classes citadas no contrato:", contratoCls.size);
console.log("Classes usadas no HTML/JS atual:", usadas.size);
console.log("Classes com regra no CSS:", cssCls.size);
console.log("\n--- contrato SEM regra ---");
console.log(faltandoContrato.length ? faltandoContrato.join("\n") : "(nenhuma)");
console.log("\n--- HTML/JS SEM regra ---");
console.log(faltandoHtml.length ? faltandoHtml.join("\n") : "(nenhuma)");
