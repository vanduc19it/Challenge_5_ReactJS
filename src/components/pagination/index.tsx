import React, { useState } from "react";
import { Pagination, Input, Button, Typography } from "antd";
import type { PaginationProps } from "antd";
import styles from "./style.module.scss";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const [inputValue, setInputValue] = useState<number | undefined>(undefined);
  const itemRender: PaginationProps["itemRender"] = (
    page,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return (
        <Button size="small" onClick={() => onPageChange(currentPage - 1)}>
          <LeftOutlined />
          <span className={styles["pagination-prev-text"]}>Prev</span>
        </Button>
      );
    }
    if (type === "next") {
      return (
        <Button size="small" onClick={() => onPageChange(currentPage + 1)}>
          <span className={styles["pagination-next-text"]}>Next</span>
          <RightOutlined />
        </Button>
      );
    }
    if (type === "page") {
      if (page <= 5 || page === totalPages) {
        return <a onClick={() => onPageChange(page)}>{page}</a>;
      } else if (page === totalPages - 1) {
        return <span>...</span>;
      }
      return null;
    }

    return originalElement;
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setInputValue(isNaN(value) ? undefined : value);
  };

  const onInputEnter = () => {
    const targetPage = inputValue || 1;
    const newPage = Math.min(Math.max(targetPage, 1), totalPages);
    onPageChange(newPage);
    setInputValue(newPage);
  };

  return (
    <div className={styles.pagination}>
      <Pagination
        current={currentPage}
        total={totalPages * 10}
        itemRender={itemRender}
        showQuickJumper={false}
        showSizeChanger={false}
        onChange={onPageChange}
        showLessItems
      />
      <div className={styles["pagination-right"]}>
        <Typography.Text className={styles["pagination-text-right"]}>
          Page
        </Typography.Text>
        <Input
          type="number"
          value={inputValue}
          onChange={onInputChange}
          onPressEnter={onInputEnter}
          className={styles["pagination-input"]}
        />
        <Typography.Text className={styles["pagination-text-right"]}>
          of {totalPages}
        </Typography.Text>
      </div>
    </div>
  );
}

export default PaginationComponent;
