// Gera um número aleatório entre 1 e 100
let numeroAleatorio = Math.floor(Math.random() * 100) + 1;

// Define o número máximo de tentativas
let tentativas = 10;

function checkGuess() {
  tentativas--; // Reduz o número de tentativas

  // Obtém os elementos do input e da mensagem de feedback
  const inputElement = document.getElementById("guess");
  const feedbackElement = document.getElementById("feedback");

  // Obtém o palpite do usuário e converte para número
  const guess = Number(inputElement.value);

  // Verifica se o palpite está correto
  if (guess === numeroAleatorio) {
    feedbackElement.innerHTML = "Parabéns, voçe acertou!"; // Mensagem de acerto
    feedbackElement.style.color = "green"; // Cor verde
    tentativas = 0; // Encerra o jogo
  } else if (guess < numeroAleatorio) {
    // Se o palpite for menor, informa ao usuário
    feedbackElement.innerHTML = `Muito baixo! Tente de novo. ${tentativas} tentativas restantes.`;
    feedbackElement.style.color = "red"; // Cor vermelha
  } else {
    // Se o palpite for maior, informa ao usuário
    feedbackElement.innerHTML = `Muito alto! Tente de novo. ${tentativas} tentativas restantes.`;
    feedbackElement.style.color = "red"; // Cor vermelha
  }

  // Se as tentativas acabarem e o usuário não acertou
  if (tentativas === 0 && guess !== numeroAleatorio) {
    feedbackElement.innerHTML = `Fim de jogo. O número era ${numeroAleatorio}.`; // Mostra o número correto
    feedbackElement.style.color = "red"; // Cor vermelha
  }
}
