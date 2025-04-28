const buttonsContainer = document.getElementById('buttons');
const result = document.getElementById('result');
const toggleProMode = document.getElementById('toggleProMode');
const toggleDarkMode = document.getElementById('toggleDarkMode');
const lastCalcBtn = document.getElementById('lastCalcBtn');

let lastCalculation = '';
let isProMode = false;

// Buttons layout for simple mode (4x4 grid)
const simpleButtonsOrder = [
  ['7', '8', '9', '÷'],
  ['4', '5', '6', '×'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+']
];

// Extra scientific buttons for professional mode
const proExtraButtons = ['(', ')', 'sin', 'cos', 'tan', 'log', '√', '^'];

// Render buttons depending on mode
function renderButtons() {
  buttonsContainer.innerHTML = '';

  if (!isProMode) {
    // Simple mode
    buttonsContainer.classList.remove('pro');
    simpleButtonsOrder.forEach(row => {
      row.forEach(btn => {
        const button = document.createElement('button');
        button.textContent = btn;
        button.onclick = () => buttonClicked(btn);
        if (btn === '=') button.classList.add('equals');
        buttonsContainer.appendChild(button);
      });
    });
  } else {
    // Professional mode
    buttonsContainer.classList.add('pro');
    // Add scientific buttons first (6 columns grid)
    proExtraButtons.forEach(btn => {
      const button = document.createElement('button');
      button.textContent = btn;
      button.onclick = () => buttonClicked(btn);
      buttonsContainer.appendChild(button);
    });
    // Then add simple buttons flattened
    simpleButtonsOrder.flat().forEach(btn => {
      const button = document.createElement('button');
      button.textContent = btn;
      button.onclick = () => buttonClicked(btn);
      if (btn === '=') button.classList.add('equals');
      buttonsContainer.appendChild(button);
    });
  }
}

// Handle button clicks
function buttonClicked(value) {
  if (value === 'C') {
    result.value = '';
  } else if (value === '=') {
    calculateResult();
  } else if (value === '√') {
    // sqrt function
    try {
      let val = parseFloat(result.value);
      if (!isNaN(val)) {
        const res = Math.sqrt(val);
        lastCalculation = result.value + '√ = ' + res;
        result.value = res;
      }
    } catch {
      result.value = 'Error';
    }
  } else if (['sin', 'cos', 'tan', 'log'].includes(value)) {
    // Trigonometric and log functions - convert degrees to radians
    try {
      let val = parseFloat(result.value);
      if (!isNaN(val)) {
        let radians = val * (Math.PI / 180);
        let res;
        switch (value) {
          case 'sin': res = Math.sin(radians); break;
          case 'cos': res = Math.cos(radians); break;
          case 'tan': res = Math.tan(radians); break;
          case 'log': res = Math.log10(val); break;
        }
        lastCalculation = `${value}(${val}) = ${res}`;
        result.value = res;
      }
    } catch {
      result.value = 'Error';
    }
  } else if (value === '^') {
    result.value += '**';
  } else {
    // Add button value to expression, convert ÷, × to JS operators
    let val = value;
    if (val === '÷') val = '/';
    if (val === '×') val = '*';
    result.value += val;
  }
}

// Calculate and display result safely
function calculateResult() {
  try {
    // Evaluate using Function constructor for security (simple math only)
    // Replace '√' if any (should not be here) and convert operators:
    let expression = result.value.replace(/√/g, 'Math.sqrt').replace(/÷/g, '/').replace(/×/g, '*');
    let res = Function(`"use strict";return (${expression})`)();
    lastCalculation = result.value + ' = ' + res;
    result.value = res;
  } catch {
    result.value = 'Error';
  }
}

// Toggle Professional mode
toggleProMode.addEventListener('change', (e) => {
  isProMode = e.target.checked;
  renderButtons();
});

// Toggle Dark mode
toggleDarkMode.addEventListener('change', (e) => {
  document.body.classList.toggle('dark', e.target.checked);
});

// Last Calculation button
lastCalcBtn.addEventListener('click', () => {
  if (lastCalculation) {
    result.value = lastCalculation.split(' = ')[1] || lastCalculation;
  }
});

// Initial render
renderButtons();
