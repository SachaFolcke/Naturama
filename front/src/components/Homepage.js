import { Component } from 'react';
import auth from '../services/auth.service';
import profile from '../services/profile.service';
import SideBarMenu from './SideBarMenu.js';
import Timeline from './Timeline.js';

export default class Homepage extends Component {
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
						<SideBarMenu selection="home" history={this.props.history} />
					</div>
					<div className="col-8">
						<Timeline />
					</div>
					<div className="col-md-1 col-lg-1"></div>
				</div>
			</>
		);
	}
}
