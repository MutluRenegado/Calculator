// Get references to the calculators and buttons
const basicCalculator = document.getElementById('basic-calculator');
const advancedCalculator = document.getElementById('advanced-calculator');
const simpleModeBtn = document.getElementById('simpleModeBtn');
const advancedModeBtn = document.getElementById('advancedModeBtn');
const financialModeBtn = document.getElementById('financialModeBtn');

// Function to toggle calculators
function toggleCalculator(mode) {
  switch(mode) {
    case 'simple':
      basicCalculator.style.display = 'block';
      advancedCalculator.style.display = 'none';
      break;
    case 'advanced':
      basicCalculator.style.display = 'none';
      advancedCalculator.style.display = 'block';
      break;
    case 'financial':
      // Implement financial calculator view if needed
      alert("Financial calculator is under development.");
      break;
    default:
      basicCalculator.style.display = 'block';
      advancedCalculator.style.display = 'none';
      break;
  }
}

// Add event listeners to the toggle buttons
simpleModeBtn.addEventListener('click', () => toggleCalculator('simple'));
advancedModeBtn.addEventListener('click', () => toggleCalculator('advanced'));
financialModeBtn.addEventListener('click', () => toggleCalculator('financial'));

// Optionally: You can also add a default view when the page loads
window.onload = () => toggleCalculator('simple');

