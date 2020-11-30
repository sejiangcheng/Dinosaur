import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Upload, Icon, message } from "antd";
const FILE_TYPE_IMAGE_REG = /(image\/png|image\/jpe?g|image\/bmp)/;
const DEFAULT_IMAGE_SIZE = 1024 * 1024 * 2; //2MB
const messages = {
  invalidFormat: "上传失败，仅支持PNG、JPG、BMP",
  maxSizeExceeded: "图片文件超过了2M的上限，请重新选择。",
  emptyFile: "图片文件大小为0，请重新选择。",
  corruptedFile: "图片已损坏，请重新选择。"
};
export function getErrorMsg(file) {
  let warningMsg;
  if (!FILE_TYPE_IMAGE_REG.test(file.type)) {
    warningMsg = messages.invalidFormat;
  } else if (file.size > DEFAULT_IMAGE_SIZE) {
    warningMsg = messages.maxSizeExceeded;
  } else if (file.size === 0) {
    warningMsg = messages.emptyFile;
  }
  return warningMsg;
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function UploadImage(props) {
  const [loading, setLoading] = useState(false);
  const { item, code, type, url } = props;
  const content = item[code];
  const beforeUpload = file => {
    const warningMsg = getErrorMsg(file);
    if (warningMsg) {
      message.error(warningMsg);
    }
    return warningMsg === undefined;
  };

  const handleChange = info => {
    if (info.file.status) {
      if (info.file.status === "uploading") {
        setLoading(true);
      }
    }
  };

  const onUpload = uploadInfo => {
    const { file, onSuccess, onError } = uploadInfo;
    return getBase64(file, async imgContent => {
      try {
        // const backgroundUrl = await service(`/Image/${result}`);
        // let image = new Image();
        setLoading(false);
        props.onChange(code, imgContent);
        return true;
      } catch (e) {
        onError(e);
      }
    });
  };

  const renderImgIcon = () => {
    if (loading) {
      return (
        <div>
          <Icon type={"loading"} />
        </div>
      );
    }
    return content ? (
      <img
        src={content}
        alt="avatar"
        style={{ maxWidth: 200, maxHeight: 100 }}
      />
    ) : (
      <div>
        <Icon type={"plus"} />
        <div>上传</div>
      </div>
    );
  };
  return (
    <div className="upload-image">
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={onUpload}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {renderImgIcon()}
      </Upload>
    </div>
  );
}

export default UploadImage;
