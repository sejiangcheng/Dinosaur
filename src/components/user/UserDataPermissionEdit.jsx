import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataPermission } from "@/actions/user/edit";
import { HIERARCHY_TYPE } from "@/constants/hierarchy";
import CustomTree from "@/shared/components/tree";
export default function UserDataPermissionEdit(props) {
  const dispatch = useDispatch();
  const [hierarchyMap] = useState({});
  const { currentUserDataPermission } = useSelector(
    state => state.platform.user
  );
  const onChange = keys => {
    keys.forEach(key => {
      const node = hierarchyMap[key];
      node.HasDataPrivilege = true;
    });
    const privileges =
      currentUserDataPermission &&
      currentUserDataPermission
        .filter(n => n.Type === HIERARCHY_TYPE.Customer)
        .map(customer => {
          const { Id, Name, IsAuthorized, Version } = customer;
          const customerPermission = {
            CustomerId: Id,
            CustomerName: Name,
            IsAuthorized,
            Version,
            HierarchyIds: []
          };
          keys.forEach(key => {
            const node = hierarchyMap[key];
            const { parentIds } = node;
            if (parentIds.includes(Id)) {
              customerPermission.HierarchyIds.push(key);
            }
          });
          return customerPermission;
        });
    dispatch(setDataPermission(privileges));
  };

  return (
    <div className="data-permission-tree-edit">
      <CustomTree
        titleName="Name"
        checked={node => node.HasDataPrivilege}
        hierarchyMap={hierarchyMap}
        treeDataSource={currentUserDataPermission}
        checkable={true}
        onCheck={onChange}
        checkableCondition={node => {
          return node.Type === HIERARCHY_TYPE.Building;
        }}
        selectAllCondition={node => {
          return node.Type !== HIERARCHY_TYPE.Building;
        }}
        defaultExpandAll={true}
      />
    </div>
  );
}
