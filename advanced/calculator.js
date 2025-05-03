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

function handleAdvancedButtonClick(label) {
  const display = document.getElementById('advancedDisplay');

  switch (label) {
    case "=":
      try {
        display.value = eval(
          display.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/π/g, Math.PI)
        );
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
      // Add logic to fetch previous answer if needed
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
