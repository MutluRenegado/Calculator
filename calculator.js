const result = document.getElementById('result');
const buttonsContainer = document.getElementById('buttons');
const clearBtn = document.getElementById('clearBtn');
const toggleDark = document.getElementById('toggleDark');

// Define the calculator buttons
const buttons = [
  { text: 'Ans', class: 'special-btn' },
  { text: '+-', class: 'special-btn' },
  { text: '%', class: 'special-btn' },
  { text: '/', class: '' },
  { text: '7' }, { text: '8' }, { text: '9' }, { text: '*' },
  { text: '4' }, { text: '5' }, { text: '6' }, { text: '-' },
  { text: '1' }, { text: '2' }, { text: '3' }, { text: '+' },
  { text: '0' }, { text: '.', class: 'special-btn' }, { text: '=', class: 'special-btn' }
];

// Track last answer
let lastAnswer = '';
let expression = '';

function renderButtons() {
  buttons.forEach(btn => {
    const button = document.createElement('button');
    button.textContent = btn.text;
    if (btn.class) button.classList.add(btn.class);
    button.addEventListener('click', () => handleButtonClick(btn.text));
    buttonsContainer.appendChild(button);
  });
}

function handleButtonClick(value) {
  switch (value) {
    case 'C':
      expression = '';
      result.value = '';
      break;
    case '=':
      try {
        expression = eval(expression).toString();
        result.value = expression;
        lastAnswer = expression;
      } catch (e) {
        result.value = 'Error';
        expression = '';
      }
      break;
    case 'Ans':
      expression += lastAnswer;
      result.value = expression;
      break;
    case '+-':
      if (expression) {
        expression = (parseFloat(expression) * -1).toString();
        result.value = expression;
      }
      break;
    default:
      expression += value;
      result.value = expression;
  }
}

clearBtn.addEventListener('click', () => {
  expression = '';
  result.value = '';
});

toggleDark.addEventListener('change', (e) => {
  document.body.classList.toggle('dark', e.target.checked);
});

// Initialize
renderButtons();
