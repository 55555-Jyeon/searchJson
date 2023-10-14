import { useEffect, useState } from "react";
import { getKeywords } from "../api/search.api";
import styled from "styled-components";

const HomePage = () => {
  const [data, setData] = useState({});
  const [keywords, setKeywords] = useState("노트");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    (async () => {
      const data = await getKeywords(keywords);
      setData(data);
      console.log(data);
    })();
  }, [keywords]);

  const searchKeyword = (e) => {
    if (e.key === "Enter") {
      setKeywords(e.target.value);
      setInputValue("");
    }
  };

  return (
    <Wrapper>
      <Title>Google</Title>
      <SearchBox>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={searchKeyword}
          placeholder="search keyword"
        />
        <DeleteButton>x</DeleteButton>
        <DropDownList></DropDownList>
      </SearchBox>
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

const SearchBox = styled.div`
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

const DropDownList = styled.ul`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 45%;
  height: 15%;
  padding: 0 2%;
  background-color: #fff;
  border-radius: 20px;
`;

const RelatedWord = styled.li``;

const LatestSearched = styled.li``;
