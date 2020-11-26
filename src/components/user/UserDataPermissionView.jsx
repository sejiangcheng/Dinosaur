import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Tree, Icon } from "antd";
import { getHierarchyIcon } from "@/shared/utils/hierarchy";
import { generateTreeData } from "@/shared/utils/tree";

export default function UserDataPermissionView(props) {
  const {
    currentUserDataPermission,
    currentUserHasAllDataPermission
  } = useSelector(state => state.platform.user);
  const [treeData, setTreeData] = useState(null);
  useEffect(() => {
    if (currentUserDataPermission) {
      const treeData = generateTreeData(currentUserDataPermission);
      setTreeData(treeData);
    }
  }, [currentUserDataPermission]);

  return currentUserHasAllDataPermission ? (
    <div>全部</div>
  ) : (
    treeData && (
      <Tree
        showIcon
        filterTreeNode={node => {
          return !node.props.HasDataPrivilege;
        }}
        className="data-permission-tree-view"
        defaultExpandAll={true}
        blockNode
        icon={node => <Icon className={getHierarchyIcon(node)} />}
        treeData={treeData}
      />
    )
  );
}
