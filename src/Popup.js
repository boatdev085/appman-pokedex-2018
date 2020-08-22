import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "./utils/colors";
import Card from "./Card";
import IconSearch from "./search.png";
const Popup = ({
  useShowPopup,
  setShowPopup,
  usePokemonSelect,
  setPokemonSelect,
}) => {
  const [usePokedex, setPokedex] = useState([]);
  const [useBackupPokedex, setBackupPokedex] = useState([]);
  const [useTextSearch, setTextSearch] = useState("");
  const handleGetPokedex = async () => {
    let response = await fetch("http://localhost:3030/api/cards").then((res) =>
      res.json()
    );
    if (response && response.cards) {
      setPokedex(response.cards);
      setBackupPokedex(response.cards);
    }
  };
  const handleOnChange = (e) => {
    setTextSearch(e.target.value);
    if (!e.target.value || e.target.value === "") {
      setPokedex(useBackupPokedex);
      return;
    }
    const searchPokedex = useBackupPokedex.filter(
      (f) =>
        (f.name && f.name.toLocaleLowerCase().includes(e.target.value)) ||
        (f.type && f.type.toLocaleLowerCase().includes(e.target.value))
    );
    setPokedex(searchPokedex);
  };
  const handleAddCard = (item) => {
    if (usePokemonSelect && setPokemonSelect && item) {
      setPokemonSelect([...usePokemonSelect, item]);
    }
  };
  useEffect(() => {
    handleGetPokedex();
  }, []);
  if (!useShowPopup) return null;
  return (
    <PopupAddCard>
      <div className="box-search-card">
        <InputSearch>
          <input
            placeholder="Find Pokemon"
            onChange={handleOnChange}
            value={useTextSearch}
          />
          <img src={IconSearch} alt="icon search" />
        </InputSearch>
        <BoxCard>
          {usePokedex.map((item, idx) => {
            const findCardSame = usePokemonSelect.find((f) => f.id === item.id);
            if (findCardSame) {
              return null;
            }
            return (
              <Card
                key={`pokedex_${idx + 1}`}
                item={item}
                actionName={"Add"}
                action={handleAddCard}
              />
            );
          })}
        </BoxCard>
      </div>
      <div
        className="background-close"
        onClick={() => setShowPopup(!useShowPopup)}
      ></div>
    </PopupAddCard>
  );
};
export default Popup;
const PopupAddCard = styled.div`
  z-index: 3;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .box-search-card {
    z-index: 5;
    position: relative;
    background-color: ${COLORS.Colorless};
    width: 100%;
    height: 100%;
    max-width: 92%;
    max-height: 92%;
    padding: 8px;
    margin: 16px auto;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .background-close {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgb(0, 0, 0, 0.4);
  }
`;
const InputSearch = styled.div`
  position: relative;
  border: 1px solid ${COLORS.Metal};
  margin-bottom: 16px;
  input {
    background: none;
    border: none;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 2px;
    font-size: 14px;
  }
  img {
    position: absolute;
    right: 2px;
    top: 2px;
    width: 30px;
    height: 30px;
  }
`;
const BoxCard = styled.div`
  flex: 1;
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
`;
