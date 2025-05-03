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

// Dynamically create the calculator buttons
const buttonsContainer = document.getElementById('buttons');

config.keys.forEach(row => {
  const rowElement = document.createElement('div');
  rowElement.classList.add('button-row');
  
  row.forEach(key => {
    const button = document.createElement('button');
    button.textContent = key;
    button.classList.add('button');
    rowElement.appendChild(button);
  });
  
  buttonsContainer.appendChild(rowElement);
});

// Button functionality logic
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', function () {
    const value = button.textContent;
    const resultScreen = document.getElementById('result');
    
    if (value === "=") {
      try {
        resultScreen.value = eval(resultScreen.value);
      } catch (error) {
        resultScreen.value = "Error";
      }
    } else if (value === "AC") {
      resultScreen.value = "";
    } else if (value === "⌫") {
      resultScreen.value = resultScreen.value.slice(0, -1);
    } else if (value === "2nd") {
      // Handle 2nd function (if needed)
    } else {
      resultScreen.value += value;
    }
  });
});
