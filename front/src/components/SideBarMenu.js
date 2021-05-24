import React, { Component, createRef } from 'react';
import {Link, NavLink} from 'react-router-dom';
import AuthService from '../services/auth.service';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { BiImageAdd, BiDollar } from 'react-icons/bi';
import { ImProfile } from 'react-icons/im';
import Sticky from 'react-stickynode';
import ModalComponent from './ModalComponent';

import 'react-pro-sidebar/dist/css/styles.css';
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
import tokenHeader from "../services/token-header";

export default class SideBarMenu extends Component {
	logout(event) {
		event.preventDefault();
		AuthService.logout();
		this.props.history.push('/login');
	}

	fetchTopTags() {

		fetch('http://localhost:8080/api/tag/top', {
			method: 'GET',
			headers: tokenHeader(),
		})
			.then(response => response.json())
			.then(data => { this.setState({
				tags: data
			}) })
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
				tags: []
			};
		} else if (props.selection == 'profil') {
			this.state = {
				visible: false,
				homeBool: false,
				profilBool: true,
				donationBool: false,
				tags: []
			};
		} else {
			this.state = {
				visible: false,
				homeBool: false,
				profilBool: false,
				donationBool: false,
				tags: []
			};
		}
	}

	componentDidMount() {
		this.fetchTopTags();
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
										Mon profil
										<NavLink
											exact
											to={'/profile/' + AuthService.getCurrentUser().id}
											onClick={() => {
												window.scrollTo(0, 0);
											}}
										></NavLink>
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
										<span className="text-muted">Donation</span>
									</MenuItem>
									<hr />
									<MenuItem onClick={e => this.logout(e)} icon={<FiLogOut />}>
										Déconnexion
									</MenuItem>
								</Menu>
							</SidebarContent>
							<SidebarFooter>
								<h4 className="text-center mt-3 mb-3">Tags populaires</h4>
								<ul className="ml-3 mb-3">
									{this.state.tags.length > 0 ? this.state.tags.map((tag) =>
										<li key={tag.id}>
											<Link to={`/tag/${tag.id}`}>{tag.name}</Link> ({tag.count} post{tag.count > 1 ? "s" : ""})
										</li>) : <li>Aucun tag à afficher</li>}
								</ul>
								</SidebarFooter>
						</ProSidebar>
					</div>
				</Sticky>
			</div>
		);
	}
}
