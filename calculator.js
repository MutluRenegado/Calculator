const buttonsContainer = document.getElementById('buttons');
const result = document.getElementById('result');
const toggleDark = document.getElementById('toggleDark');
const lastCalcBtn = document.getElementById('lastCalcBtn');
const clearBtn = document.getElementById('clearBtn');

let lastCalculations = [];
let lastCalcIndex = -1;
let firstValue = null; // To store the first value for percentage calculation

const buttonsLayout = [
  ['C', 'ANS', '+-', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '=', '<']
];

function renderButtons() {
  buttonsContainer.innerHTML = '';
  buttonsContainer.classList.add('basic');
  buttonsContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';

  buttonsLayout.forEach((row, rowIndex) => {
    row.forEach((btn, colIndex) => {
      const button = document.createElement('button');
      button.textContent = btn;
      button.onclick = () => buttonClicked(btn);

      if (btn === 'C') {
        button.classList.add('clear-btn');
        button.style.gridColumn = 'span 4';
      }

      if (btn === 'ANS' || btn === '+-' || btn === '%' || btn === '<') {
        button.classList.add('special-btn');
      } else if (btn === '÷' || btn === '×' || btn === '-' || btn === '+' || btn === '=') {
        if (btn === '=') {
          button.classList.add('equals');
        } else {
          button.classList.add('main-func');
        }
      } else {
        button.classList.add('number');
      }

      if ((rowIndex === 0 || colIndex === row.length - 1) && (btn !== 'C')) {
        button.classList.add('lightning');
      }

      buttonsContainer.appendChild(button);
    });
  });
}

function buttonClicked(value) {
  if (value === '=') {
    calculateResult();
  } else if (value === '<') {
    showPreviousCalculation();
  } else if (value === 'C') {
    result.value = '';
    firstValue = null; // Reset first value when cleared
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
        // First number entered, so store it as first value
        firstValue = val;
        result.value = '';
      } else {
        // Calculate percentage based on second number entered
        result.value = (firstValue * val / 100).toString(); // Calculate percentage
        firstValue = null; // Reset after calculation
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
    expression = expression.replace(/(\d+)%/g, (match, p1) => (parseFloat(p1) / 100));

    let answer = eval(expression);
    if (typeof answer === 'number') {
      answer = +answer.toFixed(8);
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

lastCalcBtn.style.display = 'none';

toggleDark.addEventListener('change', () => {
  document.body.classList.toggle('dark', toggleDark.checked);
});

const keyboardShortcutsBtn = document.getElementById('keyboardShortcutsBtn');
keyboardShortcutsBtn.addEventListener('click', () => {
  window.open('public/keyboard-shortcuts.html', '_blank');
});

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if ((key >= '0' && key <= '9') || key === '.') {
    result.value += key;
  } else if (key === 'Enter' || key === '=') {
    calculateResult();
  } else if (key === 'Backspace') {
    result.value = result.value.slice(0, -1);
  } else if (key === 'Escape' || key.toLowerCase() === 'c') {
    result.value = '';
    firstValue = null; // Reset first value
  } else if (['+', '-', '*', '/'].includes(key)) {
    let symbol = key === '*' ? '×' : key === '/' ? '÷' : key;
    result.value += symbol;
  } else if (key === '%') {
    buttonClicked('%');
  }
});

renderButtons();
