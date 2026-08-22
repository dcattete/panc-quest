const plants = [
  {
    name: "Ora-pro-nóbis", scientific: "Pereskia aculeata", emoji: "🌿", color: "lime",
    image: "./ora-pro-nobis.jpg",
    credit: "Imagem de referência: Terra", clue: "Um cacto com folhas",
    description: "É uma planta trepadeira da família dos cactos. Suas folhas são usadas em diferentes preparações culinárias.",
    tags: ["Folhas", "Fibras", "Horta"]
  },
  {
    name: "Capuchinha", scientific: "Tropaeolum majus", emoji: "🌼", color: "orange",
    image: "./capuchinha.jpg",
    credit: "Imagem de referência: NC State / Pergunte ao Agrônomo", clue: "Uma flor que vai ao prato",
    description: "As flores e folhas podem ser usadas na alimentação. A flor colorida ajuda a deixar saladas mais alegres.",
    tags: ["Flores", "Cor", "Polinizadores"]
  },
  {
    name: "Peixinho-da-horta", scientific: "Stachys byzantina", emoji: "🍃", color: "silver",
    image: "./peixinho-da-horta.jpg",
    credit: "Imagem de referência: Cobasi", clue: "Folha macia e aveludada",
    description: "Tem folhas cobertas por pequenos pelos. Costuma ser preparada empanada, lembrando um peixinho frito.",
    tags: ["Folhas", "Textura", "Crocante"]
  },
  {
    name: "Beldroega", scientific: "Portulaca oleracea", emoji: "☘️", color: "yellow",
    image: "./beldroega.jpg",
    credit: "Imagem de referência: La Región", clue: "Pequena, rasteira e suculenta",
    description: "Possui folhas pequenas e carnosas. Em muitos lugares cresce espontaneamente e pode ser confundida com mato.",
    tags: ["Suculenta", "Folhas", "Diversidade"]
  },
  {
    name: "Taioba", scientific: "Xanthosoma taioba", emoji: "🍀", color: "forest",
    image: "./taioba.jpg",
    credit: "Foto: Davillis / Wikimedia Commons (CC BY-SA 4.0)",
    creditHref: "https://commons.wikimedia.org/wiki/File:Taioba.jpg", clue: "Folhas grandes — atenção redobrada",
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

let matchState = "start";
let matchScore = 0;
let matchBestScore = Number(localStorage.getItem("panc-match-best") || 0);
let matchSelectedPlant = null;
let matchNameOrder = [];
let matchImageOrder = [];
let matchStreak = 0;
let matchBonusAwarded = false;
let matchMessage = { tone: "neutral", text: "Escolha primeiro um nome e depois uma fotografia." };
let matchedPlants = new Set();
let matchMistakes = {};

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
        <small class="image-credit">${plant.creditHref ? `<a href="${plant.creditHref}" target="_blank" rel="noopener noreferrer">${plant.credit}</a>` : plant.credit}</small>
      </div>
    </article>`).join("");
}

function renderBestScore() {
  document.querySelector("#best-score").textContent = `${bestScore}/10`;
}

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

function renderMatchBestScore() {
  document.querySelector("#match-best-score").textContent = `${matchBestScore} pontos`;
}

function renderMatchGame() {
  const shell = document.querySelector("#match-shell");

  if (matchState === "start") {
    shell.innerHTML = `
      <div class="match-start">
        <span class="match-main-icon">🔎</span>
        <p class="quiz-label">MISSÃO BOTÂNICA</p>
        <h3>Encontre os cinco pares</h3>
        <p>Não precisa arrastar: toque em um nome e depois na imagem que você acha correta.</p>
        <div class="match-score-rules">
          <span><strong>+100</strong> primeira tentativa</span>
          <span><strong>+70</strong> depois de uma dica</span>
          <span><strong>+50</strong> sequência de 3</span>
        </div>
        <button class="start-button" id="start-match">Começar o jogo <span>→</span></button>
      </div>`;
    document.querySelector("#start-match").addEventListener("click", startMatchGame);
    return;
  }

  if (matchState === "result") {
    const result = matchScore <= 380
      ? { emoji: "🌱", title: "Aprendiz da horta", text: "Você encontrou todos os pares e já começou a reconhecer as PANCs!" }
      : matchScore <= 480
        ? { emoji: "🌿", title: "Detetive das PANCs", text: "Ótimo olhar! Você percebeu detalhes importantes nas folhas e flores." }
        : { emoji: "🏆", title: "Mestre das PANCs", text: "Incrível! Você conectou nomes e imagens com muita atenção." };
    shell.innerHTML = `
      <div class="match-result">
        <span class="result-emoji">${result.emoji}</span>
        <p class="quiz-label">TODAS CONECTADAS!</p>
        <div class="match-result-score"><strong>${matchScore}</strong><span>pontos</span></div>
        <h3>${result.title}</h3>
        <p>${result.text}</p>
        <button class="start-button" id="restart-match">Embaralhar e jogar de novo ↻</button>
      </div>`;
    document.querySelector("#restart-match").addEventListener("click", startMatchGame);
    return;
  }

  shell.innerHTML = `
    <div class="match-playing">
      <div class="match-progress-row">
        <span><strong>${matchedPlants.size}</strong> de ${plants.length} pares encontrados</span>
        <strong>${matchScore} pontos</strong>
      </div>
      <div class="progress-track"><span style="width:${(matchedPlants.size / plants.length) * 100}%"></span></div>
      <div class="match-message ${matchMessage.tone}" role="status">${matchMessage.text}</div>
      <div class="match-board" id="match-board">
        <div class="match-column match-names">
          <span class="match-column-label">Nomes das PANCs</span>
          ${matchNameOrder.map((plantIndex) => {
            const plant = plants[plantIndex];
            const isMatched = matchedPlants.has(plantIndex);
            const isSelected = matchSelectedPlant === plantIndex;
            return `<button class="match-name-card ${isMatched ? "matched" : ""} ${isSelected ? "selected" : ""}" data-match-name="${plantIndex}" ${isMatched ? "disabled" : ""}><span>${plant.emoji}</span><strong>${plant.name}</strong>${isMatched ? "<b>✓</b>" : ""}</button>`;
          }).join("")}
        </div>
        <div class="match-column match-images">
          <span class="match-column-label">Fotografias</span>
          ${matchImageOrder.map((plantIndex) => {
            const plant = plants[plantIndex];
            const isMatched = matchedPlants.has(plantIndex);
            return `<button class="match-image-card ${isMatched ? "matched" : ""}" data-match-image="${plantIndex}" ${isMatched ? "disabled" : ""} aria-label="Escolher esta fotografia"><img src="${plant.image}" alt="Fotografia para identificar" />${isMatched ? "<span class=\"match-check\">✓</span>" : ""}</button>`;
          }).join("")}
        </div>
        <svg class="match-vines" id="match-vines" aria-hidden="true"></svg>
      </div>
    </div>`;

  document.querySelectorAll("[data-match-name]").forEach((button) => button.addEventListener("click", () => chooseMatchName(Number(button.dataset.matchName))));
  document.querySelectorAll("[data-match-image]").forEach((button) => button.addEventListener("click", () => chooseMatchImage(Number(button.dataset.matchImage))));
  requestAnimationFrame(drawMatchVines);
}

function startMatchGame() {
  const indexes = plants.map((_, index) => index);
  matchState = "playing";
  matchScore = 0;
  matchSelectedPlant = null;
  matchNameOrder = shuffle(indexes);
  matchImageOrder = shuffle(indexes);
  matchStreak = 0;
  matchBonusAwarded = false;
  matchMessage = { tone: "neutral", text: "Escolha primeiro um nome e depois uma fotografia." };
  matchedPlants = new Set();
  matchMistakes = {};
  renderMatchGame();
}

function chooseMatchName(plantIndex) {
  if (matchedPlants.has(plantIndex)) return;
  matchSelectedPlant = plantIndex;
  matchMessage = { tone: "selected", text: `Agora escolha a fotografia de <strong>${plants[plantIndex].name}</strong>.` };
  renderMatchGame();
}

function chooseMatchImage(plantIndex) {
  if (matchSelectedPlant === null) {
    matchMessage = { tone: "try", text: "Primeiro escolha um nome na coluna da esquerda." };
    renderMatchGame();
    return;
  }

  const selectedPlant = matchSelectedPlant;
  if (selectedPlant !== plantIndex) {
    matchMistakes[selectedPlant] = true;
    matchStreak = 0;
    matchMessage = { tone: "try", text: `Quase! Dica sobre <strong>${plants[selectedPlant].name}</strong>: ${plants[selectedPlant].clue.toLowerCase()}.` };
    renderMatchGame();
    return;
  }

  const firstTry = !matchMistakes[selectedPlant];
  const earnedPoints = firstTry ? 100 : 70;
  let bonus = 0;
  if (firstTry) {
    matchStreak += 1;
    if (matchStreak === 3 && !matchBonusAwarded) {
      bonus = 50;
      matchBonusAwarded = true;
    }
  } else {
    matchStreak = 0;
  }

  matchedPlants.add(selectedPlant);
  matchSelectedPlant = null;
  matchScore += earnedPoints + bonus;
  matchMessage = {
    tone: "good",
    text: `Conexão correta! <strong>+${earnedPoints}${bonus ? ` + ${bonus} de bônus` : ""} pontos.</strong> ${plants[selectedPlant].description}`
  };
  renderMatchGame();

  if (matchedPlants.size === plants.length) {
    if (matchScore > matchBestScore) {
      matchBestScore = matchScore;
      localStorage.setItem("panc-match-best", String(matchBestScore));
      renderMatchBestScore();
    }
    window.setTimeout(() => {
      matchState = "result";
      renderMatchGame();
    }, 850);
  }
}

function drawMatchVines() {
  if (matchState !== "playing") return;
  const board = document.querySelector("#match-board");
  const vines = document.querySelector("#match-vines");
  if (!board || !vines) return;

  const boardRect = board.getBoundingClientRect();
  vines.setAttribute("viewBox", `0 0 ${boardRect.width} ${boardRect.height}`);
  vines.replaceChildren();

  matchedPlants.forEach((plantIndex) => {
    const nameCard = board.querySelector(`[data-match-name="${plantIndex}"]`);
    const imageCard = board.querySelector(`[data-match-image="${plantIndex}"]`);
    if (!nameCard || !imageCard) return;

    const nameRect = nameCard.getBoundingClientRect();
    const imageRect = imageCard.getBoundingClientRect();
    const x1 = nameRect.right - boardRect.left;
    const y1 = nameRect.top + nameRect.height / 2 - boardRect.top;
    const x2 = imageRect.left - boardRect.left;
    const y2 = imageRect.top + imageRect.height / 2 - boardRect.top;
    const middle = (x1 + x2) / 2;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${x1} ${y1} C ${middle} ${y1}, ${middle} ${y2}, ${x2} ${y2}`);
    path.setAttribute("class", "match-vine-path");
    vines.appendChild(path);
  });
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
renderMatchBestScore();
renderMatchGame();
renderQuiz();

window.addEventListener("resize", () => requestAnimationFrame(drawMatchVines));

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js").catch(() => undefined);
}
