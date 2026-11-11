/* ===================================================
   LÓGICA INTERACTIVA - ECO-RECICLA (QUIZ Y FORMULARIO)
   =================================================== */

// Banco de preguntas para niños de primaria
const quizData = [
  {
    question: "¿En qué caneca debes depositar la cáscara de mango o de plátano de tu refrigerio?",
    options: [
      { text: "Caneca Verde (Orgánicos)", correct: true },
      { text: "Caneca Azul (Papel y Cartón)", correct: false },
      { text: "Caneca Amarilla (Plásticos)", correct: false },
      { text: "Caneca Café (Vidrio)", correct: false }
    ],
    explanation: "¡Excelente! Las cáscaras y sobras de comida son residuos orgánicos biodegradables."
  },
  {
    question: "¿Dónde se debe depositar una botella plástica de gaseosa o jugo?",
    options: [
      { text: "Caneca Café (Vidrio)", correct: false },
      { text: "Caneca Amarilla (Plásticos)", correct: true },
      { text: "Al caño o al piso", correct: false },
      { text: "Caneca Verde (Orgánicos)", correct: false }
    ],
    explanation: "¡Muy bien! Las botellas plásticas van en la caneca amarilla para poder ser recicladas."
  },
  {
    question: "¿Por qué no debemos tirar los residuos cerca del caño de la comunidad?",
    options: [
      { text: "Porque se contamina el agua y causa malos olores y mosquitos", correct: true },
      { text: "Porque el agua se lleva la basura y desaparece sola", correct: false },
      { text: "No importa dónde se tire la basura", correct: false }
    ],
    explanation: "¡Exacto! Cuidar el canal natural protege la salud y la convivencia de todos los vecinos."
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("quiz-question");
const optionsEl = document.getElementById("quiz-options");
const progressEl = document.getElementById("quiz-progress");
const scoreEl = document.getElementById("quiz-score");
const feedbackEl = document.getElementById("quiz-feedback");
const nextBtn = document.getElementById("quiz-next-btn");

function loadQuestion() {
  const current = quizData[currentQuestion];
  progressEl.textContent = `Pregunta ${currentQuestion + 1} de ${quizData.length}`;
  questionEl.textContent = current.question;
  optionsEl.innerHTML = "";
  feedbackEl.className = "hidden";
  nextBtn.classList.add("hidden");

  current.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "w-full text-left p-3.5 rounded-2xl border-2 border-slate-200 text-sm font-semibold text-slate-700 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all";
    btn.textContent = `${String.fromCharCode(65 + idx)}. ${opt.text}`;
    btn.onclick = () => selectOption(opt, btn);
    optionsEl.appendChild(btn);
  });
}

function selectOption(option, button) {
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(b => b.disabled = true);

  feedbackEl.classList.remove("hidden");
  if (option.correct) {
    score += 10;
    scoreEl.textContent = `Puntaje: ${score}`;
    button.classList.remove("border-slate-200");
    button.classList.add("border-emerald-600", "bg-emerald-100", "text-emerald-900");
    feedbackEl.className = "p-4 rounded-2xl mb-6 text-sm font-bold bg-emerald-100 text-emerald-800 border border-emerald-300";
    feedbackEl.textContent = "✅ " + quizData[currentQuestion].explanation;
  } else {
    button.classList.remove("border-slate-200");
    button.classList.add("border-rose-500", "bg-rose-50", "text-rose-900");
    feedbackEl.className = "p-4 rounded-2xl mb-6 text-sm font-bold bg-amber-50 text-amber-900 border border-amber-300";
    feedbackEl.textContent = "💡 ¡Piénsalo de nuevo! " + quizData[currentQuestion].explanation;
  }

  nextBtn.classList.remove("hidden");
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showFinalResults();
  }
};

function showFinalResults() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = `
    <div class="text-center py-8">
      <span class="text-6xl block mb-4">🏆</span>
      <h3 class="brand-font text-3xl text-emerald-800 mb-2">¡Felicitaciones, Guardián Ambiental!</h3>
      <p class="text-slate-600 text-base mb-4 font-semibold">Has completado el Eco-Quiz.</p>
      <div class="inline-block bg-emerald-100 text-emerald-900 font-extrabold text-2xl px-6 py-3 rounded-2xl mb-6 border border-emerald-300">
        Puntaje Final: ${score} / ${quizData.length * 10}
      </div>
      <div>
        <button onclick="location.reload()" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-2xl shadow transition-transform hover:scale-105">
          Jugar de Nuevo 🔄
        </button>
      </div>
    </div>
  `;
}

// Iniciar Quiz
if (questionEl) {
  loadQuestion();
}

// Manejo del formulario de contacto
const contactForm = document.getElementById("contact-form");
const contactSuccess = document.getElementById("contact-success");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    contactSuccess.classList.remove("hidden");
    contactForm.reset();
    setTimeout(() => {
      contactSuccess.classList.add("hidden");
    }, 6000);
  });
}
