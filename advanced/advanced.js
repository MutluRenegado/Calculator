// Import mathLib
import mathLib from './mathLib.js';

document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttonsContainer = document.getElementById("buttons-container");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const lastCalcBtn = document.getElementById("last-calc-btn");
  const shortcutToggleBtn = document.getElementById("toggleShortcutsBtn");
  const keyboardShortcuts = document.getElementById("keyboardShortcuts");

  let lastCalculation = "";

  const config = {
    keys: [
      "2nd", "deg", "sin", "cos", "tan",
      "xY", "lg", "ln", "(", ")", 
      "√x", "+-", "⌫", "%", "÷", 
      "X!", "7", "8", "9", "×", 
      "1/X", "4", "5", "6", "-",
      "π", "1", "2", "3", "+",
      "ANS", "0", ".", "=", "AC"
    ]
  };

  function evaluateExpression(expression) {
    try {
      let replaced = expression
        .replace(/π/g, "mathLib.pi()")
        .replace(/\be\b/g, "mathLib.e()")
        .replace(/÷/g, "/")
        .replace(/×/g, "*")
        .replace(/ANS/g, lastCalculation);

      replaced = replaced.replace(/√x\(([^)]+)\)/g, "mathLib.sqrt($1)");
      replaced = replaced.replace(/lg\(([^)]+)\)/g, "mathLib.log10($1)");
      replaced = replaced.replace(/ln\(([^)]+)\)/g, "mathLib.ln($1)");
      replaced = replaced.replace(/sin\(([^)]+)\)/g, "mathLib.sin($1)");
      replaced = replaced.replace(/cos\(([^)]+)\)/g, "mathLib.cos($1)");
      replaced = replaced.replace(/tan\(([^)]+)\)/g, "mathLib.tan($1)");
      replaced = replaced.replace(/1\/X\(([^)]+)\)/g, "mathLib.inverse($1)");
      replaced = replaced.replace(/X!\(([^)]+)\)/g, "mathLib.factorial($1)");
      replaced = replaced.replace(/xY\(([^)]+),([^)]+)\)/g, "mathLib.power($1,$2)");

      return eval(replaced);
    } catch {
      return "Error";
    }
  }

  function handleInput(value) {
    const isDigit = /^[0-9]$/.test(value);

    switch (value) {
      case "AC":
      case "C":
        display.value = "0";
        break;

      case "⌫":
        display.value = display.value.slice(0, -1) || "0";
        break;

      case "=":
        const result = evaluateExpression(display.value);
        lastCalculation = result;
        display.value = result;
        break;

      case "+-":
        display.value = display.value.startsWith("-")
          ? display.value.slice(1)
          : "-" + display.value;
        break;

      default:
        const specialKeys = [
          "2nd", "deg", "sin", "cos", "tan", "xY", "lg", "ln", "(", ")", 
          "√x", "+-", "⌫", "%", "÷", "X!", "×", "1/X", "-", "+", ".", 
          "ANS", "π", "e"
        ];

        let newValue;
        if (isDigit && !specialKeys.includes(value)) {
          newValue = `(${value})`;  // Wrap digits
        } else {
          newValue = value;
        }

        display.value =
          display.value === "0" || display.value === "Error"
            ? newValue
            : display.value + newValue;
        break;
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

  // Last calculation recall
  lastCalcBtn.onclick = () => {
    if (lastCalculation) display.value = lastCalculation;
  };

  // Keyboard support
  document.addEventListener("keydown", function (e) {
    const key = e.key;
    const digitKey = /^[0-9]$/.test(key);
    const validKeys = "0123456789+-*/().%";

    if (e.ctrlKey && key === "d") {
      e.preventDefault();
      darkModeToggle.checked = !darkModeToggle.checked;
      document.body.classList.toggle("dark-mode");
      return;
    }

    if (digitKey) {
      handleInput(key); // Will be wrapped
    } else if (validKeys.includes(key)) {
      handleInput(key);
    } else if (key === "Enter" || key === "=") {
      e.preventDefault();
      handleInput("=");
    } else if (key === "Backspace") {
      handleInput("⌫");
    }
  });

  // Toggle shortcut section
  shortcutToggleBtn.onclick = () => {
    keyboardShortcuts.classList.toggle("show");
  };
});
