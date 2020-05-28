import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import { GrUpdate } from 'react-icons/gr';

const NavBlock = styled.div`
  margin-top: 1rem;
  button + button {
    margin-left: 0.5rem;
  }
`;
const StyledButton = styled(Button)`
  height: 2.125rem;
  & + & {
    margin-left: 0.5rem;
  }
`;
const CinemaListBlock = styled(Responsive)`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
`;
const CinemaItemBlock = styled.div`
  width: calc(100% / 4);
  margin-bottom: 1rem;
  color: ${palette.gray[8]};
  font-weight: bold;
  border: none;
  background-color: white;
  cursor: pointer;
  &:hover {
    color: ${palette.cyan[7]};
  }
  img {
    width: 80%;
    height: 282.71px;
  }
  p:nth-child(1) {
    width: 80%;
    height: 30px;
  }
`;
const HoverButton = styled(Button)`
  width: 80%;
`;
const FilterBlock = styled.div`
  float: right;
  margin-right: 30px;
`;
//filter
const CinemaFilter = ({ onChange, option }) => {
  return (
    <>
      <select
        value={option}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="cinemafilter"
      >
        <option value="select">Select an Option</option>
        <option value="date">날짜순</option>
        <option value="name">이름순</option>
      </select>
    </>
  );
};

const CinemaImg = ({ item, onAlarm, user }) => {
  const { img, link } = item;
  const onClick = (e) => {
    e.preventDefault();
    onAlarm(item);
  };
  
  let hasId = [];
  if (user && user.alarm != null) {
    hasId = user.alarm.map((Object, index) => Object._id.includes(item._id));
  }
  return (
    <>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={img} alt="" />
        {user && hasId.includes(true) ? (
          <HoverButton onClick={onClick} cyan>
            신청완료
          </HoverButton>
        ) : (
          <HoverButton onClick={onClick}>알람신청</HoverButton>
        )}
      </a>
    </>
  );
};

const CiemaItem = ({ item, onAlarm, user }) => {
  const { movies, days } = item;
  return (
    <>
      {movies && (
        <CinemaItemBlock>
          <p>{movies}</p>
          <p>{days}</p>
          <CinemaImg item={item} onAlarm={onAlarm} user={user}></CinemaImg>
        </CinemaItemBlock>
      )}
    </>
  );
};

const CinemaNav = ({onClick,items,onUpdate,onChange,user,option,onAlarm,loading,onPush,}) => {
  const [clicked, setClicked] = useState('cgv');
  return (
    <>
      <NavBlock>
        <FilterBlock>
          {items && <CinemaFilter onChange={onChange} option={option} />}
        </FilterBlock>
        <StyledButton
          onClick={(e) => {
            setClicked('cgv');
            onClick(e.target.value);
          }}
          value="cgv"
          cyan={clicked === 'cgv' ? true : false}
        >
          CGV
        </StyledButton>
        <StyledButton
          onClick={(e) => {
            setClicked('megabox');
            onClick(e.target.value);
          }}
          value="megabox"
          cyan={clicked === 'megabox' ? true : false}
        >
          MEGABOX
        </StyledButton>
        <StyledButton
          onClick={(e) => {
            setClicked('lotte');
            onClick(e.target.value);
          }}
          value="lotte"
          cyan={clicked === 'lotte' ? true : false}
        >
          LOTTE
        </StyledButton>
        {user
          ? user._id === '5ec4ffe854fa2e0da3783d79' && (
              <>
                <StyledButton onClick={onUpdate} cyan>
                  UPDATE
                </StyledButton>
                <StyledButton onClick={onPush} cyan>
                  PUSH
                </StyledButton>
              </>
            )
          : ''}
        {loading && (
          <>
            <span> </span>
            <GrUpdate /> 진행중...
          </>
        )}
      </NavBlock>

      <CinemaListBlock>
        {items &&
          items.map((item, index) => (
            <CiemaItem item={item} key={index} onAlarm={onAlarm} user={user} />
          ))}
      </CinemaListBlock>
    </>
  );
};

export default CinemaNav;
