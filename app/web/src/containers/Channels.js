import React from 'react';
import styled from 'styled-components';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import User from '../components/Channels/User';
import Bubble from '../components/Channels/Bubble';
import Channel from '../components/Channels/Channel';
import StyledLink from '../components/StyledLink';
import SideBarListItem from '../components/SideBarListItem';
import SideBarHeader from '../components/SideBarHeader';

const Channels = ({ user, channels }) => {
  const { workspaceId } = useParams();
  const location = useLocation();
  const workspace = useSelector((state) => state.workspace);

  return (
    <ChannelWrapper>
      <>
        <WorkspaceNameHeader>{workspace.name}</WorkspaceNameHeader>
        {user.username}
      </>
      <>
        <SideBarList style={{ textAlign: 'left' }}>
          <SideBarHeader>
            Channels
            <Link
              to={{
                pathname: `/workspaces/${workspaceId}/channel/new`,
                state: { background: location },
              }}
            >
              <Add className="material-icons">
                <FontAwesomeIcon icon={faPlusCircle} />
              </Add>
            </Link>
          </SideBarHeader>
          {channels.length &&
            channels.map((channel) => (
              <Channel key={channel.id} channel={channel} />
            ))}
        </SideBarList>
      </>
      <>
        <SideBarList>
          <SideBarHeader>
            Direct Messages
            <Add className="material-icons">
              <FontAwesomeIcon icon={faPlusCircle} />
            </Add>
          </SideBarHeader>
          <StyledLink to={`/workspaces/${workspaceId}/user/${user.id}`}>
            <SideBarListItem>
              <Bubble /> {user.username} <small>(you)</small>
            </SideBarListItem>
          </StyledLink>
          {workspace.directMessages.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </SideBarList>
      </>
      <>
        <SideBarList>
          <StyledLink
            to={{
              pathname: `/workspaces/${workspaceId}/member/new`,
              state: { background: location },
            }}
          >
            <SideBarListItem> + invite people</SideBarListItem>
          </StyledLink>
        </SideBarList>
      </>
    </ChannelWrapper>
  );
};

export default Channels;

const ChannelWrapper = styled.div`
  background-color: #52364e;
  grid-column: 2;
  grid-row: 1 / 4;
  color: #fff;
  text-align: center;
`;

const WorkspaceNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SideBarList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-left: 0px;
  text-align: left;
`;

const Add = styled.i`
  color: #fff;
  font-size: 1em;
  color: rgba(255, 255, 255, 0.4);
  padding: 10px;
  transition: all 0.2s ease;
  &:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 1);
  }
`;
