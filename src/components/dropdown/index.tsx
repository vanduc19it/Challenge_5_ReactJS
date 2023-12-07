import { Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import styles from "./style.module.scss";
import ModalDelete from "../modals/modalDelete";
import ModalEdit from "../modals/modalEdit";

function MoreOption({
  open,
  indexCard,
  card,
  onDelete,
  onEdit,
  visibleDetail,
}: {
  open: boolean;
  indexCard: number;
  card: any;
  onDelete: (cardIndex: any) => void;
  onEdit: (card: any, cardIndex: any) => void;
  visibleDetail: () => void;
}) {
  const [visible, setVisible] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [modalOpen1, setModalOpen1] = useState<boolean>(false);

  const handleCloseModal1 = () => {
    setModalOpen1(false);
  };

  useEffect(() => {
    setVisible(open);
  }, [open]);

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  const onClick: MenuProps["onClick"] = ({ key }) => {
    key === "1" ? setModalOpen1(true) : setModalOpen(true);
  };

  const items: MenuProps["items"] = [
    {
      label: "Edit",
      key: "1",
    },
    {
      label: "Delete",
      key: "2",
    },
  ];

  const handleOnClickDropdown = (e: any) => {
    e.stopPropagation();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      className={styles["dropdown-more-option"]}
      onClick={handleOnClickDropdown}
    >
      <Dropdown
        menu={{ items, onClick }}
        open={visible}
        onOpenChange={handleVisibleChange}
        placement="bottomRight"
      >
        <a onClick={(e) => e.preventDefault()}></a>
      </Dropdown>
      <ModalDelete
        visible={modalOpen}
        onClose={handleCloseModal}
        indexCard={indexCard}
        onDelete={onDelete}
        visibleDetail={visibleDetail}
      />
      <ModalEdit
        visible={modalOpen1}
        onClose={handleCloseModal1}
        indexCard={indexCard}
        card={card}
        onEdit={onEdit}
      />
    </div>
  );
}

export default MoreOption;
