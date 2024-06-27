// 模拟权限控制装饰器
function checkPermission(permission: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      // 模拟权限检查
      if (permission === "admin") {
        return originalMethod.apply(this, args);
      } else {
        throw new Error(`Permission denied for method ${propertyKey}`);
      }
    };

    return descriptor;
  };
}

// 使用装饰器 checkPermission
class AdminPanel {
  @checkPermission("admin")
  static clearAll() {
    console.log("Clear All");
  }
  @checkPermission("admin")
  deleteAllData() {
    console.log("All data deleted!");
  }

  @checkPermission("user")
  viewDashboard() {
    console.log("Viewing dashboard...");
  }
}

// 测试
const admin = new AdminPanel();
admin.deleteAllData(); // 输出: All data deleted!

// admin.viewDashboard(); // 抛出错误: Permission denied for method viewDashboard
AdminPanel.clearAll();
