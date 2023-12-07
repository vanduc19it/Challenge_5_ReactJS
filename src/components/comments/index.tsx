import React from "react";
import styles from "../comments/style.module.scss";
import { Typography } from "antd";
import { formatTime } from "../../utils/format";

function CommentComponent({ comment }: { comment: any }) {
  return (
    <div className={styles.comment}>
      <Typography.Text className={styles["comment-name"]}>
        {comment?.name}
      </Typography.Text>
      <Typography.Text className={styles["comment-desc"]}>
        {comment?.comment}
      </Typography.Text>
      <Typography.Text className={styles["comment-time"]}>
        {formatTime(comment?.time)}
      </Typography.Text>
    </div>
  );
}

export default CommentComponent;
