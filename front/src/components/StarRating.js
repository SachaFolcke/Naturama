import axios from 'axios';
import qs from 'qs';
import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import tokenHeader from '../services/token-header.js';
import { getEncodedHeader } from '../services/token-header.js';

export default class StarRating extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			rating: props.average_mark,
			averageMark: props.average_mark,
			notes: props.nb_votes,
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
		}).then(() => {
			fetch('http://localhost:8080/api/post/' + this.props.id, {
				method: 'GET',
				headers: tokenHeader(),
			})
				.then(response => response.json())
				.then(data => {
					console.log(data.average_mark);
					this.setState({
						averageMark: data.average_mark,
						nbVotes: data.nb_votes,
					});
				});
		});
		this.setState({ rating: rate });
	}

	render() {
		const { rating, averageMark, nbVotes } = this.state;
		return (
			<div className="d-flex flex-row">
				<StarRatingComponent
					name="rate1"
					starCount={5}
					value={rating}
					onStarClick={this.fetchSetRating.bind(this)}
					starColor="#1fb80b"
				/>
				<label className="ml-2">
					Note moyenne {Math.round(averageMark * 100) / 100}/5 ({nbVotes} votes)
				</label>
			</div>
		);
	}
}
