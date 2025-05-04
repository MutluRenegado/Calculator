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
    keys: [
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

    config.keys.forEach(btn => {
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
      display.value = '';
      firstValue = null;
    } else if (value === 'ANS') {
      if (lastCalculations.length > 0) {
        const lastAnswer = lastCalculations[lastCalculations.length - 1].split('=')[1].trim();
        display.value += lastAnswer;
      }
    } else if (value === '+-') {
      if (display.value) {
        display.value = display.value.startsWith('-')
          ? display.value.slice(1)
          : '-' + display.value;
      }
    } else if (value === '%') {
      let val = parseFloat(display.value);
      if (!isNaN(val) && display.value !== '') {
        if (firstValue === null) {
          firstValue = val;
          display.value = '';
        } else {
          display.value = ((firstValue * val) / 100).toFixed(2);
          firstValue = null;
        }
      } else {
        display.value = 'Error';
      }
    } else {
      display.value += value === '÷' ? '/' : value === '×' ? '*' : value;
    }
  }

  function calculateResult() {
    try {
      let expression = display.value.replace(/÷/g, '/').replace(/×/g, '*');
      expression = expression.replace(/(\d+)%/g, (match, p1) => parseFloat(p1) / 100);

      let answer = eval(expression);

      if (typeof answer === 'number' && !isNaN(answer)) {
        answer = +answer.toFixed(2);
      } else {
        throw new Error();
      }

      if (display.value !== '') {
        lastCalculations.push(display.value + ' = ' + answer);
        if (lastCalculations.length > 10) lastCalculations.shift();
        lastCalcIndex = lastCalculations.length;
      }

      display.value = answer;
    } catch {
      display.value = 'Error';
    }
  }

  function showPreviousCalculation() {
    if (lastCalculations.length === 0) {
      display.value = 'No last calculation';
      return;
    }
    lastCalcIndex = (lastCalcIndex - 1 + lastCalculations.length) % lastCalculations.length;
    display.value = lastCalculations[lastCalcIndex];
  }

  // Init
  renderButtons();
  lastCalcBtn.style.display = 'block';
  lastCalcBtn.addEventListener('click', showPreviousCalculation);

  darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark', darkModeToggle.checked);
  });
});
