const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearBtn = document.getElementById('clear');
const equalBtn = document.getElementById('equal');
const proToggle = document.getElementById('proToggle');
const proButtonsGroup = document.querySelector('.pro-buttons');

let expression = '';

proToggle.addEventListener('change', () => {
  proButtonsGroup.classList.toggle('hidden', !proToggle.checked);
});

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (value) {
      expression += value;
      display.value = expression;
    }
  });
});

clearBtn.addEventListener('click', () => {
  expression = '';
  display.value = '';
});

equalBtn.addEventListener('click', () => {
  try {
    // eval supports Math.sqrt if explicitly in the string
    const result = eval(expression);
    expression = result.toString();
    display.value = expression;
  } catch (e) {
    display.value = 'Error';
    expression = '';
  }
});
