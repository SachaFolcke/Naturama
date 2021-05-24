import { useEffect, useState } from 'react';
import axios from 'axios';
import tokenHeader, { getEncodedHeader } from '../services/token-header.js';
import AuthService from '../services/auth.service';
import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';
import { useParams } from 'react-router';
import ProfilParams from './ChangeProfilParams.js';

import '../../css/Profil.css';
import { check } from 'prettier';

export default function ProfilInformation() {
	const { id } = useParams();
	let isMyProfile = false;

	if (id == AuthService.getCurrentUser().id) {
		isMyProfile = true;
	}

	const [isFollowing, setIsFollowing] = useState(false);
	const [errorFound, setErrorFound] = useState(undefined);
	const [userData, setUserData] = useState({});
	const [profilImage, setProfilImage] = useState('');
	const [bannerImage, setBannerImage] = useState('');
	const [dateFormated, setDateFormated] = useState('');
	const [memberSince, setMemberSince] = useState('');
	const [location, setLocation] = useState('');
	const [bio, setBio] = useState('');

	function fetchUserData() {
		fetch('http://localhost:8080/api/profile/' + id, {
			method: 'GET',
			headers: tokenHeader(),
		})
			.then(function (response) {
				if (!response.ok) {
					setErrorFound('Profil introuvable');
					throw new Error('Erreur ! Profil introuvable');
				}

				return response.json();
			})
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
				if (data.id_image_banner == undefined) {
					setBannerImage(undefined);
				} else {
					fetch('http://localhost:8080/api/image/' + data.id_image_banner, {
						method: 'GET',
						headers: tokenHeader(),
					})
						.then(response => response.blob())
						.then(image => {
							setBannerImage(URL.createObjectURL(image));
						});
				}
				if (data.birthday != null) {
					let date = new Date(data.birthday);
					date = format(date, 'd MMMM yyyy', { locale: fr });
					setDateFormated(date);
				} else {
					setDateFormated(undefined);
				}
				setMemberSince(
					format(new Date(data.createdAt), 'd MMMM yyyy', { locale: fr })
				);
				setLocation(data.location);
				setBio(data.bio);
			});
	}

	function checkFollowing() {
		fetch('http://localhost:8080/api/follow?id=' + id, {
			method: 'GET',
			headers: tokenHeader(),
		})
			.then(response => response.json())
			.then(data => {
				setIsFollowing(data);
			});
	}

	function postFollow() {
		axios({
			method: 'post',
			url: 'http://localhost:8080/api/follow',
			params: { id: id },
			headers: getEncodedHeader(),
		}).then(() => checkFollowing());
	}

	useEffect(fetchUserData, [setUserData]);
	useEffect(checkFollowing, [setIsFollowing]);
	useEffect(() => {
		fetchUserData();
	}, [id]);

	let baliseProfilParams = '';
	let baliseFollow = '';

	if (isMyProfile) {
		baliseProfilParams = <ProfilParams />;
	} else {
		if (isFollowing) {
			baliseFollow = (
				<div className="d-flex align-items-start flex-column ml-auto p-2">
					<button
						type="submit"
						onClick={() => postFollow()}
						className="btn btn-secondary"
					>
						Suivi
					</button>
				</div>
			);
		} else {
			baliseFollow = (
				<div className="d-flex align-items-start flex-column ml-auto p-2">
					<button
						type="submit"
						onClick={() => postFollow()}
						className="btn btn-success"
					>
						Suivre
					</button>
				</div>
			);
		}
	}

	let baliseDate = '';
	if (dateFormated != undefined) {
		baliseDate = <span>Né(e) le {dateFormated}</span>;
	}

	if (errorFound != undefined) {
		return <div>Profil Introuvable</div>;
	}

	return (
		<div className="profil-font">
			<div
				style={{
					backgroundImage: `url(${bannerImage})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					border: '1px solid black',
				}}
			>
				<div
					className="d-flex flex-row ml-5 mr-5"
					style={{
						backgroundColor: '#FFFFFFAA',
						border: '1px solid black',
					}}
				>
					<img className="img-profil" src={profilImage} />
					<div
						className="d-flex flex-column bd-highlight mb-3 align-self-center"
						style={{ fontWeight: 'bold' }}
					>
						<h3>
							{userData.first_name} {userData.last_name}
						</h3>
						{baliseDate}<br />
						<span>Membre depuis le {memberSince}</span><br />
						<span>Habite à {location}</span><br />
					</div>
					{baliseFollow}
					{baliseProfilParams}
				</div>
			</div>
			<div className="mt-4 ml-3 mr-3 mb-2 border border-dark">
				<h3 className="bg-light border-bottom border-dark p-2">Biographie</h3>
				<p className="p-2">{bio}</p>
			</div>
		</div>
	);
}
