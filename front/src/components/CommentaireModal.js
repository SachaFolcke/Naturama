import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Modal from 'react-awesome-modal';
import tokenHeader, { getEncodedHeader } from '../services/token-header.js';
import Commentaire from './Commentaire.js';
import '../../css/Modal.css';

export default class Commentaires extends Component {
	constructor(props) {
		super(props);
		this.newCommentRef = React.createRef();
		this.state = {
			visible: false,
			commentaires: [],
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal() {
		this.setState({
			visible: true,
		});
		this.fetchComments();
	}

	closeModal() {
		this.setState({
			visible: false,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		axios({
			method: 'post',
			url: 'http://localhost:8080/api/post/' + this.props.id + '/comment',
			data: qs.stringify({
				content: this.newCommentRef.current.value,
			}),
			headers: getEncodedHeader(),
		}).then(() => {
			this.newCommentRef.current.value = '';
			this.fetchComments();
		});
	}

	fetchComments() {
		fetch('http://localhost:8080/api/post/' + this.props.id + '/comments', {
			method: 'GET',
			headers: tokenHeader(),
		})
			.then(response => response.json())
			.then(data => {
				this.setState({ commentaires: data });
			});
	}

	render() {
		return (
			<div id="modal">
				<button className="btn btn-success" onClick={this.openModal}>
					Commentaires
				</button>
				<Modal
					visible={this.state.visible}
					width="600"
					effect="fadeInUp"
					onClickAway={this.closeModal}
				>
					<form
						className="mb-4 d-flex flex-row"
						id={'newComment-' + this.props.id}
						onSubmit={event => this.handleSubmit(event)}
					>
						<textarea
							placeholder="Veuillez entrer un message"
							cols="80"
							rows="2"
							ref={this.newCommentRef}
						/>
						<button type="submit" className="btn btn-success">
							Publier
						</button>
					</form>
					<div className="modal-body">
						{this.state.commentaires.map(com => (
							<Commentaire key={com.id} commentaire={com} />
						))}
					</div>
				</Modal>
			</div>
		);
	}
}
