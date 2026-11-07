# AGENTS.md — falta-pouco-v2

## Stack
Site estático de arquivo único: `index.html` (HTML + CSS + JS, sem build, sem
dependência, sem rede, sem armazenamento). `simular.js` roda em Node e lê o bloco
`LOGICA-PURA-INICIO/FIM` de dentro do `index.html`. `README.md` é a documentação
viva do jogo. v1 fica em `../falta-pouco` e não se toca.

## Comandos
```powershell
node --check simular.js
node simular.js --partidas 200000
python -m http.server 8000     # abrir http://localhost:8000/index.html
```

## Convenções
- pt-BR, linguagem de aluno, frases curtas; nada de lei ou telefone inventado.
- Toda regra de jogo vive entre os marcadores de lógica pura, sem DOM.
- Ids e classes de `CONTRATO-DOM.md` são estáveis.
- Texto de "adiar" nunca culpa o aluno; nenhuma opção tira o aluno da escola.
- Sem commit, push ou publicação sem o dono autorizar.
