import React, { useState } from "react";
import styles from "./style.module.scss";
import { Image, Flex, Typography, Card, Divider } from "antd";
import likeIcon from "../../assets/images/like-icon.svg";
import likeFillIcon from "../../assets/images/like-fill-icon.svg";
import commentIcon from "../../assets/images/comment-icon.svg";
import ViewDetail from "../detail";
import MoreOption from "../dropdown";
import moreOptionIcon from "../../assets/images/more-option-icon.svg";
import { formatNumber } from "../../utils/format";
function CardComponent({
  card,
  index,
  onDelete,
  onLike,
  onEdit,
}: {
  card: any;
  index: number;
  onDelete: any;
  onLike: any;
  onEdit: any;
}) {

  const [viewDetail, setViewDetail] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const handleViewDetail = () => {
    setViewDetail(true);

    setVisible(false);
  };

  const handleCloseDetail = () => {
    setViewDetail(false);
  };

  const handleVisibleChange = (e: any) => {
    console.log(card, index);
    setVisible(!visible);
    e.stopPropagation();
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

  return (
    <>
      <Card className={styles.card} onClick={handleViewDetail}>
        <Flex className={styles["card-info"]}>
          {card?.image !== "" ? (
            <Image
              src={card?.image}
              style={{
                width: 140,
                height: 140,
                borderRadius: 8,
              }}
              alt="card image"
              preview={false}
              className={styles["card-image"]}
            />
          ) : (
            <div className={styles["card-image-default"]}></div>
          )}

          <Flex className={styles["card-content"]}>
            <Typography.Text className={styles["card-title"]}>
              {card?.name}
            </Typography.Text>
            <Typography.Text className={styles["card-desc"]}>
              {card?.description}
            </Typography.Text>
          </Flex>
        </Flex>
        <Divider className={styles["card-divider"]} />
        <Flex className={styles["card-action"]}>
          <Flex className={styles["card-like"]}>
            <Image
              src={likeActive ? likeFillIcon : likeIcon}
              style={{
                width: 20,
                height: 20,
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
          <Flex className={styles["card-comment"]}>
            <Image
              src={commentIcon}
              style={{
                width: 20,
                height: 20,
              }}
              alt="comment icon"
              preview={false}
              className={styles["card-comment-icon"]}
            />
            <Typography.Text className={styles["card-comment-text"]}>
              {card?.comments.length}
            </Typography.Text>
          </Flex>
        </Flex>
        <div
          className={
            visible
              ? `${styles["card-more-option"]} ${styles["card-option-active"]}`
              : `${styles["card-more-option"]}`
          }
        >
          <Image
            src={moreOptionIcon}
            style={{
              width: 24,
              height: 24,
            }}
            alt="more option icon"
            preview={false}
            onClick={handleVisibleChange}
          />
        </div>

        <MoreOption
          open={visible}
          indexCard={index}
          onDelete={onDelete}
          card={card}
          onEdit={onEdit}
          visibleDetail={handleCloseDetail}
        />
      </Card>
      <ViewDetail
        visible={viewDetail}
        onCloseDetail={handleCloseDetail}
        card={card}
        index={index}
        onDelete={onDelete}
        onEdit={onEdit}
        onLike={onLike}
      />
    </>
  );
}

export default CardComponent;
