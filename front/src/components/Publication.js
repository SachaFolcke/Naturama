import { useEffect, useRef, useState } from 'react';
import '../../css/Publication.css';
import StarRating from './StarRating.js';
import tokenHeader from '../services/token-header.js';
import AuthService from '../services/auth.service';
import Commentaires from './CommentaireModal.js';

function Publication({ publication }) {
	const { id, id_image, id_profile, text, average_mark, date, nb_votes } =
		publication;

	const current_user_id = AuthService.getCurrentUser();

	const [imageShow, setImageShow] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [profilImage, setProfilImage] = useState('');

	function timeSince() {
		let seconds = Math.floor((new Date() - new Date(date)) / 1000);

		let interval = seconds / 31536000;

		if (interval > 1) {
			return Math.floor(interval) + ' ans';
		}
		interval = seconds / 2592000;
		if (interval > 1) {
			return Math.floor(interval) + ' mois';
		}
		interval = seconds / 86400;
		if (interval > 1) {
			return Math.floor(interval) + ' jours';
		}
		interval = seconds / 3600;
		if (interval > 1) {
			return Math.floor(interval) + ' heures';
		}
		interval = seconds / 60;
		if (interval > 1) {
			return Math.floor(interval) + ' minutes';
		}
		return Math.floor(seconds) + ' secondes';
	}

	function fetchProfileImage() {
		fetch('http://localhost:8080/api/profile/' + id_profile, {
			method: 'GET',
			headers: tokenHeader(),
		})
			.then(response => response.json())
			.then(data => {
				if (data.id_image_profile == undefined) {
					setProfilImage('../../img/user.jpg');
				} else {
					fetch('http://localhost:8080/api/image/' + data.id_image_profile, {
						method: 'GET',
						headers: tokenHeader(),
					})
						.then(response => response.blob())
						.then(image => {
							setProfilImage(URL.createObjectURL(image));
						});
				}
			});
	}

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

	function deletePost() {
		fetch('http://localhost:8080/api/post/' + id, {
			method: 'DELETE',
			headers: tokenHeader(),
		})
			.then(response => response.text())
			.then(res => console.log(res));
	}

	let baliseImage = '';
	if (id_image != undefined) {
		useEffect(fetchImage, [setImageShow]);
		baliseImage = (
			<div className="d-flex justify-content-center">
				<img className="w-100" src={imageShow} />
			</div>
		);
	}

	let baliseDelete = '';
	if (current_user_id.id == id_profile) {
		baliseDelete = (
			<form id={'deletePost-' + id}>
				<button
					type="submit"
					form={'deletePost-' + id}
					className="btn btn-outline-danger"
					onClick={deletePost.bind()}
				>
					Supprimer
				</button>
			</form>
		);
	}

	useEffect(fetchProfileImage, [setProfilImage]);
	useEffect(fetchUser, [setLastName]);

	return (
		<div className="publication" key={id}>
			<div className="d-flex flex-row mb-4 mt-3">
				<div className="mr-4">
					<img className="user-img" src={profilImage} />
					<label className="mr-2">
						{firstName} {lastName}
					</label>
					-<label className="ml-2">il y a {timeSince()}</label>
				</div>
				{baliseDelete}
			</div>
			<label className="ml-5">{text}</label>
			{baliseImage}
			<div className="d-flex justify-content-between mt-2 mb-2 mr-4 ml-4">
				<StarRating id={id} average_mark={average_mark} nb_votes={nb_votes} />
				<Commentaires ref={useRef()} id={id} />
			</div>
		</div>
	);
}

export default Publication;
