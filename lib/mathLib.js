const mathLib = {
  // Basic Arithmetic Operations
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b === 0 ? "Error" : a / b,

  // Trigonometric Functions
  sin: (x, deg = false) => deg ? Math.sin(toRad(x)) : Math.sin(x),
  cos: (x, deg = false) => deg ? Math.cos(toRad(x)) : Math.cos(x),
  tan: (x, deg = false) => deg ? Math.tan(toRad(x)) : Math.tan(x),
  asin: (x, deg = false) => deg ? toDeg(Math.asin(x)) : Math.asin(x),
  acos: (x, deg = false) => deg ? toDeg(Math.acos(x)) : Math.acos(x),
  atan: (x, deg = false) => deg ? toDeg(Math.atan(x)) : Math.atan(x),

  // Hyperbolic Functions
  sinh: (x) => Math.sinh(x),
  cosh: (x) => Math.cosh(x),
  tanh: (x) => Math.tanh(x),

  // Power and Root
  power: (base, exp) => Math.pow(base, exp),
  sqrt: (x) => Math.sqrt(x),
  cbrt: (x) => Math.cbrt(x),  // Cube root
  inverse: (x) => x === 0 ? "Error" : 1 / x,
  abs: (x) => Math.abs(x), // Absolute value

  // Logarithmic Functions
  log10: (x) => Math.log10(x),
  ln: (x) => Math.log(x),
  logBase: (x, base) => Math.log(x) / Math.log(base), // Logarithm with custom base

  // Factorial and Combinatorics
  factorial: (x) => {
    if (x < 0) return "Error";
    if (x === 0) return 1;
    return x * mathLib.factorial(x - 1);
  },
  combinations: (n, r) => {
    return mathLib.factorial(n) / (mathLib.factorial(r) * mathLib.factorial(n - r));
  },
  permutations: (n, r) => {
    return mathLib.factorial(n) / mathLib.factorial(n - r);
  },

  // Special Functions
  percent: (x, total) => (x / total) * 100,
  negate: (x) => -x,
  pi: () => Math.PI,
  e: () => Math.E, // Euler's number

  // Angle Conversion
  toRad: (deg) => deg * (Math.PI / 180),
  toDeg: (rad) => rad * (180 / Math.PI),

  // Random Number Functions
  random: (min = 0, max = 1) => Math.random() * (max - min) + min, // Random number in range [min, max]

  // Rounding Functions
  round: (x, decimals = 0) => Number(Math.round(x + 'e' + decimals) + 'e-' + decimals), // Round to specific decimal places
  floor: (x) => Math.floor(x),  // Round down
  ceil: (x) => Math.ceil(x),    // Round up

  // Store previous answer
  ans: 0,
};

export default mathLib;

