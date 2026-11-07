"use strict";

/* Simulador do Falta Pouco v3.
   Lê o bloco de lógica pura direto do index.html (entre os marcadores), para
   medir exatamente as regras e o conteúdo que o jogo publica.

   Uso: node simular.js [--partidas 200000]

   Políticas:
     atenta          encara; adia só quando o ânimo está no chão; pede ajuda
                     quando as faltas apertam (≥ 4) ou o ânimo chega a 1.
     sempre_adiar    adia todo dia e nunca pede ajuda.
     sempre_encarar  encara todo dia e nunca pede ajuda.
     aleatoria       sorteia a resposta e pede ajuda a partir de 5 faltas.
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
      MAX_FALTAS, MAX_ANIMO, ANIMO_INICIAL, TOTAL_DIAS, CHANCE_IMPREVISTO,
      MAX_AJUDA, CUSTO_AJUDA, GANHO_AJUDA, SITUACOES, IMPREVISTOS,
      aplicarFaltas, aplicarAnimo, aplicarEscolha, aplicarAjuda,
      resultadoFinal, resultadoImprevisto, embaralhar, criarBaralho,
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

/* Espelha o jogo: no dia de imprevisto a resposta é plana, não entra na
   corrente de adiar. */
function aplicarOpcao(L, estado, tipo, resposta, evento) {
  if (!evento) return L.aplicarEscolha(estado, tipo, resposta);
  return {
    faltas: L.aplicarFaltas(estado.faltas, resposta.faltas),
    animo: L.aplicarAnimo(estado.animo, resposta.animo),
    corrente: estado.corrente,
    extra: 0
  };
}

function mata(L, resultado) {
  return resultado.faltas >= L.MAX_FALTAS || resultado.animo <= 0;
}

/* ---------- políticas ---------- */

const ATENTA = {
  ajuda: function (L, e) {
    if (e.ajudas >= L.MAX_AJUDA) return false;
    if (e.faltas >= 4) return true;
    if (e.animo <= 1) return true;
    return false;
  },
  escolha: function (L, e, opcoes, evento) {
    if (evento) {
      /* imprevisto: pega a resposta mais barata, sem deixar o limite fechar */
      var a = aplicarOpcao(L, e, "encarar", opcoes.encarar, true);
      var b = aplicarOpcao(L, e, "adiar", opcoes.adiar, true);
      var custoA = a.faltas * 2 - a.animo;
      var custoB = b.faltas * 2 - b.animo;
      if (mata(L, a) && !mata(L, b)) return "adiar";
      if (mata(L, b) && !mata(L, a)) return "encarar";
      return custoB < custoA ? "adiar" : "encarar";
    }
    var enc = L.aplicarEscolha(e, "encarar", opcoes.encarar);
    var adi = L.aplicarEscolha(e, "adiar", opcoes.adiar);
    if (mata(L, adi) && !mata(L, enc)) return "encarar";
    if (mata(L, enc) && !mata(L, adi)) return "adiar";
    if (e.faltas >= 5) return "encarar";
    if (e.animo <= 2) return "adiar";
    return "encarar";
  }
};

const SEMPRE_ADIAR = {
  ajuda: function () { return false; },
  escolha: function () { return "adiar"; }
};

const SEMPRE_ENCARAR = {
  ajuda: function () { return false; },
  escolha: function () { return "encarar"; }
};

function politicaAleatoria(rng) {
  return {
    ajuda: function (L, e) { return e.ajudas < L.MAX_AJUDA && e.faltas >= 5; },
    escolha: function () { return rng() < 0.5 ? "encarar" : "adiar"; }
  };
}

/* ---------- uma partida ---------- */

