import React from 'react';
import { useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import Bubble from '../Channels/Bubble';
import StyledLink from '../StyledLink';
import SideBarListItem from '../SideBarListItem';

const User = ({ user }) => {
  const { workspaceId, userId } = useParams();

  const handleChannelClick = () => {};

  const isActive = (user) => {
    return user.id === parseInt(userId);
  };

  return (
    <StyledLink
      key={`user-${user.id}`}
      to={`/workspaces/${workspaceId}/user/${user.id}`}
    >
      <SideBarListItem
        className={`${isActive(user) ? 'active' : ''}`}
        onClick={handleChannelClick}
      >
        <Bubble /> {user.username}
      </SideBarListItem>
    </StyledLink>
  );
};

export default User;
