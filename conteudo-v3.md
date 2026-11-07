# Falta Pouco v3 — conteúdo textual

Texto de tudo que o jogo fala. Fonte única para o `index.html` da v3.
Não substitui o `index.html`, o `simular.js` nem o `README.md` — é a matéria-prima deles.

## Como ler este arquivo

- **Cena** — o que o dia cobra. Uma ou duas frases, pressão concreta.
- **Encarar** — resolve agora. `faltas` entre 0 e −1, `animo` entre −1 e −3.
- **Adiar** — empurra o problema. `faltas` +1 ou +2, `animo` +1 ou +2. O eco sempre tem
  duas partes: o alívio que chega na hora e o custo que fica.
- **Aprenda** — uma ou duas frases, ligada a um dos 12 direitos (`direito: id`).

Regras que valem para todo o arquivo:

1. **Nenhuma resposta tira o aluno da escola por escolha.** As duas mantêm o aluno
   matriculado e em aula. O que muda é **quando** o preço aparece: hoje, encarando, ou
   depois, adiando.
2. **Adiar nunca culpa o aluno.** A pressão é real — o chefe insiste, a mãe adoece, o
   ônibus não passa, o dinheiro não dá. O que o jogo condena é **postergar**, não a pessoa.
   Nenhum eco de adiar acusa o aluno de desistência, de falta de vontade ou de fraqueza.
3. **Nada inventado.** Só leis, programas e telefones que já estão no arquivo: Pé-de-Meia,
   Bolsa Família, EJA, Conselho Tutelar, busca ativa, aprendiz, CRAS, UBS, CAPS, CVV 188,
   Disque 100.
4. Linguagem de aluno. Frase curta. Sem aula chata.

---

# 1. SITUAÇÕES

Dezoito. Cada partida sorteia 12 sem repetir.

---

### 01 · `turno-duplo`

**Cena.** O chefe do mercado chamou para dois turnos seguidos. É o dinheiro do mês, e ele avisou que quem recusa não entra na escala de dezembro.

**Encarar** — *Recusar o turno dobrado*
Eco: Você disse que só faz o turno da noite e foi para a aula. O celular ficou vibrando no bolso até o recreio.
Faltas 0 · Ânimo −2

**Adiar** — *Aceitar hoje e resolver amanhã*
Eco: Você fez os dois turnos e o dinheiro entrou. A aula passou sem você e o cansaço veio junto com o salário.
Faltas +2 · Ânimo +2

**Aprenda.** A lei deixa trabalhar com carteira a partir dos 16 e ser aprendiz a partir dos 14, com horário compatível com a escola. Se o turno atropela a aula, procure o Conselho Tutelar ou o Ministério Público do Trabalho.
→ `trabalho`

---

### 02 · `conta-luz`

**Cena.** A conta de luz atrasou e sua mãe pediu para você ir ao centro resolver hoje, no horário da aula. O corte está marcado para sexta.

**Encarar** — *Resolver depois da aula*
Eco: Você foi direto da escola, pegou a fila às seis e voltou com o comprovante. Chegou em casa às nove, com a aula do dia inteira na cabeça.
Faltas 0 · Ânimo −1

**Adiar** — *Deixar para amanhã*
Eco: Você separou os papéis e saiu atrás do comprovante; a manhã passou e a aula também. A fila continua lá, e a sexta chega igual.
Faltas +1 · Ânimo +1

**Aprenda.** Conta atrasada não é assunto de adolescente sozinho: o CRAS orienta a família sobre Bolsa Família e outros auxílios, e a secretaria da escola indica o caminho.
→ `dinheiro`

---

### 03 · `irmao-febre`

**Cena.** Seu irmão de seis anos amanheceu com febre e sua mãe saiu às cinco para o trabalho. Não tem ninguém em casa até a noite.

**Encarar** — *Deixar com a vizinha e ir*
Eco: A vizinha ficou com ele e você foi, ligando de hora em hora. A febre baixou antes do recreio.
Faltas 0 · Ânimo −3

**Adiar** — *Ficar com ele hoje*
Eco: Você ficou, fez sopa e ele dormiu no seu colo — o alívio foi imediato. A falta entrou no sistema e a escola não soube de nada.
Faltas +1 · Ânimo +2

**Aprenda.** Cuidar de irmão não pode custar sua vaga: a escola tem o dever de procurar quem falta, e a busca ativa existe para isso. Se o cuidado está sobrando para você, o Conselho Tutelar pode apoiar a família.
→ `vaga`

---

### 04 · `avo-caiu`

**Cena.** Sua avó caiu no banheiro e precisa de alguém por perto hoje. Sua tia só chega amanhã de manhã.

**Encarar** — *Pedir à vizinha e ir*
Eco: A vizinha passou o dia com ela e mandou foto do almoço. Você fez a prova com o celular no silencioso.
Faltas 0 · Ânimo −2

