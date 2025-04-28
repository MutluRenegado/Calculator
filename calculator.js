const buttonsContainer = document.getElementById('buttons');
const result = document.getElementById('result');
const toggleDark = document.getElementById('toggleDark');
const togglePro = document.getElementById('togglePro');
const lastCalcBtn = document.getElementById('lastCalcBtn');

let lastCalculation = '';
let isProMode = false;

const simpleButtonsOrder = [
  ['7', '', '', '÷'],
  ['4', '', '', '×'],
  ['1', '', '', '-'],
  ['0', '', '', '+'],
  ['', '', '', '=']
];

const proExtraButtons = [
  '(', ')', 'sin', 'cos', 'tan', 'log', '√', '^'
];

// Render buttons based on mode (simple or pro)
function renderButtons() {
  buttonsContainer.innerHTML = '';

  if (!isProMode) {
    // Simple layout
    simpleButtonsOrder.forEach(row => {
      row.forEach(btn => {
        const button = document.createElement('button');
        if (btn === '') {
          button.classList.add('placeholder');
          button.textContent = '';
          button.disabled = true;
        } else {
          button.textContent = btn;
          button.onclick = () => buttonClicked(btn);
          if (btn === '=') button.classList.add('equals');
        }
        buttonsContainer.appendChild(button);
      });
    });
    buttonsContainer.classList.remove('pro');
  } else {
    // Professional mode: extra buttons + simple buttons
    buttonsContainer.classList.add('pro');
    // Combine pro buttons first
    proExtraButtons.forEach(btn => {
      const button = document.createElement('button');
      button.textContent = btn;
      button.onclick = () => buttonClicked(btn);
      buttonsContainer.appendChild(button);
    });

    // Then simple buttons flattened without placeholders
    simpleButtonsOrder.flat().forEach(btn => {
      if (btn !== '') {
        const button = document.createElement('button');
        button.textContent = btn;
        button.onclick = () => buttonClicked(btn);
        if (btn === '=') button.classList.add('equals');
        buttonsContainer.appendChild(button);
      }
    });
  }
}

// Button click handler
function buttonClicked(value) {
  if (value === '=') {
    calculateResult();
  } else if (value === '√') {
    result.value += '√(';
  } else if (['sin', 'cos', 'tan', 'log', '^', '(', ')'].includes(value)) {
    result.value += value;
  } else if (value === '÷') {
    result.value += '/';
  } else if (value === '×') {
    result.value += '*';
  } else if (value === '-') {
    result.value += '-';
  } else if (value === '+') {
    result.value += '+';
  } else {
    if (result.value === '⧸') result.value = ''; // clear default symbol on first input
    result.value += value;
  }
}

// Calculate the expression
function calculateResult() {
  try {
    let expression = result.value;

    // Replace custom functions/operators for JS eval
    expression = expression
      .replace(/√\(/g, 'Math.sqrt(')
      .replace(/\^/g, '**')
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/log/g, 'Math.log10');

    let answer = eval(expression);

    if (typeof answer === 'number') {
      answer = +answer.toFixed(8);
    }

    lastCalculation = result.value + ' = ' + answer;
    result.value = answer;
  } catch {
    result.value = 'Error';
  }
}

// Last Calculation button handler
lastCalcBtn.addEventListener('click', () => {
  if (lastCalculation) {
    result.value = lastCalculation;
  }
});

// Dark mode toggle handler
toggleDark.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', toggleDark.checked);
});

// Professional mode toggle handler
togglePro.addEventListener('change', () => {
  isProMode = togglePro.checked;
  renderButtons();
  result.value = '⧸';
  lastCalculation = '';
});

// Initial setup
renderButtons();
result.value = '⧸';
