import React from 'react';
import styled from 'styled-components';

const SideBarItem = ({ children, ...rest }) => {
  return <SideBarListItem {...rest}>{children}</SideBarListItem>;
};

export default SideBarItem;

const SideBarListItem = styled.li`
  padding: 6px;
  cursor: pointer;
  font-weight: 300;
`;
