let display = document.getElementById('display');
let lastAnswer = '';

function buttonClicked(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    lastAnswer = eval(display.value);
    display.value = lastAnswer;
  } catch {
    display.value = 'Error';
  }
}

function useAnswer() {
  display.value += lastAnswer;
}

function toggleSign() {
  if (display.value) {
    try {
      display.value = String(eval(display.value + "* -1"));
    } catch {
      display.value = 'Error';
    }
  }
}
