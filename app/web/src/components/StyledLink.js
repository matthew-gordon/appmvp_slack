import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SideBarLink = ({ children, ...rest }) => {
  return <StyledLink {...rest}>{children}</StyledLink>;
};

export default SideBarLink;

const StyledLink = styled(Link)`
  color: #fff;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
