import {
  Button,
  Checkbox,
  Divider,
  Drawer,
  Flex,
  Image,
  Input,
  Typography,
} from "antd";
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import likeIcon from "../../assets/images/like-icon.svg";
import likeFillIcon from "../../assets/images/like-fill-icon.svg";
import moreOptionIcon from "../../assets/images/more-option-icon.svg";
import MoreOption from "../dropdown";
import { formatNumber } from "../../utils/format";
import CommentComponent from "../comments";
import { validateInputName } from "../../utils/validation";
function ViewDetail({
  visible,
  onCloseDetail,
  onLike,
  card,
  index,
  onDelete,
  onEdit,
}: {
  visible: boolean;
  onCloseDetail: () => void;
  card: any;
  index: number;
  onDelete: any;
  onEdit: any;
  onLike: any;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [writeComment, setWriteComment] = useState<boolean>(false);

  const handleOpenWriteComment = () => {
    setWriteComment(true);
  };

  const handleCloseWriteComment = () => {};

  const handleMoreOption = (e: any) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const [likeActive, setLikeActive] = useState<boolean>(false);

  const handleLikeCard = (e: any) => {
    e.stopPropagation();
    setLikeActive(true);
    onLike(index);
    setTimeout(() => {
      setLikeActive(false);
    }, 1000);
  };
  const [checked, setChecked] = useState(false);
  const [checkUnknown, setCheckUnknown] = useState<boolean>(false);
  const handleCheckbox = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (checked) {
      setCheckUnknown(true);
    } else {
      setCheckUnknown(false);
    }
  }, [checked]);

  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const [nameCheck, setNameCheck] = useState<boolean>(false);
  const [commentCheck, setCommentCheck] = useState<boolean>(false);

  useEffect(() => {
    setWriteComment(false);
    setDisplayedComments(5);
    setNameCheck(false);
    setCommentCheck(false);
    setName("");
    setComment("");
  }, [visible]);

  const handleCreateComment = () => {
    const time = new Date().toISOString();
    const newComment: any = {
      name: !checkUnknown ? name : "Unknown",
      comment,
      time: time,
    };

    const updatedCard: any = card;
    updatedCard.comments.unshift(newComment);
    onEdit(updatedCard, index);

    setName("");
    setComment("");
    setNameCheck(false);
    setCommentCheck(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value.trimStart();
    const capitalizedName = newName.charAt(0).toUpperCase() + newName.slice(1);
    setName(capitalizedName);
    validateInputName(e.target.value)
      ? setNameCheck(true)
      : setNameCheck(false);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newComment = e.target.value.trimStart();
    const capitalizedComment =
      newComment.charAt(0).toUpperCase() + newComment.slice(1);
    setComment(capitalizedComment);
    validateInputName(e.target.value)
      ? setCommentCheck(true)
      : setCommentCheck(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCheck =
      e.key === "Process" ? e.code.charAt(e.code.length - 1) : e.key;

    const isValidChar = /^[a-zA-Z\s]*$/.test(keyCheck);

    if (!isValidChar) {
      e.preventDefault();
    }
  };

  const [displayedComments, setDisplayedComments] = useState<number>(5);

  const handleLoadMoreComments = () => {
    setDisplayedComments((prev) => prev + 5);
  };

  return (
    <div>
      <Drawer
        closable={false}
        placement="right"
        onClose={onCloseDetail}
        open={visible}
        className={styles.card}
        onClick={handleCloseWriteComment}
      >
      <div className={styles[writeComment ? `card-has-write` : `card-no-write`]}>
        {card?.image !== "" ? (
          <div className={styles["card-image"]}>
            <Image
              src={card?.image}
              style={{
                width: 280,
                height: 280,
                borderRadius: 8,
              }}
              alt="card image"
              preview={false}
              className={styles["card-image"]}
            />
          </div>
        ) : (
          <div className={styles["card-image-default"]}></div>
        )}
        <div className={styles["card-more-option"]}>
          <Image
            src={moreOptionIcon}
            style={{
              width: 24,
              height: 24,
            }}
            alt="more option icon"
            preview={false}
            onClick={handleMoreOption}
          />
        </div>

        <Typography.Text className={styles["card-title"]}>
          {card?.name}
        </Typography.Text>
        <Typography.Text className={styles["card-desc"]}>
          {card.description}
        </Typography.Text>
        <Divider className={styles["card-divider"]} />
        <Flex className={styles["card-like"]}>
          <Image
            src={likeActive ? likeFillIcon : likeIcon}
            style={{
              width: 32,
              height: 32,
            }}
            alt="like icon"
            preview={false}
            className={styles["card-like-icon"]}
            onClick={handleLikeCard}
          />
          <Typography.Text
            className={
              card?.liked
                ? `${styles["card-like-text"]} ${styles["card-like-active"]}`
                : `${styles["card-like-text"]}`
            }
          >
            {formatNumber(card?.like)}
          </Typography.Text>
        </Flex>
        <Flex className={styles["card-comment-box"]}>
          <Typography.Text className={styles["card-comment-heading"]}>
            Comments
          </Typography.Text>
          <Typography.Text className={styles["card-comment-quantity"]}>
            ({card?.comments.length})
          </Typography.Text>
        </Flex>

        {(card?.comments || [])
          .slice(0, displayedComments)
          .map((comment: any, index: any) => (
            <CommentComponent comment={comment} key={index} />
          ))}

        <div>
          {card?.comments && card.comments.length > displayedComments && (
            <Typography.Text
              className={styles["card-more-comment"]}
              onClick={handleLoadMoreComments}
            >
              More comments
            </Typography.Text>
          )}
        </div>
        </div>
        {!writeComment ? (
          <Flex className={styles["card-write-comment"]}>
            <Button
              className={styles["card-btn-comment"]}
              onClick={handleOpenWriteComment}
            >
              Write comment
            </Button>
          </Flex>
        ) : (
          <div className={styles["card-write-comment"]}>
            <Checkbox checked={checked} onClick={handleCheckbox} />
            <Typography.Text className={styles["card-write-anonymous"]}>
              Comment as Unknown
            </Typography.Text>
            <Input
              placeholder="Your name"
              className={
                name.length > 50
                  ? `${styles["card-input-name"]} ${styles["card-input-error"]}`
                  : `${styles["card-input-name"]}`
              }
              bordered={false}
              disabled={checkUnknown}
              onKeyDown={handleKeyPress}
              onChange={handleNameChange}
              value={name}
            />

            <Input
              placeholder="Type your comment here"
              className={
                comment.length > 50
                  ? `${styles["card-input-comment"]} ${styles["card-input-error"]}`
                  : `${styles["card-input-comment"]}`
              }
              bordered={false}
              onChange={handleCommentChange}
              value={comment}
            />

            <Button
              onClick={handleCreateComment}
              className={
                (checked || nameCheck) && commentCheck
                  ? `${styles["card-btn-post"]} ${styles["card-btn-active"]}`
                  : `${styles["card-btn-post"]}`
              }
              disabled={!((checked || nameCheck) && commentCheck)}
            >
              Post comment
            </Button>
          </div>
        )}

        <MoreOption
          open={open}
          indexCard={index}
          onDelete={onDelete}
          card={card}
          onEdit={onEdit}
          visibleDetail={onCloseDetail}
        />
      </Drawer>
    </div>
  );
}

export default ViewDetail;
