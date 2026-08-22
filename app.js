const plants = [
  {
    name: "Ora-pro-nóbis", scientific: "Pereskia aculeata", emoji: "🌿", color: "lime",
    image: "https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/02/29/1407094676-1-ora-pro-nobis-o-que-e-e-quais-os-beneficios-para-a-saude-e-para-o-lar.jpeg",
    credit: "Imagem de referência: Terra", clue: "Um cacto com folhas",
    description: "É uma planta trepadeira da família dos cactos. Suas folhas são usadas em diferentes preparações culinárias.",
    tags: ["Folhas", "Fibras", "Horta"]
  },
  {
    name: "Capuchinha", scientific: "Tropaeolum majus", emoji: "🌼", color: "orange",
    image: "https://pergunteaoagronomo.com.br/wp-content/uploads/2023/06/Tropaeolum_majus_flower_-_North_Carolina_Extension_Gardener_Plant_Toolbox_-_NC_State_University-transformed-1068x958.jpeg",
    credit: "Imagem de referência: NC State / Pergunte ao Agrônomo", clue: "Uma flor que vai ao prato",
    description: "As flores e folhas podem ser usadas na alimentação. A flor colorida ajuda a deixar saladas mais alegres.",
    tags: ["Flores", "Cor", "Polinizadores"]
  },
  {
    name: "Peixinho-da-horta", scientific: "Stachys byzantina", emoji: "🍃", color: "silver",
    image: "https://blog.cobasi.com.br/wp-content/uploads/2021/04/Planta-peixinho-da-horta-meio.png",
    credit: "Imagem de referência: Cobasi", clue: "Folha macia e aveludada",
    description: "Tem folhas cobertas por pequenos pelos. Costuma ser preparada empanada, lembrando um peixinho frito.",
    tags: ["Folhas", "Textura", "Crocante"]
  },
  {
    name: "Beldroega", scientific: "Portulaca oleracea", emoji: "☘️", color: "yellow",
    image: "https://static.laregion.es/clip/8ad918fa-8ea2-4200-926d-5a1e5a28ff21_source-aspect-ratio_1600w_0.jpg",
    credit: "Imagem de referência: La Región", clue: "Pequena, rasteira e suculenta",
    description: "Possui folhas pequenas e carnosas. Em muitos lugares cresce espontaneamente e pode ser confundida com mato.",
    tags: ["Suculenta", "Folhas", "Diversidade"]
  },
  {
    name: "Taioba", scientific: "Xanthosoma taioba", emoji: "🍀", color: "forest",
    image: "https://agenciaminas.mg.gov.br/ckeditor_assets/pictures/7598/content_coordenadora_do_projeto_-_marinalva_-_arquivo_ascom_epamig.jpeg",
    credit: "Imagem de referência: EPAMIG / Agência Minas", clue: "Folhas grandes — atenção redobrada",
    description: "A taioba comestível exige identificação correta e preparo adequado. Existem plantas parecidas que não devem ser consumidas.",
    tags: ["Cozimento", "Cuidado", "Identificação"]
  }
];

const questions = [
  { question: "O que significa a sigla PANC?", options: ["Planta Alimentícia Não Convencional", "Produto Agrícola Natural Cultivado", "Planta Aromática Nacional Comestível"], answer: 0, explanation: "PANC significa Planta Alimentícia Não Convencional." },
  { question: "Toda planta que nasce espontaneamente no quintal pode ser comida?", options: ["Sim, se estiver bem verde", "Sim, depois de lavar", "Não. É preciso identificar a espécie com segurança"], answer: 2, explanation: "Existem plantas tóxicas e espécies muito parecidas. Nunca devemos experimentar sem identificação segura." },
  { question: "Qual PANC apresentada possui flores coloridas que podem ser usadas na alimentação?", options: ["Capuchinha", "Peixinho-da-horta", "Taioba"], answer: 0, explanation: "A capuchinha chama atenção pelas flores coloridas usadas em saladas e outras preparações." },
  { question: "Por que o peixinho-da-horta recebeu esse nome?", options: ["Porque cresce dentro d’água", "Por causa da folha e do modo como costuma ser preparado", "Porque tem cheiro de peixe"], answer: 1, explanation: "As folhas aveludadas costumam ser empanadas, ficando parecidas com pequenos peixes fritos." },
  { question: "Como as PANCs podem colaborar com a biodiversidade?", options: ["Valorizando uma variedade maior de espécies", "Fazendo todas as plantas ficarem iguais", "Substituindo todas as plantações por uma única espécie"], answer: 0, explanation: "Conhecer e cultivar diferentes espécies ajuda a valorizar a diversidade da natureza." },
  { question: "Qual é o cuidado mais importante antes de consumir taioba?", options: ["Escolher sempre a maior folha", "Identificar corretamente e fazer o preparo adequado", "Comer a folha crua para testar"], answer: 1, explanation: "A taioba precisa ser corretamente identificada e preparada. Há plantas parecidas que não devem ser consumidas." },
  { question: "Uma planta pode ser comum em uma região e considerada não convencional em outra?", options: ["Sim", "Não", "Somente se for importada"], answer: 0, explanation: "O que é convencional depende dos hábitos alimentares e da cultura de cada lugar." },
  { question: "Qual é a atitude mais segura ao encontrar uma planta desconhecida?", options: ["Provar uma folha pequena", "Pesquisar apenas pela cor", "Não consumir e pedir ajuda a alguém que saiba identificar"], answer: 2, explanation: "A aparência sozinha não basta. A identificação deve ser feita por quem realmente conhece a espécie." },
  { question: "Qual curiosidade sobre a ora-pro-nóbis é verdadeira?", options: ["É uma planta da família dos cactos", "É uma planta aquática", "Só existe fora do Brasil"], answer: 0, explanation: "Apesar das folhas, a ora-pro-nóbis pertence à família dos cactos." },
  { question: "Além da alimentação, estudar PANCs ajuda a conhecer…", options: ["Apenas nomes científicos", "A biodiversidade e os saberes culturais", "Somente plantas vendidas em supermercados"], answer: 1, explanation: "As PANCs aproximam ciência, biodiversidade, cultura e conhecimentos transmitidos entre gerações." }
];

