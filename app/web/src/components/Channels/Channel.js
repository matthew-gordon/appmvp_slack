import React from 'react';
import { useParams, useRouteMatch, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveChannel } from '../../actions/workspace';
import StyledLink from '../StyledLink';
import SideBarListItem from '../SideBarListItem';
import PathToRegexp from 'path-to-regex';

const Channel = ({ channel }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  let { url } = useRouteMatch();
  const pathRe = new PathToRegexp(
    '/workspace/:workspaceId?/channel/:channelId?'
  );

  const handleChannelClick = () => {
    dispatch(setActiveChannel(channel));
  };

  return (
    <StyledLink
      key={`channel-${channel.id}`}
      to={`${url}/channel/${channel.id}`}
    >
      <SideBarListItem onClick={handleChannelClick}>
        # {channel.name}
      </SideBarListItem>
    </StyledLink>
  );
};

export default Channel;
