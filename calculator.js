const buttonsContainer = document.getElementById('buttons');
const result = document.getElementById('result');
const toggleDark = document.getElementById('toggleDark');
const clearBtn = document.getElementById('clearBtn');

let lastCalculations = [];
let lastCalcIndex = -1;

const buttonsLayout = [
  ['ANS', '+-', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '=', '<']
];

function renderButtons() {
  buttonsContainer.innerHTML = '';
  buttonsContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';

  buttonsLayout.forEach(row => {
    row.forEach(btn => {
      const button = document.createElement('button');
      button.textContent = btn;
      button.onclick = () => buttonClicked(btn);

      if (['ANS', '+-', '%', '<'].includes(btn)) {
        button.classList.add('special-btn');
      } else if (['÷', '×', '-', '+', '='].includes(btn)) {
        button.classList.add(btn === '=' ? 'equals' : 'main-func');
      } else {
        button.classList.add('number');
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
  } else if (value === 'ANS') {
    if (lastCalculations.length > 0) {
      const lastAnswer = lastCalculations[lastCalculations.length - 1].split('=')[1].trim();
      result.value += lastAnswer;
    }
  } else if (value === '+-') {
    result.value = result.value.startsWith('-') ? result.value.slice(1) : '-' + result.value;
  } else if (value === '%') {
    let val = parseFloat(result.value);
    if (!isNaN(val)) result.value = (val / 100).toString();
  } else {
    result.value += value === '÷' ? '/' : value === '×' ? '*' : value;
  }
}

function calculateResult() {
  try {
    let expression = result.value.replace(/÷/g, '/').replace(/×/g, '*');
    let answer = eval(expression);
    answer = +answer.toFixed(8);
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

clearBtn.addEventListener('click', () => {
  result.value = '';
});

toggleDark.addEventListener('change', () => {
  document.body.classList.toggle('dark', toggleDark.checked);
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
  } else if (['+', '-', '*', '/'].includes(key)) {
    let symbol = key === '*' ? '×' : key === '/' ? '÷' : key;
    result.value += symbol;
  } else if (key === '%') {
    buttonClicked('%');
  }
});

renderButtons();
