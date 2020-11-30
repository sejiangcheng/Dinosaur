import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeCurrentEditedRole } from "@/actions/role/edit";
import _ from "lodash";
import "./style.less";
import { Form, Tabs, Radio, Spin, Button } from "antd";
import InputFormItem from "@/shared/components/form/form-item/InputFormItem";
import { formStatus } from "@/constants/formStatus";
import { getRolePrivileges, getAvailablePrivileges } from "@/actions/role";
const { TabPane } = Tabs;

function RoleDrawerContent(props) {
  const { form } = props;
  const dispatch = useDispatch();
  const [permissionMap, setPermissionMap] = useState({});
  const {
    currentEditedRole,
    currentAvailablePrivileges,
    currentRolePrivileges,
    status
  } = useSelector(state => state.platform.role);
  const [permissionMapInitialized, setPermissionMapInitialized] = useState(
    false
  );
  const partnerId = useSelector(state => state.main.partnerId);
  const onSave = () => {
    props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      props.onSave();
    });
  };
  const changeRoleAttr = (attr, value) => {
    currentEditedRole[attr] = value;
    dispatch(changeCurrentEditedRole(currentEditedRole));
  };
  const changeRolePermissions = (actionCode, featureCode, packageCode) => {
    permissionMap[packageCode][featureCode] = actionCode;
    currentEditedRole.permissions = permissionMap;
    setPermissionMap(permissionMap);
    dispatch(changeCurrentEditedRole(currentEditedRole));
  };
  useEffect(() => {
    if (status === formStatus.EDIT) {
      dispatch(getRolePrivileges(currentEditedRole.Id));
    }
    dispatch(getAvailablePrivileges(partnerId));
  }, []);
  useEffect(() => {
    if (currentAvailablePrivileges) {
      const isNewRole = status === formStatus.ADD;
      if (currentRolePrivileges || isNewRole) {
        currentAvailablePrivileges.forEach(currentAvailablePackage => {
          permissionMap[currentAvailablePackage.Code] = {};
          const currentPrivilegePackage =
            currentRolePrivileges &&
            currentRolePrivileges.find(
              p => p.Code === currentAvailablePackage.Code
            );
          currentAvailablePackage.Features &&
            currentAvailablePackage.Features.forEach(
              currentAvailableFeature => {
                let permission = null;
                if (currentPrivilegePackage) {
                  currentPrivilegePackage.Features.forEach(feature => {
                    if (feature.Code === currentAvailableFeature.Code) {
                      permission = feature.ActionCode;
                    }
                  });
                } else {
                  currentAvailableFeature.Actions &&
                    currentAvailableFeature.Actions.forEach(action => {
                      if (action.IsDefault) {
                        permission = action.Code;
                      }
                    });
                }
                permissionMap[currentAvailablePackage.Code][
                  currentAvailableFeature.Code
                ] = permission;
              }
            );
        });
      }
      setPermissionMap(permissionMap);
      setPermissionMapInitialized(true);
    }
  }, [currentRolePrivileges, currentAvailablePrivileges, status]);
  const getpackageTitle = currentPackage => {
    let packageIsSelected = false;
    Object.values(permissionMap[currentPackage.Code]).forEach(actionCode => {
      if (actionCode) {
        packageIsSelected = true;
      }
    });
    return (
      <>
        <span>{currentPackage.PackageName}</span>
        {packageIsSelected ? <span>已选</span> : null}
      </>
    );
  };
  return (
    <div className="role-edit-drawer-content">
      <Form layout={"vertical"} hideRequiredMark colon={false}>
        <InputFormItem
          style={{ width: 500 }}
          form={form}
          label="用户名称"
          code="Name"
          item={currentEditedRole}
          onChange={changeRoleAttr}
          isRequired={true}
        />
      </Form>
      <div className="serious-title">功能权限</div>
      {}
      <div className="permission-selection-wrapper">
        {!permissionMapInitialized ? (
          <div className="flex-center-wrapper-layout">
            <Spin size="large" />
          </div>
        ) : (
          <Tabs
            defaultActiveKey="Tab-1"
            tabPosition={"left"}
            className="role-permission-edit-tabs"
          >
            {currentAvailablePrivileges.map(currentPackage => {
              const features = currentPackage.Features;
              return (
                <TabPane
                  tab={getpackageTitle(currentPackage)}
                  key={currentPackage.Code}
                  className="permission-feature-select"
                >
                  {features.map(feature => {
                    const actions = feature.Actions;
                    return (
                      <div className="permission-action-select">
                        <span>{feature.Name}</span>
                        <Radio.Group
                          disabled={currentPackage.IsDefault}
                          value={
                            permissionMap[currentPackage.Code][feature.Code]
                          }
                          onChange={e => {
                            changeRolePermissions(
                              e.target.value,
                              feature.Code,
                              currentPackage.Code
                            );
                          }}
                        >
                          <Radio value={null}>无权限</Radio>
                          {actions.map(action => {
                            return (
                              <Radio value={action.Code}>{action.Name}</Radio>
                            );
                          })}
                        </Radio.Group>
                      </div>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        )}
      </div>
      <div className="drawer-footer">
        <Button onClick={props.onClose} style={{ marginRight: 8 }}>
          取消
        </Button>
        <Button onClick={onSave} type="primary">
          保存
        </Button>
      </div>
    </div>
  );
}

const RoleDrawerContentWithForm = Form.create({
  name: "role-edit-form"
})(RoleDrawerContent);
export default RoleDrawerContentWithForm;
