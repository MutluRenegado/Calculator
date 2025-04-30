const layout = {
  rows: [
    ["AC", "⌫", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "−"],
    ["1", "2", "3", "+"],
    ["↔", "0", ".", "="]
  ],
  functions: {
    "AC": "clearAll",
    "⌫": "backspace",
    "%": "percent",
    "÷": "divide",
    "×": "multiply",
    "−": "subtract",
    "+": "add",
    "=": "evaluate",
    "↔": "switchSign",
    ".": "decimal"
  }
};

let current = "";
let display = document.getElementById("display");
let buttons = document.getElementById("buttons");

// Render buttons
layout.rows.flat().forEach(label => {
  const btn = document.createElement("button");
  btn.textContent = label;
  if ("÷×−+=%".includes(label)) btn.classList.add("operator");
  if (label === "=") btn.classList.add("equal");

  btn.onclick = () => handleInput(label);
  buttons.appendChild(btn);
});

// Handle button input
function handleInput(key) {
  if (key === "AC") {
    current = "";
  } else if (key === "⌫") {
    current = current.slice(0, -1);
  } else if (key === "=") {
    try {
      const result = eval(current.replace("×", "*").replace("÷", "/").replace("−", "-"));
      current = result.toString();
    } catch {
      current = "Error";
    }
  } else if (key === "↔") {
    current = current.startsWith("-") ? current.slice(1) : "-" + current;
  } else {
    current += key;
  }

  display.textContent = current || "0";
}
