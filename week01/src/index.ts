// 아래 명령을 오류 없이 수행하는 두 개의 매개변수를 갖는 sum 함수를 작성하세요
console.log(sum(1, 2)); // 3

function sum(a: number, b: number): number {
  return a + b;
}

const sum2 = (a: number, b: number): number => {
  return a + b;
};

// 아래 3가지 console.log()를 모두 오류 없이 실행하는 sum 함수를 작성하세요 (힌트: optional 매개변수)
console.log(sum3(10)); // 10
console.log(sum3(10, 20)); // 30
console.log(sum3(10, 20, 30)); // 60

function sum3(a: number, b?: number, c?: number): number {
  return a + (b ?? 0) + (c ?? 0);
}

/* 함수 호출 시그니처를 이용하여 다음 코드가 오류 없이
   미리 함수의 타입을 지정할 수 있도록 코드를 추가하여 수정해주세요 */
let sum5: (a: number, b?: number, c?: number) => number;

sum5 = function (a, b, c) {
  return a + (b ?? 0) + (c ?? 0);
};

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

/* Kim을 매개변수로 받아 Kim의 타입이 Developer인지 판단하는
   사용자 정의 타입 가드 함수 isDeveloper를 작성해주세요 */
const isDeveloper = (target: Developer | Person): target is Developer => {
  return (target as Developer).skill !== undefined;
};

if (!isDeveloper(kim)) {
  console.log(kim.age);
} else {
  console.log(kim.skill);
}

// 오류가 발생하지 않도록 함수 타입을 지정하는 인터페이스 Sum을 작성하세요
interface Sum {
  (a: number, b: number): number;
}

const sum6: Sum = (a, b) => {
  return a + b;
};

console.log(sum6(1, 2));

interface Person {
  name: string;
  age: number;
}

// 오류가 발생하지 않도록 Person 인터페이스를 상속받고
// phone 프로퍼티를 추가한 인터페이스 Me를 선언하세요

interface Me extends Person {
  phone: string;
}

const me: Me = {
  name: "Gabin",
  age: 24,
  phone: "010-1234-5678",
};

console.log(me);
