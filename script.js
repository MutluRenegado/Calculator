let currentCalculation = "";
let lastCalculation = "";

const result = document.getElementById('display');

function buttonClicked(value) {
  if (value === '=') {
    calculateResult();
  } else if (value === '⌫') {
    currentCalculation = currentCalculation.slice(0, -1);
    result.value = currentCalculation;
  } else if (value === 'ANS') {
    const lastAns = lastCalculation.split('=')[1]?.trim();
    if (lastAns) {
      currentCalculation += lastAns;
      result.value = currentCalculation;
    }
  } else if (value === '±') {
    if (currentCalculation.startsWith('-')) {
      currentCalculation = currentCalculation.slice(1);
    } else {
      currentCalculation = '-' + currentCalculation;
    }
    result.value = currentCalculation;
  } else {
    currentCalculation += value;
    result.value = currentCalculation;
  }
}

function calculateResult() {
  try {
    const evaluated = eval(currentCalculation);
    lastCalculation = `${currentCalculation} = ${evaluated}`;
    currentCalculation = evaluated.toString();
    result.value = currentCalculation;
  } catch {
    result.value = "Error";
    currentCalculation = "";
  }
}

function clearDisplay() {
  currentCalculation = "";
  result.value = "";
}

function handleKeyboardInput(event) {
  const key = event.key;

  if (/\d/.test(key) || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
    buttonClicked(key);
  }

  if (key === 'Enter') {
    event.preventDefault();
    buttonClicked('=');
  }

  if (key === 'Backspace') {
    buttonClicked('⌫');
  }

  if (key.toUpperCase() === 'A') {
    buttonClicked('ANS');
  }

  if (key === ' ') {
    buttonClicked('±');
  }
}

document.addEventListener('keydown', handleKeyboardInput);
