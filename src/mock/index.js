//引入mockjs
import Mock from "mockjs";
Mock.XHR.prototype.withCredentials = true;
//使用mockjs模拟数据
Mock.mock(/delete/, "post", { Error: "0", Message: [""] });
Mock.mock(/\/api\/user\/.*\/usercustomers/, "get", {
  Error: "0",
  Message: [""],
  Result: {
    data: [
      {
        Id: 10000,
        Name: "XXX客户",
        Type: -1,
        HasDataPrivilege: true,
        Children: [
          {
            Id: 10001,
            Name: "XXX建筑2",
            Type: 2,
            HasDataPrivilege: true
          }
        ]
      },
      {
        Id: 10002,
        Name: "XXXX客户",
        Type: -1,
        HasDataPrivilege: true,
        Children: [
          {
            Id: 10003,
            Name: "XXX组织2",
            Type: 0,
            HasDataPrivilege: true,
            Children: [
              {
                Id: 10004,
                Name: "XXX园区",
                Type: 1,
                HasDataPrivilege: true,
                Children: [
                  {
                    Id: 10005,
                    Name: "XXX建筑1",
                    HasDataPrivilege: false,
                    Type: 2
                  }
                ]
              },
              {
                Id: 10006,
                Name: "XXX建筑",
                HasDataPrivilege: true,
                Type: 2
              }
            ]
          }
        ]
      }
    ],
    hasAllPermissions: false
  }
  //data里的属性看不懂，需要详细看语法规范,博客链接:https://www.jianshu.com/p/4579f40e6108
});
