# Contrato de DOM — Falta Pouco v3

Ninguém renomeia id, `data-opcao` ou nome de classe listado aqui. Pixel pode
acrescentar classes e wrappers, nunca trocar os hooks abaixo.

## Estrutura

```
div.pagina
  header.marca
    h1.marca__titulo
    p.marca__tag
    button#btn-menu.marca__menu            (aria-haspopup="dialog" aria-controls="menu")
  main.palco
    section#tela-inicio.tela.tela--inicio
      div.inicio__cartao
        h2#titulo-inicio.chamada
        p.explicacao
        form#form-inicio.inicio-form
          label.campo-rotulo[for=campo-nome]
          input#campo-nome.campo
          p#dica-nome.dica
          button.botao.botao--principal[type=submit]
    section#tela-jogo.tela.tela--jogo[hidden]
      div#hud.hud
        div.hud__bloco.hud__bloco--nome > span.rotulo + strong#hud-nome
        div.hud__bloco.hud__bloco--rodada > span.rotulo + strong > span#rodada-num
        div.hud__bloco.hud__bloco--faltas > span.rotulo + div#faltas.faltas + span#faltas-texto.medidor-texto
        div.hud__bloco.hud__bloco--animo  > span.rotulo#animo-rotulo + div#animo.animo + span#animo-texto.medidor-texto
      p#aviso-animo.aviso[role=status][hidden]
      p#alerta.aviso[role=status][hidden]
      p#aviso-faltas.aviso.aviso--faltas[hidden]
      div.mesa
        article#cena.cena
          span#cena-selo.selo[hidden]
          p#cena-olho.cena__olho
          p#cena-texto.cena__texto
        div#respostas.respostas
          button#resp-encarar.carta.carta--encarar[type=button][data-opcao=encarar]
            span.carta__topo > span.selo.selo--encarar + span.tecla
            span#titulo-encarar.carta__titulo
            span#efeitos-encarar.carta__efeitos
          button#resp-adiar.carta.carta--adiar[type=button][data-opcao=adiar]
            span.carta__topo > span.selo.selo--adiar + span.tecla
            span#titulo-adiar.carta__titulo
            span#efeitos-adiar.carta__efeitos
      div.barra
        button#btn-ajuda.botao.botao--ajuda[type=button]
        button#btn-proximo.botao.botao--principal[type=button][hidden]
      p#feedback.feedback
      aside#aprender.aprender[hidden]
        p.aprender__olho
        p#aprender-texto.aprender__texto
        button#aprender-link.aprender__link[type=button]
      p#anuncio.sr-only[aria-live=polite][aria-atomic=true]
      p#atalho.atalho
  footer.rodape

div#menu.menu[hidden][role=dialog][aria-modal=true]
  div.menu__caixa > div.menu__topo (h2#menu-titulo, button#menu-fechar)
                   + div#menu-corpo + div#menu-rodape

div#fim.overlay[hidden][role=dialog][aria-modal=true]
  div.boletim
    p.boletim__olho + p#fim-carimbo.carimbo
    p#fim-linha.boletim__linha + p#fim-leitura.boletim__linha
    dl.boletim__resumo  (dt/dd: #fim-nome, #fim-rodadas, #fim-faltas, #fim-animo,
                         #fim-escolhas → "encarou / adiou", #fim-ajudas, #fim-adiadas)
    div#fim-acoes.boletim__acoes (h3 + ol#fim-acoes-lista)
    div.boletim__botoes (button#btn-de-novo, button#btn-direitos-fim)
```

## Regras de layout
- `html, body { height:100% }`, `body { overflow-x:hidden }` não é desculpa:
  nenhum elemento pode passar de `innerWidth`.
- `.pagina` ocupa a viewport: `min-height:100dvh`, coluna flex, `main` com
  `flex:1`, `min-height:0` (para a cena poder rolar dentro de si).
- `.tela--jogo` é grid/flex que preenche `main`; a cena é o único elemento com
  `overflow:auto`; cartas e botões nunca saem da tela.
- Paisagem baixa (`@media (max-height:520px) and (orientation:landscape)`):
  `.mesa` vira duas colunas (cena | respostas), `.hud` compacto em uma linha.
- `@media (max-width:899px)`: uma coluna. `@media (min-width:900px)`: duas.
- `prefers-reduced-motion`: sem animação.
