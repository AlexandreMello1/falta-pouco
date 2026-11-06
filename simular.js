"use strict";

/* Simulador do Falta Pouco v2.
   Lê o bloco de lógica pura direto do index.html (entre os marcadores), para
   medir exatamente o conteúdo e as regras que o jogo publica.

   Uso: node simular.js [--partidas 200000]
*/

const fs = require("node:fs");
const path = require("node:path");

const HTML = path.join(__dirname, "index.html");

/* Limites lidos da própria lógica do jogo; preenchidos em carregarLogica. */
var LIMITES = null;

function carregarLogica() {
  const html = fs.readFileSync(HTML, "utf8");
  const ini = html.indexOf("/* ===== LOGICA-PURA-INICIO ===== */");
  const fim = html.indexOf("/* ===== LOGICA-PURA-FIM ===== */");
  if (ini < 0 || fim < 0 || fim <= ini) {
    throw new Error("marcadores da lógica pura não encontrados em index.html");
  }
  const bloco = html.slice(ini, fim);
  const fabrica = new Function(bloco + `
    return {
      MAX_FALTAS, MAX_ANIMO, ANIMO_INICIAL, TOTAL_RODADAS, CHANCE_CORINGA,
      CUSTO_BUSCA, MIN_FALTAS_BUSCA, SITUACOES,
      aplicarFaltas, aplicarAnimo, embaralhar, criarBaralho, resultadoFinal,
      rotuloFaltas, rotuloAnimo
    };
  `);
  const L = fabrica();
  LIMITES = { faltas: L.MAX_FALTAS, animo: L.MAX_ANIMO };
  return L;
}

/* PRNG determinístico (mulberry32), para o relatório ser reprodutível. */
function criarRng(semente) {
  let a = semente >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Uma partida. politica(estado, situacao) devolve "escola" ou "casa". */
function jogar(L, politica, rng) {
  let faltas = 0;
  let animo = L.ANIMO_INICIAL;
  let rodada = 0;
  let escolas = 0;
  let casas = 0;
  let usouBusca = false;
  let buscaRodada = 0;
  const baralho = L.criarBaralho(L.SITUACOES, rng);

  for (;;) {
    rodada += 1;

    if (rng() < L.CHANCE_CORINGA) {
      return { resultado: "fora", faltas, animo, rodada, escolas, casas, usouBusca, buscaRodada };
    }

    const situacao = baralho.proxima();
    if (!situacao) throw new Error("baralho vazio antes de 12 rodadas");

    if (!usouBusca && faltas >= L.MIN_FALTAS_BUSCA) {
      faltas = L.aplicarFaltas(faltas, -L.CUSTO_BUSCA);
      usouBusca = true;
      buscaRodada = rodada;
    }

    const lado = politica({ faltas, animo, rodada }, situacao);
    const resposta = lado === "escola" ? situacao.escola : situacao.casa;
    faltas = L.aplicarFaltas(faltas, resposta.faltas);
    animo = L.aplicarAnimo(animo, resposta.animo);
    if (lado === "escola") escolas += 1; else casas += 1;

    const fim = L.resultadoFinal(faltas, animo, rodada);
    if (fim) {
      return { resultado: fim, faltas, animo, rodada, escolas, casas, usouBusca, buscaRodada };
    }
  }
}

/* Política atenta: protege o medidor proporcionalmente mais perto do fim.
   Empate em risco: protege o ânimo. */
function politicaAtenta(estado, situacao) {
  if (!LIMITES) throw new Error("chame carregarLogica() antes de medir");
  const riscoFaltas = estado.faltas / LIMITES.faltas;
  const riscoAnimo = (LIMITES.animo - estado.animo) / LIMITES.animo;
  const protegeAnimo = riscoAnimo >= riscoFaltas;

  if (protegeAnimo) {
    /* maior ânimo; empate: menos falta */
    if (situacao.casa.animo > situacao.escola.animo) return "casa";
    if (situacao.escola.animo > situacao.casa.animo) return "escola";
    return situacao.escola.faltas <= situacao.casa.faltas ? "escola" : "casa";
  }
  /* menor falta; empate: mais ânimo */
  if (situacao.escola.faltas < situacao.casa.faltas) return "escola";
  if (situacao.casa.faltas < situacao.escola.faltas) return "casa";
  return situacao.casa.animo >= situacao.escola.animo ? "casa" : "escola";
}

function politicaAleatoria(rng) {
  return function () { return rng() < 0.5 ? "escola" : "casa"; };
}

function medir(L, politica, partidas, semente) {
  const rng = criarRng(semente);
  const contagem = { evadido: 0, desistiu: 0, fora: 0, passou: 0 };
  let somaFaltas = 0;
  let somaRodadas = 0;

  for (let i = 0; i < partidas; i++) {
    const r = jogar(L, politica, rng);
    contagem[r.resultado] += 1;
    somaFaltas += r.faltas;
    somaRodadas += r.rodada;
  }

  return {
    partidas,
    vitorias: contagem.passou,
    taxa: contagem.passou / partidas,
    contagem,
    mediaFaltas: somaFaltas / partidas,
    mediaRodadas: somaRodadas / partidas
  };
}

function pct(x) {
  return (x * 100).toFixed(2) + "%";
}

function listarSituacoes(L) {
  const linhas = L.SITUACOES.map(function (s, i) {
    const e = s.escola;
    const c = s.casa;
    return [
      String(i + 1).padStart(2, " "),
      s.id.padEnd(12, " "),
      ("E " + L.rotuloFaltas(e.faltas) + " / " + L.rotuloAnimo(e.animo)).padEnd(28, " "),
      "C " + L.rotuloFaltas(c.faltas) + " / " + L.rotuloAnimo(c.animo)
    ].join("  ");
  });
  return linhas.join("\n");
}

function principal() {
  const L = carregarLogica();
  const arg = process.argv.indexOf("--partidas");
  const partidas = arg > 0 ? Number(process.argv[arg + 1]) : 200000;

  if (!Number.isFinite(partidas) || partidas <= 0) {
    throw new Error("--partidas precisa de um inteiro positivo");
  }

  console.log("Falta Pouco v2 — simulação");
  console.log("situações na poça:", L.SITUACOES.length);
  console.log("partidas por política:", partidas);
  console.log("");

  const atenta = medir(L, politicaAtenta, partidas, 20261106);
  const aleatoria = medir(L, politicaAleatoria(criarRng(987654321)), partidas, 20261106);

  console.log("ATENTA    ", pct(atenta.taxa), JSON.stringify(atenta.contagem),
    "| faltas médias", atenta.mediaFaltas.toFixed(2),
    "| rodadas médias", atenta.mediaRodadas.toFixed(2));
  console.log("ALEATÓRIA ", pct(aleatoria.taxa), JSON.stringify(aleatoria.contagem),
    "| faltas médias", aleatoria.mediaFaltas.toFixed(2),
    "| rodadas médias", aleatoria.mediaRodadas.toFixed(2));
  console.log("");

  const dentro = Math.abs(atenta.taxa - 0.6079) <= 0.003 &&
    Math.abs(aleatoria.taxa - 0.1384) <= 0.003;
  console.log("alvo do spec: atenta 60,79% | aleatória 13,84% (±0,3) →", dentro ? "DENTRO" : "FORA");
  console.log("");
  console.log("situações e deltas finais:");
  console.log(listarSituacoes(L));
}

if (require.main === module) {
  principal();
}

module.exports = { carregarLogica, jogar, politicaAtenta, politicaAleatoria, medir, criarRng };
