import React, { Component } from "react";
import { Tree } from "antd";
import { loopNodeCheckable } from "@/shared/utils/tree";
import _ from "lodash";
import "./style.less";

const { TreeNode } = Tree;
export default class CustomTree extends Component {
  treeNodes = null;

  constructor(props) {
    super(props);
    this.treeNodes = this.renderTreeNodes(this.props.data);
    this.state = {
      expandedKeys: this.props.expandedKeys ? [...props.expandedKeys] : [],
      selectedNodeId: props.selectedNodeId
    };
  }
  renderTitle = node => {
    if (!this.props.forceDisplaySelectAll) {
      return node.Name;
    } else {
      //显示全选和取消全选
      return (
        <div className="tree-node-content">
          <div className="node-content-text">{node.Name}</div>
          {node.Children && node.Children.length > 0 && (
            <div
              className="node-select-all"
              onClick={e => this.selectAll(node)}
            >
              {node.isSelectAll ? "全选" : "取消全选"}
            </div>
          )}
        </div>
      );
    }
  };

  processUnderlyingNodes = (node, extraInfo) => {
    if (this.props.checkableCondition) {
      node.checkable = this.props.checkableCondition(node);
      if (node.checkable) {
        extraInfo.underlyingKeys.push(node.Id);
      }
    } else {
      extraInfo.underlyingKeys.push(node.Id);
    }
  };
  getUnderlyingNodes = node => {
    let underlyingKeys = [];
    // let underlyingExpandedKeys = [];
    loopNodeCheckable(node, this.processUnderlyingNodes, {
      underlyingKeys
      // underlyingNodes,
      // underlyingExpandedKeys
    });
    return underlyingKeys;
  };

