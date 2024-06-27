import "reflect-metadata";

const ROUTE_KEY = Symbol("route");

function Get(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(ROUTE_KEY, { method: "GET", path }, target, propertyKey);
  };
}

class MyController {
  @Get("/users")
  getUsers() {
    console.log("Getting users");
  }
}

// 获取路由元数据
const route = Reflect.getMetadata(ROUTE_KEY, MyController.prototype, "getUsers");
console.log(route); // 输出: { method: 'GET', path: '/users' }