**Adiar** — *Ficar com ela hoje*
Eco: Você passou o dia com ela, fez comida e ajudou a andar — e ela ficou bem. A escola não soube de nada e o dia passou.
Faltas +1 · Ânimo +2

**Aprenda.** Cuidar de alguém da família é pesado e não precisa ser resolvido sozinho. O CRAS organiza apoio à família e o Conselho Tutelar orienta quando o cuidado sobra para você.
→ `conselho`

---

### 05 · `passe-vencido`

**Cena.** O passe escolar não renovou e você tem só o dinheiro da volta. A escola fica a quarenta minutos a pé.

**Encarar** — *Ir a pé*
Eco: Você andou quarenta minutos, chegou no segundo tempo da primeira aula e sentou. As pernas doeram o dia inteiro.
Faltas 0 · Ânimo −1

**Adiar** — *Esperar a renovação sair*
Eco: Você ficou em casa e o dia passou mais leve. O passe não saiu, e amanhã o caminho é o mesmo.
Faltas +2 · Ânimo +1

**Aprenda.** Transporte escolar é dever do poder público para quem estuda na rede pública, não é favor. Peça declaração de matrícula na secretaria e reclame na Secretaria de Educação.
→ `apoio`

---

### 06 · `chuva-alagou`

**Cena.** Choveu a noite inteira e a rua virou rio. O ônibus não passou e o ponto final está a vinte minutos de casa.

**Encarar** — *Ir a pé até o ponto final*
Eco: Você andou vinte minutos na chuva, molhado até o joelho, e chegou. A roupa secou no corredor.
Faltas 0 · Ânimo −2

**Adiar** — *Voltar e tentar amanhã*
Eco: Você voltou, trocou de roupa e o alívio foi imediato. No dia seguinte a rua ainda estava alagada.
Faltas +2 · Ânimo +1

**Aprenda.** Se o caminho até a escola é o problema, isso é dever do poder público: a escola deve ficar perto de casa e o transporte é garantido. Sem vaga perto, procure a Secretaria com comprovante de endereço e o Conselho Tutelar.
→ `escola-perto`

---

### 07 · `prova-matematica`

**Cena.** Tem prova de matemática na segunda aula e você não abriu o caderno. A professora avisou que não repete prova sem justificativa.

**Encarar** — *Sentar e fazer a prova*
Eco: Você leu a primeira questão e sentiu o rosto quente. Fez o que sabia e deixou duas em branco.
Faltas 0 · Ânimo −2

**Adiar** — *Faltar e estudar em casa*
Eco: Você estudou três horas com o caderno aberto e entendeu a matéria — isso ficou. A prova já tinha passado.
Faltas +1 · Ânimo +1

**Aprenda.** Nota baixa não apaga seu direito de aprender: você pode pedir o critério, contestar por escrito e pedir recuperação. A coordenação é o primeiro caminho, a Secretaria é o segundo.
→ `avaliacao`

---

### 08 · `recuperacao-tarde`

**Cena.** A recuperação de matemática é hoje à tarde. Quem não aparece fica com a nota do bimestre.

**Encarar** — *Ficar para a recuperação*
Eco: Você ficou até as cinco, fez a prova e uma falta antiga saiu do sistema.
Faltas −1 · Ânimo −1

**Adiar** — *Deixar para a próxima chamada*
Eco: Você saiu no horário e a tarde foi sua. A nota do bimestre fechou sem a recuperação.
Faltas +1 · Ânimo +1

**Aprenda.** Recuperação é parte do direito de aprender, não favor. Se a escola não oferecer, peça por escrito à coordenação e guarde o protocolo.
→ `avaliacao`

---

### 09 · `uniforme-rasgado`

**Cena.** A camiseta do uniforme rasgou no ombro e não tem outra lavada. A escola avisou que sem uniforme o portão não abre.

**Encarar** — *Ir assim mesmo e explicar*
Eco: Você foi com o casaco por cima, falou com a coordenação e entrou. A costura apareceu no recreio.
Faltas 0 · Ânimo −1

**Adiar** — *Esperar o dinheiro para comprar outra*
Eco: Você ficou em casa e o dia passou sem vergonha nenhuma. O dinheiro não caiu, e o portão continua o mesmo.
Faltas +2 · Ânimo +1

**Aprenda.** Material e uniforme fazem parte da educação básica gratuita. Se faltar, fale com a direção e com a Secretaria de Educação antes de deixar de ir — e registre o pedido por escrito.
→ `apoio`

---

### 10 · `diretora-chamou`

**Cena.** A diretora mandou chamar sua mãe por causa das faltas. Sua mãe ainda não sabe e o recado está na agenda há três dias.

**Encarar** — *Sentar na frente da diretora*
Eco: Você contou o que estava acontecendo antes da sua mãe chegar. A conversa foi dura e ninguém gritou.
Faltas 0 · Ânimo −3