  selectAll = node => {
    let underlyingKeys = this.getUnderlyingNodes(node);
    let { checkedKeys } = this.props;
    checkedKeys = checkedKeys.map(key => String(key));
    underlyingKeys = underlyingKeys.map(key => String(key));
    const mergedNodes = node.isSelectAll
      ? _.uniq([...checkedKeys, ...underlyingKeys])
      : _.difference(checkedKeys, underlyingKeys);
    const expandedKeys = new Set([
      ...this.state.expandedKeys,
      ...underlyingKeys
    ]);
    node.title = this.renderTitle(node);
    this.props.onCheck({ checked: mergedNodes });
    this.setState({
      expandedKeys: [...expandedKeys]
    });
  };
  nodeIsSelected(checkedKeys, nodeId) {
    //此方法仅用于判断是否被全选
    let nodeIsSelected = false;
    for (let i = 0; i < checkedKeys.length; i++) {
      if (String(checkedKeys[i]) === String(nodeId)) {
        nodeIsSelected = true;
      }
    }
    return nodeIsSelected;
  }
  renderTreeNodes(data, checkedKeys) {
    if (data instanceof Array) {
      return data.map(d => {
        return this.renderTreeNodes(d, checkedKeys);
      });
    }
    if (!data) {
      return null;
    }
    let { Children } = data;
    if (data.Id && Children === undefined) {
      Children = [];
    }
    if (Children || data.Id) {
      const content = Children.map(childData => {
        return this.renderTreeNodes(childData, checkedKeys);
      });
      if (content.length) {
        let underlyingKeys = this.getUnderlyingNodes(data);
        if (!checkedKeys) {
          checkedKeys = this.props.checkedKeys;
        }
        let isSelectAll = false;
        if (checkedKeys) {
          if (data.checkable && !this.nodeIsSelected(checkedKeys, data.Id)) {
            //没有被全选，标题显示全选
            isSelectAll = true;
          } else {
            for (let i = 0; i < underlyingKeys.length; i++) {
              if (!this.nodeIsSelected(checkedKeys, underlyingKeys[i])) {
                isSelectAll = true;
                break;
              }
            }
          }
        }
        data.isSelectAll = isSelectAll;
        return (
          <TreeNode
            className={data.className}
            checkable={data.checkable === undefined ? true : data.checkable}
            disabled={data.disabled}
            title={
              this.props.renderTitle
                ? this.props.renderTitle(data)
                : this.renderTitle(data)
            }
            name={data.Name}
            key={String(data.Id)}
            value={data.Id}
            data={data}
            icon={this.props.renderIcon ? this.props.renderIcon(data) : null}
            nodeType={data.Type}
          >
            {content}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          checkable={data.checkable === undefined ? true : data.checkable}
          disabled={data.disabled}
          className={data.className}
          title={
            this.props.renderTitle ? this.props.renderTitle(data) : data.Name
          }
          name={data.Name}
          key={String(data.Id)}
          value={data.Id}
          data={data}
          icon={this.props.renderIcon ? this.props.renderIcon(data) : null}
          nodeType={data.Type}
          isLeaf={data.isLeaf == undefined ? true : data.isLeaf}
        />
      );
    }
  }

  onExpandHandler(expandedKeys) {
    this.setState({
      expandedKeys: expandedKeys
    });
  }

  onSelectHandler(data) {
    this.setState({
      selectedNodeId: data.Id
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.treeNodes = this.renderTreeNodes(nextProps.data);
    }
    if (nextProps.filteredData !== this.props.filteredData) {
      if (nextProps.filteredData && nextProps.filteredData.length > 0) {
        this.treeNodes = this.renderTreeNodes(nextProps.filteredData);
      } else {
        this.treeNodes = this.renderTreeNodes(nextProps.data);
      }
    }
    if (nextProps.checkedKeys !== this.props.checkedKeys) {
      if (this.props.forceDisplaySelectAll) {
        this.treeNodes = this.renderTreeNodes(
          nextProps.data,
          nextProps.checkedKeys
        );
      }
    }
  }

  render() {
    const {
      onExpand,
      expandedKeys,
      draggable,
      selectedNodeId,
      onTreeClick,
      onDrop
    } = this.props;
    return this.props.defaultExpandAll ? (
      <Tree
        checkable={
          this.props.checkable === undefined ? false : this.props.checkable
        }
        defaultExpandAll={true}
        draggable={draggable}
        onDrop={draggable && onDrop ? onDrop : null}
        selectedKeys={
          onTreeClick
            ? [String(selectedNodeId)]
            : [String(this.state.selectedNodeId)]
        }
        onCheck={this.props.onCheck}
        onSelect={(_key, e) => {
          const data = e.node.props.data;
          if (onTreeClick) {
            if (String(selectedNodeId) === String(data.Id)) {
              return;
            }
            onTreeClick(data);
          } else {
            this.onSelectHandler(data);
          }
        }}
        disabled={this.props.treeDisabled}
        checkStrictly={
          this.props.checkStrictly === undefined
            ? true
            : this.props.checkStrictly
        }
        checkedKeys={this.props.checkedKeys}
        showIcon
        blockNode
      >
        {this.treeNodes}
      </Tree>
    ) : (
      <Tree
        checkable={
          this.props.checkable === undefined ? false : this.props.checkable
        }
        onCheck={this.props.onCheck}
        onExpand={expandedKeys => {
          onExpand
            ? onExpand(expandedKeys)
            : this.onExpandHandler(expandedKeys);
        }}
        expandedKeys={
          onExpand ? [...expandedKeys] : [...this.state.expandedKeys]
        }
        draggable={draggable}
        onDrop={draggable && onDrop ? onDrop : null}
        selectedKeys={
          onTreeClick
            ? [String(selectedNodeId)]
            : [String(this.state.selectedNodeId)]
        }
        onSelect={(_key, e) => {
          const data = e.node.props.data;
          if (onTreeClick) {
            if (String(selectedNodeId) === String(data.Id)) {
              return;
            }
            onTreeClick(data);
          } else {
            this.onSelectHandler(data);
          }
        }}
        checkStrictly={
          this.props.checkStrictly === undefined
            ? true
            : this.props.checkStrictly
        }
        disabled={this.props.treeDisabled}
        checkedKeys={this.props.checkedKeys}
        showIcon
        blockNode
        loadData={this.props.loadData ? this.props.loadData : null}
      >
        {this.treeNodes}
      </Tree>
    );
  }
}
