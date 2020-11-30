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
import { saveSuccessMessageShowed } from "@/actions/main";
import _ from "lodash";
import { withRouter } from "react-router";

const defaultPageSize = 20;

function PlatformPage(props) {
  const dispatch = useDispatch();
  const { filterParams } = props;
  const { loading, list, needRefresh } = props.store;
  const { showSaveSuccessMessage } = useSelector(state => state.platform.main);
  const [keyword, setKeyword] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const changePageNumber = (page, pageSize) => {
    setCurrentPage(page);
    props.getListByPageNumber(page, keyword, filterParams);
  };

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
  const changeKeyword = name => {
    dispatch(props.getListByPageNumber(currentPage, keyword, filterParams));
  };
  const refresh = () => {
    dispatch(props.getListByPageNumber(1, keyword, filterParams));
  };
  useEffect(
    filterParams => {
      dispatch(props.getListByPageNumber(currentPage, keyword, filterParams));
    },
    [filterParams]
  );
  useEffect(() => {
    if (needRefresh) {
      refresh();
    }
  }, [needRefresh]);
  useEffect(() => {
    if (showSaveSuccessMessage) {
      message.success("保存成功");
      dispatch(saveSuccessMessageShowed());
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
            width: 400
          }}
          dataSource={nameList || []}
          filterOption={(inputValue, option) => {
            return option.key.startsWith(inputValue);
          }}
          onSelect={changeKeyword}
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
      <PlatformTable
        {...props}
        onChangePageNumber={changePageNumber}
        currentPage={currentPage}
      />
    </div>
  );
}

function PlatformTable(props) {
  const { currentPage } = props;
  const { list } = props.store;

  return (
    <div className="platform-table-wrapper">
      <Table
        size="middle"
        columns={props.columns}
        rowKey={props.rowKey || "Id"}
        dataSource={list}
        pagination={{
          simple: true,
          current: currentPage,
          onChange: props.onChangePageNumber,
          pageSize: defaultPageSize,
          total: list && list.length
        }}
        locale={{
          emptyText: `暂无${props.platformType}，请点击左上角“+${props.platformType}”新建${props.platformType}`
        }}
      />
    </div>
  );
}
export default withRouter(PlatformPage);
