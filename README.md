# Falta Pouco v2 — "o dia pede uma resposta"

Jogo de navegador em um arquivo só, sobre evasão escolar. A cada dia aparece uma
situação com duas respostas: uma segura a frequência e gasta o ânimo, a outra
devolve o ânimo e cobra a falta. Doze dias, oito faltas, ânimo de zero a dez.

Além da partida, o jogo é uma pequena cartilha: menu com tutorial, doze cartões
de direitos do aluno, oito saídas práticas, uma nota "Aprenda" por rodada e um
boletim final com o que fazer depois. O objetivo é que quem joga saia sabendo a
quem recorrer, não decorando regra.

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
3. Escolha uma. A outra é carimbada "deixada de lado" e sai de cena. A rodada
   **não avança sozinha**: leia a nota "Aprenda" e o resultado, e siga no botão
   **Próximo dia** (ou `Enter`/`Espaço`). Na última rodada o botão vira
   **Ver o resultado** e abre o boletim.
4. **Faltas** vão de 0 a 8: chegar a 8 encerra como **EVADIDO**.
   **Ânimo** vai de 0 a 10 (começa em 6): chegar a 0 encerra como **DESISTIU**.
5. **Busca ativa** (uma por partida): `−2 faltas`, liberada a partir de 2 faltas,
   não gasta rodada. Só vale **durante a escolha**: depois que você escolheu, a
   sorte já está lançada e o botão some. Quando não dá, a legenda diz o motivo
   ("disponível a partir de 2 faltas" ou "já usada").
6. **Coringa (1%)**: no lugar da situação vem a carta preta, que elimina na hora
   com o carimbo **FORA DA ESCOLA**.
7. Sobreviver aos 12 dias é **PASSOU**.

Precedência no fim: 8 faltas > coringa > ânimo 0 > fim das rodadas.

Controles: clique, teclas **1** e **2**, **Tab** entre as respostas. As teclas
1 e 2 funcionam mesmo com o foco no botão de busca. `Ctrl+1`, `Alt+1` e `Cmd+1`
são ignorados (pertencem ao navegador). Depois da escolha, `Enter`, `Espaço` ou
clique no botão seguem para o próximo dia. O foco visível vai para o botão
**Próximo dia** e volta para a primeira carta a cada rodada. Um clique começado
antes da troca de rodada não escolhe a carta nova: o token da rodada em que o
dedo desceu continua valendo.

## Conteúdo

Dezoito situações, doze sorteadas por partida sem repetir. Cenários de trabalho,
cuidado com irmão e avó, chuva e ônibus, prova não estudada, sarau, feira, bico,
uniforme, conta de luz, recuperação, diretora, entrevista de menor aprendiz,
passe escolar e atestado. Cada uma com duas respostas plausíveis e deltas fixos;
nenhuma opção é estritamente melhor que a outra em nenhum estado — toda resposta
ESCOLA custa pelo menos 1 de ânimo, então o teto de ânimo não a transforma em
escolha gratuita.

## Camada educativa

O botão **Menu** fica no cabeçalho, na tela inicial e durante a partida. Abrir o
menu no meio do dia não pula rodada: não existe mais timer de avanço.

- **Como jogar** — tutorial em cinco passos com exemplos feitos em CSS
  (medidores, cartas, busca ativa, finais, controles) e três dicas de jogo.
- **Meus direitos** — doze cartões com o que a lei garante e o primeiro passo se
  não acontecer: vaga e permanência; escola pública perto de casa; respeito e
  proteção contra violência e bullying; contestar nota e pedir recuperação; grêmio
  e entidades estudantis; transporte, alimentação e material; inclusão e
  atendimento especializado; falta por doença e justificativa; Conselho Tutelar
  como proteção; volta pela EJA; trabalho e aprendiz; Pé-de-Meia e Bolsa Família.
- **O que fazer** — oito saídas práticas com "quando serve", o que fazer em
  passos e quem procurar. Fecha com "Você não precisa resolver sozinho."
- **Sobre e fontes** — por que o jogo existe, o dado de contexto (993 mil fora da
  escola; 440 mil com 15 a 17 anos) e as leis com número e ano.

Durante a partida, cada uma das 18 situações tem uma nota **Aprenda** de uma ou
duas frases, ligada ao tema do dia, sem julgar o lado escolhido. O link
**Ver o direito** abre o cartão correspondente já destacado e tem 44 px de altura
no celular. A nota aparece até na última rodada; ali o botão vira
**Ver o resultado**. A nota também entra na região viva (`aria-live`), então o
leitor de tela anuncia o resultado e o conteúdo educativo juntos.

No celular em pé (360×640) o rodapé de privacidade sai de cena durante a partida
— o mesmo texto continua na tela inicial e em **Sobre e fontes** — e o dia inteiro
cabe sem rolagem. O nome e o dia dividem a primeira linha do placar.

