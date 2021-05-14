import { Component } from 'react';
import PublicationList from './PublicationList.js';

export default class NavigatorPublication extends Component {
	state = {
		currentMod: 'public',
		params: {},
	};

	constructor(...args) {
		super(...args);
		this.push = this.push.bind(this);
	}

	render() {
		switch (this.state.currentMod) {
			case 'public':
				return (
					<div>
						<button
							className="btn btn-success"
							onClick={() => this.push('public')}
						>
							Actualités
						</button>
						<button
							className="btn btn-danger"
							onClick={() => this.push('followed')}
						>
							Suivis
						</button>
						<PublicationList
							push={this.push}
							params={this.state.params}
							mod={0}
						/>
					</div>
				);
			case 'followed':
				return (
					<div>
						<button
							className="btn btn-danger"
							onClick={() => this.push('public')}
						>
							Actualités
						</button>
						<button
							className="btn btn-success"
							onClick={() => this.push('followed')}
						>
							Suivis
						</button>
						<PublicationList
							push={this.push}
							params={this.state.params}
							mod={1}
						/>
					</div>
				);
		}
		return null;
	}

	push(screen, params = {}) {
		this.setState({ currentMod: screen, params: params });
	}
}
