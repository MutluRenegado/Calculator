const buttonsContainer = document.getElementById('buttons');
const result = document.getElementById('display');
const toggleDark = document.getElementById('toggleDark');
const togglePro = document.getElementById('togglePro');
const lastCalcBtn = document.getElementById('lastCalcBtn');
const clearBtn = document.getElementById('clearBtn');

let lastCalculation = '';
let currentCalculation = '';

const basicButtons = [
  'ANS', '±', '%', '÷',
  '7', '8', '9', '×',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '⌫', '.', '='
];

const proButtons = [
  'sin', 'cos', 'tan', 'asin', 'acos', 'atan', '(', ')',
  'DEG', 'RAD', 'EXP', 'pi', 'x2', 'x3', '√', '1/x',
  'LN', 'LOG', '10^x', 'e^x', 'M+', 'M-', 'MR', 'CA',
  'd>f', 'RND', 'STD', 'ALG', '!', 'ANS', '±',
  '%', '÷', '7', '8', '9', '×',
  '4', '5', '6', '-', '1', '2', '3', '+',
  '0', '⌫', '.', '='
];

function renderButtons(isPro = false) {
  buttonsContainer.innerHTML = ''; // Clear the current buttons

  const buttons = isPro ? proButtons : basicButtons; // Select the buttons based on the mode

  buttons.forEach(btn => {
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
  } else if (value === '⌫') {
    currentCalculation = currentCalculation.slice(0, -1);
    result.value = currentCalculation;
  } else if (value === 'ANS') {
    currentCalculation += lastCalculation.split('=')[1].trim();
    result.value = currentCalculation;
  } else if (value === '±') {
    currentCalculation = currentCalculation.startsWith('-') ? currentCalculation.slice(1) : '-' + currentCalculation;
    result.value = currentCalculation;
  } else {
    currentCalculation += value;
    result.value = currentCalculation;
  }
}

function calculateResult() {
  try {
    let expression = currentCalculation
      .replace(/π/g, Math.PI)
      .replace(/√/g, 'Math.sqrt')
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/log/g, 'Math.log10')
      .replace(/ln/g, 'Math.log')
      .replace(/\^/g, '**')
      .replace(/÷/g, '/')
      .replace(/×/g, '*')
      .replace(/ANS/g, lastCalculation);

    let resultValue = eval(expression);
    if (typeof resultValue === 'number') {
      resultValue = resultValue.toFixed(8);
    }

    lastCalculation = currentCalculation + ' = ' + resultValue;
    currentCalculation = resultValue;
    result.value = resultValue;
  } catch (error) {
    result.value = 'Error';
    currentCalculation = '';
  }
}

function handleKeyboardInput(event) {
  const key = event.key;

  // Handle numeric and operator keys
  if (/\d/.test(key)) {
    buttonClicked(key);
  }

  if (['+', '-', '*', '/', '.', '=', 'Enter'].includes(key)) {
    buttonClicked(key === 'Enter' ? '=' : key);
  }

  // Handle backspace
  if (key === 'Backspace') {
    buttonClicked('⌫');
  }

  // Handle special cases like ANS, ±, etc.
  if (key.toUpperCase() === 'A' && event.shiftKey) {
    buttonClicked('ANS');
  }
  if (key === 'a') {
    buttonClicked('ANS');
  }
  if (key === ' ') {
    buttonClicked('±');
  }

  // Handle parentheses and scientific functions
  if (key === '(' || key === ')') {
    buttonClicked(key);
  }

  // Handle numbers 0-9
  if (key >= '0' && key <= '9') {
    buttonClicked(key);
  }
}

// Listen for keyboard events
document.addEventListener('keydown', handleKeyboardInput);

lastCalcBtn.addEventListener('click', () => {
  if (lastCalculation) {
    result.value = lastCalculation.split('=')[1].trim();
  } else {
    result.value = 'No last calculation';
  }
});

clearBtn.addEventListener('click', () => {
  result.value = '';
  currentCalculation = '';
  lastCalculation = '';
});

toggleDark.addEventListener('change', () => {
  document.body.classList.toggle('dark', toggleDark.checked);
});

togglePro.addEventListener('change', () => {
  // Toggle between basic and pro modes
  renderButtons(togglePro.checked);
  result.value = '';
  currentCalculation = '';
});

renderButtons(false); // Initially load basic buttons
