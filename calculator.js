const result = document.getElementById('result');
const buttonsContainer = document.getElementById('buttons');
const clearBtn = document.getElementById('clearBtn');
const toggleDark = document.getElementById('toggleDark');

const buttons = [
  { text: '7' }, { text: '8' }, { text: '9' }, { text: '/' },
  { text: '4' }, { text: '5' }, { text: '6' }, { text: '*' },
  { text: '1' }, { text: '2' }, { text: '3' }, { text: '-' },
  { text: '0' }, { text: '.', class: 'special-btn' }, { text: '⌫', class: 'special-btn' }, { text: '+' },
  { text: '+-', class: 'special-btn' },
  { text: 'Ans', class: 'special-btn' },
  { text: '=', class: 'special-btn' },
  { text: '%', class: 'special-btn' }
];

let ans = '';
let currentInput = '';

function updateDisplay(value) {
  result.value = value;
}

buttons.forEach(btn => {
  const button = document.createElement('button');
  button.textContent = btn.text;
  if (btn.class) button.classList.add(btn.class);
  button.addEventListener('click', () => handleInput(btn.text));
  buttonsContainer.appendChild(button);
});

clearBtn.addEventListener('click', () => {
  currentInput = '';
  updateDisplay('0');
});

function handleInput(value) {
  switch (value) {
    case '=':
      try {
        currentInput = eval(currentInput).toString();
        ans = currentInput;
        updateDisplay(currentInput);
      } catch {
        updateDisplay('Error');
      }
      break;
    case 'Delete':
      currentInput = currentInput.slice(0, -1); // Remove the last character
      updateDisplay(currentInput || '0');
      break;
    case 'Ans':
      currentInput += ans;
      updateDisplay(currentInput);
      break;
    case '+-':
      currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
      updateDisplay(currentInput);
      break;
    default:
      currentInput += value;
      updateDisplay(currentInput);
  }
}

// Keyboard support
document.addEventListener('keydown', e => {
  const key = e.key;
  const allowed = '0123456789+-*/.=';
  if (allowed.includes(key)) {
    handleInput(key);
  } else if (key === 'Enter') {
    handleInput('=');
  } else if (key === 'Backspace') {
    handleInput('Delete');
  } else if (key === 'Escape') {
    currentInput = '';
    updateDisplay('0');
  }
});

// Dark mode toggle
toggleDark.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});
