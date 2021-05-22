import { useEffect, useState } from 'react';
import tokenHeader from '../services/token-header.js';

export default function Commentaire({ commentaire }) {
	const { date, content, Profile } = commentaire;

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
		fetch('http://localhost:8080/api/image/' + Profile.id_image_profile, {
			method: 'GET',
			headers: tokenHeader(),
		})
			.then(response => response.blob())
			.then(image => {
				setProfilImage(URL.createObjectURL(image));
			});
	}

	useEffect(fetchProfileImage, [setProfilImage]);

	return (
		<div>
			<div className="d-flex flex-row mt-3">
				<div className="mr-4">
					<img className="user-img" src={profilImage} />
					<label className="mr-2">
						{Profile.first_name} {Profile.last_name}
					</label>
					-<label className="ml-2">il y a {timeSince()}</label>
				</div>
			</div>
			<label className="ml-4">{content}</label>
		</div>
	);
}
