import { useEffect, useState } from "react";
import { getKeywords } from "../api/search.api";
import styled from "styled-components";

const HomePage = () => {
  const [data, setData] = useState({});
  const [keywords, setKeywords] = useState("노트");

  const [inputValue, setInputValue] = useState("");
  const [hasInputValue, setHasInputValue] = useState(false);

  const [dropDownList, setDropDownList] = useState();
  const [dropDownKeywordIndex, setDropDownKeywordIndex] = useState(-1);

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
      const resultsArrayList = data.filter((wordsList) => {
        return wordsList.includes(inputValue);
      });
      const relatedKeywordsList = resultsArrayList.map((keywords) => {
        return keywords;
      });
      setDropDownList(relatedKeywordsList);
    } else {
      setHasInputValue(false);
      setDropDownList([]);
    }
  };

  const checkInputValue = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
    setHasInputValue(true);
  };

  // dropdown에서 특정 keyword 클릭 시 발생할 이벤트
  const clickedDropDownItem = (clickedItem) => {
    setInputValue(clickedItem);
    setHasInputValue(false);
  };

  // 키보드 조작 관련 로직 : keyUp, keyDown, Enter
  // dropdown의 요소를 선택하기 위해 키보드에 버튼을 눌릴 때마다, 아래의 조건에 따라 dropDownKeywordIndex 값 업데이트
  const handleDropDownKey = (e) => {
    e.preventDefault();
    if (hasInputValue) {
      if (
        e.key === "ArrowDown" &&
        dropDownList.length - 1 > dropDownKeywordIndex
      ) {
        setDropDownKeywordIndex(dropDownKeywordIndex + 1);
      } else if (e.key === "ArrowUp" && dropDownKeywordIndex >= 0)
        setDropDownKeywordIndex(dropDownKeywordIndex - 1);
      else if (e.key === "Enter" && dropDownKeywordIndex >= 0) {
        clickedDropDownItem(dropDownList[dropDownKeywordIndex]);
        setDropDownKeywordIndex(-1);
      }
    }
  };

  useEffect(showDropDownList, [inputValue]);

  return (
    <Wrapper>
      <Title>Google</Title>
      <SearchBox>
        <Input
          value={inputValue}
          onChange={checkInputValue}
          onKeyUp={handleDropDownKey}
          placeholder="search keyword"
        />
        <DeleteButton onClick={() => setInputValue("")}>&times;</DeleteButton>
      </SearchBox>
      {hasInputValue && (
        <DropDownWrapper>
          {dropDownList.length === 0 && (
            <ShowMessage>해당 단어를 포함한 검색어가 없습니다.</ShowMessage>
          )}
          {dropDownList.map((word, wordIndex) => {
            return (
              <RelatedKeyword
                key={wordIndex}
                onClick={() => clickedDropDownItem(word)}
                onMouseOver={() => {
                  setDropDownKeywordIndex(wordIndex);
                }}
                className={dropDownKeywordIndex === wordIndex ? "selected" : ""}
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
  width: 47%;
  height: fit-content;
  min-height: 15%;
  padding: 3% 1% 0;
  background-color: #fff;
  border-radius: 20px;
`;

const RelatedKeyword = styled.li`
  list-style: none;
  margin-bottom: 1rem;
  padding: 1rem 2%;
  border-radius: 4px;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #eee;
  }
`;

const LatestSearched = styled.li``;

const ShowMessage = styled.li``;
