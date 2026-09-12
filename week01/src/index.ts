//sum 함수 작성

function sum1(a: number, b: number): number {
  return a + b;
}
//2
const sum2 = (a: number, b: number): number => {
  return a + b;
};

console.log(sum1(10, 20));
console.log(sum2(5, 5));

//console.log() 에러없이 실행하는 sum 함수 작성
function sum3(a: number, b?: number, c?: number): number {
  return a + (b ?? 0) + (c ?? 0);
}

console.log(sum3(10));
console.log(sum3(10, 20));
console.log(sum3(10, 20, 30));

//함수 호출 시그니처를 사용하여

let sum4: (a: number, b?: number, c?: number) => number;
sum4 = function (a, b, c) {
  return a + (b ?? 0) + (c ?? 0);
};
console.log(sum4(10));
console.log(sum4(10, 20));
console.log(sum4(10, 20, 30));

//실습4
interface Developer {
  name: string;
  skill: string;
}

interface Person {
  name: string;
  age: number;
}

const introduce = (): Developer | Person => {
  return { name: "Kim", age: 20, skill: "React" };
};

let kim = introduce();

/* Kim을 매개변수로 받아 Kim의 타입이 Developer인지 판단하는 사용자 정의 타입 가드 함수 isDeveloper를 작성해주세요. */
function isDeveloper(target: Developer | Person): target is Developer {
  return (target as Developer).skill !== undefined;
}

if (!isDeveloper(kim)) {
  console.log(kim.age);
} else {
  console.log(kim.skill);
}

//인터페이스 실습1

interface Sum {
  (a: number, b: number): number;
}

const Sum1: Sum = (a, b) => {
  return a + b;
};

console.log(Sum1(1, 2));

//인터페이스 실습2
interface Person {
  name: string;
  age: number;
}

interface Me extends Person {
  phone: string;
}

const me: Me = {
  name: "Gabin",
  age: 24,
  phone: "010-8888-8888",
};

console.log(me);
