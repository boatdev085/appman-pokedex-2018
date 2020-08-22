import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import Popup from "./Popup";
import Card from "./Card";
import { COLORS } from "./utils/colors";

const App = () => {
  const [useShowPopup, setShowPopup] = useState(false);
  const [usePokemonSelect, setPokemonSelect] = useState([]);
  const handleDeleteCard = (item) => {
    setPokemonSelect(usePokemonSelect.filter((fil) => fil.id !== item.id));
  };
  const parsePokemonDex = (store) => {
    try {
      const parseDex = JSON.parse(store);
      setPokemonSelect(parseDex);
    } catch (e) {
      console.log("e", e);
    }
  };
  useEffect(() => {
    const getPokedex = localStorage.getItem("pokedex");
    if (getPokedex) {
      parsePokemonDex(getPokedex);
    }
  }, []);
  useEffect(() => {
    if (usePokemonSelect && usePokemonSelect.length > 0) {
      localStorage.setItem("pokedex", JSON.stringify(usePokemonSelect));
    }
  }, [usePokemonSelect]);
  return (
    <div className="App">
      <Container>
        <BoxCardResult>
          <h1 className="title">My Pokedex</h1>
          <div className="box-card-result">
            {usePokemonSelect.map((item, idx) => {
              return (
                <div className="wrapper-card" key={`pokemon_select${idx + 1}`}>
                  <Card
                    item={item}
                    actionName={"X"}
                    action={handleDeleteCard}
                  />
                </div>
              );
            })}
            {(!usePokemonSelect || usePokemonSelect.length === 0) && (
              <div className="no-result">Please select card</div>
            )}
          </div>
        </BoxCardResult>
        <ButtonOpenAddCard>
          <span onClick={() => setShowPopup(true)}>+</span>
        </ButtonOpenAddCard>
        <Popup
          useShowPopup={useShowPopup}
          setShowPopup={setShowPopup}
          usePokemonSelect={usePokemonSelect}
          setPokemonSelect={setPokemonSelect}
        />
      </Container>
    </div>
  );
};

export default App;
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const BoxCardResult = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .title {
    margin: 0;
    position: relative;
    text-align: center;
    background: ${COLORS.Colorless};
    padding: 12px;
  }
  .box-card-result {
    flex: 1;
    position: relative;
    padding: 0 8px 40px 8px;
    overflow: scroll;
    .wrapper-card {
      position: relative;
      vertical-align: top;
      width: calc(100% / 2.05);
      margin-top: 0;
      margin-right: 16px;
      display: inline-block;
      &:nth-child(even) {
        margin-right: 0;
      }
    }
    .no-result {
      height: 100%;
      position: relative;
      font-size: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }
  }
`;
const ButtonOpenAddCard = styled.div`
  position: relative;
  z-index: 2;
  background-color: ${COLORS.Fire};
  height: 60px;
  display: flex;
  justify-content: center;
  span {
    cursor: pointer;
    position: absolute;
    top: -42px;
    padding: 0px 30px;
    font-size: 60px;
    border-radius: 50%;
    color: ${COLORS.Colorless};
    background-color: ${COLORS.Fire};
  }
`;
