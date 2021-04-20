const name = "john",
  age = 24,
  sayHello = "hello";

const say = (name: string, age: number, sayHello: string): void => {
  console.log(`${name}(${age}): ${sayHello}`);
};

say(name, age, sayHello);

export {};
