//import useState hook to create menu collapse state
import React, { useState } from "react";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { FiHome, FiLogOut } from "react-icons/fi";
import { BiImageAdd, BiDollar } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import "react-pro-sidebar/dist/css/styles.css";
import '../../css/Header.css';


const SideBarMenu = () => {

  return (
    <>
      <div id="header">
        <ProSidebar collapsed={false}>
          <SidebarHeader>
          <div className="logo">
              <img  className="logoImg" src="../../img/logo-naturama.png"></img>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="round">
              <MenuItem active={true }icon={<FiHome />}>Accueil</MenuItem>
              <MenuItem icon={<ImProfile />}>Mon profil</MenuItem>
              <MenuItem icon={<BiImageAdd />}>Publier</MenuItem>
              <MenuItem icon={<BiDollar />}>Donation</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="round">
              <MenuItem icon={<FiLogOut />}>Deconnexion</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default SideBarMenu;