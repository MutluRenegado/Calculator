const display = document.getElementById('display');
const buttonsContainer = document.getElementById('buttons');

let currentInput = '';
let answer = '';

const buttonsLayout = {
  keys: [
    'C', '', '', '<',
    'ANS', '+-', '%', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '', '='
  ]
};

buttonsLayout.keys.forEach(key => {
  const button = document.createElement('button');
  button.textContent = key;

  // Add special class for styling
  if (key === 'C') button.classList.add('clear');
  if (key === '=') button.classList.add('equals');
  if (['+', '-', '×', '÷'].includes(key)) button.classList.add('operator');

  if (key !== '') {
    button.addEventListener('click', () => handleInput(key));
  } else {
    button.disabled = true;
    button.style.visibility = 'hidden';
  }

  buttonsContainer.appendChild(button);
});

function handleInput(key) {
  switch (key) {
    case 'C':
      currentInput = '';
      display.textContent = '0';
      break;
    case '<':
      currentInput = currentInput.slice(0, -1);
      display.textContent = currentInput || '0';
      break;
    case '=':
      try {
        const result = eval(currentInput
          .replace(/÷/g, '/')
          .replace(/×/g, '*')
        );
        answer = result;
        display.textContent = result;
        currentInput = result.toString();
      } catch {
        display.textContent = 'Error';
        currentInput = '';
      }
      break;
    case 'ANS':
      currentInput += answer.toString();
      display.textContent = currentInput;
      break;
    case '+-':
      if (currentInput) {
        if (currentInput.startsWith('-')) {
          currentInput = currentInput.slice(1);
        } else {
          currentInput = '-' + currentInput;
        }
        display.textContent = currentInput;
      }
      break;
    case '%':
      try {
        currentInput = (parseFloat(currentInput) / 100).toString();
        display.textContent = currentInput;
      } catch {
        display.textContent = 'Error';
        currentInput = '';
      }
      break;
    default:
      currentInput += key;
      display.textContent = currentInput;
  }
}
