const buttonsContainer = document.getElementById('buttons');
const result = document.getElementById('result');
const toggleDark = document.getElementById('toggleDark');
const togglePro = document.getElementById('togglePro');
const lastCalcBtn = document.getElementById('lastCalcBtn');
const clearBtn = document.getElementById('clearBtn');

let lastCalculation = '';

// Simple buttons as per your layout: only these numbers in four rows and operations
const simpleButtons = [
  '7', '8', '9', '÷',
  '4', '5', '6', '×',
  '1', '2', '3', '-',
  '0', '.', '=', '+'
];

// Professional extra buttons
const proButtons = [
  '(', ')', 'sin', 'cos', 'tan', 'log', '√', '^'
];

function renderButtons(pro = false) {
  buttonsContainer.innerHTML = '';

  let allButtons = [...simpleButtons];
  if (pro) {
    allButtons = [...proButtons, ...allButtons];
    buttonsContainer.classList.add('pro');
  } else {
    buttonsContainer.classList.remove('pro');
  }

  allButtons.forEach(btn => {
    const button = document.createElement('button');
    button.textContent = btn;
    button.onclick = () => buttonClicked(btn);
    if (btn === '=') button.classList.add('equals');
    buttonsContainer.appendChild(button);
  });
}

function buttonClicked(value) {
  if (value === '=') {
    calculateResult();
  } else {
    // Append with operator conversion
    if (value === '÷') {
      result.value += '/';
    } else if (value === '×') {
      result.value += '*';
    } else if (value === '√') {
      result.value += '√(';
    } else {
      result.value += value;
    }
  }
}

function calculateResult() {
  try {
    let expression = result.value;

    // Replace special math operators & functions for eval
    expression = expression
      .replace(/√\(/g, 'Math.sqrt(')
      .replace(/\^/g, '**')
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/log/g, 'Math.log10');

    // Evaluate safely (input is from buttons only)
    let answer = eval(expression);

    // Limit decimal places
    if (typeof answer === 'number') {
      answer = +answer.toFixed(8);
    }

    lastCalculation = result.value + ' = ' + answer;
    result.value = answer;
  } catch {
    result.value = 'Error';
  }
}

// Last Calculation button shows last calculation
lastCalcBtn.addEventListener('click', () => {
  if (lastCalculation) {
    result.value = lastCalculation;
  } else {
    result.value = 'No last calculation';
  }
});

// Clear button resets everything
clearBtn.addEventListener('click', () => {
  result.value = '';
  lastCalculation = '';
});

// Dark mode toggle
toggleDark.addEventListener('change', () => {
  document.body.classList.toggle('dark', toggleDark.checked);
});

// Professional mode toggle
togglePro.addEventListener('change', () => {
  renderButtons(togglePro.checked);
  result.value = '';
  lastCalculation = '';
});

// Initial render: simple mode, light theme
renderButtons(false);
