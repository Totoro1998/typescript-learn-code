import "reflect-metadata";

const INJECTABLE_KEY = Symbol("injectable");

function Injectable() {
  return function (target: any) {
    Reflect.defineMetadata(INJECTABLE_KEY, true, target);
  };
}

function isInjectable(target: any): boolean {
  return Reflect.hasMetadata(INJECTABLE_KEY, target);
}

@Injectable()
class MyService {}

console.log(isInjectable(MyService)); // 输出: true
