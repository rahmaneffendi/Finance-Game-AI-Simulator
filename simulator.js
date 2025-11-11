let currentStep = 0;
let score = 0;

const steps = [
  {
    text: "Kamu belum memiliki modal. Apa yang akan kamu lakukan?",
    choices: [
      { text: "Meminjam di Amartha dengan perjanjian resmi", correct: true, feedback: "Langkah bijak, kamu mendapatkan pendampingan bisnis juga." },
      { text: "Meminjam ke teman tanpa perjanjian", correct: false, feedback: "Tanpa perjanjian bisa menimbulkan masalah di kemudian hari." },
      { text: "Menggadaikan barang tanpa rencana", correct: false, feedback: "Berisiko kehilangan aset tanpa arah jelas." }
    ]
  },
  {
    text: "Kamu telah menerima dana pinjaman. Apa langkah pertama?",
    choices: [
      { text: "Membeli ikan segar di pasar nelayan", correct: true, feedback: "Bagus! Kamu memutar modal untuk menghasilkan." },
      { text: "Beli peralatan mahal dulu", correct: false, feedback: "Peralatan penting, tapi fokus dulu ke arus kas." },
      { text: "Gunakan uang untuk keperluan pribadi", correct: false, feedback: "Dana usaha sebaiknya tidak digunakan pribadi." }
    ]
  },
  // ... tambahkan hingga langkah ke-8
];

function loadStep() {
  if (currentStep >= steps.length) return showResult();

  const step = steps[currentStep];
  document.getElementById("text").innerText = step.text;
  document.getElementById("controls").innerHTML = step.choices.map((c, i) => 
    `<button onclick="choose(${i})">${c.text}</button>`
  ).join("");

  document.getElementById("progress-bar").style.width = `${(currentStep / steps.length) * 100}%`;
}

function choose(index) {
  const step = steps[currentStep];
  const choice = step.choices[index];

  if (choice.correct) score += 10;
  showAdvisor(choice.feedback);

  currentStep++;
  setTimeout(loadStep, 1000);
}

function showAdvisor(message) {
  document.getElementById("advisor-text").innerText = message;
  document.getElementById("advisor").classList.remove("hidden");
}

function closeAdvisor() {
  document.getElementById("advisor").classList.add("hidden");
}

function showResult() {
  const text = `
    🎉 Simulasi selesai!<br>
    Skor Literasi: ${score}/80<br>
    Kamu sudah membuat keputusan bijak di ${score / 10} langkah dari 8!<br><br>
    <button onclick="restart()">Main Lagi</button>
  `;
  document.getElementById("text").innerHTML = text;
  document.getElementById("controls").innerHTML = "";
  document.getElementById("progress-bar").style.width = "100%";
}

function restart() {
  currentStep = 0;
  score = 0;
  loadStep();
}

loadStep();
