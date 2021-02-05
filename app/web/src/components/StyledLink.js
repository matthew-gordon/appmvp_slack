import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const SideBarLink = ({ children, ...rest }) => {
  return (
    <StyledLink activeClassName="active" {...rest}>
      {children}
    </StyledLink>
  );
};

export default SideBarLink;

const StyledLink = styled(NavLink)`
  color: #fff;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  &:hover,
  &:active {
    background: #3e313c;
  }

  &.active {
    background: cornflowerblue;
    color: #fff;
  }
`;
