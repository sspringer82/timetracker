function add(a, b) {
  return a + b;
}

function calculate() {
  return void add(2, 2);
}

const result = calculate();
console.log(result);