function jogar(L, politica, rng) {
  var e = { faltas: 0, animo: L.ANIMO_INICIAL, corrente: 0, ajudas: 0 };
  var baralho = L.criarBaralho(L.SITUACOES, rng);
  var dia = 0;
  var encarou = 0;
  var adiou = 0;
  var ajudas = 0;
  var imprevistos = 0;

  for (;;) {
    dia += 1;
    var evento = rng() < L.CHANCE_IMPREVISTO;
    var opcoes;
    if (evento) {
      var ev = L.IMPREVISTOS[Math.floor(rng() * L.IMPREVISTOS.length)];
      opcoes = { encarar: ev.opcoes[0], adiar: ev.opcoes[1] };
      imprevistos += 1;
    } else {
      var sit = baralho.proxima();
      if (!sit) throw new Error("baralho vazio antes de 12 dias");
      opcoes = { encarar: sit.encarar, adiar: sit.adiar };
    }

    if (politica.ajuda(L, e)) {
      var comAjuda = L.aplicarAjuda(e);
      if (comAjuda) {
        e = { faltas: comAjuda.faltas, animo: comAjuda.animo, corrente: comAjuda.corrente, ajudas: comAjuda.ajudas };
        ajudas += 1;
      }
    }

    var lado = politica.escolha(L, e, opcoes, evento, rng);
    var r = aplicarOpcao(L, e, lado, opcoes[lado], evento);
    e = { faltas: r.faltas, animo: r.animo, corrente: r.corrente, ajudas: e.ajudas };
    if (lado === "encarar") encarou += 1; else adiou += 1;

    if (evento && L.resultadoImprevisto(e.faltas, e.animo)) {
      return { resultado: "fora", faltas: e.faltas, animo: e.animo, dia: dia, encarou: encarou, adiou: adiou, ajudas: ajudas, imprevistos: imprevistos };
    }
    var final = L.resultadoFinal(e.faltas, e.animo, dia);
    if (final) {
      return { resultado: final, faltas: e.faltas, animo: e.animo, dia: dia, encarou: encarou, adiou: adiou, ajudas: ajudas, imprevistos: imprevistos };
    }
  }
}

/* ---------- medição ---------- */

function medir(L, politica, partidas, semente) {
  var rng = criarRng(semente);
  var contagem = { passou: 0, evadido: 0, desistiu: 0, fora: 0 };
  var somaFaltas = 0;
  var somaDias = 0;
  var somaImprevistos = 0;

  for (var i = 0; i < partidas; i++) {
    var r = jogar(L, politica, rng);
    contagem[r.resultado] += 1;
    somaFaltas += r.faltas;
    somaDias += r.dia;
    somaImprevistos += r.imprevistos;
  }

  return {
    partidas: partidas,
    contagem: contagem,
    taxa: contagem.passou / partidas,
    mediaFaltas: somaFaltas / partidas,
    mediaDias: somaDias / partidas,
    imprevistosPorPartida: somaImprevistos / partidas
  };
}

function pct(x) {
  return (x * 100).toFixed(2) + "%";
}

function media(valores) {
  return valores.reduce(function (a, b) { return a + b; }, 0) / valores.length;
}

function resumoDeltas(L) {
  var encAnimo = L.SITUACOES.map(function (s) { return s.encarar.animo; });
  var encFaltas = L.SITUACOES.map(function (s) { return s.encarar.faltas; });
  var adiFaltas = L.SITUACOES.map(function (s) { return s.adiar.faltas; });
  var adiAnimo = L.SITUACOES.map(function (s) { return s.adiar.animo; });
  return {
    encararAnimo: media(encAnimo),
    encararFaltas: media(encFaltas),
    adiarFaltas: media(adiFaltas),
    adiarAnimo: media(adiAnimo)
  };
}

