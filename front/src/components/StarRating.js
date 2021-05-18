import axios from 'axios';
import qs from 'qs';
import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { getEncodedHeader } from '../services/token-header.js';

export default class StarRating extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			rating: props.average_mark,
		};
	}

	fetchSetRating(rate, prevValue, name) {
		axios({
			method: 'post',
			url: 'http://localhost:8080/api/rating/' + this.props.id,
			data: qs.stringify({
				mark: rate,
			}),
			headers: getEncodedHeader(),
		});
		this.setState({ rating: rate });
	}

	render() {
		const { rating } = this.state;
		return (
			<div>
				<StarRatingComponent
					name="rate1"
					starCount={5}
					value={rating}
					onStarClick={this.fetchSetRating.bind(this)}
					starColor="#1fb80b"
				/>
			</div>
		);
	}
}
