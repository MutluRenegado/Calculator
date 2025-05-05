const simLibMath = {
  // Basic Math Operations
  add: (x, y) => x + y,
  subtract: (x, y) => x - y,
  multiply: (x, y) => x * y,
  divide: (x, y) => y !== 0 ? x / y : 'Error: Division by zero',

  // Negate the number (for +-, similar to toggle sign)
  negate: (x) => -x,

  // Percentage Calculation
  percent: {
    of: (x, percentage) => (x * percentage) / 100, // Percentage of a number
    add: (x, percentage) => x + (x * percentage) / 100, // Adding percentage to a number
    subtract: (x, percentage) => x - (x * percentage) / 100, // Subtracting percentage from a number
  },

  // Store previous result as ANS
  ans: '',

  // Clear the current input (reset value)
  clear: () => '',

  // Decimal point handler (for numbers with decimal)
  appendDecimal: (currentInput) => currentInput.includes('.') ? currentInput : currentInput + '.',

  // Update the stored ANS value
  setAns: (value) => {
    simLibMath.ans = value;
    return simLibMath.ans;
  },

  // Get the stored ANS value
  getAns: () => simLibMath.ans
};

export default simLibMath;
