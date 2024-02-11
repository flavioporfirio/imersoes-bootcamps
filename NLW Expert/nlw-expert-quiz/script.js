const perguntas = [
  {
    pergunta: "O que é JavaScript?",
    respostas: [
      "Uma linguagem de marcação",
      "Uma linguagem de programação de alto nível",
      "Um estilo de programação orientado a objetos",
    ],
    correta: 1,
  },
  {
    pergunta: "Qual é a forma correta de declarar uma variável em JavaScript?",
    respostas: ["var myVar = 10;", "variable myVar = 10;", "myVar := 10;"],
    correta: 0,
  },
  {
    pergunta: "Como você comenta uma única linha de código em JavaScript?",
    respostas: [
      "// Este é um comentário de uma linha",
      "<!-- Este é um comentário de uma linha -->",
      "/* Este é um comentário de uma linha */",
    ],
    correta: 0,
  },
  {
    pergunta: "O que é um array em JavaScript?",
    respostas: [
      "Uma estrutura de dados que armazena apenas um tipo de dado",
      "Uma estrutura de dados que armazena vários tipos de dados",
      "Uma função nativa do JavaScript",
    ],
    correta: 1,
  },
  {
    pergunta: "Qual é o operador de atribuição em JavaScript?",
    respostas: ["=", "==", ":="],
    correta: 0,
  },
  {
    pergunta:
      "Qual função é usada para converter uma string em um número inteiro em JavaScript?",
    respostas: ["parseInt()", "parseFloat()", "toInteger()"],
    correta: 0,
  },
  {
    pergunta: "Qual é a saída do seguinte código: console.log(typeof 42);",
    respostas: ["number", "string", "boolean"],
    correta: 0,
  },
  {
    pergunta:
      "Qual método é usado para imprimir algo no console em JavaScript?",
    respostas: ["print()", "log()", "display()"],
    correta: 1,
  },
  {
    pergunta: "O que faz o operador '===' em JavaScript?",
    respostas: [
      "Compara apenas o valor das variáveis",
      "Compara o valor e o tipo das variáveis",
      "Atribui um valor à variável",
    ],
    correta: 1,
  },
  {
    pergunta:
      "Qual é a estrutura de controle usada para executar código repetidamente em JavaScript?",
    respostas: ["if", "while", "for"],
    correta: 2,
  },
];

const quiz = document.querySelector("#quiz");
const template = document.querySelector("template");

const corrects = new Set();
const totalDePerguntas = perguntas.length;
const mostrarTotal = document.querySelector("#acertos span");
mostrarTotal.textContent = corrects.size + " de " + totalDePerguntas;

for (const item of perguntas) {
  const quizItem = template.content.cloneNode(true);
  quizItem.querySelector("h3").textContent = item.pergunta;

  for (let resposta of item.respostas) {
    const dt = quizItem.querySelector("dl dt").cloneNode(true);
    dt.querySelector("span").textContent = resposta;

    dt.querySelector("input").setAttribute(
      "name",
      "pergunta-" + perguntas.indexOf(item)
    );
    dt.querySelector("input").value = item.respostas.indexOf(resposta);

    dt.querySelector("input").onchange = (event) => {
      const isCorrect = event.target.value == item.correta;

      corrects.delete(item);
      if (isCorrect) corrects.add(item);

      mostrarTotal.textContent = corrects.size + " de " + totalDePerguntas;
    };

    quizItem.querySelector("dl").appendChild(dt);
  }

  quizItem.querySelector("dl dt").remove();
  quiz.appendChild(quizItem);
}
