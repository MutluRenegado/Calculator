document.addEventListener("DOMContentLoaded", () => {
  const config = {
    keys: [
      ["2nd", "deg", "sin", "cos", "tan"],
      ["xY", "lg", "ln", "(", ")"],
      ["√x", "AC", "⌫", "%", "÷"],
      ["X!", "7", "8", "9", "×"],
      ["1/X", "4", "5", "6", "-"],
      ["π", "1", "2", "3", "+"],
      ["C", "0", ".", "=", "<"]
    ].map(row =>
      row.map(label => {
        let cls = "";
        if (["AC", "⌫", "%", "÷", "ANS", "+-", "C", "="].includes(label)) {
          cls = "orange";
        }
        return { label, class: cls };
      })
    )
  };

  const display = document.getElementById("result"); // Fixed here
  const buttonsContainer = document.getElementById("buttons");

  let memory = "";
  let ans = "";

  // Clear pre-existing content (if hardcoded button exists)
  buttonsContainer.innerHTML = "";

  // Render buttons in flat layout
  config.keys.flat().forEach(({ label, class: cls }) => {
    const btn = document.createElement("button");
    btn.innerText = label;
    btn.className = cls ? `orange` : "";
    btn.addEventListener("click", () => handleInput(label));
    buttonsContainer.appendChild(btn);
  });

  function handleInput(label) {
    if (label === "AC") {
      memory = "";
    } else if (label === "⌫") {
      memory = memory.slice(0, -1);
    } else if (label === "=") {
      try {
        const evaluated = evaluateExpression(memory);
        ans = evaluated;
        memory = evaluated.toString();
      } catch {
        memory = "Error";
      }
    } else if (label === "ANS") {
      memory += ans;
    } else if (label === "+-") {
      if (memory) memory = (-parseFloat(memory)).toString();
    } else if (label === "π") {
      memory += Math.PI;
    } else if (label === "ln") {
      memory += "ln(";
    } else if (label === "lg") {
      memory += "log10(";
    } else if (label === "√x") {
      memory += "sqrt(";
    } else if (label === "xY") {
      memory += "^";
    } else if (label === "X!") {
      memory += "fact(";
    } else if (label === "1/X") {
      memory += "1/(";
    } else if (label === "sin" || label === "cos" || label === "tan") {
      memory += `${label}(`;
    } else {
      memory += label;
    }

    display.value = memory;
  }

  function evaluateExpression(expr) {
    expr = expr.replace(/×/g, "*").replace(/÷/g, "/").replace(/%/g, "/100");
    expr = expr.replace(/π/g, Math.PI);
    expr = expr.replace(/sqrt\(/g, "Math.sqrt(");
    expr = expr.replace(/ln\(/g, "Math.log(");
    expr = expr.replace(/log10\(/g, "Math.log10(");
    expr = expr.replace(/sin\(/g, "Math.sin(");
    expr = expr.replace(/cos\(/g, "Math.cos(");
    expr = expr.replace(/tan\(/g, "Math.tan(");
    expr = expr.replace(/fact\(/g, "factorial(");
    expr = expr.replace(/\^/g, "**");

    function factorial(n) {
      if (n < 0) return NaN;
      return n === 0 ? 1 : n * factorial(n - 1);
    }

    return Function("factorial", `return ${expr}`)(factorial);
  }
});
