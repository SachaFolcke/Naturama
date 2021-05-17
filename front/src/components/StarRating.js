import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import tokenHeader from '../services/token-header.js';

export default class StarRating extends React.Component {
	constructor() {
		super();

		this.state = {
			rating: 0,
		};
	}

	fetchSetRating(rate, prevValue, name) {
		console.log(rate);

		fetch('http://localhost:8080/api/rating/' + this.props.id, {
			method: 'POST',
			headers: tokenHeader(),
			body: JSON.stringify({ mark: rate }),
		}).then(this.setState({ rating: rate }));
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
