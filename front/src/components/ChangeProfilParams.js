import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Modal from 'react-awesome-modal';
import { getEncodedHeader } from '../services/token-header.js';
import DatePicker from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import '../../css/Modal.css';
import 'react-datepicker/dist/react-datepicker.css';

export default class ChangeProfilParams extends Component {
	constructor(props) {
		super(props);

		this.newBioRef = React.createRef();
		this.lastNameRef = React.createRef();
		this.firstNameRef = React.createRef();

		this.state = {
			visible: false,
			selectedProfilImage: null,
			previewProfilImage: null,
			selectedProfilBanner: null,
			previewProfilBanner: null,
			birthDate: new Date(),
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleProfilImageChange = this.handleProfilImageChange.bind(this);
		this.handleProfilBannerChange = this.handleProfilBannerChange.bind(this);
	}

	openModal() {
		this.setState({
			visible: true,
		});
	}

	closeModal() {
		this.setState({
			visible: false,
		});
	}

	handleProfilImageChange(event) {
		this.setState({
			selectedProfilImage: event.target.files[0],
			previewProfilImage: URL.createObjectURL(event.target.files[0]),
		});
	}

	handleProfilBannerChange(event) {
		this.setState({
			selectedProfilBanner: event.target.files[0],
			previewProfilBanner: URL.createObjectURL(event.target.files[0]),
		});
	}

	handleSubmit(event) {
		this.fetchPostInfos();
		if (this.state.selectedProfilImage != null) {
			console.log('fetch image profil');
			this.fetchPostImageProfil();
		}
		if (this.state.selectedProfilBanner != null) {
			console.log('fetch banner profil');
			this.fetchPostBannerProfil();
		}
	}

	fetchPostInfos() {
		axios({
			method: 'post',
			url: 'http://localhost:8080/api/profile/infos/',
			data: qs.stringify({
				last_name: this.lastNameRef.current.value,
				first_name: this.firstNameRef.current.value,
				bio: this.newBioRef.current.value,
				birthday: this.state.birthDate,
			}),
			headers: getEncodedHeader(),
		});
	}

	fetchPostImageProfil() {
		const dataUpload = new FormData();
		dataUpload.append('file', this.state.selectedProfilImage);
		axios({
			method: 'post',
			url: 'http://localhost:8080/api/profile/picture',
			data: dataUpload,
			headers: getEncodedHeader(),
		});
	}

	fetchPostBannerProfil() {
		const dataUpload = new FormData();
		dataUpload.append('file', this.state.selectedProfilBanner);
		axios({
			method: 'post',
			url: 'http://localhost:8080/api/profile/banner',
			data: dataUpload,
			headers: getEncodedHeader(),
		});
	}

	render() {
		return (
			<div className="d-flex align-items-start flex-column ml-auto p-2">
				<button
					onClick={this.openModal}
					className="btn btn-success btn-sm  align-self-center"
				>
					Paramètres de Profil
				</button>
				<div id="modal-profil">
					<Modal
						visible={this.state.visible}
						width="600"
						effect="fadeInUp"
						onClickAway={this.closeModal}
					>
						<form
							className="informationForm"
							id="informationForm"
							onSubmit={event => this.handleSubmit(event)}
						>
							<div className="border border-dark ml-2 mr-2 mt-2 mb-2">
								<div id="imagePreview">
									<img src={this.state.previewProfilImage} />
								</div>

								<label className="ml-2">Image de profil : </label>
								<label className="file ml-2">
									<input
										type="file"
										className="file"
										aria-label="File browser example"
										onChange={this.handleProfilImageChange}
										accept="image/*"
									/>
									<span className="file-custom" />
								</label>
							</div>
							<div className="border border-dark ml-2 mr-2 mt-2 mb-2">
								<div id="imagePreview">
									<img src={this.state.previewProfilBanner} />
								</div>

								<label className="ml-2">Bannière de Profil : </label>
								<label className="file ml-2">
									<input
										type="file"
										className="file"
										onChange={this.handleProfilBannerChange}
										accept="image/*"
									/>
									<span className="file-custom" />
								</label>
							</div>
							<div className="d-flex ">
								<input
									className="mr-auto p-2 ml-4"
									placeholder="Prénom"
									ref={this.firstNameRef}
								/>
								<input
									className="p-2 mr-4"
									placeholder="Nom"
									ref={this.lastNameRef}
								/>
							</div>
							<div className="d-flex justify-content-center mt-2 mb-2">
								<label>Date de naissance : </label>
								<DatePicker
									locale={fr}
									selected={this.state.birthDate}
									onChange={date => this.setState({ birthDate: date })}
								/>
							</div>
							<textarea
								className="bioInput"
								placeholder="Entrez votre biographie..."
								cols="30"
								rows="5"
								ref={this.newBioRef}
							></textarea>

							<button type="submit" className="btn btn-success">
								Modifier ses informations
							</button>
						</form>
					</Modal>
				</div>
			</div>
		);
	}
}
