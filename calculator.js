git pullconst buttonsContainer = document.getElementById('buttons');
const result = document.getElementById('result');
const toggleDark = document.getElementById('toggleDark');
const togglePro = document.getElementById('togglePro');
const lastCalcBtn = document.getElementById('lastCalcBtn');
const clearBtn = document.getElementById('clearBtn');

let lastCalculations = [];
let lastCalcIndex = -1;

const buttonsLayout = [
  ['C', '+-', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '<', '=']
];

function renderButtons() {
  buttonsContainer.innerHTML = '';
  buttonsContainer.classList.add('basic');
  buttonsContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';

  buttonsLayout.forEach(row => {
    row.forEach(btn => {
      const button = document.createElement('button');
      button.textContent = btn;
      button.onclick = () => buttonClicked(btn);

      // Assign classes for colors
      if (btn === 'C' || btn === '+-' || btn === '%' || btn === '<') {
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
  } else if (value === '+-') {
    if (result.value) {
      if (result.value.startsWith('-')) {
        result.value = result.value.slice(1);
      } else {
        result.value = '-' + result.value;
      }
    }
  } else if (value === '%') {
    if (result.value) {
      let val = parseFloat(result.value);
      if (!isNaN(val)) {
        result.value = (val / 100).toString();
      }
    }
  } else {
    if (value === '÷') {
      result.value += '/';
    } else if (value === '×') {
      result.value += '*';
    } else {
      result.value += value;
    }
  }
}

function calculateResult() {
  try {
    let expression = result.value;
    expression = expression.replace(/÷/g, '/').replace(/×/g, '*');

    let answer = eval(expression);

    if (typeof answer === 'number') {
      answer = +answer.toFixed(8);
    }

    if (result.value !== '') {
      lastCalculations.push(result.value + ' = ' + answer);
      if (lastCalculations.length > 10) {
        lastCalculations.shift();
      }
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
  lastCalcIndex--;
  if (lastCalcIndex < 0) {
    lastCalcIndex = lastCalculations.length - 1;
  }
  result.value = lastCalculations[lastCalcIndex];
}

lastCalcBtn.style.display = 'none'; // Hide the old last calculation button
clearBtn.addEventListener('click', () => {
  result.value = '';
});

toggleDark.addEventListener('change', () => {
  document.body.classList.toggle('dark', toggleDark.checked);
});

togglePro.addEventListener('change', () => {
  // Disable pro mode, always render basic buttons
  togglePro.checked = false;
  renderButtons();
  result.value = '';
});

renderButtons();
