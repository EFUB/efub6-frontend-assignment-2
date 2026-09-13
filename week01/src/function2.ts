function sum(a: number, b?: number, c?: number): number {
  return a + (b ?? 0) + (c ?? 0);
}

console.log(sum(10)); // 10
console.log(sum(10, 20)); // 30
console.log(sum(10, 20, 30)); // 60