**Adiar** — *Faltar até o assunto esfriar*
Eco: Você ficou dois dias fora e o alívio durou até a agenda abrir de novo. O recado continuou lá, agora com mais faltas.
Faltas +2 · Ânimo +1

**Aprenda.** Quando as faltas passam do limite, a escola deve avisar o Conselho Tutelar — isso é proteção, não castigo. Você também pode procurar o Conselho antes, para contar sua versão.
→ `conselho`

---

### 11 · `sono-turno`

**Cena.** Você pegou turno até meia-noite no depósito e o despertador tocou às cinco. O corpo não levantou na primeira nem na segunda.

**Encarar** — *Levantar no terceiro despertador*
Eco: Você chegou atrasado, dormiu em pé na fila e copiou o quadro errado. Mas estava na sala.
Faltas 0 · Ânimo −3

**Adiar** — *Dormir a manhã inteira*
Eco: Você dormiu até o meio-dia e o corpo agradeceu na hora. A matéria do dia ficou para trás e o turno da noite continua.
Faltas +1 · Ânimo +2

**Aprenda.** Cansaço e doença têm justificativa: entregue atestado no prazo e peça por escrito que a falta seja abonada. Antes dos 18, trabalho noturno é proibido — procure o Conselho Tutelar.
→ `saude`

---

### 12 · `festa-quinze`

**Cena.** É o aniversário de quinze da sua melhor amiga, numa quinta. A festa começa às dez da noite e a aula é às sete.

**Encarar** — *Sair da festa à meia-noite*
Eco: Você dançou duas horas, se despediu cedo e apareceu na primeira aula com olheira. Sua amiga entendeu.
Faltas 0 · Ânimo −2

**Adiar** — *Ficar até o fim*
Eco: Você ficou até as quatro e a festa valeu cada minuto. A manhã passou dormindo e a falta entrou sozinha.
Faltas +1 · Ânimo +2

**Aprenda.** Faltar por lazer não é crime, mas a falta conta. Entregue justificativa, peça reposição e lembre: sua vaga continua sua.
→ `vaga`

---

### 13 · `entrevista-aprendiz`

**Cena.** Saiu uma vaga de menor aprendiz na oficina do bairro. A entrevista é amanhã às nove, no horário da aula, e é a primeira chamada.

**Encarar** — *Remarcar para sexta*
Eco: Você ligou, explicou que estuda de manhã e marcou para sexta às quatro. A vaga continuou lá.
Faltas 0 · Ânimo −1

**Adiar** — *Ir à entrevista e resolver a aula depois*
Eco: Você foi, entregou o currículo e saiu com esperança. A aula passou e a chamada fechou.
Faltas +1 · Ânimo +2

**Aprenda.** Vaga de aprendiz tem jornada e horário protegidos, e a empresa pode ajustar o horário com a escola. Remarcar não é perder a chance: o emprego não precisa competir com a aula.
→ `trabalho`

---

### 14 · `atestado-prazo`

**Cena.** A secretaria recebe atestado só até amanhã, no horário do intervalo. É o último prazo para abonar três faltas do bimestre.

**Encarar** — *Ir no horário do intervalo*
Eco: Você levou os papéis, pegou o protocolo e as três faltas saíram do sistema na hora.
Faltas −1 · Ânimo −2

**Adiar** — *Deixar para a semana que vem*
Eco: Você dormiu até tarde e a manhã foi tranquila. Os atestados ficaram na mochila e o prazo fechou.
Faltas +1 · Ânimo +2

**Aprenda.** Doença não é abandono: entregue o atestado no prazo e peça por escrito que a falta seja justificada. Guarde cópia do protocolo.
→ `saude`

---

### 15 · `bullying`

**Cena.** Um grupo do segundo ano começou a gravar você no corredor. Ontem o vídeo foi para o grupo da turma e hoje tem aula com eles.

**Encarar** — *Mostrar para a coordenação*
Eco: Você mostrou o vídeo para a coordenadora, que chamou os responsáveis. O corredor ficou pesado por uns dias.
Faltas 0 · Ânimo −3

**Adiar** — *Não ir hoje*
Eco: Você ficou em casa e o dia passou sem cruzar com eles. O vídeo continua no grupo e amanhã tem aula.
Faltas +1 · Ânimo +1

**Aprenda.** Ninguém aprende com medo: a escola tem o dever de prevenir violência e bullying. Anote data, local e nomes, peça registro por escrito na direção e, se a escola não agir, procure o Conselho Tutelar.
→ `respeito`

---

### 16 · `sarau`

**Cena.** Tem sarau na escola hoje à noite e o grêmio contou com você para ler uma poesia. Na mesma hora é o aniversário da sua prima.

**Encarar** — *Ficar no sarau*
Eco: Você leu a poesia que ensaiou e o grêmio fechou a noite. Sua prima mandou foto do bolo.
Faltas 0 · Ânimo −1

**Adiar** — *Ir ao aniversário*
Eco: Você dançou até a uma da manhã e a festa valeu. A poesia ficou sem quem lesse, e a aula de amanhã começou sem você.
Faltas +1 · Ânimo +2

