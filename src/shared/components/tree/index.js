import React, { useState, useEffect } from "react";
import { Tree, Icon } from "antd";
import _ from "lodash";
import { getHierarchyIcon } from "@/shared/utils/hierarchy";
import { generateTreeData } from "@/shared/utils/tree";
import "./style.less";
export default function CustomTree(props) {
  const {
    treeDataSource,
    hierarchyMap,
    checkableCondition,
    selectAllCondition,
    checked
  } = props;
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [treeData, setTreeData] = useState(null);
  const [treeDataInitialized, setTreeDataInitialized] = useState(null);
  useEffect(() => {
    if (treeDataSource) {
      const checkedKeys = [];
      const treeData = generateTreeData(
        treeDataSource,
        null,
        hierarchyMap,
        checkableCondition,
        checkedKeys,
        checked
      );
      setCheckedKeys(checkedKeys);
      setTreeData(treeData);
      setTreeDataInitialized(true);
    }
  }, [treeDataSource]);
  useEffect(() => {
    if (treeDataInitialized) {
      let needChange = false;
      Object.values(hierarchyMap).forEach(node => {
        if (selectAllCondition(node)) {
          needChange = true;
          if (
            _.intersection(node.childrenIds, checkedKeys).length ===
            node.childrenIds.length
          ) {
            node.hasSelectAll = true;
          } else {
            node.hasSelectAll = false;
          }
          node.title = renderSelectAllTitle(node);
        }
      });
      if (needChange) {
        setTreeData([...treeData]);
      }
    }
  }, [treeDataInitialized, checkedKeys]);
  useEffect(() => {
    props.onCheck(checkedKeys);
  }, [checkedKeys]);
  const renderSelectAllTitle = node => {
    return (
      <div className="tree-node-content">
        <div className="node-content-text">
          {node[props.titleName || "Name"]}
        </div>
        {node.children && node.children.length > 0 && (
          <div className="node-select-all" onClick={e => selectAll(node)}>
            {node.hasSelectAll ? "取消全选" : "全选"}
          </div>
        )}
      </div>
    );
  };
  const selectAll = node => {
    const newCheckedKeys = node.hasSelectAll
      ? _.difference(checkedKeys, node.childrenIds)
      : _.union(checkedKeys, node.childrenIds);
    onCheck(newCheckedKeys);
  };
  const onCheck = keys => {
    const checkedKeys = keys;
    setCheckedKeys(checkedKeys);
  };
  return (
    treeData && (
      <Tree
        showIcon
        defaultExpandAll={props.defaultExpandAll !== false}
        blockNode
        checkable={true}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        icon={node => {
          if (props.renderIcon) {
            return props.renderIcon(node);
          } else {
            return <Icon className={getHierarchyIcon(node)} />;
          }
        }}
        treeData={treeData}
      />
    )
  );
}
