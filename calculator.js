const buttonsContainer = document.getElementById('buttons');
const result = document.getElementById('result');
const toggleMode = document.getElementById('toggleMode');

// Simple mode buttons
const simpleButtons = [
  'C', '/', '*', '-',
  '7', '8', '9', '+',
  '4', '5', '6', '=',
  '1', '2', '3', '0',
  '.'
];

// Professional mode extra buttons
const proButtons = [
  '(', ')', 'sin', 'cos', 'tan', 'log',
  '√', '^'
];

// Render buttons based on mode
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

// Handle button click
function buttonClicked(value) {
  if (value === 'C') {
    result.value = '';
  } else if (value === '=') {
    calculateResult();
  } else if (value === '√') {
    // sqrt symbol replaced with Math.sqrt(
    result.value += '√(';
  } else {
    result.value += value;
  }
}

// Evaluate expression with math functions
function calculateResult() {
  try {
    let expression = result.value;

    // Replace custom operators/functions with JS equivalents
    expression = expression
      .replace(/√\(/g, 'Math.sqrt(')
      .replace(/\^/g, '**')
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/log/g, 'Math.log10');

    // Use eval safely (assuming controlled input)
    let answer = eval(expression);

    // Limit answer decimal places
    if (typeof answer === 'number') {
      answer = +answer.toFixed(8);
    }

    result.value = answer;
  } catch {
    result.value = 'Error';
  }
}

// Toggle mode event
toggleMode.addEventListener('change', () => {
  renderButtons(toggleMode.checked);
  result.value = '';
});

// Initial render simple mode
renderButtons(false);
