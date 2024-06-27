// 类装饰器：日志记录，对所有类里面的方法做修改
function logMethods(target: any) {
  const originalMethods = Object.getOwnPropertyNames(target.prototype);

  originalMethods.forEach((methodName) => {
    const originalMethod = target.prototype[methodName];
    // 用新的方法替换原始方法
    target.prototype[methodName] = function (...args: any[]) {
      console.log(`Calling method ${methodName} with arguments ${JSON.stringify(args)}`);
      const start = Date.now();
      //  在类装饰器中，装饰器内部的 this 指向的是被装饰的类实例。
      const result = originalMethod.apply(this, args);
      const end = Date.now();
      console.log(`Method ${methodName} executed in ${end - start} ms`);
      return result;
    };
  });
}

// 使用装饰器 logMethods
@logMethods
class Calculator {
  add(x: number, y: number): number {
    return x + y;
  }

  subtract(x: number, y: number): number {
    return x - y;
  }
}

// 测试
const calc = new Calculator();
console.log(calc.add(3, 4)); // 输出: Calling method add with arguments [3,4]，Method add executed in 0 ms，7
console.log(calc.subtract(10, 5)); // 输出: Calling method subtract with arguments [10,5]，Method subtract executed in 0 ms，5
