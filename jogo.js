// ─── Estado inicial do jogo ───────────────────────────────────────────────────

// Gera um número secreto aleatório entre 1 e 100
let numero = Math.floor(Math.random() * 100) + 1;

// Contador de tentativas restantes
let tentativas = 10;

// Total de tentativas permitidas (usado para calcular quantas foram usadas)
const total = 10;

// Flag que indica se o jogo terminou (vitória ou derrota)
let ended = false;

// ─── Exibe o feedback para o jogador ─────────────────────────────────────────

function showFeedback(type, text) {
  // Seleciona o container e o texto do feedback no DOM
  const el = document.getElementById("feedback");
  const tx = document.getElementById("feedback-text");

  // Aplica a classe de estilo (win, over, low, high, warn) e atualiza o texto
  el.className = "feedback " + type;
  tx.textContent = text;

  // Aguarda o próximo frame para adicionar a classe 'show',
  // garantindo que a animação de entrada seja disparada corretamente
  requestAnimationFrame(() => el.classList.add("show"));
}

// ─── Verifica o palpite do jogador ───────────────────────────────────────────

function checkGuess() {
  // Ignora qualquer ação se o jogo já tiver encerrado
  if (ended) return;

  // Lê o valor digitado no input e converte para número
  const input = document.getElementById("guess");
  const val = Number(input.value);

  // Valida se o valor está dentro do intervalo permitido (1 a 100)
  if (!val || val < 1 || val > 100) {
    showFeedback("warn", "Digite um número entre 1 e 100.");
    return;
  }

  // Consome uma tentativa antes de avaliar o palpite
  tentativas--;

  if (val === numero) {
    // Palpite correto: calcula quantas tentativas foram usadas e encerra o jogo
    const usadas = total - tentativas;
    showFeedback(
      "win",
      "Acertou em " + usadas + " tentativa" + (usadas > 1 ? "s" : "") + "!",
    );
    endGame();
  } else if (tentativas === 0) {
    // Sem tentativas restantes: revela o número e encerra o jogo
    showFeedback("over", "Fim de jogo. O número era " + numero + ".");
    endGame();
  } else if (val < numero) {
    // Palpite abaixo do número secreto: dica para tentar mais alto
    showFeedback(
      "low",
      "Muito baixo! " +
        tentativas +
        " tentativa" +
        (tentativas > 1 ? "s" : "") +
        " restante" +
        (tentativas > 1 ? "s" : "") +
        ".",
    );
  } else {
    // Palpite acima do número secreto: dica para tentar mais baixo
    showFeedback(
      "high",
      "Muito alto! " +
        tentativas +
        " tentativa" +
        (tentativas > 1 ? "s" : "") +
        " restante" +
        (tentativas > 1 ? "s" : "") +
        ".",
    );
  }

  // Limpa o input e devolve o foco para o jogador digitar o próximo palpite
  input.value = "";
  input.focus();
}

// ─── Encerra o jogo ───────────────────────────────────────────────────────────

function endGame() {
  // Marca o jogo como encerrado para bloquear novos palpites
  ended = true;

  // Desabilita o botão de envio e o campo de input
  document.getElementById("btn-send").disabled = true;
  document.getElementById("guess").disabled = true;

  // Exibe o botão de reiniciar
  document.getElementById("btn-restart").classList.add("visible");
}

// ─── Reinicia o jogo do zero ──────────────────────────────────────────────────

function restart() {
  // Sorteia um novo número secreto
  numero = Math.floor(Math.random() * 100) + 1;

  // Restaura o contador de tentativas e a flag de estado
  tentativas = 10;
  ended = false;

  // Reabilita o input e o botão de envio
  document.getElementById("guess").disabled = false;
  document.getElementById("guess").value = "";
  document.getElementById("btn-send").disabled = false;

  // Remove o feedback anterior e esconde o botão de reiniciar
  document.getElementById("feedback").className = "feedback";
  document.getElementById("btn-restart").classList.remove("visible");

  // Devolve o foco ao input para o jogador começar imediatamente
  document.getElementById("guess").focus();
}

// ─── Atalho de teclado ────────────────────────────────────────────────────────

// Permite confirmar o palpite pressionando Enter, sem precisar clicar no botão
document.getElementById("guess").addEventListener("keydown", function (e) {
  if (e.key === "Enter") checkGuess();
});
