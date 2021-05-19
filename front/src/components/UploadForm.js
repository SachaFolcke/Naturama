import axios from 'axios';
import React, { Component } from 'react';
import authHeader from '../services/auth-header';
import '../../css/uploadForm.css';

export default class UploadForm extends Component {
	constructor() {
		super();
		this.descriptionRef = React.createRef();
		this.state = {
			selectedFile: null,
			previewImage: null,
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		this.setState({
			selectedFile: event.target.files[0],
			previewImage: URL.createObjectURL(event.target.files[0]),
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const header = {
			'x-access-token': authHeader()['x-access-token'],
			'content-type': 'multipart/form-data;',
		};
		const dataUpload = new FormData();

		dataUpload.append('file', this.state.selectedFile);
		dataUpload.append('text', this.descriptionRef.current.value);
		axios({
			method: 'post',
			url: 'http://localhost:8080/api/post',
			data: dataUpload,
			headers: header,
		})
			.then(function (response) {
				if (response.status == 200) {
					window.location = '/';
				}
			})
			.catch(function (response) {
				alert('Erreur');
			});
	}

	render() {
		return (
			<form
				className="uploadForm"
				id="uploadForm"
				onSubmit={event => this.handleSubmit(event)}
			>
				<img
					src={this.state.previewImage}
					className="imagePreview"
					id="imagePreview"
				/>
				<label className="file">
					<input
						type="file"
						id="file"
						aria-label="File browser example"
						onChange={this.handleInputChange}
						accept="image/*"
					/>
					<span className="file-custom"></span>
				</label>
				<textarea
					id="description"
					placeholder="Veuillez entrer un message"
					cols="30"
					rows="10"
					ref={this.descriptionRef}
				></textarea>

				<button type="submit" className="btn btn-success">
					Envoyer
				</button>
			</form>
		);
	}
}
