const buttonsContainer = document.getElementById('buttons');
const result = document.getElementById('result');
const toggleDark = document.getElementById('toggleDark');

let lastCalculation = '';
let currentCalculation = '';

const basicButtons = [
  'ANS', '±', '%', '÷',
  '7', '8', '9', '×',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '⌫', '.', '='
];

function renderButtons() {
  buttonsContainer.innerHTML = '';
  basicButtons.forEach(btn => {
    const button = document.createElement('button');
    button.textContent = btn;
    button.onclick = () => handleButtonClick(btn);
    if (btn === '=') button.classList.add('equals');
    buttonsContainer.appendChild(button);
  });
}

function handleButtonClick(value) {
  switch (value) {
    case '=':
      try {
        const expression = currentCalculation
          .replace(/π/g, Math.PI)
          .replace(/√/g, 'Math.sqrt')
          .replace(/log/g, 'Math.log10')
          .replace(/ln/g, 'Math.log')
          .replace(/sin/g, 'Math.sin')
          .replace(/cos/g, 'Math.cos')
          .replace(/tan/g, 'Math.tan')
          .replace(/\^/g, '**')
          .replace(/ANS/g, lastCalculation)
          .replace(/÷/g, '/')
          .replace(/×/g, '*')
          .replace(/%/g, '/100');

        const evaluated = eval(expression);
        lastCalculation = evaluated;
        result.value = evaluated;
        currentCalculation = '';
      } catch {
        result.value = 'Error';
        currentCalculation = '';
      }
      break;

    case '⌫':
      currentCalculation = currentCalculation.slice(0, -1);
      result.value = currentCalculation;
      break;

    case '±':
      if (currentCalculation) {
        if (currentCalculation.startsWith('-')) {
          currentCalculation = currentCalculation.substring(1);
        } else {
          currentCalculation = '-' + currentCalculation;
        }
        result.value = currentCalculation;
      }
      break;

    case 'ANS':
      currentCalculation += lastCalculation;
      result.value = currentCalculation;
      break;

    default:
      currentCalculation += value;
      result.value = currentCalculation;
  }
}

// Listen for keyboard input
document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (/\d/.test(key) || ['+', '-', '*', '/', '.', '=', 'Backspace'].includes(key)) {
    handleButtonClick(key);
  }
});

// Toggle dark mode
toggleDark.addEventListener('change', () => {
  document.body.classList.toggle('dark', toggleDark.checked);
});

renderButtons();
