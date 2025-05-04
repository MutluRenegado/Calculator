// Import mathLib
import * as mathLib from './mathLib.js';

const display = document.getElementById("display");
const buttonsContainer = document.getElementById("buttons-container");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const lastCalcBtn = document.getElementById("last-calc-btn");
const shortcutToggleBtn = document.getElementById("toggleShortcutsBtn");
const keyboardShortcuts = document.getElementById("keyboardShortcuts");

let lastCalculation = "";

// Button configuration
const config = {
  keys: [
    "2nd", "deg", "sin", "cos", "tan",
    "xY", "lg", "ln", "(", ")",
    "√x", "AC", "⌫", "%", "÷",
    "X!", "7", "8", "9", "×",
    "1/X", "4", "5", "6", "-",
    "π", "1", "2", "3", "+",
    "ANS", "0", ".", "=", "+-"
  ]
};

// Evaluate expression using mathLib
function evaluateExpression(expression) {
  try {
    let replaced = expression
      .replace(/π/g, Math.PI)
      .replace(/e/g, Math.E)
      .replace(/÷/g, "/")
      .replace(/×/g, "*")
      .replace(/√x/g, "mathLib.sqrt")
      .replace(/lg/g, "mathLib.log10")
      .replace(/ln/g, "mathLib.ln")
      .replace(/sin/g, "mathLib.sin")
      .replace(/cos/g, "mathLib.cos")
      .replace(/tan/g, "mathLib.tan")
      .replace(/xY/g, "**")
      .replace(/1\/X/g, "mathLib.reciprocal")
      .replace(/X!/g, "mathLib.factorial")
      .replace(/ANS/g, lastCalculation);

    return eval(replaced);
  } catch {
    return "Error";
  }
}

// Handle input
function handleInput(value) {
  if (value === "AC") {
    display.value = "0";
  } else if (value === "⌫") {
    display.value = display.value.slice(0, -1) || "0";
  } else if (value === "=") {
    const result = evaluateExpression(display.value);
    lastCalculation = result;
    display.value = result;
  } else if (value === "+-") {
    display.value = display.value.startsWith("-")
      ? display.value.slice(1)
      : "-" + display.value;
  } else {
    display.value = display.value === "0" || display.value === "Error"
      ? value
      : display.value + value;
  }
}

// Generate buttons
config.keys.forEach(key => {
  const button = document.createElement("button");
  button.textContent = key;
  button.onclick = () => handleInput(key);
  buttonsContainer.appendChild(button);
});

// Dark mode
darkModeToggle.onchange = () => {
  document.body.classList.toggle("dark-mode");
};

// Recall last calc
lastCalcBtn.onclick = () => {
  if (lastCalculation) display.value = lastCalculation;
};

// Keyboard support
document.addEventListener("keydown", function (e) {
  const key = e.key;
  const validKeys = "0123456789+-*/().%";

  if (e.ctrlKey && key === "d") {
    e.preventDefault();
    darkModeToggle.checked = !darkModeToggle.checked;
    document.body.classList.toggle("dark-mode");
    return;
  }

  if (validKeys.includes(key)) {
    handleInput(key);
  } else if (key === "Enter" || key === "=") {
    handleInput("=");
  } else if (key === "Backspace") {
    handleInput("⌫");
  }
});

// Keyboard shortcut display
shortcutToggleBtn.onclick = () => {
  keyboardShortcuts.classList.toggle("show");
};
