import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import AuthService from "../services/auth.service";
import { FiHome, FiLogOut } from "react-icons/fi";
import { BiImageAdd, BiDollar } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import "react-pro-sidebar/dist/css/styles.css";
import '../../css/Header.css';

import Sticky from 'react-stickynode';



import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";



export default class SideBarMenu extends Component {

  logout(event) {
    event.preventDefault();
    AuthService.logout();
    this.props.history.push("/login");
}



  render (){
    return (
      <Sticky enabled={true} top={100} bottomBoundary={0}>
            <div id="header">
              <ProSidebar collapsed={false}>
                <SidebarHeader>
                <div className="logo">
                    <img  className="logoImg" src="../../img/logo_small.png"></img>
                  </div>
                </SidebarHeader>
                <SidebarContent>
                  <Menu iconShape="round">
                    <MenuItem active={true }icon={<FiHome />}>Accueil<NavLink exact to="/"></NavLink></MenuItem>
                    <MenuItem icon={<ImProfile />}>Mon profil</MenuItem>
                    <MenuItem icon={<BiImageAdd />}>Publier</MenuItem>
                    <MenuItem icon={<BiDollar />}>Donation</MenuItem>
                  </Menu>
                </SidebarContent>
                <SidebarFooter>
                  <Menu iconShape="round">
                      <MenuItem onClick={(e) => this.logout(e)} icon={<FiLogOut />}>Deconnexion</MenuItem>
                  </Menu>
                </SidebarFooter>
              </ProSidebar>
            </div>
        </Sticky>
    );
  };


}

