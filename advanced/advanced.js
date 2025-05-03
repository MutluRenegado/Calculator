// Tabs for switching between Calculator and Converter
document.getElementById('calculatorTab').addEventListener('click', () => {
  document.getElementById('calculatorSection').style.display = 'block';
  document.getElementById('converterSection').style.display = 'none';
  document.getElementById('calculatorTab').classList.add('active');
  document.getElementById('converterTab').classList.remove('active');
});

document.getElementById('converterTab').addEventListener('click', () => {
  document.getElementById('calculatorSection').style.display = 'none';
  document.getElementById('converterSection').style.display = 'block';
  document.getElementById('converterTab').classList.add('active');
  document.getElementById('calculatorTab').classList.remove('active');
});

// Conversion logic for the Converter
document.getElementById('fromValue').addEventListener('input', () => {
  const fromValue = parseFloat(document.getElementById('fromValue').value);
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;

  if (fromUnit === 'temperature' && toUnit === 'temperature') {
    const result = convertTemperature(fromValue);
    document.getElementById('toValue').value = result;
  }
  // You can add more conversions like currency here...
});

function convertTemperature(value) {
  // Example: Convert from Celsius to Fahrenheit
  return (value * 9 / 5) + 32;
}

// Calculator functionality
const config = {
  keys: [
    ["2nd", "deg", "sin", "cos", "tan"],
    ["xY", "lg", "ln", "(", ")"],
    ["√x", "AC", "⌫", "%", "÷"],
    ["C", "ANS", "+-", "%", "÷"],
    ["X!", "7", "8", "9", "×"],
    ["1/X", "4", "5", "6", "-"],
    ["π", "1", "2", "3", "+"],
    ["C", "0", ".", "=", "<"]
  ].map(row => row.map(label => {
    let cls = "";
    if (["AC", "⌫", "%", "÷", "ANS", "+-", "C", "="].includes(label)) {
      cls = "orange";
    }
    return { label, class: cls };
  }))
};

const advancedButtonsContainer = document.getElementById("advancedButtons");

config.keys.forEach(row => {
  row.forEach(button => {
    const btn = document.createElement("button");
    btn.innerText = button.label;
    if (button.class) btn.classList.add(button.class);
    btn.onclick = () => handleAdvancedButtonClick(button.label);
    advancedButtonsContainer.appendChild(btn);
  });
});

let lastAnswer = null; // Variable to store the last answer

function handleAdvancedButtonClick(label) {
  const display = document.getElementById('advancedDisplay');

  switch (label) {
    case "=":
      try {
        lastAnswer = eval(
          display.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/π/g, Math.PI)
        );
        display.value = lastAnswer;
      } catch {
        display.value = "Error";
      }
      break;
    case "AC":
    case "C":
      display.value = "";
      break;
    case "⌫":
      display.value = display.value.slice(0, -1);
      break;
    case "+-":
      display.value = display.value.startsWith("-") ? display.value.slice(1) : "-" + display.value;
      break;
    case "π":
      display.value += Math.PI.toFixed(8);
      break;
    case "ANS":
      if (lastAnswer !== null) {
        display.value = lastAnswer;
      }
      break;
    case "√x":
      display.value += "Math.sqrt(";
      break;
    case "xY":
      display.value += "**";
      break;
    case "lg":
      display.value += "Math.log10(";
      break;
    case "ln":
      display.value += "Math.log(";
      break;
    case "X!":
      display.value = factorial(display.value);
      break;
    case "1/X":
      display.value = display.value ? `1/(${display.value})` : display.value;
      break;
    case "sin":
      display.value = `Math.sin(${display.value})`;
      break;
    case "cos":
      display.value = `Math.cos(${display.value})`;
      break;
    case "tan":
      display.value = `Math.tan(${display.value})`;
      break;
    default:
      display.value += label;
  }
}

function factorial(n) {
  n = parseFloat(n);
  if (isNaN(n) || n < 0 || !Number.isInteger(n)) return "Error";
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}
