import "reflect-metadata";

const VALIDATION_KEY = Symbol("validation");

function MinLength(length: number) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata(VALIDATION_KEY, length, target, propertyKey);
  };
}

class User {
  @MinLength(5)
  username: string;

  constructor(username: string) {
    this.username = username;
  }
}

function validateUser(user: User): boolean {
  const minLength = Reflect.getMetadata(VALIDATION_KEY, user, "username");
  return user.username.length >= minLength;
}

const user = new User("Alice");
console.log(validateUser(user)); // 输出: true or false based on the length of username
