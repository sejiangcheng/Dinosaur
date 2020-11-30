export function generateTreeData(
  data,
  fieldNames,
  hierarchyMap,
  checkableCondition,
  checkedKeys,
  checked
) {
  if (!fieldNames) {
    fieldNames = { title: "Name", key: "Id", children: "Children" };
  }
  if (data && !(data instanceof Array)) {
    data = [data];
  }
  data.forEach(node => {
    loopNode(
      node,
      fieldNames,
      hierarchyMap,
      checkableCondition,
      checkedKeys,
      checked
    );
  });
  return data;
}

function loopNode(
  node,
  fieldNames,
  hierarchyMap,
  checkableCondition,
  checkedKeys,
  checked
) {
  const titleName = fieldNames.title;
  const keyName = fieldNames.key;
  const childrenName = fieldNames.children;

  if (hierarchyMap) {
    if (!hierarchyMap[String(node[keyName])]) {
      hierarchyMap[String(node[keyName])] = node;
      node.childrenIds = [];
      node.parentIds = [];
    }
  }
  if (node[titleName]) {
    node.title = node[titleName];
  }
  if (node[keyName]) {
    node.key = node[keyName];
  }
  if (checkableCondition) {
    node.checkable = checkableCondition(node);
  }
  if (node.checkable !== false) {
    if (checked && checked(node)) {
      checkedKeys.push(String(node.key));
    }
  }
  if (node[childrenName]) {
    node.children = node[childrenName];
    if (node.children.length > 0) {
      node.children.forEach(n => {
        //each node knows all of its parents and all of its (checkable) children
        if (hierarchyMap) {
          hierarchyMap[String(n[keyName])] = n;
          n.childrenIds = [];
          n.parentIds = [
            ...hierarchyMap[String(node[keyName])].parentIds,
            node[keyName]
          ];

          if (
            !checkableCondition ||
            (checkableCondition && checkableCondition(n))
          ) {
            hierarchyMap[String(n[keyName])].parentIds.forEach(parentId => {
              const parentNode = hierarchyMap[String(parentId)];
              if (!parentNode.childrenIds.includes(n[keyName])) {
                parentNode.childrenIds.push(String(n[keyName]));
              }
            });
          }
        }
        loopNode(
          n,
          fieldNames,
          hierarchyMap,
          checkableCondition,
          checkedKeys,
          checked
        );
      });
    } else {
      node.isLeaf = true;
    }
  } else {
    node.isLeaf = true;
  }
}
