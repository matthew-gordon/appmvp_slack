import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveChannel } from '../../actions/workspace';
import StyledLink from '../StyledLink';
import SideBarListItem from '../SideBarListItem';

const Channel = ({ channel }) => {
  const { workspaceId, channelId } = useParams();
  const dispatch = useDispatch();

  const handleChannelClick = () => {
    console.log(channel);
    dispatch(setActiveChannel(channel));
  };

  const isActive = (channel) => {
    return channel.id === parseInt(channelId);
  };

  return (
    <SideBarListItem
      className={`${isActive(channel) ? 'active' : ''}`}
      onClick={handleChannelClick}
    >
      <StyledLink
        key={`channel-${channel.id}`}
        to={`/workspaces/${workspaceId}/${channel.id}`}
      >
        # {channel.name}
      </StyledLink>
    </SideBarListItem>
  );
};

export default Channel;
