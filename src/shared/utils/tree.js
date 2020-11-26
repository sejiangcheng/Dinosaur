import React from "react";
import { HIERARCHY_TYPE } from "@/constants/hierarchy";

export function generateTreeData(data, fieldNames) {
  if (!fieldNames) {
    fieldNames = { title: "Name", key: "Id", children: "Children" };
  }
  if (data && !(data instanceof Array)) {
    data = [data];
  }
  data.forEach(node => {
    loopNode(node, fieldNames);
  });
  return data;
}

function loopNode(node, fieldNames) {
  const titleName = fieldNames.title;
  const keyName = fieldNames.key;
  const childrenName = fieldNames.children;
  if (node[titleName]) {
    node.title = node[titleName];
  }
  if (node[keyName]) {
    node.key = node[keyName];
  }
  if (node[childrenName]) {
    node.children = node[childrenName];
    if (node.children.length > 0) {
      node.children.forEach(n => {
        loopNode(n, fieldNames);
      });
    }
  }
}

export const loopNodeCheckable = (node, processNode, extraInfo) => {
  if (node instanceof Array) {
    node.forEach(n => {
      loopNodeCheckable(n, processNode, extraInfo);
    });
  }
  processNode(node, extraInfo);
  if (node && node.Children && node.Children.length > 0 && node.Id) {
    node.Children.forEach((child, i) => {
      if (child) {
        child._ParentId = node.Id;
        child.index = i;
        // child.parent = node;
      }
      loopNodeCheckable(child, processNode, extraInfo);
    });
  }
};
// export function generateTreeDataCheckable(
//   data,
//   checkCondition,
//   hierarchyMap,
//   fieldNames
// ) {
//   const checkedKeys = [];
//   if (!fieldNames) {
//     fieldNames = { title: "Name", key: "Id", children: "Children" };
//   }
//   if (data && !(data instanceof Array)) {
//     data = [data];
//   }
//   data.forEach(node => {
//     loopNodeCheckable(
//       node,
//       checkCondition,
//       hierarchyMap,
//       checkedKeys,
//       fieldNames
//     );
//   });
//   return { treeData: data, checkedKeys };
// }

// function loopNodeCheckable(
//   node,
//   checkCondition,
//   hierarchyMap,
//   checkedKeys,
//   fieldNames,
//   parentId,
//   customerId
// ) {
//   const titleName = fieldNames.title;
//   const keyName = fieldNames.key;
//   const childrenName = fieldNames.children;
//   if (node[titleName]) {
//     node.title = node[titleName];
//   }
//   if (node[keyName]) {
//     node.key = node[keyName];
//   }
//   if (node.Type === HIERARCHY_TYPE.Customer) {
//     customerId = node.key;
//   }
//   hierarchyMap[node.key] = {
//     ...node,
//     parentId,
//     customerId,
//     children: null,
//     Children: null
//   };
//   if (node.Type === HIERARCHY_TYPE.Building) {
//     node.checkable = true;
//     if (checkCondition(node)) {
//       checkedKeys.push(node.key);
//     }
//   } else {
//     node.checkable = false;
//     node.title = (
//       <span>
//         <span>{node.title}</span>
//         <a>全选</a>
//       </span>
//     );
//   }
//   if (node[childrenName] && node[childrenName].length > 0) {
//     node.children = node[childrenName];
//     if (node.children.length > 0) {
//       node.children.forEach(n => {
//         loopNodeCheckable(
//           n,
//           checkCondition,
//           hierarchyMap,
//           checkedKeys,
//           fieldNames,
//           node.key,
//           customerId
//         );
//       });
//     }
//   } else {
//     node.isLeaf = true;
//   }
// }
