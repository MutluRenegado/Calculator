const display = document.getElementById("display");
const buttonsContainer = document.getElementById("buttons-container");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const lastCalcBtn = document.getElementById("last-calc-btn");

let lastCalculation = "";

// Key layout
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

// Factorial function
function factorial(n) {
  if (n < 0) return NaN;
  return n === 0 ? 1 : n * factorial(n - 1);
}

// Expression evaluator
function evaluateExpression(expression) {
  try {
    let expr = expression
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

    // Handle factorials explicitly
    expr = expr.replace(/factorial\((\d+)\)/g, (_, n) => factorial(Number(n)));

    return eval(expr);
  } catch {
    return "Error";
  }
}

// Handle input logic
function handleInput(value) {
  switch (value) {
    case "AC":
      display.value = "0";
      lastCalculation = "";
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
    case ".":
      if (!display.value.includes(".")) {
        display.value += ".";
      }
      break;
    default:
      display.value = display.value === "0" || display.value === "Error"
        ? value
        : display.value + value;
  }
}

// Generate calculator buttons
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

// Recall last calculation
lastCalcBtn.onclick = () => {
  if (lastCalculation) {
    display.value = lastCalculation;
  }
};

// Keyboard input mapping
document.addEventListener("keydown", e => {
  const key = e.key;
  if ("0123456789+-*/().%".includes(key)) {
    display.value = display.value === "0" || display.value === "Error"
      ? key
      : display.value + key;
  } else if (key === "Enter") {
    const result = evaluateExpression(display.value);
    lastCalculation = result;
    display.value = result;
  } else if (key === "Backspace") {
    display.value = display.value.length > 1
      ? display.value.slice(0, -1)
      : "0";
  } else if (key === "Escape") {
    display.value = "0";
  }
});
