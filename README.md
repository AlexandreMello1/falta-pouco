# Falta Pouco — encarar ou adiar

Jogo curto (12 dias, ~3 minutos) sobre permanência escolar. O inimigo não é a
casa: é **adiar** o problema. As duas respostas de cada dia mantêm o aluno
matriculado; o que muda é **quando** o preço aparece.

Arquivo único: `index.html` (HTML + CSS + JS). Sem dependência, sem fonte
externa, sem rede, sem `localStorage`, sem cookie, sem áudio. Recarregar a
página começa outra partida.

## Como rodar

```powershell
python -m http.server 8000     # abrir http://localhost:8000/index.html
node --check simular.js
node simular.js --partidas 200000
```

Abrir `index.html` direto do disco também funciona (é o que os testes fizeram).

## Mecânica

- **12 dias.** **Faltas 0–8** (8 = EVADIDO). **Ânimo 0–10**, começa em **6**
  (0 = DESISTIU).
- Cada dia sorteia uma das **18 situações**, sem repetir.
  - **ENCARAR** resolve hoje: ânimo −1 a −3; faltas 0 ou −1 (só nas duas cenas
    de abono: recuperação e atestado).
  - **ADIAR** alivia agora: ânimo +1/+2; faltas +1/+2. **Encadeia**: o 2º adiar
    seguido soma +1 falta extra, o 3º +2, o 4º +3. Encarar ou pedir ajuda zera
    a corrente.
- **PEDIR AJUDA**: 2 usos por partida, não gasta o dia, −2 faltas e +1 ânimo.
  Só existe na fase de escolha; na janela resolvida o botão **some** (não fica
  apagado), o que fecha o furo da v2 de usar a busca depois da derrota.
- **IMPREVISTO**: 1% por dia, 4 tipos. Substitui a cena do dia, sempre mostra
  duas respostas e **nunca elimina sem o jogador responder**. As respostas do
  imprevisto são planas: não entram na corrente de adiar, porque o dia não foi
  adiado por escolha.
- **Finais**: PASSOU (chegou ao dia 12), EVADIDO (8 faltas), DESISTIU (ânimo 0),
  FORA DA ESCOLA (a resposta a um imprevisto estourou um dos limites). Cada
  boletim traz carimbo, leitura da partida, resumo, quatro ações e a linha sobre
  adiar e voltar.
- Cada situação tem uma nota **Aprenda** com "Ver o direito", que abre o cartão
  certo do menu, destacado (`cartao--alvo`).

## Balanceamento medido

`node simular.js --partidas 200000` (sementes fixas, 200.000 partidas por
política, contra a lógica pura extraída do `index.html`):

| política | PASSOU | meta | EVADIDO | DESISTIU | FORA | faltas médias |
|---|---|---|---|---|---|---|
| atenta | **67,51%** | 60–70% | 0,09% | 31,42% | 0,98% | 5,51 |
| sempre_adiar | **0,00%** | ≤5% | 99,72% | 0,00% | 0,28% | 8,00 |
| sempre_encarar | **0,00%** | ≤20% | 0,00% | 99,02% | 0,98% | 0,00 |
| aleatória | 13,57% | registro | 37,16% | 48,61% | 0,66% | 4,77 |

O script sai com código 1 se atenta sair de 60–70%, se sempre_adiar passar de
5% ou se sempre_encarar passar de 20%.

**Políticas.** `atenta` encara; adia quando o ânimo está em 2 ou menos; pede
ajuda a partir de 4 faltas (ou ânimo 1) e nunca escolhe uma resposta que feche
um limite se a outra não fechar. `sempre_adiar` e `sempre_encarar` repetem a
mesma resposta e não pedem ajuda. `aleatória` sorteia a resposta e pede ajuda a
partir de 5 faltas.

**Por que os dois extremos dão 0%.** É estrutural, não é bug: 12 dias encarando
custam no mínimo 12 de ânimo, e o máximo que existe são 6 iniciais + 2 de ajuda
= 8. Do outro lado, o encadeamento do adiar soma +1, +2, +3… e oito faltas
chegam no quarto dia, no pior caso.

