import React, { useState } from "react";
import { Button, Flex, Modal, Typography } from "antd";
import styles from "./style.module.scss";
function ModalDelete({
  visible,
  onClose,
  indexCard,
  onDelete,
  visibleDetail,
}: {
  visible: boolean;
  onClose: () => void;
  indexCard: number;
  onDelete: (deleteCardIndex: any) => void;
  visibleDetail: () => void;
}) {
  const handleDelete = () => {
    onDelete(indexCard);
    onClose();
    visibleDetail();
  };
  return (
    <Modal
      centered
      open={visible}
      onOk={handleDelete}
      onCancel={onClose}
      closable={false}
      className={styles.modal}
      footer={[]}
    >
      <Typography.Text className={styles["modal-title"]}>
        Delete card?
      </Typography.Text>
      <Typography.Text className={styles["modal-desc"]}>
        You will not be able to restore the card after taking this action.
      </Typography.Text>
      <Flex className={styles["modal-btn-group"]}>
        <Button
          key="delete"
          onClick={handleDelete}
          className={styles["modal-btn-delete"]}
        >
          Delete
        </Button>
        <Button
          key="cancel"
          onClick={onClose}
          className={styles["modal-btn-cancel"]}
        >
          Cancel
        </Button>
      </Flex>
    </Modal>
  );
}

export default ModalDelete;
