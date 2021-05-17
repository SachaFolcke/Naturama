import { Component, useEffect, useState } from 'react';
import '../../css/Publication.css';
import StarRatings from 'react-star-ratings';
import StarRating from './StarRating.js';
import tokenHeader from '../services/token-header.js';

function Publication({ publication }) {
	const { id, id_image, id_profile, text, average_mark } = publication;

	const [imageShow, setImageShow] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [rating, setRating] = useState(0);

	let baliseImage = '';

	function fetchImage() {
		fetch('http://localhost:8080/api/image/' + id_image, {
			method: 'GET',
			headers: tokenHeader(),
		})
			.then(response => response.blob())
			.then(image => {
				setImageShow(URL.createObjectURL(image));
			});
	}

	function fetchUser() {
		fetch('http://localhost:8080/api/profile/' + id_profile, {
			method: 'GET',
			headers: tokenHeader(),
		})
			.then(response => response.json())
			.then(data => {
				setFirstName(data.first_name);
				setLastName(data.last_name);
			});
	}

	if (id_image != undefined) {
		useEffect(fetchImage, [setImageShow]);
		baliseImage = (
			<div className="d-flex justify-content-center">
				<img className="w-100" src={imageShow} />
			</div>
		);
	}

	useEffect(fetchUser, [setLastName]);

	return (
		<div className="publication" key={id}>
			<div className="d-flex flex-row mb-4 mt-3">
				<div className="mr-4">
					<img className="user-img" src="../../img/user.jpg" />
					<label>
						{lastName} {firstName}
					</label>
				</div>
				<div>
					<span className="align-baseline">baseline</span>
					<span className="align-top">top</span>
					<span className="align-middle">middle</span>
					<span className="align-bottom">bottom</span>
					<span className="align-text-top">text-top</span>
					<span className="align-text-bottom">text-bottom</span>
				</div>
			</div>
			<label className="ml-5">{text}</label>
			{baliseImage}
			<div className="d-flex justify-content-between mt-2 mb-2 mr-4 ml-4">
				<div className="note">
					<StarRating id={id} average_mark={average_mark} />
				</div>
				<button className="btn btn-success">Commentaires</button>
			</div>
		</div>
	);
}

export default Publication;
