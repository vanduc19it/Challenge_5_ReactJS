import React from "react";
import styles from "../comments/style.module.scss";
import { Typography } from "antd";
import { formatTime } from "../../utils/format";

interface Comment {
  name: string;
  comment: string;
  time: string;
}

interface CommentComponentProps {
  comment: Comment;
}

function CommentComponent({ comment }: CommentComponentProps) {
  return (
    <div className={styles.comment}>
      <Typography.Text className={styles["comment-name"]}>
        {comment.name}
      </Typography.Text>
      <Typography.Text className={styles["comment-desc"]}>
        {comment.comment}
      </Typography.Text>
      <Typography.Text className={styles["comment-time"]}>
        {formatTime(comment.time)}
      </Typography.Text>
    </div>
  );
}

export default CommentComponent;

