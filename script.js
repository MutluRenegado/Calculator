const layout = {
  rows: [
    ["C", "⌫", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["±", "0", ".", "="]
  ]
};

let display = document.getElementById('display');
let lastAnswer = '';
let isPro = false;

function buttonClicked(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    lastAnswer = eval(display.value);
    display.value = lastAnswer;
  } catch {
    display.value = 'Error';
  }
}

function useAnswer() {
  display.value += lastAnswer;
}

function toggleSign() {
  if (display.value) {
    try {
      display.value = String(eval(display.value + "* -1"));
    } catch {
      display.value = 'Error';
    }
  }
}

function togglePro() {
  isPro = !isPro;
  alert(isPro ? "Pro mode enabled!" : "Pro mode disabled!");
}

function createButtons() {
  const container = document.getElementById('calculator-buttons');
  layout.rows.forEach(row => {
    row.forEach(label => {
      const btn = document.createElement('button');
      btn.textContent = label;
      btn.onclick = () => {
        switch (label) {
          case 'C': return clearDisplay();
          case '⌫': return backspace();
          case '=': return calculate();
          case '±': return toggleSign();
          default: return buttonClicked(label);
        }
      };
      container.appendChild(btn);
    });
  });
}

createButtons();
