import React from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import Bubble from '../Channels/Bubble';
import StyledLink from '../StyledLink';
import SideBarListItem from '../SideBarListItem';

const User = ({ user }) => {
  const { url } = useRouteMatch();

  const handleChannelClick = () => {};

  return (
    <StyledLink key={`user-${user.id}`} to={`${url}/conversation/${user.id}`}>
      <SideBarListItem onClick={handleChannelClick}>
        <Bubble /> {user.username}
      </SideBarListItem>
    </StyledLink>
  );
};

export default User;
