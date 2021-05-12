import React, { Component, useState } from 'react';
import '../../css/Timeline.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Timeline extends Component {
	render() {
		return (
			<div className="timeline">
				<div className="card-timeline">
					<div className="form-outline">
						<label className="title-timeline">Fil d'actualités</label>
					</div>
					<div className="row justify-content-around mt-2 mb-3">
						<div>
							<button className="btn btn-success">
								<i className="fas fa-i-cursor mr-2"></i>
								Publier un nouveau Message
							</button>
						</div>

						<div>
							<button className="btn btn-success">
								<i className="fas fa-camera mr-2"></i>
								Publier une nouvelle Photo
							</button>
						</div>
					</div>
				</div>

				<div className="card-timeline mt-4">
					<div className="row justify-content-around mt-2 mb-3">
						<div>Publication</div>
					</div>
				</div>
			</div>
		);
	}
}
