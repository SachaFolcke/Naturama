import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import NavigatorPublication from './NavigatorPublication.js';
import ModalComponent from './ModalComponent';
import '../../css/Timeline.css';

export default class Timeline extends Component {
	constructor(props) {
		super(props);
		this.ModalComponent = createRef();
	}

	getOpenModal = () => {
		this.ModalComponent.current.openModal();
	};

	render() {
		return (
			<div className="timeline">
				<div className="card-timeline">
					<div id="ModalMenu">
						<ModalComponent ref={this.ModalComponent} />
					</div>
					<div className="form-outline">
						<label className="title-timeline">Fil d'actualités</label>
					</div>
					<div className="row justify-content-around mt-2 mb-3">
						<div>
							<button
								onClick={() => this.getOpenModal()}
								className="btn btn-success"
							>
								<i className="fas fa-i-cursor mr-2"></i>
								Publier un nouveau Message
							</button>
						</div>

						<div>
							<button
								onClick={() => this.getOpenModal()}
								className="btn btn-success"
							>
								<i className="fas fa-camera mr-2"></i>
								Publier une nouvelle Photo
							</button>
						</div>
					</div>
				</div>

				<div className="card-timeline mt-4">
					<div>
						<NavigatorPublication />
					</div>
				</div>
			</div>
		);
	}
}