**A aleatória ficou fora de 25–40%.** Com estes deltas ela fica em **13,57%**:
metade das escolhas ao acaso estraga a dose — adiar em sequência encadeia e
encarar sem critério queima o ânimo. Preferi manter os deltas que produzem a
atenta em 67,5% a inflar a aleatória; o número está registrado aqui, como o
spec pede.

### O que mudou em relação ao anexo de `conteudo-v3.md`

O anexo foi escrito pelo sentido das cenas. Rodado o simulador, a atenta dava
**97,0%**: com ânimo 6 + 2 de ajuda + 1,44 por adiar contra 1,83 por encarar, um
jogador que só olha o medidor nunca perde. O ajuste sugerido no anexo (duas
cenas de −1 para −2) levava a 96,8% — insuficiente. Onze números de nove cenas
foram endurecidos, mantendo a ordem relativa (o que doía mais continua doendo
mais) e as três regras que não podem ceder:

| cena | antes | depois |
|---|---|---|
| `irmao-febre` | adiar +1 falta | +2 |
| `avo-caiu` | adiar +1 falta | +2 |
| `festa-quinze` | adiar +1 falta | +2 |
| `bullying` | adiar +1 falta | +2 |
| `recuperacao-tarde` | encarar −1 ânimo | −2 |
| `uniforme-rasgado` | encarar −1 ânimo | −2 |
| `entrevista-aprendiz` | encarar −1 ânimo · adiar +2 ânimo | −2 · +1 |
| `sarau` | encarar −1 ânimo · adiar +2 ânimo | −2 · +1 |
| `atestado-prazo` | adiar +2 ânimo | +1 |

Distribuição final (18 situações): encarar · ânimo 4×−3, 11×−2, 3×−1 (média
−2,06) · faltas 2×−1, 16×0 · adiar · faltas 10×+2, 8×+1 (1,56) · ânimo 5×+2,
13×+1 (1,28). Garantias preservadas: encarar nunca custa 0 de ânimo; adiar
nunca dá +3 (o +3 que aparece numa carta é a base + a corrente, e a carta diz
"encadeado: +N"); nenhuma resposta devolve mais de 1 falta — só o Pedir ajuda
tira 2.

O anexo de `conteudo-v3.md` ficou como estava (o arquivo não foi reescrito); a
tabela acima é a fonte dos números que o jogo usa.

## Acabamento da revisão final (07/11)

- **Cartas param de esticar.** No desktop as duas cartas ocupavam a coluna inteira
  e o efeito ficava colado no rodapé, deixando um vazio no meio. Agora a carta
  tem altura de conteúdo (mínimo 116 px, 140 px em telas largas) e o par fica
  centralizado na coluna.
- **A nota "Aprenda" cabe inteira.** Depois da escolha, a carta descartada
  encolhe (perde o selo e a tecla, mantém o título e o carimbo), e o espaço que
  ela devolve vira altura para a nota. Em 360×640 e 390×844 o texto aparece
  completo, sem rolagem interna.
- **320×568.** A tela inicial cabia 118 px abaixo da dobra e escondia o botão:
  o título, a explicação e o espaçamento foram compactados e a dica do campo de
  nome saiu só nessa largura. Depois da escolha, em vez de cortar a nota, a
  página cresce ~80 px e rola — é a única tela com rolagem vertical, e nenhuma
  tem rolagem horizontal.
- **Final DESISTIU.** A linha do boletim dizia "Adiar trouxe você até aqui", o
  que contradiz o próprio final (ali o motivo é cansaço, não adiamento). Passou
  a: "O cansaço de hoje não apaga o direito de voltar: a escola continua sua."
  `conteudo-v3.md` foi atualizado junto.

## Acessibilidade e limites

- Teclado: **1** encara, **2** adia, **A** pede ajuda, **Tab** percorre,
  **Enter/Espaço** avança quando o dia está resolvido. Ctrl/Alt/Cmd + tecla são
  ignorados (Ctrl+1 não escolhe).
- Foco preso no menu e no boletim; **Esc** fecha o menu e devolve o foco ao
  botão que o abriu; o resto da página fica `inert`.
- `aria-live` anuncia o resultado, o eco e a nota Aprenda. O efeito de cada
  carta tem seta + texto (↑/↓) além da cor.
- Nada depende só de cor: selo escrito ("ENCARAR"/"ADIAR"), "deixada de lado"
  carimbado na carta descartada, medidores com número ao lado.
