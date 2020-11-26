import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHierarchyIcon } from "@/shared/utils/hierarchy";
import { Tree, Icon } from "antd";
import { setDataPermission } from "@/actions/user/edit";
import { HIERARCHY_TYPE } from "@/constants/hierarchy";
import CustomTree from "@/shared/components/tree";

export default function UserDataPermissionEdit(props) {
  const dispatch = useDispatch();
  const { currentUserDataPermission } = useSelector(
    state => state.platform.user
  );
  const [checkedKeys, setCheckedKeys] = useState([]);
  const getEditedDataPermission = keys => {};
  const onChange = keys => {
    const checkedKeys = keys.checked;
    setCheckedKeys(checkedKeys);
    const editedDataPermission = getEditedDataPermission(checkedKeys);
    dispatch(setDataPermission(editedDataPermission));
  };
  return (
    currentUserDataPermission && (
      <div className="data-permission-tree-edit">
        <CustomTree
          forceDisplaySelectAll={true}
          checkable={true}
          onCheck={onChange}
          checkedKeys={checkedKeys}
          defaultExpandAll={true}
          checkableCondition={node => {
            return node.Type === HIERARCHY_TYPE.Building;
          }}
          renderIcon={node => <Icon className={getHierarchyIcon(node)} />}
          data={currentUserDataPermission}
        />
      </div>
    )
  );
}
