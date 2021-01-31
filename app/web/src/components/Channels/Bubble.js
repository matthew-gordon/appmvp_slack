import React from 'react';
import styled from 'styled-components';

const Bubble = ({ on = true }) => {
  return on ? <Green>●</Green> : '○';
};

export default Bubble;

const Green = styled.span`
  color: #38978d;
`;
