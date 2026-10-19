interface Sum {
  (a: number, b: number): number;
}

const sum: Sum = (a, b) => {
  return a + b;
};

console.log(sum(1, 2)); // 3