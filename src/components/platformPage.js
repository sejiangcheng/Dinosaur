import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  AutoComplete,
  Input,
  Icon,
  Divider,
  Spin,
  message
} from "antd";
import Table from "@/shared/components/table-with-pagination";
import _ from "lodash";
import { withRouter } from "react-router";

const defaultPageSize = 10;

function PlatformPage(props) {
  const dispatch = useDispatch();
  const {
    loading,
    list,
    status,
    needRefresh,
    showSaveSuccessMessage
  } = props.store;
  let nameList = [];
  list &&
    list.forEach(member => {
      if (member[props.searchName]) {
        const name = member[props.searchName];
        if (!nameList.includes(name)) {
          nameList.push(name);
        }
      }
    });
  const [keyword, setKeyword] = useState(null);
  const filterName = name => {
    return null;
  };
  const refresh = () => {
    dispatch(props.getListByPageNumber(1, keyword));
  };
  useEffect(() => {
    if (needRefresh) {
      refresh();
    }
  }, [needRefresh]);
  useEffect(() => {
    if (showSaveSuccessMessage) {
      message.success("保存成功");
      dispatch(props.saveSuccessMessageShowed());
    }
  }, [showSaveSuccessMessage]);
  return loading ? (
    <div className="flex-center-wrapper-layout">
      <Spin size="large" />
    </div>
  ) : (
    <div className="platform-manage">
      <div className="flex-start-layout">
        <Button
          icon="plus"
          className="platform-add-button"
          type="primary"
          onClick={props.onAddNewMember}
        >
          {props.platformType}
        </Button>
        <AutoComplete
          style={{
            width: 200
          }}
          dataSource={nameList || []}
          filterOption={(inputValue, option) => {
            return option.key.startsWith(inputValue);
          }}
          onSelect={filterName}
        >
          <Input
            prefix={<Icon type="search" />}
            placeholder={props.searchPlaceholder}
            value={keyword}
            onChange={e => {
              setKeyword(e.target.value);
            }}
          />
        </AutoComplete>
      </div>
      <PlatformTable {...props} keyword={keyword} />
    </div>
  );
}

function PlatformTable(props) {
  const dispatch = useDispatch();
  const { list } = props.store;
  const [currentPage, setCurrentPage] = useState(1);

  const changePageNumber = (page, pageSize) => {
    props.getListByPageNumber(page, props.keyword);
    setCurrentPage(page);
  };
  return (
    <div className="platform-table-wrapper">
      <Table
        columns={props.columns}
        rowKey={props.rowKey || "Id"}
        dataSource={list}
        pagination={{
          current: currentPage,
          onChange: changePageNumber,
          pageSize: defaultPageSize,
          total: list && list.length
        }}
        locale={{
          emptyText: `搜索无结果/暂无${props.platformType}，请点击右上角“+${props.platformType}”新建${props.platformType}`
        }}
      />
    </div>
  );
}
export default withRouter(PlatformPage);