**Aprenda.** Sarau, grêmio e entidade estudantil também são escola. Participar é direito e ajuda a resolver problema da escola junto com a direção.
→ `gremio`

---

### 17 · `acesso-rampa`

**Cena.** A rampa da entrada quebrou e a direção mandou recado: "até consertarem, é melhor você estudar em casa".

**Encarar** — *Entrar pela porta dos fundos*
Eco: Você entrou pela cozinha, com a cadeira levantada por dois colegas, e assistiu à aula. A direção não gostou de ver você ali.
Faltas 0 · Ânimo −2

**Adiar** — *Aceitar o recado e esperar o conserto*
Eco: Você aceitou e não precisou passar por aquela porta. O conserto não tem data, e a direção considera o assunto resolvido.
Faltas +2 · Ânimo +1

**Aprenda.** A escola deve se organizar para receber você: recusar acesso é discriminação, e o atendimento especializado é gratuito. Peça por escrito, procure a Secretaria de Educação, o Ministério Público ou a Defensoria Pública.
→ `inclusao`

---

### 18 · `eja-volta`

**Cena.** Você tem 18 e ainda está no 9º ano. A Secretaria abriu turma de EJA à noite e a escola chamou você para decidir hoje.

**Encarar** — *Ir à secretaria hoje*
Eco: Você sentou com a coordenadora, viu a grade da EJA noturna e saiu com a matrícula na mão. Dá para continuar trabalhando de dia.
Faltas 0 · Ânimo −1

**Adiar** — *Deixar a decisão para depois*
Eco: Você não foi e o dia passou sem essa conversa. A turma fechou e a próxima abre no ano que vem.
Faltas +1 · Ânimo +1

**Aprenda.** Quem não estudou na idade certa pode voltar pela EJA, inclusive à noite, e voltar não é atraso: é direito. Pergunte na Secretaria de Educação quais documentos levar.
→ `eja`

---

## Cobertura dos 12 direitos

| direito | situações | vezes |
|---|---|---|
| `vaga` | 03 irmao-febre · 12 festa-quinze | 2 |
| `escola-perto` | 06 chuva-alagou | 1 |
| `respeito` | 15 bullying | 1 |
| `avaliacao` | 07 prova-matematica · 08 recuperacao-tarde | 2 |
| `gremio` | 16 sarau | 1 |
| `apoio` | 05 passe-vencido · 09 uniforme-rasgado | 2 |
| `inclusao` | 17 acesso-rampa | 1 |
| `saude` | 11 sono-turno · 14 atestado-prazo | 2 |
| `conselho` | 04 avo-caiu · 10 diretora-chamou | 2 |
| `eja` | 18 eja-volta | 1 |
| `trabalho` | 01 turno-duplo · 13 entrevista-aprendiz | 2 |
| `dinheiro` | 02 conta-luz | 1 |

18 notas, 12 direitos, nenhum direito sem nota. Seis direitos aparecem duas vezes.

**Dois temas da lista ficaram de fora e dois entraram.** Saíram `feira` (trabalho já tem duas
situações) e `apresentacao-grupo` (avaliação já tem duas). Entraram `acesso-rampa` e `eja-volta`,
porque sem eles os direitos `inclusao` e `eja` ficariam sem nenhuma nota — e cobrir os 12 era
requisito duro. Se o dono preferir a feira ou o trabalho em grupo, o corte natural é
`uniforme-rasgado` ou `recuperacao-tarde` (cada um tem um par do mesmo direito).

---

# 2. IMPREVISTOS

Quatro. Substituem o coringa de morte instantânea: caem com 1% por dia, sempre dão duas
respostas e **nunca eliminam sem o jogador responder**. As duas respostas mantêm o aluno na
escola; uma custa mais caro.

---

### `onibus-quebra`

**Cena.** O ônibus quebrou no meio do caminho e todo mundo desceu na marginal. O próximo passa em quarenta minutos.

**Descer e pegar outro**
Eco: Você esperou na sombra, pegou dois ônibus e chegou na terceira aula. Perdeu a prova de inglês.
Faltas 0 · Ânimo −2

**Voltar para casa e tentar amanhã**
Eco: Você voltou e o alívio veio antes do meio-dia. A aula seguiu sem você, e o ônibus continua quebrado.
Faltas +1 · Ânimo −1

---

### `luz-acabou`

**Cena.** A luz acabou na véspera da prova e o caderno ficou no escuro. Seu celular está em 4%.

**Estudar de madrugada com o celular**
Eco: Você estudou até a bateria acabar e chegou na prova com sono. Lembrou de duas fórmulas.
Faltas 0 · Ânimo −2

**Dormir e encarar de manhã**
Eco: Você dormiu e acordou descansado, com a luz de volta. A prova foi com o que já estava na cabeça.
Faltas 0 · Ânimo −1

---

### `chefe-chamou`

