document.getElementById('calculatorTab').addEventListener('click', () => {
  document.getElementById('calculatorSection').style.display = 'block';
  document.getElementById('converterSection').style.display = 'none';
  document.getElementById('calculatorTab').classList.add('active');
  document.getElementById('converterTab').classList.remove('active');
});

document.getElementById('converterTab').addEventListener('click', () => {
  document.getElementById('calculatorSection').style.display = 'none';
  document.getElementById('converterSection').style.display = 'block';
  document.getElementById('converterTab').classList.add('active');
  document.getElementById('calculatorTab').classList.remove('active');
});

// Conversion logic
document.getElementById('fromValue').addEventListener('input', () => {
  const fromValue = parseFloat(document.getElementById('fromValue').value);
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;

  if (fromUnit === 'temperature' && toUnit === 'temperature') {
    const result = convertTemperature(fromValue);
    document.getElementById('toValue').value = result;
  }
  // You can add more conversions like currency here...
});

function convertTemperature(value) {
  // Example: Convert from Celsius to Fahrenheit
  return (value * 9/5) + 32;
}
