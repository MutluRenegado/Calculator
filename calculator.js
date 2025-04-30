const buttonsContainer = document.getElementById('buttons');
const result = document.getElementById('result');
const toggleDark = document.getElementById('toggleDark');
const toggleMode = document.getElementById('toggleMode');  // New toggle for mode
const lastCalcBtn = document.getElementById('lastCalcBtn');
const clearBtn = document.getElementById('clearBtn');

let lastCalculation = '';

const basicButtons = [
  'ANS', '±', '%', '÷',
  '7', '8', '9', '×',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '⌫', '.', '='
];

const advancedButtons = [
  'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'π', 'e',
  '√', 'x²', 'x³', 'log', 'LN', '(', ')',
  '7', '8', '9', '÷',
  '4', '5', '6', '×',
  '1', '2', '3', '-',
  '0', '⌫', '.', '+', '='
];

function renderButtons(isAdvanced = false) {
  buttonsContainer.innerHTML = '';

  const buttons = isAdvanced ? advancedButtons : basicButtons;

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
    result.value = result.value.slice(0, -1);
  } else if (value === 'ANS') {
    const parts = lastCalculation.split('=');
    if (parts.length === 2) {
      result.value += parts[1].trim();
    }
  } else {
    if (value === '÷') {
      result.value += '/';
    } else if (value === '×') {
      result.value += '*';
    } else if (value === 'π') {
      result.value += Math.PI;
    } else if (value === 'e') {
      result.value += Math.E;
    } else if (value === '√') {
      result.value += 'Math.sqrt(';
    } else if (value === 'x²') {
      result.value += '**2';
    } else if (value === 'x³') {
      result.value += '**3';
    } else if (value === 'log') {
      result.value += 'Math.log10(';
    } else if (value === 'LN') {
      result.value += 'Math.log(';
    } else if (['sin', 'cos', 'tan', 'asin', 'acos', 'atan'].includes(value)) {
      result.value += `${value}(`;
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
      .replace(/log/g, 'Math.log10')
      .replace(/LN/g, 'Math.log');

    let answer = eval(expression);

    if (typeof answer === 'number') {
      answer = +answer.toFixed(8); // Optional: Round to 8 decimal places
    }

    lastCalculation = result.value + ' = ' + answer;
    result.value = answer;
  } catch {
    result.value = 'Error';
  }
}

function handleKeyboardInput(event) {
  const key = event.key;

  // Handle numeric keys
  if (/\d/.test(key)) {
    buttonClicked(key);
  }

  // Handle operators
  if (['+', '-', '*', '/', '=', 'Enter'].includes(key)) {
    buttonClicked(key === 'Enter' ? '=' : key);
  }

  // Handle backspace
  if (key === 'Backspace') {
    buttonClicked('⌫');
  }

  // Handle dot
  if (key === '.') {
    buttonClicked('.');
  }

  // Handle 'ANS' with Shift + A
  if (key.toUpperCase() === 'A' && event.shiftKey) {
    buttonClicked('ANS');
  }
}

// Listen for keyboard events
document.addEventListener('keydown', handleKeyboardInput);

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

// Switch between basic and advanced calculator modes
toggleMode.addEventListener('change', () => {
  renderButtons(toggleMode.checked);
  result.value = '';
  lastCalculation = '';
});

renderButtons(false);  // Initially render basic calculator buttons
