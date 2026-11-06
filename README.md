# Falta Pouco v2 — "o dia pede uma resposta"

Jogo de navegador em um arquivo só, sobre evasão escolar. A cada dia aparece uma
situação com duas respostas: uma segura a frequência e gasta o ânimo, a outra
devolve o ânimo e cobra a falta. Doze dias, oito faltas, ânimo de zero a dez.

Nada é enviado para lugar nenhum. Sem conta, sem servidor, sem áudio, sem
`localStorage`, cookie ou service worker. Recarregar a página começa outra
partida.

## Como jogar agora

**https://alexandremello1.github.io/falta-pouco/**

Para rodar localmente, duplo clique em `index.html` (Chrome, Edge ou Firefox
atuais). Se preferir servir por HTTP, dentro da pasta do jogo:

```powershell
python -m http.server 8000
# abra http://localhost:8000/index.html
```

## Como jogar

1. Digite o nome (até 20 caracteres) e comece o bimestre.
2. Cada rodada mostra uma situação e **duas respostas**: `ESCOLA` e `CASA`.
   Cada carta traz o efeito explícito (`+1 falta`, `−2 ânimo`).
3. Escolha uma. A outra é carimbada "deixada de lado" e sai de cena; a rodada
   seguinte entra sozinha depois de ~1,6 s.
4. **Faltas** vão de 0 a 8: chegar a 8 encerra como **EVADIDO**.
   **Ânimo** vai de 0 a 10 (começa em 6): chegar a 0 encerra como **DESISTIU**.
5. **Busca ativa** (uma por partida): `−2 faltas`, liberada a partir de 2 faltas,
   não gasta rodada. Só vale **durante a escolha**: depois que você escolheu, a
   sorte já está lançada e o botão fica desabilitado. Quando não dá, a legenda
   diz o motivo ("disponível a partir de 2 faltas" ou "já usada").
6. **Coringa (1%)**: no lugar da situação vem a carta preta, que elimina na hora
   com o carimbo **FORA DA ESCOLA**.
7. Sobreviver aos 12 dias é **PASSOU**.

Precedência no fim: 8 faltas > coringa > ânimo 0 > fim das rodadas.

Controles: clique, teclas **1** e **2**, **Tab** entre as respostas. As teclas
1 e 2 funcionam mesmo com o foco no botão de busca. `Ctrl+1`, `Alt+1` e `Cmd+1`
são ignorados (pertencem ao navegador). Durante a pausa, clique, **Espaço** ou
**Enter** adiantam o próximo dia na hora (com `prefers-reduced-motion: reduce` a
pausa cai para 900 ms). O foco visível volta para a primeira carta a cada rodada.
Um clique começado antes do avanço automático não escolhe a carta da rodada
seguinte.

## Conteúdo

Dezoito situações, doze sorteadas por partida sem repetir. Cenários de trabalho,
cuidado com irmão e avó, chuva e ônibus, prova não estudada, sarau, feira, bico,
uniforme, conta de luz, recuperação, diretora, entrevista de menor aprendiz,
passe escolar e atestado. Cada uma com duas respostas plausíveis e deltas fixos;
nenhuma opção é estritamente melhor que a outra em nenhum estado — toda resposta
ESCOLA custa pelo menos 1 de ânimo, então o teto de ânimo não a transforma em
escolha gratuita.

## Balanceamento

O simulador lê o bloco de lógica pura direto do `index.html` (entre os marcadores
`LOGICA-PURA-INICIO` e `LOGICA-PURA-FIM`), então mede exatamente as regras e o
conteúdo que o jogo publica:

```powershell
node simular.js --partidas 200000
```

Duas políticas, 200 mil partidas cada, sementes fixas:

| política | vitória | evadido | desistiu | coringa |
|---|---|---|---|---|
| atenta (protege o medidor proporcionalmente mais perto do fim; empate no ânimo) | **60,79%** | 13,8% | 14,3% | 11,2% |
| escolha aleatória 50/50 | **13,84%** | 27,8% | 50,3% | 8,0% |

As duas políticas usam a busca ativa assim que ela libera (2 faltas), porque é
uma ação gratuita e obviamente boa. A política atenta decide só entre `ESCOLA` e
`CASA`.

**Meta do spec: atenta 60–70%, aleatória 25–35%.** A atenta entrou na faixa; a
aleatória ficou 11,2 pontos abaixo. A fronteira medida mostra por que:

| ajuste | atenta | aleatória |
|---|---|---|
| tabela atual | 60,8% | 13,8% |
| +1 ânimo em toda resposta CASA | 84,3% | 25,9% |
| +1 ânimo em toda resposta ESCOLA | 87,8% | 45,6% |
| CASA com +2 faltas passando a +1 | 88,7% | 38,7% |
| os dois primeiros juntos | 88,7% | 50,1% |

Números da tabela de fronteira medidos em 50 mil partidas por célula; a linha
"tabela atual" é a rodada de 200 mil. Para a aleatória encostar nos 25% a atenta
vai a ~84%. O motivo é estrutural: a política atenta controla o gargalo (quando
um medidor aperta, ela troca de resposta) e só perde quando o baralho sorteado é
ruim, enquanto a aleatória perde também pelas escolhas. As duas falham nos mesmos
baralhos ruins, então as taxas andam juntas. A tabela final prioriza a meta
principal (o jogador atento vence ~3 de 5 partidas) e registra a divergência da
aleatória como aceita.

