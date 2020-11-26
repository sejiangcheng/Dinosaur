import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCustomersByPageNumber } from "@/actions/customer";
import {
  editCustomer,
  createCustomer,
  saveNewCustomer,
  saveEditedCustomer,
  closeEditStatus,
  deleteCustomer,
  saveSuccessMessageShowed
} from "@/actions/customer/edit";
import PlatformPage from "../platformPage";
import { Divider, Drawer, Button, Form, Modal, Icon } from "antd";
import _ from "lodash";
import { withRouter } from "react-router";
import { formStatus } from "@/constants/formStatus";
import CustomerEditForm from "./CustomerEditForm";
import "./style.less";
const getColumns = (onEdit, onDelete) => {
  return [
    {
      title: "LOGO",
      dataIndex: "LOGO",
      key: "LOGO"
    },
    {
      title: "客户名称",
      dataIndex: "CustomerName",
      key: "CustomerName"
    },
    {
      title: "统一社会信用码",
      dataIndex: "CustomerCode",
      key: "CustomerCode"
    },
    {
      title: "备注",
      dataIndex: "Telephone",
      key: "Telephone"
    },
    {
      title: "创建时间",
      dataIndex: "CreateTime",
      key: "CreateTime"
    },
    {
      title: "操作",
      dataIndex: "Operations",
      key: "Operations",
      render: (text, record, index) => {
        return (
          <div className="flex-start-layout">
            <a
              onClick={() => {
                onEdit(record);
              }}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                onDelete(record);
              }}
            >
              删除
            </a>
          </div>
        );
      }
    }
  ];
};

function Customer(props) {
  const dispatch = useDispatch();
  const {
    customers,
    status,
    loading,
    currentEditedCustomer,
    needRefresh,
    showSaveSuccessMessage
  } = useSelector(state => state.platform.customer);
  const onEditCustomer = customer => {
    dispatch(editCustomer(customer));
  };
  const onCreateCustomer = () => {
    dispatch(createCustomer());
  };

  const onDeleteCustomer = customer => {
    Modal.confirm({
      content: `该操作将导致【${customer.CustomerName}】下全部数据将永久被删除，确认删除？`,
      okText: "删除",
      centered: true,
      icon: <Icon type="info-circle" theme="filled" />,
      onOk: () => {
        dispatch(deleteCustomer(customer));
      },
      okType: "danger"
    });
  };
  const onClose = () => {
    dispatch(closeEditStatus());
  };
  const onSave = () => {
    props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      if (status === formStatus.ADD) {
        dispatch(saveNewCustomer(currentEditedCustomer));
      } else {
        dispatch(saveEditedCustomer(currentEditedCustomer));
      }
    });
  };
  const params = {
    store: {
      list: customers,
      loading,
      status,
      needRefresh,
      showSaveSuccessMessage
    },
    platformType: "客户",
    getListByPageNumber: getCustomersByPageNumber,
    saveSuccessMessageShowed,
    searchName: "CustomerName",
    searchPlaceholder: "请搜索客户名称",
    columns: getColumns(onEditCustomer, onDeleteCustomer),
    onAddNewMember: onCreateCustomer,
    rowKey: "CustomerId"
  };
  return (
    <>
      <PlatformPage {...params} />
      {status !== formStatus.VIEW && (
        <Drawer
          className="platform-edit-drawer"
          closable
          destroyOnClose={true}
          placement="right"
          onClose={onClose}
          visible={status !== formStatus.VIEW}
          title={status === formStatus.ADD ? "新建客户" : "编辑客户"}
        >
          <Form layout={"vertical"} hideRequiredMark colon={false}>
            <div className="drawer-form-items">
              <CustomerEditForm form={props.form} />
            </div>
            <div className="flex-end-layout">
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button onClick={onSave} type="primary">
                保存
              </Button>
            </div>
          </Form>
        </Drawer>
      )}
    </>
  );
}
const CustomerWithForm = Form.create({ name: "customer-edit-form" })(Customer);

export default withRouter(CustomerWithForm);
