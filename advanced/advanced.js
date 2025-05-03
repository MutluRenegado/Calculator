const display = document.getElementById("display");
const buttonsContainer = document.getElementById("buttons-container");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const lastCalcBtn = document.getElementById("last-calc-btn");

const config = {
  keys: [
    "2nd", "deg", "sin", "cos", "tan",
    "xY", "lg", "ln", "(", ")",
    "√x", "AC", "⌫", "%", "÷",
    "C", "ANS", "+-", "%", "÷",
    "X!", "7", "8", "9", "×",
    "1/X", "4", "5", "6", "-",
    "π", "1", "2", "3", "+",
    "C", "0", ".", "=", "<"  
    ]
};

let lastCalculation = "";

function handleInput(value) {
  if (value === "AC") {
    display.value = "0";
  } else if (value === "=") {
    try {
      lastCalculation = display.value;
      display.value = eval(display.value.replace("π", Math.PI).replace("e", Math.E));
    } catch {
      display.value = "Error";
    }
  } else {
    if (display.value === "0" || display.value === "Error") {
      display.value = value;
    } else {
      display.value += value;
    }
  }
}

config.keys.flat().forEach(key => {
  const button = document.createElement("button");
  button.textContent = key;
  button.onclick = () => handleInput(key);
  buttonsContainer.appendChild(button);
});

lastCalcBtn.onclick = () => {
  if (lastCalculation) {
    display.value = lastCalculation;
  }
};

darkModeToggle.onchange = () => {
  document.body.classList.toggle("dark-mode");
};
