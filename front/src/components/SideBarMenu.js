import React, { Component, createRef } from 'react';
import { NavLink } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { BiImageAdd, BiDollar } from 'react-icons/bi';
import { ImProfile } from 'react-icons/im';
import Sticky from 'react-stickynode';
import ModalComponent from './ModalComponent';

import 'react-pro-sidebar/dist/css/styles.css';
import '../../css/uploadForm.css';
import '../../css/Header.css';
import '../../css/Modal.css';

import {
	ProSidebar,
	Menu,
	MenuItem,
	SidebarHeader,
	SidebarFooter,
	SidebarContent,
} from 'react-pro-sidebar';

export default class SideBarMenu extends Component {
	logout(event) {
		event.preventDefault();
		AuthService.logout();
		this.props.history.push('/login');
	}

	constructor(props) {
		super(props);
		this.ModalComponent = createRef();

		if (props.selection == 'home') {
			this.state = {
				visible: false,
				homeBool: true,
				profilBool: false,
				donationBool: false,
			};
		} else if (props.selection == 'profil') {
			this.state = {
				visible: false,
				homeBool: false,
				profilBool: true,
				donationBool: false,
			};
		} else {
			this.state = {
				visible: false,
				homeBool: false,
				profilBool: false,
				donationBool: false,
			};
		}
	}

	getOpenModal = () => {
		this.ModalComponent.current.openModal();
	};

	render() {
		return (
			<div id="Menu">
				<div id="ModalMenu">
					<ModalComponent ref={this.ModalComponent} />
				</div>
				<Sticky enabled={true}>
					<div id="header">
						<ProSidebar collapsed={false}>
							<SidebarHeader>
								<div className="logo">
									<img
										className="logoImg"
										src="../../img/logo_small2.png"
									></img>
								</div>
							</SidebarHeader>
							<SidebarContent>
								<Menu iconShape="round">
									<MenuItem active={this.state.homeBool} icon={<FiHome />}>
										Accueil<NavLink exact to="/"></NavLink>
									</MenuItem>
									<MenuItem active={this.state.profilBool} icon={<ImProfile />}>
										Mon profil<NavLink exact to="/Profile"></NavLink>
									</MenuItem>
									<MenuItem
										icon={<BiImageAdd />}
										onClick={() => this.getOpenModal()}
									>
										Publier
									</MenuItem>
									<MenuItem
										active={this.state.donationBool}
										icon={<BiDollar />}
									>
										Donation
									</MenuItem>
								</Menu>
							</SidebarContent>
							<SidebarFooter>
								<Menu iconShape="round">
									<MenuItem onClick={e => this.logout(e)} icon={<FiLogOut />}>
										Deconnexion
									</MenuItem>
								</Menu>
							</SidebarFooter>
						</ProSidebar>
					</div>
				</Sticky>
			</div>
		);
	}
}
