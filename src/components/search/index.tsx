import React from "react";
import styles from "./style.module.scss";
import { Image, Typography } from "antd";
import searhNotFound from "../../assets/images/search-no-result.svg";
function NotFound() {
  return (
    <div className={styles.search}>
      <Image
        src={searhNotFound}
        style={{
          width: 350,
          height: 350,
        }}
        alt="Search no result found"
        preview={false}
        className={styles["search-image"]}
      />
      <Typography.Text className={styles["search-title"]}>
        Sorry, no result found
      </Typography.Text>
      <Typography.Text className={styles["search-desc"]}>
        Try adjusting your search to find what you’re looking for.
      </Typography.Text>
    </div>
  );
}

export default NotFound;
