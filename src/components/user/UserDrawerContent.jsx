import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formStatus } from "@/constants/formStatus";
import UserEditBasicInfoForm from "./UserEditBasicInfoForm";
import UserDataPermissionEdit from "./UserDataPermissionEdit";
import UserDataPermissionView from "./UserDataPermissionView";
import { Form, Button, Tree, Spin, Icon, Radio } from "antd";
import {
  changeUserStatus,
  changeUserHasAllDataPermission
} from "@/actions/user/edit";
import { getUserDataPermission } from "@/actions/user";

export default function UserDrawerContent(props) {
  const { status } = useSelector(state => state.platform.user);
  if (status === formStatus.ADD) {
    return <UserEditAddWithForm {...props} />;
  } else if (status === formStatus.EDIT_BASIC_INFO) {
    return <UserEditUpdateBasicInfoWithForm {...props} />;
  } else if (status === formStatus.EDIT_DATA_PERMISSION) {
    return <UserEditUpdateDataPermissionWrapper {...props} />;
  } else if (status === formStatus.VIEW_DATA_PERMISSION) {
    return <UserViewDataPermission {...props} />;
  }
}

function UserEditAdd(props) {
  const [page, setPage] = useState(1);
  const changePage = page => {
    props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      setPage(page);
    });
  };
  if (page === 1) {
    return (
      <Form layout={"vertical"} hideRequiredMark colon={false}>
        <div className="flex-full-height">
          <div className="flex-full-height">
            <UserEditBasicInfoForm
              form={props.form}
              onChildDrawerVisibleChange={props.onChildDrawerVisibleChange}
            />
          </div>
          <div className="drawer-footer">
            <Button onClick={props.onClose} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button
              onClick={() => {
                changePage(2);
              }}
              type="primary"
            >
              下一步
            </Button>
          </div>
        </div>
      </Form>
    );
  } else {
    return (
      <div className="flex-full-height">
        <div className="flex-full-height">
          <UserEditUpdateDataPermission />
        </div>
        <div className="drawer-footer">
          <Button onClick={props.onClose} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button
            onClick={() => {
              setPage(1);
            }}
            style={{ marginRight: 8 }}
            type="primary"
          >
            上一步
          </Button>
          <Button
            onClick={() => {
              props.onSave();
            }}
            type="primary"
          >
            保存
          </Button>
        </div>
      </div>
    );
  }
}

const UserEditAddWithForm = Form.create({
  name: "user-add-form"
})(UserEditAdd);

function UserEditUpdateBasicInfo(props) {
  const onSave = () => {
    props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      props.onSave();
    });
  };
  return (
    <Form layout={"vertical"} hideRequiredMark colon={false}>
      <div className="flex-full-height">
        <div className="flex-full-height">
          <UserEditBasicInfoForm
            form={props.form}
            onChildDrawerVisibleChange={props.onChildDrawerVisibleChange}
          />
        </div>{" "}
        <div className="drawer-footer">
          <Button onClick={props.onClose} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button onClick={onSave} type="primary">
            保存
          </Button>
        </div>
      </div>
    </Form>
  );
}

const UserEditUpdateBasicInfoWithForm = Form.create({
  name: "edit-basic-info"
})(UserEditUpdateBasicInfo);

function UserEditUpdateDataPermissionWrapper(props) {
  return (
    <div className="flex-full-height">
      <UserEditUpdateDataPermission />
      <div className="drawer-footer">
        <Button onClick={props.onClose} style={{ marginRight: 8 }}>
          取消
        </Button>
        <Button
          onClick={() => {
            props.onSave();
          }}
          type="primary"
        >
          保存
        </Button>
      </div>
    </div>
  );
}

function UserEditUpdateDataPermission(props) {
  const dispatch = useDispatch();
  const {
    currentEditedUser,
    loadingDataPermission,
    currentUserHasAllDataPermission,
    currentUserDataPermission
  } = useSelector(state => state.platform.user);

  useEffect(() => {
    if (!currentUserDataPermission) {
      dispatch(getUserDataPermission(currentEditedUser));
    }
  }, []);

  return (
    <div className="flex-full-height">
      {loadingDataPermission ? (
        <div className="flex-center-wrapper-layout">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Form layout={"vertical"} hideRequiredMark colon={false}>
            <Form.Item label="数据权限">
              <Radio.Group
                value={currentUserHasAllDataPermission}
                onChange={e => {
                  dispatch(changeUserHasAllDataPermission(e.target.value));
                }}
              >
                <Radio value={false}>自定义</Radio>
                <Radio value={true}>全部</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
          {!currentUserHasAllDataPermission && <UserDataPermissionEdit />}
        </>
      )}
    </div>
  );
}

function UserViewDataPermission(props) {
  const dispatch = useDispatch();
  const { currentEditedUser, loadingDataPermission } = useSelector(
    state => state.platform.user
  );

  useEffect(() => {
    dispatch(getUserDataPermission(currentEditedUser));
  }, []);

  const onEdit = () => {
    dispatch(
      changeUserStatus(formStatus.EDIT_DATA_PERMISSION, currentEditedUser)
    );
  };
  return (
    <div className="flex-full-height">
      <div className="flex-full-height">
        {loadingDataPermission ? (
          <div className="flex-center-wrapper-layout">
            <Spin size="large" />
          </div>
        ) : (
          <UserDataPermissionView />
        )}
      </div>
      <div className="drawer-footer">
        <Button onClick={onEdit} type="primary">
          编辑
        </Button>
      </div>
    </div>
  );
}
