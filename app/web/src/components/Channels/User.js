import React from 'react';
import { useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import Bubble from '../Channels/Bubble';
import StyledLink from '../StyledLink';
import SideBarListItem from '../SideBarListItem';

const User = ({ user }) => {
  const { workspaceId, userId } = useParams();
  // const dispatch = useDispatch();

  const handleChannelClick = () => {};

  const isActive = (user) => {
    return user.id === parseInt(userId);
  };

  return (
    <SideBarListItem
      className={`${isActive(user) ? 'active' : ''}`}
      onClick={handleChannelClick}
    >
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
