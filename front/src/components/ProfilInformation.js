import { useEffect, useState } from 'react';
import '../../css/Profil.css';
import tokenHeader from '../services/token-header.js';
import AuthService from '../services/auth.service';
import { format } from 'date-fns';

export default function ProfilInformation() {
	const id_user = AuthService.getCurrentUser().id;

	const [userData, setUserData] = useState({});
	const [profilImage, setProfilImage] = useState('');
	const [dateFormated, setDateFormated] = useState('');

	function fetchUserData() {
		fetch('http://localhost:8080/api/profile/' + id_user, {
			method: 'GET',
			headers: tokenHeader(),
		})
			.then(response => response.json())
			.then(data => {
				setUserData(data);
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
				let date = new Date('2019-1-5 11:11:11');
				date = format(date, 'MMMM do, yyyy');
				console.log(date);
				setDateFormated(date);
			});
	}

	useEffect(fetchUserData, [setUserData]);

	return (
		<div className="profil-font">
			<div className="d-flex flex-row">
				<img className="img-profil" src={profilImage} />
				<div className="d-flex flex-column bd-highlight mb-3 align-self-center">
					<label>
						{userData.first_name} {userData.last_name}
					</label>
					<label>Née le : {dateFormated}</label>
				</div>
			</div>
		</div>
	);
}
