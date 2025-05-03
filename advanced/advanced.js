const display = document.getElementById("display");
const buttonsContainer = document.getElementById("buttons-container");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const lastCalcBtn = document.getElementById("last-calc-btn");

let lastCalculation = "";

// Config for calculator keys
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

// Utilities
function factorial(n) {
  if (n < 0) return NaN;
  return n === 0 ? 1 : n * factorial(n - 1);
}

function evaluateExpression(expression) {
  try {
    let replaced = expression
      .replace(/π/g, Math.PI)
      .replace(/e/g, Math.E)
      .replace(/÷/g, "/")
      .replace(/×/g, "*")
      .replace(/√x/g, "Math.sqrt")
      .replace(/lg/g, "Math.log10")
      .replace(/ln/g, "Math.log")
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan")
      .replace(/xY/g, "**")
      .replace(/1\/X/g, "1/")
      .replace(/X!/g, "factorial")
      .replace(/ANS/g, lastCalculation);

    replaced = replaced.replace(/factorial\((\d+)\)/g, (_, n) => factorial(Number(n)));

    return eval(replaced);
  } catch (err) {
    return "Error";
  }
}

function handleInput(value) {
  if (value === "AC") {
    display.value = "0";
    lastCalculation = "";
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
  } else if (value === "." && display.value.includes(".")) {
    return;
  } else {
    display.value = display.value === "0" || display.value === "Error"
      ? value
      : display.value + value;
  }
}

// Generate buttons dynamically
config.keys.forEach(key => {
  const button = document.createElement("button");
  button.textContent = key;
  button.onclick = () => handleInput(key);
  buttonsContainer.appendChild(button);
});

// Toggle dark mode
darkModeToggle.onchange = () => {
  document.body.classList.toggle("dark-mode");
};

// Recall last calculation
lastCalcBtn.onclick = () => {
  if (lastCalculation) {
    display.value = lastCalculation;
  }
};

// Keyboard input support
const keyboardMap = {
  "/": "÷",
  "*": "×",
  "^": "xY",
  "s": "sin",
  "c": "cos",
  "t": "tan",
  "l": "ln",
  "g": "lg",
  "r": "√x",
  "!": "X!",
  "p": "π",
  "e": "e",
  "a": "ANS",
  "f": "1/X"
};

document.addEventListener("keydown", function (e) {
  const key = e.key.toLowerCase();

  if (!isNaN(key) || "+-().%".includes(key)) {
    display.value = display.value === "0" || display.value === "Error"
      ? key
      : display.value + key;
  } else if (key === "enter" || key === "=") {
    const result = evaluateExpression(display.value);
    lastCalculation = result;
    display.value = result;
  } else if (key === "backspace") {
    display.value = display.value.length > 1
      ? display.value.slice(0, -1)
      : "0";
  } else if (key === "escape") {
    display.value = "0";
  } else if (keyboardMap[key]) {
    handleInput(keyboardMap[key]);
  }
});