**Cena.** O chefe ligou às seis da manhã: faltou gente e ele precisa de você hoje, senão desconta o dia.

**Ir para a escola e avisar**
Eco: Você avisou que não ia e foi para a aula. Ele desligou na sua cara.
Faltas 0 · Ânimo −2

**Cobrir o turno**
Eco: Você cobriu o turno e o dia foi pago. A chamada fechou sem você.
Faltas +1 · Ânimo −1

---

### `parente-passou-mal`

**Cena.** Seu tio passou mal na rua e ligou para você, que é o mais perto. A ambulância já foi chamada.

**Ir ao hospital e depois para a escola**
Eco: Você ficou no corredor até ele ser atendido e chegou na última aula. Perdeu o intervalo com os amigos.
Faltas 0 · Ânimo −2

**Ficar no hospital o dia todo**
Eco: Você ficou até a noite, quando sua mãe chegou. O dia de aula passou inteiro.
Faltas +1 · Ânimo −1

---

# 3. TUTORIAL

Seis passos. Cada um com título curto e uma ou duas frases. Sem aula chata: fala do jogo,
não de teoria.

---

**1. Doze dias, dois medidores**
Você tem 12 dias para chegar ao fim do bimestre. Faltas vão de 0 a 8 e ânimo de 0 a 10 —
você começa com 6. Se qualquer um dos dois bater no limite, a partida encerra.

**2. Encarar**
Encarar resolve o problema hoje. Segura a falta (0 ou −1) e gasta ânimo (−1 a −3).
É o caminho que mantém o dia inteiro dentro da escola.

**3. Adiar**
Adiar alivia agora: +1 ou +2 de ânimo. O preço vem depois, em falta (+1 ou +2), e o
problema continua de pé.

**4. Adiar encadeia**
Cada adiar seguido soma uma falta extra: o segundo seguido cobra +1, o terceiro +2, o quarto
+3. É assim que a bola de neve começa — e é ela que tira gente da escola.

**5. Pedir ajuda**
Duas vezes por partida, o botão Pedir ajuda tira 2 faltas e devolve 1 de ânimo sem gastar o
dia. Só funciona antes de escolher: depois que você escolhe, o dia já foi.

**6. Imprevisto e os quatro finais**
Cai um imprevisto em 1% dos dias, e ele sempre te dá duas respostas — nunca elimina sozinho.
Os finais são PASSOU (12 dias), EVADIDO (8 faltas), DESISTIU (ânimo 0) e FORA DA ESCOLA
(imprevisto sem saída).

---

# 4. DICAS

Três, curtas, para o fim do tutorial.

1. **Olhe o medidor mais perto do fim.** É ele que decide a partida, não o dia que você está jogando.
2. **Guarde o Pedir ajuda para quando as faltas apertarem.** Usar com 1 falta é desperdício: ele tira 2.
3. **Dois adiar seguidos custam mais que dois adiar separados.** Se precisar adiar, encare no dia seguinte.

---

# 5. DIREITOS

Os doze, com a substância atual mantida. Título, o que é, primeiro passo e a fonte.

---

### `vaga` · Sua vaga é sua
Estar na escola não é favor: a educação é direito de todos e dever do Estado e da família. Quem já está matriculado não perde a vaga porque faltou, sem que a escola procure a família e acione a rede de proteção.
**Se acontecer:** peça a decisão por escrito e procure a Secretaria de Educação e o Conselho Tutelar.
Fonte: CF, art. 205 e 208 · ECA, art. 53

### `escola-perto` · Escola pública e perto de casa
A escola pública deve ficar próxima da sua casa, e irmãos podem estudar no mesmo estabelecimento. Morar longe não pode virar motivo para ficar de fora.
**Se acontecer:** sem vaga perto, procure a Secretaria de Educação e o Conselho Tutelar e leve o comprovante de endereço.
Fonte: ECA, art. 53 · LDB, art. 4º

### `respeito` · Respeito, sem violência nem bullying
Ninguém aprende com medo. A escola tem o dever de prevenir violência e bullying e de promover uma cultura de paz. Respeito aos educadores também é direito e dever de todos.
**Se acontecer:** anote data, local e nomes, conte a um adulto de confiança e peça à direção o registro por escrito. Em risco, ligue 100.
Fonte: ECA, art. 53 · Lei 13.663/2018

### `avaliacao` · Contestar nota e pedir recuperação
Você pode contestar critérios de avaliação, com recurso às instâncias superiores, e pedir recuperação. Nota baixa não apaga o seu direito de aprender.
**Se acontecer:** peça a prova e o critério, conteste por escrito à coordenação e, se precisar, à Secretaria de Educação.
Fonte: ECA, art. 53

### `gremio` · Grêmio e entidades estudantis
Participar do grêmio e de entidades estudantis é um direito seu, não um privilégio. Esses espaços ajudam a resolver problemas da escola junto com a direção.
**Se acontecer:** procure a direção para saber como o grêmio funciona. Se impedirem, peça o motivo por escrito e avise o Conselho Tutelar.
Fonte: ECA, art. 53

