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

	submit() {
		const header = {
			'x-access-token': authHeader()['x-access-token'],
			'content-type': 'multipart/form-data;',
		};
		const dataU = new FormData();
		const text = JSON.stringify(this.descriptionRef.current.value);
		console.log(text);
		dataU.append('file', this.state.selectedFile);
		dataU.append('text', text);

		axios({
			method: 'post',
			url: 'http://localhost:8080/api/post',
			data: dataU,
			headers: header,
		})
			.then(response => response.json())
			.then(function (response) {
				if (response.status == 200) {
					window.location = '/';
				}
			});
	}

	render() {
		return (
			<form className="uploadForm" id="uploadForm">
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
					/>
					<span className="file-custom"></span>
				</label>
				<textarea
					required
					id="description"
					placeholder="Veuillez entrer un message"
					cols="30"
					rows="10"
					ref={this.descriptionRef}
				></textarea>

				<button
					type="submit"
					className="btn btn-success"
					onClick={() => this.submit()}
				>
					Envoyer
				</button>
			</form>
		);
	}
}
