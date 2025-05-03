const display = document.getElementById("display");
const buttonsContainer = document.getElementById("buttons-container");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const lastCalcBtn = document.getElementById("last-calc-btn");

let lastCalculation = "";

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
  } else {
    if (display.value === "0" || display.value === "Error") {
      display.value = value;
    } else {
      display.value += value;
    }
  }
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
