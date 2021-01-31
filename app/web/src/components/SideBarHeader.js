import React from 'react';
import styled from 'styled-components';

const SideBarHeader = ({ children, ...rest }) => {
  return <SideBarListHeader {...rest}>{children}</SideBarListHeader>;
};

export default SideBarHeader;

const SideBarListHeader = styled.li`
  display: flex;
  align-items: center;
  padding: 1em;
`;
