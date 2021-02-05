import React, { useEffect } from 'react';
import Workspaces from './Workspaces';
import Channels from './Channels';

const Sidebar = ({ workspaces, channels, user }) => {
  return (
    <>
      <Workspaces workspaces={workspaces} />
      <Channels channels={channels} user={user} />
    </>
  );
};

export default Sidebar;
