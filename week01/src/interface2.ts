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
  phone: "010-1886-2024"
};

console.log(me);