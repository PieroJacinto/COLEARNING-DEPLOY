import React, { useState,useEffect } from "react";
import SideBar from './SideBar';
import { SkeletonTheme } from 'react-loading-skeleton';
function App() {
  return (
    <React.Fragment>
      <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
        <div id="wrapper">
          <SideBar />
        </div>
      </SkeletonTheme>
    </React.Fragment>
  );
}

export default App;