function principal() {
  var L = carregarLogica();
  var arg = process.argv.indexOf("--partidas");
  var partidas = arg > 0 ? Number(process.argv[arg + 1]) : 200000;

  if (!Number.isFinite(partidas) || partidas <= 0 || Math.floor(partidas) !== partidas) {
    console.error("--partidas precisa de um inteiro positivo");
    process.exit(2);
  }

  var aleatoria = politicaAleatoria(criarRng(987654321));
  var linhas = [
    { nome: "atenta", politica: ATENTA, meta: "60–70%", dentro: function (t) { return t >= 0.60 && t <= 0.70; } },
    { nome: "sempre_adiar", politica: SEMPRE_ADIAR, meta: "≤5%", dentro: function (t) { return t <= 0.05; } },
    { nome: "sempre_encarar", politica: SEMPRE_ENCARAR, meta: "≤20%", dentro: function (t) { return t <= 0.20; } },
    { nome: "aleatoria", politica: aleatoria, meta: "registro", dentro: function () { return true; } }
  ];

  console.log("Falta Pouco v3 — simulação");
  console.log("situações:", L.SITUACOES.length, "· imprevistos:", L.IMPREVISTOS.length,
    "· dias:", L.TOTAL_DIAS, "· faltas 0–" + L.MAX_FALTAS,
    "· ânimo 0–" + L.MAX_ANIMO, "(inicial " + L.ANIMO_INICIAL + ")");
  console.log("ajuda: " + L.MAX_AJUDA + " usos · −" + L.CUSTO_AJUDA + " faltas · +" + L.GANHO_AJUDA + " ânimo");
  console.log("partidas por política:", partidas);
  console.log("");

  var resultados = [];
  var reprovou = false;

  linhas.forEach(function (linha) {
    var r = medir(L, linha.politica, partidas, 20261106);
    resultados.push({ linha: linha, r: r });
    if (!linha.dentro(r.taxa)) reprovou = true;
  });

  var largura = 16;
  console.log(
    "política".padEnd(largura) + "PASSOU".padStart(9) + "   meta".padEnd(10) +
    "EVADIDO".padStart(9) + "DESISTIU".padStart(10) + "FORA".padStart(8) +
    "faltas".padStart(9) + "dias".padStart(7) + "  situação"
  );

  resultados.forEach(function (item) {
    var r = item.r;
    var dentro = item.linha.dentro(r.taxa);
    console.log(
      item.linha.nome.padEnd(largura) +
      pct(r.taxa).padStart(9) + "   " +
      item.linha.meta.padEnd(10) +
      pct(r.contagem.evadido / r.partidas).padStart(9) +
      pct(r.contagem.desistiu / r.partidas).padStart(10) +
      pct(r.contagem.fora / r.partidas).padStart(8) +
      r.mediaFaltas.toFixed(2).padStart(9) +
      r.mediaDias.toFixed(2).padStart(7) +
      "  " + (dentro ? "DENTRO" : "FORA")
    );
  });

  console.log("");
  console.log("aleatória — imprevistos por partida:", resultados[3].r.imprevistosPorPartida.toFixed(3));

  var d = resumoDeltas(L);
  console.log("");
  console.log("deltas médios das 18 situações:");
  console.log("  encarar · ânimo " + d.encararAnimo.toFixed(2) +
    " · faltas " + d.encararFaltas.toFixed(2) +
    " | adiar · faltas " + d.adiarFaltas.toFixed(2) +
    " · ânimo " + d.adiarAnimo.toFixed(2));

  var foraDaFaixaAleatoria = resultados[3].r.taxa < 0.25 || resultados[3].r.taxa > 0.40;
  console.log("  aleatória fora de 25–40%? " + (foraDaFaixaAleatoria ? "sim (justificar no README)" : "não"));

  console.log("");
  console.log("meta do spec: atenta 60–70% · sempre_adiar ≤5% · sempre_encarar ≤20% →",
    reprovou ? "FORA" : "DENTRO");

  process.exit(reprovou ? 1 : 0);
}

if (require.main === module) {
  principal();
}

module.exports = { carregarLogica, jogar, medir, criarRng, ATENTA, SEMPRE_ADIAR, SEMPRE_ENCARAR, politicaAleatoria };
