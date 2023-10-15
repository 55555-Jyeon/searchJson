import { useEffect, useRef, useState } from "react";
import { getKeywords } from "../api/search.api";
import styled from "styled-components";

const HomePage = () => {
  const [data, setData] = useState({});
  const [keywords, setKeywords] = useState("노트");

  const [inputValue, setInputValue] = useState("");
  const [hasInputValue, setHasInputValue] = useState(false);

  const [dropDownList, setDropDownList] = useState();
  const [dropDownIndex, setDropDownIndex] = useState(-1);
  const dropdownRef = useRef();

  useEffect(() => {
    (async () => {
      const data = await getKeywords(keywords);
      setData(data);
      console.log(data);
    })();
  }, [keywords]);

  // show related keywords
  // filter keywords which includes(contains) inputValue
  const showDropDownList = () => {
    if (inputValue) {
      const keywordsIncluded = data.filter((wordsList) => {
        return wordsList.includes(inputValue);
      });
      setDropDownList(keywordsIncluded);
    } else {
      setHasInputValue(false);
      setDropDownList([]);
    }
  };

  const checkInputValue = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
    setKeywords(e.target.value);
    setHasInputValue(true);
  };

  // dropdown에서 특정 keyword 클릭 시 발생할 이벤트
  const clickedDropDownItem = (clickedItem) => {
    setInputValue(clickedItem);
    setHasInputValue(false);
  };

  // 키보드 조작 관련 로직 : keyUp, keyDown, Enter
  // dropdown의 요소를 선택하기 위해 키보드에 버튼을 눌릴 때마다, 아래의 조건에 따라 dropDown=Index 값 업데이트
  const handleKeyArrow = (e) => {
    e.preventDefault();
    if (hasInputValue) {
      switch (e.key) {
        case e.key === "ArrowDown":
          setDropDownIndex(dropDownIndex + 1);
          if (dropdownRef.current?.dropDownList.length === dropDownIndex + 1)
            setDropDownIndex(0);
          break;
        case e.key === "ArrowUp":
          setDropDownIndex(dropDownIndex - 1);
          if (dropDownIndex >= 0) {
            setDropDownList([]);
            setDropDownIndex(-1);
          }
          break;
        case e.key === "Enter":
          clickedDropDownItem(dropDownList[dropDownIndex]);
          setDropDownIndex(-1);
          break;
      }
    }
  };

  useEffect(showDropDownList, [inputValue, data]);

  return (
    <Wrapper>
      <Title>Google</Title>
      <SearchBox>
        <Input
          value={inputValue}
          onChange={checkInputValue}
          onKeyDown={handleKeyArrow}
          placeholder="search keyword"
        />
        <DeleteButton onClick={() => setInputValue("")}>&times;</DeleteButton>
      </SearchBox>
      {hasInputValue && (
        <DropDownWrapper ref={dropdownRef}>
          {dropDownList.length === 0 && (
            <ShowMessage>해당 단어를 포함한 검색어가 없습니다.</ShowMessage>
          )}
          {dropDownList.map((word, wordIndex) => {
            return (
              <RelatedKeyword
                key={wordIndex}
                onClick={() => clickedDropDownItem(word)}
                onMouseOver={() => {
                  setDropDownIndex(wordIndex);
                }}
                className={dropDownIndex === wordIndex ? "selected" : ""}
              >
                {word}
              </RelatedKeyword>
            );
          })}
        </DropDownWrapper>
      )}
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: aliceblue;
`;

const Title = styled.h1`
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 60px;
  letter-spacing: 1px;
`;

const SearchBox = styled.form`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Input = styled.input`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 45%;
  height: 5%;
  padding: 0 2%;
  border-radius: 50px 50px;
  outline: none;
  border: none;
  z-index: 10;
  box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.05);
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 31.25%;
  right: 27%;
  background-color: #fff;
  border: none;
  width: 26px;
  height: 26px;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 20;

  &:hover {
    background-color: #e9e9e9;
  }
`;

const DropDownWrapper = styled.ul`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 45%;
  height: fit-content;
  min-height: 10%;
  max-height: 40%;
  overflow-y: scroll;
  padding: 3% 2% 0;
  background-color: #fff;
  border-radius: 20px;
  /* hide scroll */
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  &::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
`;

const ShowMessage = styled.li`
  list-style: none;
  margin-bottom: 1rem;
  padding: 1rem 2%;
  text-align: center;
  color: #666;
  border-radius: 4px;
  cursor: pointer;
`;

const RelatedKeyword = styled.li`
  list-style: none;
  margin-bottom: 1rem;
  padding: 1rem 2%;
  border-radius: 4px;
  cursor: pointer;

  &:hover,
  &:focus,
  .selected {
    background-color: #eee;
  }
`;

// const LatestSearched = styled.li``;
