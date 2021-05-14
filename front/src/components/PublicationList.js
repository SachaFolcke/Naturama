import { Component } from 'react';
import Publication from './Publication';

export default class PublicationList extends Component {
	state = {
		videos: [],
	};

	componentDidMount() {
		fetch('http://localhost:8090/api/videos')
			.then(response => response.json())
			.then(data => this.setState({ videos: data }));
	}

	render() {
		const { videos } = this.state,
			classNames = `videoList ${videos?.length ? '' : 'is-loading'}`;

		return (
			<div className={classNames}>
				{this.props.mod}
				{videos.map(video => (
					<Publication video={video} key={video.id} />
				))}
			</div>
		);
	}
}
