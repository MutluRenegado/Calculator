const config = {
  keys: [
    ["2nd", "deg", "sin", "cos", "tan"],
    ["xY", "lg", "ln", "(", ")"],
    ["√x", "AC", "⌫", "%", "÷"],
    ["X!", "7", "8", "9", "×"],
    ["1/X", "4", "5", "6", "-"],
    ["π", "1", "2", "3", "+"],
    ["C", "0", ".", "=", "<"]
  ]
};

const buttonsContainer = document.getElementById("buttons");

config.keys.forEach(row => {
  row.forEach(key => {
    const button = document.createElement("button");
    button.textContent = key;
    button.classList.add("button");
    buttonsContainer.appendChild(button);
  });
});

document.querySelectorAll(".button").forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    const resultScreen = document.getElementById("result");

    switch (value) {
      case "=":
        try {
          resultScreen.value = eval(resultScreen.value.replace(/×/g, '*').replace(/÷/g, '/'));
        } catch {
          resultScreen.value = "Error";
        }
        break;
      case "AC":
        resultScreen.value = "";
        break;
      case "⌫":
        resultScreen.value = resultScreen.value.slice(0, -1);
        break;
      case "2nd":
        // Handle secondary functions if needed
        break;
      default:
        resultScreen.value += value;
    }
  });
});
