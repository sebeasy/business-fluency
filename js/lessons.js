function checkAnswers() {
  const inputs = document.querySelectorAll('.gap');
  let correctCount = 0;

  inputs.forEach(input => {
    if (!input.dataset.answer) return;

    const correctAnswers = input.dataset.answer
      .toLowerCase()
      .split(',')
      .map(a => a.trim());

    const clean = str =>
      str.toLowerCase().trim().replace(/^the\s+/, '');

    const user = clean(input.value);

    const isCorrect = correctAnswers.some(a => clean(a) === user);

    const feedback = input.parentElement.querySelector('.feedback');

    if (isCorrect) {
      correctCount++;
      input.classList.add('correct');
      input.classList.remove('incorrect');
      if (feedback) feedback.textContent = "✅ Correct";
    } else {
      input.classList.add('incorrect');
      input.classList.remove('correct');
      if (feedback) feedback.textContent = "❌ Incorrect";
    }
  });

  const scoreEl = document.getElementById("score");
  if (scoreEl) {
    const percentage = Math.round((correctCount / inputs.length) * 100);

    let message = "";
    if (percentage === 100) message = " Perfect!";
    else if (percentage >= 80) message = " Well done!";
    else if (percentage >= 60) message = " Good effort!";
    else message = " Try again!";

    scoreEl.textContent =
      `Score: ${correctCount} / ${inputs.length} (${percentage}%) — ${message}`;
  }
}

function showAnswers() {
  const inputs = document.querySelectorAll('.gap');

  inputs.forEach(input => {
    input.value = input.dataset.answer;
    input.classList.remove('incorrect');
    input.classList.add('correct');

    const feedback = input.parentElement.querySelector('.feedback');
    if (feedback) feedback.textContent = "✅";
  });

  const scoreEl = document.getElementById("score");
  if (scoreEl) {
    scoreEl.textContent = `Score: ${inputs.length} / ${inputs.length} (100%) — Perfect!`;
  }
}

function resetAnswers() {
  const inputs = document.querySelectorAll('.gap');

  inputs.forEach(input => {
    input.value = "";
    input.classList.remove('correct', 'incorrect');

    const feedback = input.parentElement.querySelector('.feedback');
    if (feedback) feedback.textContent = "";
  });

  const scoreEl = document.getElementById("score");
  if (scoreEl) scoreEl.textContent = "";

  const firstInput = document.querySelector('.gap');
  if (firstInput) firstInput.focus();
}