import React, { useEffect, useState } from "react";
import Header from "./components/header";
import CardComponent from "./components/card";
import { Row, Col, Image, Typography } from "antd";
import PaginationComponent from "./components/pagination";
import NotFound from "./components/search";
import { getLocalStorageItem, setLocalStorageItem } from "./apis/cards";
import checkIcon from "./assets/images/check-icon.svg";
function App() {
  const cardListDefault: any = [
    {
      name: "Lorem ipsum dolor sit amet consectetur Ut praesent",
      description: `Lorem ipsum dolor sit amet consectetur. Ut praesent mi ac ut
    tincidunt risus at lectus. Est consequat tincidunt consectetur non
    hac integer nibh duis. Ullamcorper nibh scelerisque aliquam
    pellentesque.`,
      image: "",
      like: 12200,
      comments: [],
      liked: false,
    },
    {
      name: "Name",
      description: `Lorem ipsum dolor sit amet consectetur. `,
      image: "",
      like: 12200,
      comments: [],
      liked: false,
    },
    {
      name: "Name",
      description: `Lorem ipsum dolor sit amet consectetur. `,
      image: "",
      like: 12200,
      comments: [],
      liked: false,
    },
    {
      name: "Name",
      description: `Lorem ipsum dolor sit amet consectetur. Ut praesent mi ac ut tincidunt risus at lectus. `,
      image: "",
      like: 12200,
      comments: [],
      liked: false,
    },
  ];

  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    const storedCardList = getLocalStorageItem("cardList");
    if (!storedCardList) {
      setLocalStorageItem("cardList", cardListDefault);
      setCardList(cardListDefault);
    } else {
      setCardList(storedCardList);
    }
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  const updateCardList = (newCardList: any) => {
    setLocalStorageItem("cardList", newCardList);
    setCardList(newCardList);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  const handleDelete = (deletedCardIndex: any) => {
    const updatedCardList = cardList.filter(
      (card, index) => index !== deletedCardIndex
    );
    setCardList(updatedCardList);
    setLocalStorageItem("cardList", updatedCardList);
  };

  const handleLikeCard = (index: any) => {
    const updatedCardList: any = [...cardList];
    updatedCardList[index].like += 1;
    updatedCardList[index].liked = true;

    setCardList(updatedCardList);
    setLocalStorageItem("cardList", updatedCardList);
  };

  const handleEditCard = (cardEdit: any, index: any) => {
    const updatedCardList: any = [...cardList];

    updatedCardList[index] = cardEdit;
    setCardList(updatedCardList);
    setLocalStorageItem("cardList", updatedCardList);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cardsPerPage, setCardsPerPage] = useState<number>(10);

  const renderVisibleCards = () => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const cardsToDisplay = cardList.slice(startIndex, endIndex);
    return cardsToDisplay;
  };

  const [searchSuccess, setSearchSuccess] = useState<boolean>(true);
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = (value: any) => {
    const filteredCardList = cardList.filter((card: any) =>
      card.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResult(filteredCardList);
    setSearchSuccess(searchResult.length > 0);
  };

  return (
    <div className="container">
      <Header updateCardList={updateCardList} onSearch={handleSearch} />
      <Row gutter={[16, 16]}>
        {searchResult.length > 0 && searchSuccess ? (
          searchResult.map((item, index) => (
            <Col span={12} key={index}>
              <CardComponent
                card={item}
                index={index}
                onDelete={handleDelete}
                onLike={handleLikeCard}
                onEdit={handleEditCard}
              />
            </Col>
          ))
        ) : !searchSuccess ? (
          <NotFound />
        ) : (
          renderVisibleCards().map((item, index) => (
            <Col span={12} key={index}>
              <CardComponent
                card={item}
                index={index}
                onDelete={handleDelete}
                onLike={handleLikeCard}
                onEdit={handleEditCard}
              />
            </Col>
          ))
        )}
      </Row>

      {searchResult.length > 0 && searchSuccess ? (
        searchResult.length > 10 && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={Math.ceil(cardList.length / cardsPerPage)}
            onPageChange={setCurrentPage}
          />
        )
      ) : !searchSuccess ? (
        <></>
      ) : (
        cardList.length > 10 && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={Math.ceil(cardList.length / cardsPerPage)}
            onPageChange={setCurrentPage}
          />
        )
      )}

      <div className={`toast-success ${isVisible ? "visible" : ""}`}>
        <Image
          src={checkIcon}
          style={{
            width: 24,
            height: 24,
          }}
          alt="success icon"
          preview={false}
          className="toast-icon"
        />

        <Typography.Text className="toast-text">
          Successfully create!
        </Typography.Text>
      </div>
    </div>
  );
}

export default App;
