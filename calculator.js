// calculator.js
document.addEventListener("DOMContentLoaded", () => {
const display = document.getElementById("display");
const buttonsContainer = document.getElementById("buttons-container");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const lastCalcBtn = document.getElementById("last-calc-btn");
const shortcutToggleBtn = document.getElementById("toggleShortcutsBtn");
const keyboardShortcuts = document.getElementById("keyboardShortcuts");

let lastCalculations = [];
let lastCalcIndex = -1;
let firstValue = null;

const config = {
  keys [
  'ANS', '%', '+-', '÷',
  '7', '8', '9', '×',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '<', '=', 'C'
]
};

function renderButtons() {
  buttonsContainer.innerHTML = '';
  buttonsContainer.classList.add('basic');
  buttonsContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';

  buttonsLayout.forEach(btn => {
    const button = document.createElement('button');
    button.textContent = btn;
    button.onclick = () => buttonClicked(btn);

    if (btn === 'C') {
      button.classList.add('clear-btn');
    } else if (['ANS', '+-', '%', '<'].includes(btn)) {
      button.classList.add('special-btn');
    } else if (['÷', '×', '-', '+', '='].includes(btn)) {
      button.classList.add('orange');
    } else {
      button.classList.add('number');
    }

    buttonsContainer.appendChild(button);
  });
}

function buttonClicked(value) {
  if (value === '=') {
    calculateResult();
  } else if (value === '<') {
    showPreviousCalculation();
  } else if (value === 'C') {
    result.value = '';
    firstValue = null;
  } else if (value === 'ANS') {
    if (lastCalculations.length > 0) {
      const lastAnswer = lastCalculations[lastCalculations.length - 1].split('=')[1].trim();
      result.value += lastAnswer;
    }
  } else if (value === '+-') {
    if (result.value) {
      result.value = result.value.startsWith('-')
        ? result.value.slice(1)
        : '-' + result.value;
    }
  } else if (value === '%') {
    let val = parseFloat(result.value);
    if (!isNaN(val) && result.value !== '') {
      if (firstValue === null) {
        firstValue = val;
        result.value = '';
      } else {
        result.value = ((firstValue * val) / 100).toFixed(2);
        firstValue = null;
      }
    } else {
      result.value = 'Error';
    }
  } else {
    result.value += value === '÷' ? '/' : value === '×' ? '*' : value;
  }
}

function calculateResult() {
  try {
    let expression = result.value.replace(/÷/g, '/').replace(/×/g, '*');
    expression = expression.replace(/(\d+)%/g, (match, p1) => parseFloat(p1) / 100);

    let answer = eval(expression);

    if (typeof answer === 'number' && !isNaN(answer)) {
      answer = +answer.toFixed(2);
    } else {
      throw new Error();
    }

    if (result.value !== '') {
      lastCalculations.push(result.value + ' = ' + answer);
      if (lastCalculations.length > 10) lastCalculations.shift();
      lastCalcIndex = lastCalculations.length;
    }

    result.value = answer;
  } catch {
    result.value = 'Error';
  }
}

function showPreviousCalculation() {
  if (lastCalculations.length === 0) {
    result.value = 'No last calculation';
    return;
  }
  lastCalcIndex = (lastCalcIndex - 1 + lastCalculations.length) % lastCalculations.length;
  result.value = lastCalculations[lastCalcIndex];
}
/* Add this to highlight operation buttons */
.calculator-buttons button.orange {
  background-color: orange !important;
  color: white !important;
}

// Init
renderButtons();
lastCalcBtn.style.display = 'block'; // Show lastCalcBtn
lastCalcBtn.addEventListener('click', showPreviousCalculation);

toggleDark.addEventListener('change', () => {
  document.body.classList.toggle('dark', toggleDark.checked);
});