### `apoio` · Transporte, alimentação e material
Transporte, alimentação e material didático são programas que o poder público deve garantir a quem está na escola pública. Não é caridade: é parte do direito à educação.
**Se acontecer:** fale com a secretaria da escola; se não resolver, procure a Secretaria de Educação e o Conselho Tutelar.
Fonte: CF, art. 208, VII · LDB, art. 4º

### `inclusao` · Inclusão e atendimento especializado
Quem tem deficiência tem direito à educação inclusiva e ao atendimento educacional especializado, sem pagar por isso. A escola deve se organizar para receber você.
**Se acontecer:** peça por escrito a avaliação e o atendimento. Se negarem, procure a Secretaria, o Ministério Público ou a Defensoria Pública.
Fonte: LBI (Lei 13.146/2015), art. 27 e 28

### `saude` · Falta por doença tem justificativa
Doença não é abandono. Entregue o atestado no prazo e peça por escrito que a falta seja justificada. A frequência mínima para aprovação é de 75% das aulas.
**Se acontecer:** guarde cópia do atestado e do protocolo de entrega. Se a falta não for justificada, peça a correção à secretaria.
Fonte: LDB, art. 24, VI · ECA, art. 56

### `conselho` · Conselho Tutelar é proteção, não castigo
Quando as faltas passam de 30% do limite permitido em lei, a escola deve avisar o Conselho Tutelar. O Conselho pode garantir matrícula, frequência e apoio à família.
**Se acontecer:** você também pode procurar o Conselho Tutelar antes, para contar sua versão e pedir apoio.
Fonte: LDB, art. 12, VIII (Lei 13.803/2019) · ECA, art. 56 e 129

### `eja` · Voltar a estudar pela EJA
Quem não estudou na idade certa pode voltar pela Educação de Jovens e Adultos, inclusive no período noturno. Voltar não é atraso: é direito.
**Se acontecer:** pergunte na Secretaria de Educação onde há turma de EJA e quais documentos levar para se matricular.
Fonte: LDB, art. 37 e 38

### `trabalho` · Trabalho e aprendiz
Trabalho com carteira assinada só a partir dos 16 anos. Dos 14 aos 16, só como aprendiz, com contrato e jornada protegida. Antes dos 18 é proibido trabalho noturno, perigoso ou insalubre.
**Se acontecer:** se o trabalho está impedindo a aula ou é irregular, procure o Conselho Tutelar ou o Ministério Público do Trabalho.
Fonte: CF, art. 7º, XXXIII · Lei 10.097/2000

### `dinheiro` · Pé-de-Meia e Bolsa Família
O Bolsa Família exige frequência de 60% (4 a 6 anos) e 75% (6 a 18 anos). O Pé-de-Meia é um incentivo financeiro para quem cursa o ensino médio, com frequência mínima de 80% ao mês e critério de renda. Valores e regras mudam: confirme na sua escola.
**Se acontecer:** pergunte na secretaria como comprovar a frequência e quais documentos entregar. Não perca o prazo.
Fonte: Lei 14.601/2023, art. 10 · Lei 14.818/2024 · Portaria MEC 169/2026

---

# 6. SAÍDAS

Oito caminhos práticos. Título, quando serve, passos e quem procurar.

---

### `confianca` · Fale com alguém de confiança na escola
**Quando serve:** você está faltando e não sabe como voltar, ou tem medo de contar em casa.
1. Escolha um professor, coordenador ou alguém do grêmio.
2. Conte em uma frase o que está acontecendo.
3. Combine um retorno: "volto na terça e te conto como foi".
4. Se essa pessoa não puder ajudar, peça o nome de quem pode.
**Quem:** professor, coordenação, direção, grêmio.

### `pedagogico` · Peça apoio pedagógico e recuperação
**Quando serve:** a matéria atrasou, a nota caiu e você não sabe por onde começar.
1. Peça a recuperação e o conteúdo que ficou para trás.
2. Liste as três coisas mais urgentes, não a lista inteira.
3. Combine um prazo realista com o professor.
4. Volte para contar o que conseguiu e o que travou.
**Quem:** professor da matéria, coordenação pedagógica.

### `rotina` · Organize a rotina e um grupo de estudo
**Quando serve:** você chega cansado e tudo parece acumulado.
1. Reserve 30 minutos fixos por dia, no mesmo horário.
2. Estude com duas ou três pessoas: cada uma explica uma parte.
3. Escolha uma meta pequena por dia e marque quando cumprir.
4. Deixe material e uniforme prontos na noite anterior.
**Quem:** você, colegas, coordenação.

