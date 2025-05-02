const result = document.getElementById('result');
const buttons = document.querySelectorAll('.btn');
const clearBtn = document.getElementById('clearBtn');
const toggleMode = document.getElementById('toggleMode');
const toggleAdvanced = document.getElementById('toggleAdvanced');

let currentInput = '';

result.value = '0';

// Button input handler
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === '=') {
      try {
        currentInput = eval(currentInput).toString();
        result.value = currentInput;
      } catch {
        result.value = 'Error';
        currentInput = '';
      }
    } else {
      currentInput += value;
      result.value = currentInput;
    }
  });
});

// Clear functionality
clearBtn.addEventListener('click', () => {
  currentInput = '';
  result.value = '0';
});

// Dark mode toggle
toggleMode.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', toggleMode.checked);
});

// Advanced mode placeholder
toggleAdvanced.addEventListener('change', () => {
  if (toggleAdvanced.checked) {
    alert('Advanced mode is not implemented yet.');
  }
});
