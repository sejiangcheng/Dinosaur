import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentEditedUser } from "@/actions/user/edit";
import InputFormItem from "@/shared/components/form/form-item/InputFormItem";
import SelectFormItem from "@/shared/components/form/form-item/SelectFormItem";
import RadioFormItem from "@/shared/components/form/form-item/RadioFormItem";
import RolePrivilegeView from "@/components/role/RolePrivilegeView";
import { Select, Drawer } from "antd";
const { Option } = Select;

export default function UserBasicInfoEditForm(props) {
  const { form } = props;
  const dispatch = useDispatch();
  const [displayChildDrawer, setDisplayChildDrawer] = useState(false);
  const [currentViewedRole, setCurrentViewedRole] = useState(null);
  const { currentEditedUser } = useSelector(state => state.platform.user);
  const { roles } = useSelector(state => state.platform.role);
  const changeUserAttr = (attr, value) => {
    currentEditedUser[attr] = value;
    dispatch(changeCurrentEditedUser(currentEditedUser));
  };
  const showPermissionDrawer = role => {
    setCurrentViewedRole(role);
    setDisplayChildDrawer(true);
  };
  useEffect(() => {
    props.onChildDrawerVisibleChange(displayChildDrawer);
  }, [displayChildDrawer]);
  return (
    <>
      <InputFormItem
        form={form}
        label="用户名称"
        code="Name"
        item={currentEditedUser}
        onChange={changeUserAttr}
        isRequired={true}
      />
      <SelectFormItem
        form={form}
        label="角色"
        code="UserType"
        item={currentEditedUser}
        optionLabelProp="label"
        options={
          roles &&
          roles.map(role => {
            return { value: role.Id, label: role.Name };
          })
        }
        renderOptions={
          roles &&
          roles.map(role => {
            return (
              <Option value={role.Id} label={role.Name}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 5px"
                  }}
                >
                  <span> {role.Name} </span>
                  <span
                    className="check-role"
                    onClick={e => {
                      e.stopPropagation();
                      showPermissionDrawer(role);
                    }}
                  >
                    查看
                  </span>
                </div>
              </Option>
            );
          })
        }
        onChange={changeUserAttr}
        isRequired={true}
      />
      <RadioFormItem
        form={form}
        label="账号激活方式"
        code="ActiveMethod"
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
        code="Comment"
        form={form}
        item={currentEditedUser}
        onChange={changeUserAttr}
        isRequired={false}
        isTextArea={true}
      />
      <Drawer
        title={currentViewedRole && currentViewedRole.Name}
        className={"role-privilege-view-drawer"}
        visible={displayChildDrawer}
        destroyOnClose
        onClose={() => {
          setDisplayChildDrawer(false);
        }}
      >
        <RolePrivilegeView roleId={currentViewedRole && currentViewedRole.Id} />
      </Drawer>
    </>
  );
}