### `dinheiro` · Se o problema é dinheiro
**Quando serve:** falta passe, merenda, material ou ajuda em casa.
1. Fale com a secretaria da escola: transporte e alimentação são dever do Estado.
2. Pergunte quais programas da rede você pode acessar e o que levar.
3. Procure o CRAS para orientação sobre Bolsa Família e outros auxílios.
4. Se a escola não resolver, registre por escrito e procure o Conselho Tutelar.
**Quem:** escola, CRAS, Conselho Tutelar, Secretaria de Educação.

### `trabalho` · Se o trabalho está comendo a aula
**Quando serve:** turno longo, trabalho noturno ou entrevista em horário de aula.
1. Converse com a escola antes de faltar e peça reposição.
2. Verifique se a vaga é de aprendiz (a partir dos 14) e se tem contrato.
3. Negocie horário compatível com a aula; trabalho noturno antes dos 18 é proibido.
4. Se houver exploração, procure o Conselho Tutelar ou o Ministério Público do Trabalho.
**Quem:** escola, empresa, Conselho Tutelar, Ministério Público do Trabalho.

### `cuidar` · Se você cuida de alguém da família
**Quando serve:** irmão, avó ou outra pessoa depende de você durante o dia.
1. Avise a escola antes de faltar e peça as tarefas.
2. Procure o CRAS: eles organizam apoio à família.
3. Peça ao Conselho Tutelar orientação se o cuidado estiver sobrando para você.
4. Não é sua obrigação resolver isso sozinho.
**Quem:** CRAS, Conselho Tutelar, UBS, escola.

### `saude` · Saúde mental e cansaço
**Quando serve:** desânimo, sono demais ou de menos, ansiedade, vontade de sumir.
1. Fale com alguém de confiança: não precisa explicar tudo de uma vez.
2. Procure a UBS do seu bairro; se precisar, eles encaminham ao CAPS.
3. Ligue 188 (CVV): gratuito, 24 horas, sigiloso.
4. Avise a escola se isso estiver afetando sua frequência.
**Quem:** UBS, CAPS, CVV 188, escola.

### `violencia` · Violência ou bullying
**Quando serve:** agressão, ameaça, humilhação ou assédio, dentro ou fora da escola.
1. Registre data, local e nomes do que aconteceu.
2. Conte a um adulto de confiança e peça registro na direção: é dever legal da escola agir.
3. Ligue 100: gratuito, 24 horas, anônimo.
4. Se a escola não agir, procure o Conselho Tutelar e o Ministério Público.
**Quem:** direção, Conselho Tutelar, Disque 100, Ministério Público.

---

# 7. FINAIS

Quatro. Cada um com carimbo, uma frase de leitura da partida, o que fazer agora e a linha
sobre adiar e volta.

A linha final é obrigatória nos quatro e não moraliza: diz que adiar trouxe até ali e que
voltar é possível, sem culpar quem jogou.

---

### `passou` · PASSOU

**Carimbo:** PASSOU
**Leitura:** Doze dias, {faltas} e ânimo {animo}. Você atravessou o bimestre sem deixar o problema decidir por você.
**O que fazer agora:**
1. Guarde o que funcionou: qual escolha te manteve na escola?
2. Seus direitos continuam: vaga, transporte, alimentação e material.
3. Uma conversa pode ser a busca ativa de outra pessoa. Repasse o que você aprendeu.
4. Se o próximo bimestre apertar, comece pela ajuda — não pela falta.
**Linha do boletim:** Cada vez que você adiou, o dia seguinte foi a chance de voltar. Adiar trouxe você até aqui e voltar sempre é possível.

---

### `evadido` · EVADIDO

**Carimbo:** EVADIDO
**Leitura:** {faltas} faltas em {dias} dias. O adiamento foi somando até o dia em que a falta não cabia mais.
**O que fazer agora:**
1. Fale com a escola esta semana e peça o caminho de volta: matrícula, reposição e apoio.
2. Se a escola não resolver, procure o Conselho Tutelar e conte o que aconteceu.
3. A busca ativa existe para encontrar quem ficou fora: peça para ser procurado.
4. Dá para voltar: pergunte na Secretaria de Educação sobre a EJA, inclusive à noite.
**Linha do boletim:** Foi o adiar que trouxe você até aqui — e voltar sempre é possível: a matrícula de volta não depende de você ter acertado antes.

---

### `desistiu` · DESISTIU

**Carimbo:** DESISTIU
**Leitura:** O ânimo chegou a zero no dia {dias}. Você encarou até não sobrar nada, e cansaço não é fraqueza: é sinal de que faltou apoio.
**O que fazer agora:**
1. Conte para alguém da escola o que está pesando. Você não precisa resolver sozinho.
2. Peça apoio pedagógico e recuperação: o atraso tem caminho de volta.
3. Se o cansaço for constante, procure a UBS ou o CAPS. O CVV atende no 188, 24 horas.
4. Volte um dia de cada vez: uma aula já é recomeço.
**Linha do boletim:** Adiar e encarar cansam dos dois jeitos; o que devolve o ânimo é pedir ajuda. O cansaço de hoje não apaga o direito de voltar: a escola continua sua.

