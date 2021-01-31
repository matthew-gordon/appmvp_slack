import React from 'react';
import { useParams } from 'react-router-dom';
import Bubble from '../Channels/Bubble';
import StyledLink from '../StyledLink';
import SideBarListItem from '../SideBarListItem';

const User = ({ user }) => {
  const { workspaceId } = useParams();

  return (
    <SideBarListItem>
      <StyledLink
        key={`user-${user.id}`}
        to={`/workspaces/${workspaceId}/user/${user.id}`}
      >
        <Bubble /> {user.username}
      </StyledLink>
    </SideBarListItem>
  );
};

export default User;