let quizState = "start";
let questionIndex = 0;
let selectedAnswer = null;
let score = 0;
let bestScore = Number(localStorage.getItem("panc-quest-best") || 0);

function renderPlants() {
  document.querySelector("#plant-grid").innerHTML = plants.map((plant, index) => `
    <article class="plant-card ${plant.color}">
      <div class="plant-image-wrap">
        <img src="${plant.image}" alt="Imagem de referência de ${plant.name}" loading="${index > 1 ? "lazy" : "eager"}" />
        <span class="plant-number">0${index + 1}</span><span class="plant-emoji">${plant.emoji}</span>
      </div>
      <div class="plant-content">
        <span class="plant-clue">${plant.clue}</span><h3>${plant.name}</h3><i>${plant.scientific}</i>
        <p>${plant.description}</p>
        <div class="tag-row">${plant.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
        <small class="image-credit">${plant.credit}</small>
      </div>
    </article>`).join("");
}

function renderBestScore() {
  document.querySelector("#best-score").textContent = `${bestScore}/10`;
}

function renderQuiz() {
  const shell = document.querySelector("#quiz-shell");
  if (quizState === "start") {
    shell.innerHTML = `<div class="quiz-start"><span class="quiz-main-icon">🧠</span><p class="quiz-label">DESAFIO PANC</p><h3>Pronto para jogar?</h3><p>Você receberá a explicação logo depois de cada resposta.</p><button class="start-button" id="start-quiz">Começar o quiz <span>→</span></button><small>Leva cerca de 3 minutos</small></div>`;
    document.querySelector("#start-quiz").addEventListener("click", startQuiz);
    return;
  }

  if (quizState === "result") {
    const result = score <= 3
      ? { emoji: "🌱", title: "Explorador iniciante", text: "Toda grande descoberta começa com uma pequena semente. Explore as fichas e tente novamente!" }
      : score <= 7
        ? { emoji: "🌿", title: "Conhecedor da natureza", text: "Muito bem! Você já sabe reconhecer ideias importantes sobre PANCs e biodiversidade." }
        : { emoji: "🏆", title: "Especialista em PANCs", text: "Excelente! Você mostrou atenção, curiosidade científica e cuidado com a natureza." };
    shell.innerHTML = `<div class="quiz-result"><span class="result-emoji">${result.emoji}</span><p class="quiz-label">RESULTADO FINAL</p><div class="result-score"><strong>${score}</strong><span>/10</span></div><h3>${result.title}</h3><p>${result.text}</p><button class="start-button" id="restart-quiz">Jogar novamente ↻</button></div>`;
    document.querySelector("#restart-quiz").addEventListener("click", startQuiz);
    return;
  }

  const item = questions[questionIndex];
  shell.innerHTML = `
    <div class="quiz-playing">
      <div class="progress-row"><span>Pergunta ${questionIndex + 1} de ${questions.length}</span><strong>${score} acerto${score === 1 ? "" : "s"}</strong></div>
      <div class="progress-track"><span style="width:${((questionIndex + 1) / questions.length) * 100}%"></span></div>
      <h3>${item.question}</h3>
      <div class="answer-list">${item.options.map((option, index) => {
        const isCorrect = index === item.answer;
        const isSelected = index === selectedAnswer;
        const status = selectedAnswer === null ? "" : isCorrect ? "correct" : isSelected ? "wrong" : "dimmed";
        const marker = selectedAnswer !== null && isCorrect ? "<b>✓</b>" : selectedAnswer !== null && isSelected ? "<b>×</b>" : "";
        return `<button class="answer-button ${status}" data-answer="${index}" ${selectedAnswer !== null ? "disabled" : ""}><span>${String.fromCharCode(65 + index)}</span>${option}${marker}</button>`;
      }).join("")}</div>
      ${selectedAnswer === null ? "" : `<div class="feedback ${selectedAnswer === item.answer ? "good" : "try"}"><strong>${selectedAnswer === item.answer ? "Boa! Resposta correta." : "Quase! Vamos aprender."}</strong><p>${item.explanation}</p><button id="next-question">${questionIndex === questions.length - 1 ? "Ver meu resultado" : "Próxima pergunta"} →</button></div>`}
    </div>`;

  document.querySelectorAll("[data-answer]").forEach((button) => button.addEventListener("click", () => chooseAnswer(Number(button.dataset.answer))));
  document.querySelector("#next-question")?.addEventListener("click", nextQuestion);
}

function startQuiz() {
  quizState = "playing";
  questionIndex = 0;
  selectedAnswer = null;
  score = 0;
  renderQuiz();
}

function chooseAnswer(index) {
  if (selectedAnswer !== null) return;
  selectedAnswer = index;
  if (index === questions[questionIndex].answer) score += 1;
  renderQuiz();
}

function nextQuestion() {
  if (questionIndex < questions.length - 1) {
    questionIndex += 1;
    selectedAnswer = null;
    renderQuiz();
    return;
  }
  quizState = "result";
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("panc-quest-best", String(score));
    renderBestScore();
  }
  renderQuiz();
}

renderPlants();
renderBestScore();
renderQuiz();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js").catch(() => undefined);
}
