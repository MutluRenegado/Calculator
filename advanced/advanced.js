const display = document.getElementById("display");
const buttonsContainer = document.getElementById("buttons-container");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const lastCalcBtn = document.getElementById("last-calc-btn");

let lastCalculation = "";
let isSecondMode = false;

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

let expression = display.value
  .replace(/×/g, "*")
  .replace(/÷/g, "/")
  .replace(/π/g, Math.PI)
  .replace(/e/g, Math.E);

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
      .replace(/X!/g, "fact(")
      .replace(/ANS/g, lastCalculation);

    // Evaluate factorials manually
    replaced = replaced.replace(/fact\((\d+)\)/g, (_, n) => factorial(Number(n)));

    const result = eval(replaced);
    return result;
  } catch (err) {
    return "Error";
  }
}

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
    if (display.value.startsWith("-")) {
      display.value = display.value.slice(1);
    } else {
      display.value = "-" + display.value;
    }
  } else if (value === "2nd") {
    isSecondMode = !isSecondMode;
    updateButtonLabels();
  } else {
    if (display.value === "0" || display.value === "Error") {
      display.value = value;
    } else {
      display.value += value;
    }
  }
}

// Update the labels for second functions
function updateButtonLabels() {
  const buttons = buttonsContainer.querySelectorAll("button");
  buttons.forEach(button => {
    if (isSecondMode && button.textContent !== "2nd" && button.textContent !== "AC" && button.textContent !== "⌫" && button.textContent !== "=") {
      button.textContent = getSecondModeLabel(button.textContent);
    } else if (!isSecondMode && button.textContent !== "2nd") {
      button.textContent = getOriginalLabel(button.textContent);
    }
  });
}

// Mapping for second mode functions
function getSecondModeLabel(label) {
  const secondModeMap = {
    "sin": "asin",
    "cos": "acos",
    "tan": "atan",
    "lg": "log10",
    "ln": "log",
    "√x": "x^2",
    "π": "π/2",
    "X!": "nCr"
  };
  return secondModeMap[label] || label;
}

function getOriginalLabel(label) {
  const originalModeMap = {
    "asin": "sin",
    "acos": "cos",
    "atan": "tan",
    "log10": "lg",
    "log": "ln",
    "x^2": "√x",
    "π/2": "π",
    "nCr": "X!"
  };
  return originalModeMap[label] || label;
}

// Generate buttons
config.keys.forEach(key => {
  const button = document.createElement("button");
  button.textContent = key;
  button.onclick = () => handleInput(key);
  buttonsContainer.appendChild(button);
});

// Dark mode toggle
darkModeToggle.onchange = () => {
  document.body.classList.toggle("dark-mode");
};

// Last calculation recall
lastCalcBtn.onclick = () => {
  if (lastCalculation) {
    display.value = lastCalculation;
  }
};

// Keyboard support
document.addEventListener("keydown", function (e) {
  const key = e.key;
  const validKeys = "0123456789+-*/().%";

  if (validKeys.includes(key)) {
    if (display.value === "0" || display.value === "Error") {
      display.value = key;
    } else {
      display.value += key;
    }
  } else if (key === "Enter") {
    try {
      lastCalculation = display.value;
      display.value = eval(display.value.replace("π", Math.PI).replace("e", Math.E));
    } catch {
      display.value = "Error";
    }
  } else if (key === "Backspace") {
    if (display.value.length > 1) {
      display.value = display.value.slice(0, -1);
    } else {
      display.value = "0";
    }
  } else if (key === "Escape") {
    display.value = "0";
  }
});
