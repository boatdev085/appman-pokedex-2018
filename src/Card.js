import React from "react";
import styled from "styled-components";
import { COLORS } from "./utils/colors";
import IconCute from "./cute.png";
const Card = ({ item, action, actionName }) => {
  const handleClickAction = () => {
    if (action) {
      action(item);
    }
  };
  const calHp = (hp) => {
    const checkNum = Number(hp);
    if (isNaN(checkNum)) {
      return 0;
    }
    if (checkNum > 100) {
      return 100;
    }
    return checkNum;
  };
  const calStr = (str) => {
    if (!str) return 0;
    const upStr = str * 50;
    if (upStr > 100) {
      return 100;
    }
    return upStr;
  };
  const calWeaknesses = (weak) => {
    if (!weak) return 0;
    const upWeak = weak * 100;
    if (upWeak > 100) {
      return 100;
    }
    return upWeak;
  };
  const calDamage = (attacks) => {
    if (!attacks || attacks.length === 0) {
      return 0;
    }
    let result = 0;
    for (let i = 0; i < attacks.length; i++) {
      const getDmg = Number(attacks[i].damage.replace(/[^0-9]/g, ""));
      result = result + getDmg;
    }
    return result;
  };
  const calHappiness = (hp, damage, weaknesses) => {
    const result = (hp / 10 + damage / 10 + 10 - weaknesses / 100) / 5;
    return Math.round(result);
  };
  const getHp = calHp(item.hp);
  const getStr = calStr((item.attacks && item.attacks.length) || 0);
  const getWeak = calWeaknesses(
    (item.weaknesses && item.weaknesses.length) || 0
  );
  const getDmg = calDamage(item.attacks);
  const getHappiness = calHappiness(getHp, getDmg, getWeak);
  return (
    <CardPokemon actionName={actionName}>
      <div className="action" onClick={handleClickAction}>
        {actionName || "Add"}
      </div>
      <div className="box-image">
        <img src={item.imageUrl || ""} alt={item.name || ""} />
      </div>
      <div className="box-detail">
        <div className="name">{item.name || "-"}</div>
        <div className="status">
          <div className="group-status">
            <span>HP</span>
            <BoxProgress value={getHp || 0} className="progress">
              <div className="load"></div>
            </BoxProgress>
          </div>
          <div className="group-status">
            <span>STR</span>
            <BoxProgress value={getStr || 0} className="progress">
              <div className="load"></div>
            </BoxProgress>
          </div>
          <div className="group-status">
            <span>WEAK</span>
            <BoxProgress value={getWeak} className="progress">
              <div className="load"></div>
            </BoxProgress>
          </div>
        </div>
        <div className="happiness">
          {[...Array(getHappiness).keys()].map((item, idx) => {
            return (
              <img
                src={IconCute}
                alt={`image_${idx + 1}`}
                key={`image_${idx + 1}`}
              />
            );
          })}
        </div>
      </div>
    </CardPokemon>
  );
};
export default Card;
const CardPokemon = styled.div`
  position: relative;
  margin-bottom: 16px;
  padding: 8px;
  background-color: #fcfcff;
  border: 1px solid #e5e5e5;
  border-radius: 2px;
  transition: all 200ms;
  display: flex;
  flex-direction: row;
  align-items: center;
  .action {
    display: none;
    position: absolute;
    right: 16px;
    top: 16px;
    font-size: 20px;
    color: ${COLORS.Fairy};
    cursor: pointer;
  }
  .box-image {
    margin-right: 16px;
    img {
      width: 160px;
      height: 200px;
    }
  }
  .box-detail {
    flex: 1;
    padding-right: ${({ actionName }) => (actionName === "X" ? "20px" : "20%")};
    .name {
      font-size: 26px;
      font-weight: normal;
      margin-bottom: 8px;
    }
    .status {
      margin-bottom: 8px;
      .group-status {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        span {
          flex: 0.2;
          margin-right: 8px;
        }
        .progress {
          flex: 1;
        }
      }
    }
    .happiness {
      position: relative;
      display: flex;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        margin-right: 4px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  &:hover {
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.08);
    .action {
      display: block;
    }
  }
`;
const BoxProgress = styled.div`
  width: 100%;
  background-color: #e5e5e5;
  border-radius: 25px;
  overflow: hidden;
  .load {
    width: ${({ value }) => value || 0}%;
    height: 30px;
    background-color: ${COLORS.Fighting};
  }
`;
