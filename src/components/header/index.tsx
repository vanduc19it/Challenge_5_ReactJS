import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { Image, Flex, Button, Typography, Input, AutoComplete } from "antd";
import logo from "../../assets/images/logo.svg";
import addIcon from "../../assets/images/add-icon.svg";
import searchIcon from "../../assets/images/search-icon.svg";
import searchBlack from "../../assets/images/search-icon-black.svg";
import ModalAdd from "../modals/modalAdd";
import closeIcon from "../../assets/images/close-icon.svg";
import { getLocalStorageItem, setLocalStorageItem } from "../../apis/cards";
import { validateInputName } from "../../utils/validation";

function Header({
  updateCardList,
  onSearch,
}: {
  updateCardList: any;
  onSearch: (search: string) => void;
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const [searchValue, setSearchValue] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    const parsedHistory = storedHistory ? JSON.parse(storedHistory) : [];
    const limitedHistory = parsedHistory.slice(0, 5);
    setSearchHistory(limitedHistory);
    setLocalStorageItem("searchHistory", limitedHistory);
  }, []);

  const [checkInput, setCheckInput] = useState(true);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
    const newSearchInput = e.target.value.trimStart();

    const capitalizedName = newSearchInput.charAt(0) + newSearchInput.slice(1);
    setSearchValue(capitalizedName);
    console.log(searchValue);
    validateInputName(e.target.value)
      ? setCheckInput(true)
      : setCheckInput(false);
    console.log(checkInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCheck =
      e.key === "Process" ? e.code.charAt(e.code.length - 1) : e.key;

    const isValidChar = /^[a-zA-Z\s]*$/.test(keyCheck);

    if (!isValidChar) {
      e.preventDefault();
    }
  };

  const [searchResultStatus, setSearchResultStatus] = useState<boolean>(false);

  const handleSearchCard = () => {
    onSearch(searchValue);
    console.log(searchValue);

    if (searchValue !== "" && !searchHistory.includes(searchValue)) {
      const updatedHistory = [searchValue, ...searchHistory];
      setSearchHistory(updatedHistory);
      console.log(searchHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

      const hasSearchResult = cardList.some((card: any) =>
        card.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchResultStatus(hasSearchResult ? true : false);
    } else if (
      searchValue === "" ||
      (searchValue !== "" && options.length === 0)
    ) {
      setSearchResultStatus(false);
    }
  };

  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    const storedCardList: any = getLocalStorageItem("cardList");

    setCardList(storedCardList);
  }, []);

  const [options, setOptions] = useState<any>([]);

  const handleSearch = (value: any) => {
    console.log(value,"value");
    
    if (value !== "") {
      const filteredCards = cardList.filter((card: any) =>
        card.name.toLowerCase().includes(value.toLowerCase())
      );

      const uniqueFilterCard = Array.from(new Set(filteredCards));

      const suggestionNames: any[] = uniqueFilterCard.map(
        (card: any) => card.name
      );

      setOptions(suggestionNames);
    } else {
      setOptions([]);
    }
  };

  const onSelect = (value: any) => {
    const selectedOption = options[value];
    setSearchValue(selectedOption);
    //xu ly showw search khi chon 1 item
    console.log(value, "value")

  };
  


  const handleRemoveOption = (value: string) => {
    console.log(searchHistory);

    const updatedHistory = searchHistory.filter(
      (history: any) => history !== value
    );
    setSearchHistory(updatedHistory);
    setLocalStorageItem("searchHistory", updatedHistory);
  };

  const highlightTerm = (text:any, term:any) => {
    const regex = new RegExp(term, 'gi');
    return text.replace(regex, (match:any) => `<span class="${styles['header-suggestion-highlight']}">${match}</span>`);
  };

  const renderOptions = () => {
    if (!searchValue && searchHistory.length !== 0) {
      return searchHistory.slice(0, 5).map((item: any, index: any) => ({
        value: item,

        label: (
          <div key={index + item} className={styles["header-suggestion"]}>
            <span style={{ marginRight: "8px" }}>{item}</span>
            <span onClick={() => handleRemoveOption(item)}>
              <Image
                src={closeIcon}
                style={{
                  width: 20,
                  height: 20,
                }}
                alt="close icon"
                preview={false}
                className={styles["header-close-icon"]}
              />
            </span>
          </div>
        ),
      }));
    } else if (!searchValue && searchHistory.length === 0) {
      return [{ value: "no result", label: <div>No result</div> }];
    } else if (searchValue && options.length === 0) {
      return [{ value: "no result", label: <div>No result</div> }];
    } else {
      return options.map((name:any, index:any) => ({
        value: index.toString(),
        label: (
          <li
            key={index}
            dangerouslySetInnerHTML={{
              __html: highlightTerm(name, searchTerm),
            }}
          />
        ),
      }));
    }
  };
  return (
    <div className={styles.header}>
      <Image
        src={logo}
        style={{
          width: 200,
          height: 100,
        }}
        alt="Social Card"
        preview={false}
        className={styles["header-logo"]}
      />
      <Flex className={styles["header-box"]}>
        <Button
          className={styles["header-btn-create"]}
          onClick={handleOpenModal}
        >
          <Image
            src={addIcon}
            style={{
              width: 20,
              height: 20,
            }}
            alt="add icon"
            preview={false}
            className={styles["header-add-icon"]}
          />
          <Typography.Text className={styles["header-add-text"]}>
            Create new card
          </Typography.Text>
        </Button>
        <Flex className={styles["header-search-box"]}>
          <AutoComplete
            popupMatchSelectWidth={364}
            style={{ width: 364 }}
            options={renderOptions()}
            onSelect={onSelect}
            onSearch={handleSearch}
            className={styles["header-autocomplete"]}
            value={searchValue}
            
          >
            <Input
              placeholder="Search.."
              className={styles["header-search-input"]}
              bordered={false}
              onPressEnter={handleSearchCard}
              onChange={handleSearchInput}
              value={searchValue}
              onKeyDown={handleKeyPress}
              prefix={
                <Image
                  src={searchBlack}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  alt="search icon"
                  preview={false}
                  className={styles["header-search-icon-mobile"]}
                />
              }
            />
          </AutoComplete>
          <Button
            className={styles["header-btn-search"]}
            onClick={handleSearchCard}
          >
            <Image
              src={searchIcon}
              style={{
                width: 20,
                height: 20,
              }}
              alt="search icon"
              preview={false}
              className={styles["header-search-icon"]}
            />
          </Button>
        </Flex>
      </Flex>

      <ModalAdd
        visible={modalOpen}
        onClose={handleCloseModal}
        updateCardList={updateCardList}
      />
    </div>
  );
}

export default Header;
