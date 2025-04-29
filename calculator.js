const buttonsContainer = document.getElementById('buttons');
const result = document.getElementById('result');
const toggleDark = document.getElementById('toggleDark');
const togglePro = document.getElementById('togglePro');
const lastCalcBtn = document.getElementById('lastCalcBtn');
const clearBtn = document.getElementById('clearBtn');

let lastCalculation = '';

const basicButtons = [
  'C', '±', '%', '÷'
  '7', '8', '9', '×',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '<', '.', '='
];

const proButtons = [
  // Row 1 (unchanged)
  '7', '8', '9', '÷', '', '', '',
  // Row 2 (unchanged)
  '4', '5', '6', '×', '', '', '',
  // Row 3
  '', '[', ']', '4', '5', '6', '-',
  // Row 4
  '', 'M-', 'M+', '1', '2', '3', '×',
  // Row 5
  '', 'Fn', '{', '}', '0', '.', '=',
  // Row 6
  '+', '⌫', '', '', '', '', ''
];

function renderButtons(isPro = false) {
  buttonsContainer.innerHTML = '';

  if (isPro) {
    buttonsContainer.classList.remove('basic');
    proButtons.forEach(btn => {
      if (btn !== '') {
        const button = document.createElement('button');
        button.textContent = btn;
        button.onclick = () => buttonClicked(btn);
        if (btn === '=') button.classList.add('equals');
        buttonsContainer.appendChild(button);
      } else {
        const empty = document.createElement('div');
        buttonsContainer.appendChild(empty);
      }
    });
  } else {
    buttonsContainer.classList.add('basic');
    basicButtons.forEach(btn => {
      const button = document.createElement('button');
      button.textContent = btn;
      button.onclick = () => buttonClicked(btn);
      if (btn === '=') button.classList.add('equals');
      buttonsContainer.appendChild(button);
    });
  }
}

function buttonClicked(value) {
  if (value === '=') {
    calculateResult();
  } else if (value === '⌫') {
    result.value = result.value.slice(0, -1);
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

lastCalcBtn.addEventListener('click', () => {
  if (lastCalculation) {
    result.value = lastCalculation;
  } else {
    result.value = 'No last calculation';
  }
});

clearBtn.addEventListener('click', () => {
  result.value = '';
  lastCalculation = '';
});

toggleDark.addEventListener('change', () => {
  document.body.classList.toggle('dark', toggleDark.checked);
});

togglePro.addEventListener('change', () => {
  renderButtons(togglePro.checked);
  result.value = '';
  lastCalculation = '';
});

renderButtons(false);
