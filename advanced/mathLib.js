const mathLib = {
  // Trigonometric functions
  sin: (x, deg = false) => deg ? Math.sin(x * Math.PI / 180) : Math.sin(x),
  cos: (x, deg = false) => deg ? Math.cos(x * Math.PI / 180) : Math.cos(x),
  tan: (x, deg = false) => deg ? Math.tan(x * Math.PI / 180) : Math.tan(x),

  // Inverse Trig
  asin: (x, deg = false) => deg ? Math.asin(x) * 180 / Math.PI : Math.asin(x),
  acos: (x, deg = false) => deg ? Math.acos(x) * 180 / Math.PI : Math.acos(x),
  atan: (x, deg = false) => deg ? Math.atan(x) * 180 / Math.PI : Math.atan(x),

  // Hyperbolic
  sinh: (x) => Math.sinh(x),
  cosh: (x) => Math.cosh(x),
  tanh: (x) => Math.tanh(x),

  // Power and root
  power: (base, exponent) => Math.pow(base, exponent),
  sqrt: (x) => Math.sqrt(x),
  inverse: (x) => 1 / x,

  // Logarithmic
  log10: (x) => Math.log10(x),
  ln: (x) => Math.log(x),
  logBase: (x, base) => Math.log(x) / Math.log(base),

  // Factorial
  factorial: (n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  },

  // Rounding
  round: (x, decimals = 0) => Number(Math.round(x + "e" + decimals) + "e-" + decimals),
  floor: (x) => Math.floor(x),
  ceil: (x) => Math.ceil(x),

  // Constants
  pi: () => Math.PI,
  e: () => Math.E,

  // Percentage and sign
  percent: (x) => x / 100,
  negate: (x) => -x,

  // Random
  random: (min = 0, max = 1) => Math.random() * (max - min) + min,
};

export default mathLib;

