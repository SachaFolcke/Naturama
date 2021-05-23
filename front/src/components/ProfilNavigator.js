import React, { Component } from 'react';
import ProfilInformation from './ProfilInformation.js';

import '../../css/Profil.css';
import PublicationList from "./PublicationList";

export default class ProfilNavigator extends Component {
	state = {
		currentMod: 'info',
		params: {},
	};

	constructor(...args) {
		super(...args);
		this.push = this.push.bind(this);
	}

	render() {
		switch (this.state.currentMod) {
			case 'info':
				return (
					<div className="profil">
						<div className="card-profil">
							<nav className="nav nav-pills nav-fill border border-dark">
								<a
									className="nav-item nav-link active"
									onClick={() => this.push('info')}
								>
									Informations
								</a>
								<a
									className="nav-item nav-link"
									onClick={() => this.push('publication')}
								>
									Publications
								</a>

								<a
									className="nav-item nav-link"
									onClick={() => this.push('map')}
								>
									Carte du Monde
								</a>

								<a
									className="nav-item nav-link"
									onClick={() => this.push('album')}
								>
									Albums
								</a>
							</nav>
							<ProfilInformation push={this.push} params={this.state.params} />
						</div>
					</div>
				);
			case 'publication':
				return (
					<>
					<div className="profil">
						<div className="card-profil">
							<nav className="nav nav-pills nav-fill">
								<a
									className="nav-item nav-link"
									onClick={() => this.push('info')}
								>
									Informations
								</a>

								<a
									className="nav-item nav-link active"
									onClick={() => this.push('publication')}
								>
									Publications
								</a>

								<a
									className="nav-item nav-link"
									onClick={() => this.push('map')}
								>
									Carte du Monde
								</a>

								<a
									className="nav-item nav-link"
									onClick={() => this.push('album')}
								>
									Albums
								</a>
							</nav>
						</div>
					</div>
					<div className="card-timeline mt-4">
						<div>
							<PublicationList mode="profile" idprofile={this.props.idprofile} />
						</div>
					</div>
					</>
				);
			case 'map':
				return (
					<div className="profil">
						<div className="card-profil">
							<nav className="nav nav-pills nav-fill">
								<a
									className="nav-item nav-link"
									onClick={() => this.push('info')}
								>
									Informations
								</a>

								<a
									className="nav-item nav-link"
									onClick={() => this.push('publication')}
								>
									Publications
								</a>

								<a
									className="nav-item nav-link active"
									onClick={() => this.push('map')}
								>
									Carte du Monde
								</a>

								<a
									className="nav-item nav-link"
									onClick={() => this.push('album')}
								>
									Albums
								</a>
							</nav>
						</div>
					</div>
				);
			case 'album':
				return (
					<div className="profil">
						<div className="card-profil">
							<nav className="nav nav-pills nav-fill">
								<a
									className="nav-item nav-link"
									onClick={() => this.push('info')}
								>
									Informations
								</a>

								<a
									className="nav-item nav-link"
									onClick={() => this.push('publication')}
								>
									Publications
								</a>

								<a
									className="nav-item nav-link"
									onClick={() => this.push('map')}
								>
									Carte du Monde
								</a>

								<a
									className="nav-item nav-link active"
									onClick={() => this.push('album')}
								>
									Albums
								</a>
							</nav>
						</div>
					</div>
				);
		}
		return null;
	}

	push(screen, params = {}) {
		this.setState({ currentMod: screen, params: params });
	}
}