No boletim, **O que fazer agora** traz três ações concretas conforme o final
(EVADIDO, DESISTIU, FORA DA ESCOLA ou PASSOU) e o botão **Ver meus direitos**.
Para EVADIDO e FORA DA ESCOLA a primeira ação é falar com a escola ou o Conselho
Tutelar, lembrando que dá para voltar pela EJA. O jogo nunca promete matrícula
automática.

Acessibilidade dos painéis: `role="dialog"`/`aria-modal`, fundo `inert`, foco
preso com `Tab` e `Shift+Tab`, `Esc` fecha e o foco volta ao botão que abriu. O
corpo rola por dentro; o cabeçalho e o botão Fechar ficam fixos. Contraste
mínimo medido: 4,82:1 no texto fraco sobre o papel e 6,79:1 no link da nota.

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

Tudo abaixo rodou nesta versão, em Chromium via Playwright, viewport 360×640 e
também 1440×900.

- `node --check` no script extraído do HTML: sem erro de sintaxe (`exit=0`).
- `node simular.js --partidas 200000`: atenta **60,79%**, aleatória **13,84%**,
  alvo do spec (±0,3) atendido; as 18 situações e os deltas não foram tocados.
- 360×640: `scrollHeight` = 640 e `scrollWidth` = 360 em cerca de 90 rodadas
  reais de 8 partidas. O caso extremo montado de propósito (nota de 162
  caracteres, feedback de 4 linhas, os três avisos visíveis e o resultado dentro
  da carta) também fecha em 640, com o último texto em 625 px.
- Botão **Menu**: 74×44 px, presente na tela inicial e no jogo. Abrir o menu no
  meio de uma rodada e trocar de painel não altera o número do dia (1 → 1 → 1).
- Painéis em 360×640: caixa termina em 634 px, sem `scrollWidth` maior que o
  corpo; rolagem só interna (Como jogar 942 px, Meus direitos 2.260 px, O que
  fazer 1.974 px, Sobre 678 px de conteúdo).
- Foco preso: 9 `Tab` seguidos ficaram dentro do menu; 4 `Shift+Tab` também;
  `Esc` fecha, devolve o foco ao botão Menu e retira o `inert` da página.
- Conteúdo: 5 passos de tutorial, 12 cartões de direitos, 8 cartões de saída e
  18 notas "Aprenda" — uma para cada situação, todas apontando para um cartão
  existente (checagem por script).
- Link **Ver o direito**: 44 px de altura; abre "Meus direitos" com o cartão
  certo destacado e visível no corpo, sem mudar a rodada (testado com o cartão de
  grêmio; a cobertura das 18 notas foi conferida por script). A nota inteira entra
  na região viva junto do resultado.
- Corrida do coringa: com o menu aberto durante a contagem (~1,3 s), o timer fecha
  o menu antes de abrir o boletim — menu fechado, fundo `inert`, foco em **Jogar
  de novo** e `Enter` reinicia com o menu fechado.
- Partida completa (política atenta, com busca ativa): 12 rodadas, nota em todas,
  carimbo **PASSOU**. Na rodada 12 o botão vira **Ver o resultado** e abre o
  boletim. **EVADIDO** (escolhendo sempre CASA) e **DESISTIU** (sempre ESCOLA)
  também foram gerados em partida real; **FORA DA ESCOLA** caiu naturalmente
  numa das tentativas (1% por rodada).
- Boletim: 491 px de conteúdo em 607 px úteis nos finais PASSOU, EVADIDO e
  DESISTIU, e 510 px no FORA DA ESCOLA — cabe inteiro, sem rolagem, e sem
  estouro horizontal (`scrollWidth` 360). As três ações de cada final aparecem,
  com os botões **Jogar de novo** e **Ver meus direitos**.
- **Ver meus direitos** sobre o boletim: abre o menu com o boletim `inert`;
  `Esc` fecha e devolve o foco ao botão.
- Teclado: `1`/`2` escolhem, `Enter` global e `Espaço` no botão focado avançam.
- Console sem erro nem aviso; nenhuma requisição além do `index.html`;
  `localStorage` e `sessionStorage` com 0 itens; `document.cookie` vazio; nenhum
  recurso em `performance.getEntriesByType("resource")`.
- Contraste dos textos novos: 4,82:1 (texto fraco no papel), 6,79:1 (link da
  nota), 6,78:1 (verde) e 6,91:1 (vermelho) — todos acima de 4,5:1.
- 1440×900: as duas respostas lado a lado (347 e 346 px), sem rolagem.

Não verificado: Firefox e Safari reais, leitor de tela de verdade e aparelho
celular físico. O teste de clique longo (pointerdown numa rodada, troca de
rodada, pointerup na seguinte) não foi repetido nesta rodada com `PointerEvent`
sintético; o código de token de rodada foi mantido sem alteração.

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
