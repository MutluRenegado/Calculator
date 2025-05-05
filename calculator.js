const buttons = [
  // Number and operation buttons
  { text: '7' }, { text: '8' }, { text: '9' }, { text: '*' },
  { text: '4' }, { text: '5' }, { text: '6' }, { text: '-' },
  { text: '1' }, { text: '2' }, { text: '3' }, { text: '+' },
  { text: '0' }, { text: '.', class: 'special-btn' }, { text: '=', class: 'special-btn' },
  
  // Right column special buttons
  { text: 'C', class: 'special-btn' },
  { text: 'Ans', class: 'special-btn' },
  { text: '+-', class: 'special-btn' },
  { text: '%', class: 'special-btn' },
  
  // Division button (placing it after the special buttons)
  { text: '/' }
];

const calculatorButtons = document.getElementById('buttons');
const resultScreen = document.getElementById('result');

// Render buttons dynamically
buttons.forEach(button => {
  const btnElement = document.createElement('button');
  btnElement.innerText = button.text;
  if (button.class) {
    btnElement.classList.add(button.class);
  }
  btnElement.addEventListener('click', () => handleButtonClick(button.text));
  calculatorButtons.appendChild(btnElement);
});

function handleButtonClick(value) {
  if (value === 'C') {
    resultScreen.value = ''; // Clear screen
  } else if (value === 'Ans') {
    resultScreen.value = resultScreen.value || 'No answer yet'; // Store and show answer
  } else if (value === '+-' && resultScreen.value !== '') {
    // Negate the current number
    resultScreen.value = resultScreen.value.charAt(0) === '-' ? resultScreen.value.slice(1) : '-' + resultScreen.value;
  } else if (value === '%') {
    // Convert current value to percentage
    resultScreen.value = (parseFloat(resultScreen.value) / 100).toString();
  } else if (value === '=') {
    try {
      resultScreen.value = eval(resultScreen.value); // Evaluate the expression
    } catch (error) {
      resultScreen.value = 'Error'; // Handle invalid expressions
    }
  } else {
    resultScreen.value += value; // Append button value to the screen
  }
}
