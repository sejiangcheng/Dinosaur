import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentEditedUser } from "@/actions/user/edit";
import InputFormItem from "@/shared/components/form/form-item/InputFormItem";
import SelectFormItem from "@/shared/components/form/form-item/SelectFormItem";
import RadioFormItem from "@/shared/components/form/form-item/RadioFormItem";
import { getRoles } from "@/actions/role/index";

export default function UserBasicInfoEditForm(props) {
  const { form } = props;
  const dispatch = useDispatch();
  const { currentEditedUser } = useSelector(state => state.platform.user);
  const user = useSelector(state => state.main.currentUser);

  const { roles } = useSelector(state => state.platform.role);
  const changeUserAttr = (attr, value) => {
    currentEditedUser[attr] = value;
    dispatch(changeCurrentEditedUser());
  };
  useEffect(() => {
    if (!roles) {
      const { CustomerId } = user;
      dispatch(getRoles(CustomerId));
    }
  }, []);
  return (
    <>
      <InputFormItem
        form={form}
        label="用户名称"
        code="CustomerName"
        item={currentEditedUser}
        onChange={changeUserAttr}
        isRequired={true}
      />
      <SelectFormItem
        form={form}
        label="角色"
        code="Role"
        item={currentEditedUser}
        options={
          roles &&
          roles.map(role => {
            return { value: role.Id, label: role.Name };
          })
        }
        onChange={changeUserAttr}
        isRequired={true}
      />
      <RadioFormItem
        form={form}
        label="账号激活方式"
        code="UserType"
        item={currentEditedUser}
        onChange={changeUserAttr}
        isRequired={true}
        options={[
          { value: "email", label: "邮件激活" },
          { value: "message", label: "短信激活" }
        ]}
      />
      <InputFormItem
        label={<span>邮箱</span>}
        code="Email"
        form={form}
        item={currentEditedUser}
        onChange={changeUserAttr}
        isRequired={true}
      />
      <InputFormItem
        label={
          <span>
            手机<span className="weak-title">（选填）</span>
          </span>
        }
        code="Telephone"
        form={form}
        item={currentEditedUser}
        onChange={changeUserAttr}
        isRequired={false}
      />
      <InputFormItem
        label={
          <span>
            备注<span className="weak-title">（选填）</span>
          </span>
        }
        code="Description"
        form={form}
        item={currentEditedUser}
        onChange={changeUserAttr}
        isRequired={false}
        isTextArea={true}
      />
    </>
  );
}
