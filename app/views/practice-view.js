function renderPracticeSampleText(expected, index) {
  const doneText = expected.slice(0, index);
  const currentText = expected[index] || "";
  const restText = expected.slice(index + (currentText ? 1 : 0));

  practiceSample.innerHTML = "";

  const done = document.createElement("span");
  done.className = "practice-sample-done";
  done.textContent = doneText;

  const current = document.createElement("span");
  current.className = "practice-sample-current";
  current.textContent = currentText;

  const rest = document.createElement("span");
  rest.className = "practice-sample-rest";
  rest.textContent = restText;

  practiceSample.append(done, current, rest);
}

function setPracticeInputError(isError) {
  practiceInput.classList.toggle("error", Boolean(isError));
}

function resetPracticeInputValue() {
  practiceInput.value = "";
  setPracticeInputError(false);
}

function renderPracticeGuides(fingerId) {
  document.querySelectorAll(".finger[data-finger]").forEach(node => {
    node.classList.toggle("finger-lit", node.dataset.finger === fingerId);
  });
}