- `prefers-reduced-motion`: sem animação (CSS).
- Contraste medido no Chromium (cor computada × fundo sólido do ancestral):
  40 pares de texto, **0 abaixo de 4,5:1**. Extremos: corpo 8,59:1, cena
  15,38:1, `cartao__fonte` 6,53:1, selo adiar 5,57:1.
- Sem requisição além do próprio `index.html`; `localStorage`, `sessionStorage`
  e `document.cookie` vazios; console limpo.

## Arquivos

| arquivo | o que é |
|---|---|
| `index.html` | o jogo: CSS inline (de `estilos-v3.css`), HTML no contrato, lógica pura entre os marcadores `LOGICA-PURA-INICIO/FIM` e a interface |
| `simular.js` | lê a lógica pura do `index.html` e mede as quatro políticas |
| `conteudo-v3.md` | texto-fonte (situações, imprevistos, tutorial, direitos, saídas, finais) |
| `estilos-v3.css` | folha de estilo de origem (o `index.html` carrega uma cópia inline) |
| `CONTRATO-DOM.md` | ids, classes e `data-opcao` estáveis |
| `_check-classes.js` | confere se toda classe usada tem regra no CSS |

O CSS inline é o de `estilos-v3.css` com o BOM removido e os comentários em
mojibake decodificados; as regras são idênticas (comparação sem comentários deu
igual). O arquivo de origem não foi alterado.

## O que foi verificado (comando → resultado)

- `node --check` no `<script>` extraído do `index.html`: exit 0.
- `node simular.js --partidas 200000`: tabela acima, exit 0.
- Varredura em 320×568, 360×640, 390×844, 740×360, 768×1024, 1280×800 e
  1920×1080: `scrollWidth == innerWidth` em todos; corpo de 16,0 px a 19,2 px;
  menor alvo 44×44; área de jogo 98–99% da altura no celular; `docH` igual à
  janela (sem rolagem de página na fase de escolha).
- Partida completa até os quatro finais, com nota Aprenda e link abrindo o
  cartão certo (`direito-avaliacao`, `direito-gremio`), teclado 1/2/A, foco
  preso, Esc, Ctrl+1 sem efeito, console limpo, storage vazio, 1 requisição.

## O que NÃO foi verificado

- Só **Chromium headless**. Firefox, WebKit/Safari e navegador de celular real
  não foram rodados.
- **Leitor de tela real** (NVDA, VoiceOver, TalkBack) não foi testado; conferi
  só a marcação, o `aria-live` e o foco por script.
- **Toque em aparelho físico**: os 44 px vêm da caixa do elemento, não de dedo
  de verdade.
- **Zoom de texto a 200%** e fonte do sistema aumentada não foram medidos.
- **Contraste**: medido por cor computada contra o fundo sólido do ancestral.
  Onde há gradiente/opacidade (papel, carta descartada, overlay) o valor é
  aproximado; a carta descartada fica em 4,49:1 e é `aria-hidden` (não é
  conteúdo para ler).
- **Alturas intermediárias** (ex.: 1024×600, 2560×1440) não entraram na matriz.
- `prefers-reduced-motion` foi conferido no CSS, não com a preferência ligada no
  navegador.
- Não há teste automatizado versionado: os scripts de medição (Playwright,
  contraste, matriz) rodaram fora do repositório e não foram commitados.
- Nada foi commitado, publicado ou enviado para Vercel/GitHub.

## Decisões que valem registro

- **Imprevisto não mexe na corrente.** Ele não é um adiar escolhido; aplicar o
  encadeamento nele puniria duas vezes o mesmo dia.
- **Imprevisto que estoura um limite termina como FORA DA ESCOLA**, não como
  EVADIDO/DESISTIU: o jogador respondeu, mas o dia não dependia dele — é o que
  o texto do final diz.
- **O boletim abre no topo** (`scrollTop = 0`) e o foco vai para "Jogar de novo"
  com `preventScroll`; sem isso o navegador rolava o overlay até o botão e o
  carimbo ficava fora da tela no celular.
- **Placar "Encarou/Adiou" no HUD** usa o bloco `.hud__bloco` já existente, sem
  classe nova (o CSS entregue não tem regra para `hud__bloco--placar`).
