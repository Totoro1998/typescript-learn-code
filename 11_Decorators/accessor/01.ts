function logAccess(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalGetter = descriptor.get;
  const originalSetter = descriptor.set;

  if (originalGetter) {
    descriptor.get = function () {
      const value = originalGetter.call(this);
      console.log(`Get ${propertyKey}: ${value}`);
      return value;
    };
  }

  if (originalSetter) {
    descriptor.set = function (value) {
      console.log(`Set ${propertyKey}: ${value}`);
      originalSetter.call(this, value);
    };
  }
}

class Example {
  private _value: string = "initial value";

  @logAccess
  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
  }
}

const example = new Example();
example.value = "new value"; // 输出: Set value: new value
console.log(example.value); // 输出: Get value: new value
