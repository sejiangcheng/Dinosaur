import React from "react";
import { Form } from "antd";
export default function CommonFormItem(props) {
  const { code, item, label, onChange, isRequired, validators } = props;
  const rules = [
    {
      required: isRequired,
      message: `不能为空`
    }
  ];
  if (validators) {
    validators.forEach(validator => {
      rules.push({
        validator: (rule, val, callback) => {
          if (validator) {
            callback();
          }
          callback();
        }
      });
    });
  }
  return (
    <Form.Item label={label}>
      {props.form.getFieldDecorator(code, {
        validateTrigger: ["onChange", "onBlur"],
        validateFirst: true,
        rules,
        initialValue: item[code] || ""
      })(props.component)}
    </Form.Item>
  );
}
