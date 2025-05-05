const buttons = [
  { text: '/', class: '' },
  { text: '7' }, { text: '8' }, { text: '9' }, { text: '*' },
  { text: '4' }, { text: '5' }, { text: '6' }, { text: '-' },
  { text: '1' }, { text: '2' }, { text: '3' }, { text: '+' },
  { text: '0' }, { text: '.', class: 'special-btn' }, { text: '=', class: 'special-btn' },
  { text: 'C', class: 'special-btn' },
  { text: 'Ans', class: 'special-btn' },
  { text: '+-', class: 'special-btn' },
  { text: '%', class: 'special-btn' }
];

const buttonsContainer = document.getElementById("buttons");
const resultInput = document.getElementById("result");
let lastAnswer = '';
let darkToggle = document.getElementById("toggleDark");

buttons.forEach(btn => {
  const button = document.createElement("button");
  button.innerText = btn.text;
  button.className = btn.class || '';
  button.addEventListener("click", () => handleInput(btn.text));
  buttonsContainer.appendChild(button);
});

document.getElementById("clearBtn").addEventListener("click", () => {
  resultInput.value = '';
});

function handleInput(value) {
  if (value === '=') {
    try {
      let res = eval(resultInput.value.replace('%', '/100'));
      resultInput.value = res;
      lastAnswer = res;
    } catch {
      resultInput.value = 'Error';
    }
  } else if (value === 'C') {
    resultInput.value = '';
  } else if (value === 'Ans') {
    resultInput.value += lastAnswer;
  } else if (value === '+-') {
    if (resultInput.value.startsWith('-')) {
      resultInput.value = resultInput.value.slice(1);
    } else {
      resultInput.value = '-' + resultInput.value;
    }
  } else {
    resultInput.value += value;
  }
}

// Dark mode toggle
darkToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", darkToggle.checked);
});

// Keyboard input
document.addEventListener("keydown", (e) => {
  const key = e.key;

  const validKeys = '0123456789/*-+.=%';
  if (validKeys.includes(key)) {
    handleInput(key);
    highlightButton(key);
  } else if (key === 'Enter') {
    handleInput('=');
    highlightButton('=');
  } else if (key === 'Backspace') {
    resultInput.value = resultInput.value.slice(0, -1);
  } else if (key === 'Escape') {
    resultInput.value = '';
  }
});

// Button press effect via keyboard
function highlightButton(key) {
  const map = {
    '*': '*',
    '/': '/',
    '+': '+',
    '-': '-',
    '=': '=',
    '.': '.',
    '%': '%'
  };

  const button = Array.from(document.querySelectorAll("button"))
    .find(btn => btn.innerText === (map[key] || key));
  if (button) {
    button.classList.add("pressed");
    setTimeout(() => button.classList.remove("pressed"), 150);
  }
}
