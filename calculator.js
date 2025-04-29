const BUTTON_SIZE = 50;  // Example constant for button size
const MEMORY_OPERATION = 'M-';
const EQUALS = '=';
const BACKSPACE = '⌫';
const PI = Math.PI;

const proButtons = [
  '7', '8', '9', '÷', 'sin', 'cos', 'tan',
  '4', '5', '6', '×', 'log', 'ln', '^',
  '1', '2', '3', '-', '(', ')', '√',
  '0', '.', '=', '+', MEMORY_OPERATION, 'M+', 'MR', BACKSPACE
];

const buttons = [
  '7', '8', '9', '÷',
  '4', '5', '6', '×',
  '1', '2', '3', '-',
  '0', '.', '=', '+',
  'C', '(', ')', '√'
];

let lastCalculation = '';

const result = document.getElementById('result');
const buttonsContainer = document.getElementById('buttons');
const toggleDark = document.getElementById('toggleDark');
const togglePro = document.getElementById('togglePro');
const clearBtn = document.getElementById('clearBtn');
const lastCalcBtn = document.getElementById('lastCalcBtn');

function createButtons(buttonArray) {
  buttonsContainer.innerHTML = '';
  buttonArray.forEach(button => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = button;
    buttonElement.classList.add('button');
    buttonElement.addEventListener('click', () => handleButtonClick(button));
    buttonsContainer.appendChild(buttonElement);
  });
}

function handleButtonClick(button) {
  if (button === 'C') {
    result.value = '';
  } else if (button === EQUALS) {
    calculateResult();
  } else if (button === BACKSPACE) {
    result.value = result.value.slice(0, -1);
  } else {
    result.value += button;
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
      .replace(/ln/g, 'Math.log');

    let answer = eval(expression);

    if (typeof answer === 'number') {
      answer = +answer.toFixed(8);
    }

    lastCalculation = result.value + ' = ' + answer;
    result.value = answer;
  } catch (e) {
    result.value = 'Error: Invalid Input';
  }
}

clearBtn.addEventListener('click', () => {
  result.value = '';
});

lastCalcBtn.addEventListener('click', () => {
  result.value = lastCalculation;
});

toggleDark.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

togglePro.addEventListener('change', () => {
  if (togglePro.checked) {
    createButtons(proButtons);
  } else {
    createButtons(buttons);
  }
});

createButtons(buttons);
