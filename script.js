const buttonsContainer = document.getElementById('buttons');
const result = document.getElementById('result');
const togglePro = document.getElementById('togglePro');
const toggleDark = document.getElementById('toggleDark');
const lastCalcBtn = document.getElementById('lastCalcBtn');
const clearBtn = document.getElementById('clearBtn');

let currentCalculation = '';
let lastCalculation = '';

// Basic buttons
const basicButtons = [
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '0', '.', '=', '+'
];

// Pro buttons
const proButtons = [
  '(', ')', '%', '^',
  '√', 'log', 'ln', '!',
  'sin', 'cos', 'tan', 'π',
  '', '', '', ''
];

// Handle button click
function handleButtonClick(value) {
  if (value === '=') {
    try {
      currentCalculation = currentCalculation
        .replace(/π/g, Math.PI)
        .replace(/√/g, 'Math.sqrt')
        .replace(/log/g, 'Math.log10')
        .replace(/ln/g, 'Math.log')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/\^/g, '**')
        .replace(/!/g, '.factorial');

      // Add factorial logic
      Number.prototype.factorial = function() {
        let n = Math.floor(this);
        if (n < 0) return NaN;
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
      };

      const evaluated = eval(currentCalculation);
      lastCalculation = currentCalculation + ' = ' + evaluated;
      result.value = evaluated;
      currentCalculation = '';
    } catch {
      result.value = 'Error';
      currentCalculation = '';
    }
  } else {
    currentCalculation += value;
    result.value = currentCalculation;
  }
}

// Render buttons
function renderButtons() {
  buttonsContainer.innerHTML = '';
  buttonsContainer.className = `calculator-buttons ${togglePro.checked ? 'pro' : 'basic'}`;

  const buttons = togglePro.checked ? proButtons.concat(basicButtons) : basicButtons;
  buttons.forEach(val => {
    const btn = document.createElement('button');
    btn.textContent = val;
    if (val !== '') {
      btn.addEventListener('click', () => handleButtonClick(val));
    } else {
      btn.disabled = true;
    }
    buttonsContainer.appendChild(btn);
  });
}

// Toggle dark mode
toggleDark.addEventListener('change', () => {
  document.body.classList.toggle('dark', toggleDark.checked);
});

// Toggle pro mode
togglePro.addEventListener('change', renderButtons);

// Show last calculation
lastCalcBtn.addEventListener('click', () => {
  if (lastCalculation) {
    result.value = lastCalculation;
  }
});

// Clear screen
clearBtn.addEventListener('click', () => {
  currentCalculation = '';
  result.value = '';
});

// Initial render
renderButtons();
