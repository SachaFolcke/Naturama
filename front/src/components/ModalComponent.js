import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import UploadForm from './UploadForm';

export default class ModalComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
		};
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

	render() {
		return (
			<div id="modal">
				<Modal
					visible={this.state.visible}
					width="600"
					effect="fadeInUp"
					onClickAway={() => this.closeModal()}
				>
					<div className="ModalForm" id="ModalForm">
						<UploadForm />
					</div>
				</Modal>
			</div>
		);
	}
}
