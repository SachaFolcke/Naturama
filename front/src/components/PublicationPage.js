import { Component } from 'react';
import auth from '../services/auth.service';
import profile from '../services/profile.service';
import SideBarMenu from './SideBarMenu.js';
import PublicationForm from './PublicationForm.js';

import '../../css/PublicationPage.css';

export default class PublicationPage extends Component {
	state = {
		user: auth.getCurrentUser(),
		profile: {},
	};

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
						<SideBarMenu history={this.props.history} />
					</div>
					<div className="col-7">
						<div className="card-publier">
							<PublicationForm />
						</div>
					</div>
					<div className="col-md-2 col-lg-2"></div>
				</div>
			</>
		);
	}
}
