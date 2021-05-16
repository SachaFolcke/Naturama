import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Timeline.css';
import NavigatorPublication from './NavigatorPublication.js';

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
							<Link to={'/publier/message'} className="btn btn-success">
								<i className="fas fa-i-cursor mr-2"></i>
								Publier un nouveau Message
							</Link>
						</div>

						<div>
							<Link to={'/publier/photo'} className="btn btn-success">
								<i className="fas fa-camera mr-2"></i>
								Publier une nouvelle Photo
							</Link>
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
