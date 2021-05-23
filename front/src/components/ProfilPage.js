import { Component } from 'react';
import auth from '../services/auth.service';
import profile from '../services/profile.service';
import SideBarMenu from './SideBarMenu.js';
import ProfilNavigator from './ProfilNavigator.js';

export default class ProfilPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: auth.getCurrentUser(),
			profile: {},
		};
	}

	componentDidMount() {
		profile.getProfileByUserId(this.state.user.id).then(data =>
			this.setState({
				profile: data,
			})
		);
	}

	render() {
		return (
			<>
				<div className="row">
					<div className="col-3">
						<SideBarMenu selection="profil" history={this.props.history} />
					</div>
					<div className="col-8">
						<ProfilNavigator />
					</div>
					<div className="col-md-1 col-lg-1"></div>
				</div>
			</>
		);
	}
}
