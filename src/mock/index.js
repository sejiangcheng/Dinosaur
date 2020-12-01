//引入mockjs
import Mock from "mockjs";
Mock.XHR.prototype.withCredentials = true;
//使用mockjs模拟数据
Mock.mock(/delete/, "post", { Error: "0", Message: [""] });
Mock.mock(/save|update|create/, "post", { Error: "0", Message: [""] });
Mock.mock(/role\/.*\/roleprivileges/, "get", {
  Error: "0",
  Message: [""],
  Result: [
    {
      PackageName: "公共权限",
      Code: "Public",
      IsDefault: true, //不可修改的权限
      Features: [
        {
          Code: 1,
          Name: "资产管理地图",
          ActionCode: 1,
          ActionName: "完整权限"
        },
        {
          Code: 2,
          Name: "设备数据监视查看",
          Action: 1,
          ActionName: "完整权限"
        },
        {
          Code: 3,
          Name: "设备数据历史查看",
          Action: 1,
          ActionName: "完整权限"
        }
      ]
    },
    {
      PackageName: "资产管理",
      Code: "Asset",
      Features: [
        { Code: 4, Name: "资产基础信息", Action: 1, ActionName: "完整权限" },
        { Code: 5, Name: "资产运维参数", Action: 0, ActionName: "仅查看" },
        {
          Code: 6,
          Name: "数据监视显示设置",
          Action: 1,
          ActionName: "仅查看"
        },
        { Code: 7, Name: "文档管理", Action: 1, ActionName: "完整权限" }
      ]
    },
    {
      PackageName: "报警管理",
      Code: "Alarm",
      Features: [
        {
          Code: 8,
          Name: "服务商故障报警",
          Action: 1,
          ActionName: "完整权限"
        },
        { Code: 9, Name: "资产报警信息", Action: 1, ActionName: "完整权限" }
      ]
    }
  ]
});

Mock.mock(/role\/.*\/isused/, "get", {
  Error: "0",
  Message: [""],
  Result: true
});
Mock.mock(/role\/allroleprivileges/, "get", {
  Error: "0",
  Message: [""],
  Result: [
    {
      PackageName: "公共权限",
      Code: "Public",
      IsDefault: true, //不可修改的权限
      Features: [
        {
          Code: 1,
          Name: "资产管理地图",
          Actions: [
            { Code: 0, Name: "仅查看" },
            { Code: 1, Name: "完整权限", IsDefault: true }
          ]
        },
        {
          Code: 2,
          Name: "设备数据监视查看",
          Actions: [
            { Code: 0, Name: "仅查看" },
            { Code: 1, Name: "完整权限", IsDefault: true }
          ]
        },
        {
          Code: 3,
          Name: "设备数据历史查看",
          Actions: [
            { Code: 0, Name: "仅查看" },
            { Code: 1, Name: "完整权限", IsDefault: true }
          ]
        }
      ]
    },
    {
      PackageName: "资产管理",
      Code: "Asset",
      Features: [
        {
          Code: 4,
          Name: "资产基础信息",
          Actions: [
            { Code: 0, Name: "仅查看" },
            { Code: 1, Name: "完整权限", IsDefault: true }
          ]
        },
        {
          Code: 5,
          Name: "资产运维参数",
          Actions: [
            { Code: 0, Name: "仅查看" },
            { Code: 1, Name: "完整权限", IsDefault: true }
          ]
        },
        {
          Code: 6,
          Name: "数据监视显示设置",
          Actions: [
            { Code: 0, Name: "仅查看" },
            { Code: 1, Name: "完整权限", IsDefault: true }
          ]
        },
        {
          Code: 7,
          Name: "文档管理",
          Actions: [
            { Code: 0, Name: "仅查看" },
            { Code: 1, Name: "完整权限", IsDefault: true }
          ]
        },
        {
          Code: 8,
          Name: "设备历史数据导出",
          Actions: [
            { Code: 0, Name: "仅查看" },
            { Code: 1, Name: "完整权限", IsDefault: true }
          ]
        },
        {
          Code: 9,
          Name: "维护日志",
          Actions: [
            { Code: 0, Name: "仅查看" },
            { Code: 1, Name: "完整权限", IsDefault: true }
          ]
        },
        {
          Code: 10,
          Name: "注册设备",
          Actions: [
            { Code: 0, Name: "仅查看" },
            { Code: 1, Name: "完整权限", IsDefault: true }
          ]
        }
      ]
    },
    {
      PackageName: "报警管理",
      Code: "Alarm",
      Features: [
        {
          Code: 8,
          Name: "服务商故障报警",
          Actions: [
            { Code: 0, Name: "仅查看" },
            { Code: 1, Name: "完整权限", IsDefault: true }
          ]
        },
        {
          Code: 9,
          Name: "资产报警信息",
          Actions: [
            { Code: 0, Name: "仅查看" },
            { Code: 1, Name: "完整权限", IsDefault: true }
          ]
        },
        {
          Code: 10,
          Name: "报警短信通知设置",
          Actions: [
            { Code: 0, Name: "仅查看" },
            { Code: 1, Name: "完整权限", IsDefault: true }
          ]
        }
      ]
    }
  ]
});
Mock.mock(/\/api\/user\/.*\/usercustomers/, "get", {
  Error: "0",
  Message: [""],
  Result: {
    data: [
      {
        Id: 10000,
        Name: "XXX客户",
        Type: -1,
        IsAuthorized: true,
        Version: null,
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
        IsAuthorized: true,
        Version: null,
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
