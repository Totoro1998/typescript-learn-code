function logProperty(target: any, propertyKey: string) {
  let value = target[propertyKey];

  // 使用闭包保存原始值并重写getter和setter
  const getter = function () {
    console.log(`Get value of ${propertyKey}: ${value}`);
    return value;
  };

  const setter = function (newValue: any) {
    console.log(`Set value of ${propertyKey}: ${newValue}`);
    value = newValue;
  };

  // 替换属性为自定义的getter和setter
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class Test {
  @logProperty
  public myProperty: string;

  constructor(initialValue: string) {
    this.myProperty = initialValue;
  }
}

const test = new Test("initial value");
test.myProperty = "new value"; // 输出: Set value of myProperty: new value
console.log(test.myProperty); // 输出: Get value of myProperty: new value
