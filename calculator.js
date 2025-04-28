body {
  background: #d3d3d3; /* Light gray */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  font-family: Arial, sans-serif;
  transition: background 0.3s ease;
}

body.dark-mode {
  background: #111;
}

.calculator {
  background: #f0f0f0; /* Light container */
  border-radius: 15px;
  padding: 20px;
  width: 320px;
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background 0.3s ease, color 0.3s ease;
}

body.dark-mode .calculator {
  background: #222;
  color: #0ff;
}

.toggles {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.toggles label {
  color: #333;
  font-weight: 600;
  user-select: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

body.dark-mode .toggles label {
  color: #0ff;
}

.calculator-screen {
  width: 100%;
  height: 50px;
  font-size: 2rem;
  color: #fff;
  background: #333333; /* Dark gray */
  border: none;
  border-radius: 8px;
  text-align: right;
  padding: 0 15px;
  box-shadow: inset 0 0 8px #000;
  margin-bottom: 15px;
  user-select: none;
  transition: background 0.3s ease, color 0.3s ease;
}

body.dark-mode .calculator-screen {
  background: #111;
  color: #0ff;
  box-shadow: inset 0 0 15px #0ff;
}

.calculator-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  width: 100%;
  transition: all 0.3s ease;
}

.calculator-buttons.pro {
  grid-template-columns: repeat(6, 1fr);
}

button {
  padding: 15px 0;
  font-size: 1.4rem;
  border: none;
  border-radius: 10px;
  color: #fff;
  background: #6a0dad; /* Purple */
  box-shadow:
    0 0 5px #6a0dad,
    inset 0 0 5px #6a0dad;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

button:hover {
  background: #7f39fb;
  box-shadow:
    0 0 15px #7f39fb,
    inset 0 0 15px #7f39fb;
}

button.equals {
  background: #d81e5b; /* Dark pink/red */
  grid-column: 4 / 5; /* On the rightmost column */
  box-shadow:
    0 0 10px #d81e5b,
    inset 0 0 10px #d81e5b;
  font-weight: bold;
}

button.equals:hover {
  background: #b71c3a;
  box-shadow:
    0 0 20px #b71c3a,
    inset 0 0 20px #b71c3a;
}

button.last-calc-btn {
  margin-top: 15px;
  padding: 10px 0;
  width: 100%;
  border-radius: 10px;
  background: #833471;
  font-weight: 600;
  font-size: 1.1rem;
  color: #fff;
  box-shadow:
    0 0 10px #833471,
    inset 0 0 10px #833471;
  cursor: pointer;
  transition: background 0.3s ease;
}

button.last-calc-btn:hover {
  background: #6c2761;
}

/* Dark mode button colors */
body.dark-mode button {
  background: #460d60;
  box-shadow:
    0 0 5px #0ff,
    inset 0 0 5px #0ff;
}

body.dark-mode button:hover {
  background: #752bc7;
  box-shadow:
    0 0 15px #0ff,
    inset 0 0 15px #0ff;
}

body.dark-mode button.equals {
  background: #b71c3a;
  box-shadow:
    0 0 20px #b71c3a,
    inset 0 0 20px #b71c3a;
}

body.dark-mode button.equals:hover {
  background: #d81e5b;
}

/* Invisible placeholders for grid alignment */
button.placeholder {
  visibility: hidden;
  pointer-events: none;
}