---

### `fora` · FORA DA ESCOLA

**Carimbo:** FORA DA ESCOLA
**Leitura:** Motivo: {motivo}. Foi um dia que não dependia de você.
**O que fazer agora:**
1. Procure a escola ou o Conselho Tutelar: a busca ativa existe para encontrar quem ficou fora.
2. Leve seus documentos e peça a matrícula e o plano de retorno.
3. Se precisar voltar em outro formato, pergunte sobre a EJA na Secretaria de Educação.
4. Se o imprevisto foi de saúde ou de família, conte o que houve e peça apoio.
**Linha do boletim:** Imprevisto não é culpa, e nada do que veio antes apaga o direito de voltar. Adiar trouxe você até aqui e voltar sempre é possível.

---

# 8. TEXTOS DE INTERFACE

## Tela inicial

**Título:** Doze dias, duas respostas — e as duas terminam na escola.
**Explicação:** Cada dia traz uma situação real: trabalho, dinheiro, família, transporte, medo. As duas respostas mantêm você na escola; o que muda é quando o preço aparece. Encarar resolve agora e gasta ânimo. Adiar alivia agora e cobra a falta depois.
**Rótulo do campo:** Como você se chama?
**Dica do campo:** Até 20 caracteres. Nada é salvo: recarregar a página começa outra partida.
**Botão principal:** Começar o bimestre
**Rodapé:** Sem conta, sem servidor, sem áudio. Nada é salvo: recarregar a página começa outra partida.

## Botões

| onde | rótulo |
|---|---|
| ação especial | Pedir ajuda |
| depois da escolha | Próximo dia |
| última rodada | Ver o resultado |
| boletim | Jogar de novo |
| boletim | Ver meus direitos |
| cabeçalho | Menu |
| nota Aprenda | Ver o direito |

## Pedir ajuda — legenda por estado

| estado | legenda |
|---|---|
| disponível | Pedir ajuda: −2 faltas, +1 ânimo |
| já usada | Ajuda já usada nesta partida |
| fora da fase de escolha | Só antes de escolher |

O botão fica **desabilitado** nos três estados que não são "disponível", e a legenda sempre
diz o motivo. Quando a fase é a janela resolvida, o botão some — não fica só apagado.

## HUD

- **Selos das cartas:** `Encarar` (tecla 1) e `Adiar` (tecla 2).
- **Contadores no placar:** `Encarou` e `Adiou`, com o número ao lado.
- **Olho da cena:** O dia pede uma resposta.
- **Rodapé de atalhos:** 1 e 2 escolhem · Tab percorre · Enter confirma.
- **Avisos:** "Você está pensando em desistir." (ânimo ≤ 2) · "O conselho já mandou recado." (6 faltas) · "{n} dias adiando seguidos" (2 ou mais adiar seguidos).

## Boletim

- **Olho:** Boletim do bimestre
- **Resumo de escolhas:** `Encarou {encarou} · Adiou {adiou}`
- **Linha de leitura:** a frase do final escolhido, seção 7.
- **Rótulo da lista de ações:** O que fazer agora

## Feedback curto

- Abertura do dia: "Dia {n} de 12."
- Adiar encadeado: "Adiar de novo: +{extra} falta extra."
- Pedir ajuda: "Pedir ajuda: a escola procurou você. −{n} faltas. Agora {faltas}/8."

---

# Anexo — referência de balanceamento

Os deltas acima foram escritos pelo sentido de cada cena, não pela conta. Se o
`simular.js` não bater a meta do spec (atenta 60–70%, sempre adiar ≤5%, sempre encarar
≤20%), ajuste **os números**, mantendo a ordem relativa: o que dói mais continua doendo
mais.

Distribuição atual, para conferir depois de qualquer ajuste:

| medida | distribuição | média |
|---|---|---|
| encarar · ânimo | 4×(−3), 7×(−2), 7×(−1) | −1,83 |
| encarar · faltas | 2×(−1), 16×0 | −0,11 |
| adiar · faltas | 6×(+2), 12×(+1) | +1,33 |
| adiar · ânimo | 8×(+2), 10×(+1) | +1,44 |

Conta rápida com ânimo inicial 6 e duas ajudas (+2 de ânimo, −4 de faltas): a política que
mistura aguenta até ~7 dias de encarar e ~5 de adiar. Se o sim ficar abaixo de 60%, o
caminho mais curto é subir de −2 para −1 em duas ou três situações de peso médio
(`turno-duplo`, `avo-caiu`, `chuva-alagou`); se passar de 70%, desça
`entrevista-aprendiz` e `sarau` (hoje em −1) para −2.

O que **não** pode ceder no ajuste: encarar nunca custa 0 de ânimo (senão vira escolha
grátis), adiar nunca dá +3 (senão o alívio vira armadilha boa demais) e nenhuma resposta
pode zerar a falta sem passar pelo Pedir ajuda.