## Finais e como chegar neles

- **PASSOU** — jogue os 12 dias com a política atenta (ou com sorte).
- **EVADIDO** — escolha `CASA` sempre que ela somar falta; 8 faltas encerram.
- **DESISTIU** — escolha `ESCOLA` sempre; o ânimo chega a 0 em ~3 rodadas.
- **FORA DA ESCOLA** — a coringa é 1% por rodada (~11% por partida). Para testar
  na hora, troque `const FORCAR_CORINGA = false;` por `true` no `index.html`,
  recarregue e comece; volte para `false` depois.

## O que foi conferido

Tudo abaixo rodou nesta versão, em Chromium via DevTools, viewport 360×640
emulado (deviceScaleFactor 2, touch) e também 1440×900.

- `node --check` no script extraído do HTML: sem erro de sintaxe.
- `node simular.js --partidas 200000`: atenta **60,79%**, aleatória **13,84%**,
  com as contagens da tabela acima.
- 360×640: varredura dos 2.880 estados resolvidos (18 situações × 2 lados ×
  faltas 0–7 × ânimo 1–10). `scrollHeight` = 640 e `scrollWidth` = 360 em todos;
  o conteúdo mais baixo termina em 570 px, com 70 px de folga. O boletim final
  cabe inteiro: 482 px numa partida curta e **505 px** no pior caso de texto
  (nome de 20 caracteres, 12 dias, 8 faltas, ânimo 0, busca usada, carimbo
  "FORA DA ESCOLA"), sem corte e sem rolagem horizontal. O feedback pode ocupar
  3 linhas; com 2 linhas o texto era cortado no meio da frase.
- 1440×900: as duas respostas lado a lado (346 px cada, 10 px de vão), sem
  rolagem.
- Caso da busca no limite: 7 faltas → carta de +2 → 8 faltas. No intervalo de
  ~340 ms o botão já está desabilitado; chamar a ação na marra não altera nada
  (faltas continuam 8, `usouBusca` continua falso) e o carimbo sai **EVADIDO**.
- Busca ativa: desabilitada com 0 e 1 falta, habilitada com 2, `−2` faltas de
  fato, zera a sequência de dias fora, não avança a rodada, fica esmaecida com a
  legenda "já usada".
- Quatro finais numa partida real de navegador: EVADIDO, DESISTIU, FORA DA
  ESCOLA (coringa real) e PASSOU (12 rodadas jogadas pela política atenta).
- Teclado: `1`/`2` escolhem (inclusive com foco no botão de busca), `Tab`
  percorre, `Enter` adianta na pausa, `Ctrl+1` não escolhe.
- Clique longo: pointerdown na rodada N, avanço automático, pointerup e clique
  na rodada N+1 — nada é escolhido; um clique normal no mesmo token funciona.
  (Teste com `PointerEvent` sintético, não com toque físico.)
- Console sem erro nem aviso; nenhuma requisição além do próprio HTML;
  `localStorage` e `sessionStorage` vazios; `document.cookie` vazio; nenhum
  recurso em `performance.getEntriesByType("resource")`.
- `prefers-reduced-motion: reduce`: a carta entra com `entra-fade`, sem flip.
- Região viva separada (`#anuncio`) anuncia o resultado com os dois totais; o
  avanço automático não reescreve esse texto.
- Texto do resultado com o delta efetivo: `−1 falta` com 0 faltas diz "não havia
  falta para abonar"; `+2 ânimo` no teto diz "já estava no máximo"; `+2 faltas`
  com 7 faltas diz "chegou ao limite"; `−3 ânimo` com 2 diz "chegou ao zero".
- Boletim final (`role="dialog" aria-modal="true"`): o jogo atrás fica `inert`,
  o foco entra em "Jogar de novo", `Tab` não escapa do boletim e `Esc` não
  esconde o resultado sem reiniciar. Ao começar outra partida, o `inert` sai e o
  foco volta para a primeira carta.
- Leitura do fim: partida só com ESCOLA diz "Você não trocou a escola por casa
  nenhuma vez"; 1 troca diz "1 vez"; 2 ou mais diz "N vezes". O aviso de
  sequência só aparece com 2 dias ou mais ("3 dias fora seguidos"), então não
  existe mais o ramo morto de 1 dia.
- Revisão independente: Vera (leitura integral do diff, 5 achados de severidade
  baixa, nenhum alto ou crítico) e Rigel (aceite por checklist, 2.880 estados de
  layout, quatro finais em partida real, sem editar os arquivos). Os nits
  apontados por Vera nesta rodada foram corrigidos e remedidos aqui.

Não verificado: Firefox e Safari reais, leitor de tela de verdade e aparelho
celular físico. O teste de navegador foi só Chromium emulando 360×640.

## Arquivos

- `index.html` — o jogo inteiro (HTML + CSS + JS inline, zero dependências).
- `simular.js` — simulador de balanceamento em Node; lê a lógica pura do HTML.
- `README.md` — este arquivo.

## Publicação

Repositório público, servido pelo **GitHub Pages** a partir da raiz da branch
`main` (`index.html` é a página inicial). Não há build, dependência nem passo de
publicação: commit na `main` e o Pages Republica em cerca de um minuto.

```powershell
git push origin main
```

O jogo é estático e não envia nada para servidor algum.
