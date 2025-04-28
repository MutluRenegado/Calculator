const buttonsContainer = document.getElementById('buttons');
const result = document.getElementById('result');
const toggleDark = document.getElementById('toggleDark');
const togglePro = document.getElementById('togglePro');
const lastCalcBtn = document.getElementById('lastCalcBtn');
const clearBtn = document.getElementById('clearBtn');

let lastCalculation = '';

// Buttons as per your layout and requirements
const simpleButtons = [
  '7', '÷', '×', '-',
  '4', '5', '6', '+',
  '1', '2', '3', '=',
  '0', '.', 
];

// Professional mode extra buttons
const proButtons = [
  '(', ')', 'sin', 'cos', 'tan', 'log',
  '√', '^'
];

// Map for replacing operators with JS equivalents in calculation
const operatorMap = {
  '÷': '/',
  '×': '*',
  '^': '**',
  '√': 'Math.sqrt',
  'sin': 'Math.sin',
  'cos': 'Math.cos',
  'tan': 'Math.tan',
  'log': 'Math.log10'
};

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
    if (btn === '=') button.classList.add('equals');
    button.onclick = () => buttonClicked(btn);
    buttonsContainer.appendChild(button);
  });
}

function buttonClicked(value) {
  if (value === '=') {
    calculateResult();
  } else {
    // Append operator with proper replacements
    if (operatorMap[value]) {
      // For sqrt and functions append '(' after them for usability
      if (['√', 'sin', 'cos', 'tan', 'log'].includes(value)) {
        result.value += value + '(';
      } else {
        result.value += value;
      }
    } else {
      result.value += value;
    }
  }
}

function calculateResult() {
  try {
    let expression = result.value;

    // Replace all operators/functions in expression by JS equivalents
    Object.entries(operatorMap).forEach(([key, val]) => {
      // Replace all occurrences of key with val in expression
      // Special handling for functions - use RegExp for word boundaries
      if (['sin', 'cos', 'tan', 'log', 'Math.sqrt'].includes(val)) {
        const regex = new RegExp(key + '\\(', 'g');
        expression = expression.replace(regex, val + '(');
      } else {
        const regex = new RegExp('\\' + key, 'g');
        expression = expression.replace(regex, val);
      }
    });

    // Evaluate safely using Function constructor
    // eslint-disable-next-line no-new-func
    let evalResult = Function('"use strict";return (' + expression + ')')();

    if (evalResult === undefined) {
      result.value = 'Error';
    } else {
      lastCalculation = result.value + ' = ' + evalResult;
      result.value = evalResult;
    }
  } catch (e) {
    result.value = 'Error';
  }
}

// Toggle Dark Mode
toggleDark.addEventListener('change', () => {
  if (toggleDark.checked) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
});

// Toggle Professional Mode
togglePro.addEventListener('change', () => {
  renderButtons(togglePro.checked);
});

// Last Calculation button
lastCalcBtn.addEventListener('click', () => {
  if (lastCalculation) {
    alert('Last Calculation:\n' + lastCalculation);
  } else {
    alert('No previous calculation.');
  }
});

// Clear button
clearBtn.addEventListener('click', () => {
  result.value = '';
});

// Initial render
renderButtons();
