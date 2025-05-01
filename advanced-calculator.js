const advancedContainer = document.getElementById('advanced-calculator-keys');
const advancedDisplay = document.getElementById('advanced-display');

function renderAdvancedButtons() {
  advancedContainer.innerHTML = '';
  config.keys.forEach(row => {
    row.forEach(key => {
      const btn = document.createElement('button');
      btn.textContent = key.label;
      btn.className = `btn ${key.class}`;
      btn.addEventListener('click', () => advancedButtonClicked(key.label));
      advancedContainer.appendChild(btn);
    });
  });
}

function advancedButtonClicked(value) {
  if (value === 'AC') {
    advancedDisplay.textContent = '0';
  } else if (value === '⌫') {
    if (advancedDisplay.textContent.length > 1) {
      advancedDisplay.textContent = advancedDisplay.textContent.slice(0, -1);
    } else {
      advancedDisplay.textContent = '0';
    }
  } else if (value === '=') {
    try {
      // Evaluate expression safely
      let expression = advancedDisplay.textContent;
      expression = expression.replace(/÷/g, '/').replace(/×/g, '*');
      let result = eval(expression);
      if (typeof result === 'number') {
        result = +result.toFixed(8);
      }
      advancedDisplay.textContent = result;
    } catch {
      advancedDisplay.textContent = 'Error';
    }
  } else {
    if (advancedDisplay.textContent === '0') {
      advancedDisplay.textContent = value;
    } else {
      advancedDisplay.textContent += value;
    }
  }
}

renderAdvancedButtons();
