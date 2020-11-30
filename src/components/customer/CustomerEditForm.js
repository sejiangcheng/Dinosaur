import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "antd";
import { changeCurrentEditedCustomer } from "@/actions/customer/edit";
import InputFormItem from "@/shared/components/form/form-item/InputFormItem";
import UploadImage from "@/shared/components/upload-image";
export default function CustomerEditForm(props) {
  const { form } = props;
  const dispatch = useDispatch();
  const currentEditedCustomer = useSelector(
    state => state.platform.customer.currentEditedCustomer
  );
  const changeCustomerAttr = (attr, value) => {
    currentEditedCustomer[attr] = value;
    dispatch(changeCurrentEditedCustomer(currentEditedCustomer));
  };
  return (
    <>
      <InputFormItem
        form={form}
        label="客户名称"
        code="CustomerName"
        item={currentEditedCustomer}
        onChange={changeCustomerAttr}
        isRequired={true}
      />
      <Form.Item
        label={
          <span>
            LOGO
            <span className="weak-title">
              （选填。只支持.jpg .jpeg .png .bmp格式）
            </span>
          </span>
        }
      >
        <UploadImage
          type="image"
          code="Logo"
          item={currentEditedCustomer}
          onChange={changeCustomerAttr}
        />
      </Form.Item>
      <InputFormItem
        form={form}
        label="统一社会信用码"
        code="CustomerCode"
        item={currentEditedCustomer}
        onChange={changeCustomerAttr}
        isRequired={true}
      />
      <InputFormItem
        label={
          <span>
            备注<span className="weak-title">（选填）</span>
          </span>
        }
        code="Description"
        form={form}
        item={currentEditedCustomer}
        onChange={changeCustomerAttr}
        isRequired={false}
        isTextArea={true}
      />
    </>
  );
}
