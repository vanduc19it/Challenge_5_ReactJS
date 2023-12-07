import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Input,
  Modal,
  Typography,
  Image,
  Tooltip,
  Upload,
} from "antd";
import styles from "./style.module.scss";
import imageAdd from "../../../assets/images/image-add.svg";
import closeIcon from "../../../assets/images/close-fill-icon.svg";
import editIcon from "../../../assets/images/edit-icon.svg";
import errorIcon from "../../../assets/images/error-icon.svg";
import { getLocalStorageItem } from "../../../apis/cards";
import {
  validateInputDesc,
  validateInputName,
} from "../../../utils/validation";
function ModalEdit({
  visible,
  onClose,
  indexCard,
  card,
  onEdit,
}: {
  visible: boolean;
  onClose: () => void;
  indexCard: number;
  card: any;
  onEdit: (card: any, cardIndex: any) => void;
}) {
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [nameCheck, setNameCheck] = useState<boolean>(true);
  const [descCheck, setDescCheck] = useState<boolean>(true);

  const [isVisible, setIsVisible] = useState(false);
  const [file, setFile] = useState("");

  useEffect(() => {
    if (visible) {
      const cardList = getLocalStorageItem("cardList");

      setName(cardList[indexCard]?.name);
      setImage(cardList[indexCard]?.image);
      setDescription(cardList[indexCard]?.description);
    }
  }, [visible]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value.trimStart();
    const capitalizedName = newName.charAt(0).toUpperCase() + newName.slice(1);
    setName(capitalizedName);
    validateInputName(e.target.value)
      ? setNameCheck(true)
      : setNameCheck(false);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newDesc = e.target.value.trimStart();
    const capitalizedComment =
      newDesc.charAt(0).toUpperCase() + newDesc.slice(1);
    setDescription(capitalizedComment);
    validateInputDesc(e.target.value)
      ? setDescCheck(true)
      : setDescCheck(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCheck =
      e.key === "Process" ? e.code.charAt(e.code.length - 1) : e.key;
    const isValidChar = /^[a-zA-Z\s]*$/.test(keyCheck);
    if (!isValidChar) {
      e.preventDefault();
    }
  };

  const handleUpload = async (event: any) => {
    const file = event.file.originFileObj;
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 5) {
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 1000);
      } else {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        setFile(file);
      }
    }
  };

  const handleEditCard = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "db1kgikl");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/do2kg3dtf/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      const cardEdit = {
        image: data.secure_url,
        name,
        description,
        like: card?.like,
        comments: card?.comments,
      };
      onEdit(cardEdit, indexCard);
      onClose();
      setImage("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseIcon = () => {
    setImage("");
  };

  return (
    <Modal
      centered
      open={visible}
      onOk={handleEditCard}
      onCancel={onClose}
      closable={false}
      className={styles.modal}
      footer={[]}
    >
      <Typography.Text className={styles["modal-title"]}>
        Edit card
      </Typography.Text>
      <Flex className={styles["modal-upload"]}>
        {image !== "" ? (
          <div className={styles["modal-image-container"]}>
            <Upload
              accept="image/svg+xml,image/png,image/jpeg"
              showUploadList={false}
              multiple={false}
              customRequest={handleUpload}
              onChange={handleUpload}
            >
              <Image
                src={image}
                style={{
                  width: 92,
                  height: 92,
                }}
                alt="image add"
                preview={false}
                className={`${styles["modal-add-image"]} ${styles["modal-has-image"]}`}
              />

              <div className={styles["modal-edit-overlay"]}>
                <Image
                  src={editIcon}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  alt="edit icon"
                  preview={false}
                  className={styles["modal-edit-icon"]}
                />
                <Typography.Text className={styles["modal-edit-text"]}>
                  Edit
                </Typography.Text>
              </div>
            </Upload>
            <div
              className={styles["modal-close-container"]}
              onClick={handleCloseIcon}
            >
              <Image
                src={closeIcon}
                style={{
                  width: 20,
                  height: 20,
                }}
                alt="close icon"
                preview={false}
                className={styles["modal-close-icon"]}
              />
            </div>
          </div>
        ) : (
          <>
            <Tooltip
              placement="right"
              title="Please use a square image that's less than 5MB."
              className={styles["modal-image-tooltip"]}
            >
              <Upload
                accept="image/svg+xml,image/png,image/jpeg"
                showUploadList={false}
                multiple={false}
                customRequest={handleUpload}
                onChange={handleUpload}
              >
                <Image
                  src={imageAdd}
                  style={{
                    width: 48,
                    height: 48,
                  }}
                  alt="image add"
                  preview={false}
                  className={`${styles["modal-add-image"]} ${styles["modal-no-image"]}`}
                />
              </Upload>
            </Tooltip>
            <Upload
              accept="image/svg+xml,image/png,image/jpeg"
              showUploadList={false}
              multiple={false}
              customRequest={handleUpload}
              onChange={handleUpload}
            >
              <Button className={styles["modal-upload-btn"]}>
                Upload image
              </Button>
            </Upload>
          </>
        )}
      </Flex>
      <Flex className={styles["modal-name-group"]}>
        <Typography.Text className={styles["modal-name-title"]}>
          Name
        </Typography.Text>
        <Typography.Text className={styles["modal-name-limit"]}>
          {name.length}/50
        </Typography.Text>
      </Flex>
      <Input
        placeholder="Enter your name"
        className={
          name.length > 50
            ? `${styles["modal-input-name"]} ${styles["modal-input-error"]}`
            : `${styles["modal-input-name"]}`
        }
        bordered={false}
        onKeyDown={handleKeyPress}
        value={name}
        onChange={handleNameChange}
      />
      <Flex className={styles["modal-desc-group"]}>
        <Typography.Text className={styles["modal-desc-title"]}>
          Description
        </Typography.Text>
        <Typography.Text className={styles["modal-desc-limit"]}>
          {description.length}/200
        </Typography.Text>
      </Flex>
      <Input.TextArea
        placeholder="Type description here"
        className={
          description.length > 200
            ? `${styles["modal-input-desc"]} ${styles["modal-input-error"]}`
            : `${styles["modal-input-desc"]}`
        }
        bordered={false}
        value={description}
        onChange={handleDescriptionChange}
      />
      <Flex className={styles["modal-btn-group"]}>
        <Button
          key="edit"
          onClick={handleEditCard}
          className={
            image !== "" && nameCheck && descCheck
              ? `${styles["modal-btn-edit"]} ${styles["modal-btn-active"]}`
              : `${styles["modal-btn-edit"]}`
          }
          disabled={!(image !== "" && nameCheck && descCheck)}
        >
          Save
        </Button>
        <Button
          key="cancel"
          onClick={onClose}
          className={styles["modal-btn-cancel"]}
        >
          Cancel
        </Button>
      </Flex>
      <div
        className={
          isVisible
            ? `${styles["modal-toast-error"]} ${styles["modal-toast-visible"]}`
            : `${styles["modal-toast-error"]}`
        }
      >
        <Image
          src={errorIcon}
          style={{
            width: 24,
            height: 24,
          }}
          alt="error icon"
          preview={false}
          className={styles["modal-toast-icon"]}
        />

        <Typography.Text className={styles["modal-toast-text"]}>
          This file is too large.
        </Typography.Text>
      </div>
    </Modal>
  );
}

export default ModalEdit;
