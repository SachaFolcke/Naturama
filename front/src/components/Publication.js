import { Component } from 'react';
import '../../css/Publication.css';

const Publication = ({ video: { title, description, thumbnail } }) => (
	<div className="Publication">
		<div className="d-flex flex-row mb-4">
			<div className="mr-4">
				<img className="user-img" src="../../img/user.jpg" />
				<label>Nom Prénom</label>
			</div>
			<div>
				<span className="align-baseline">baseline</span>
				<span className="align-top">top</span>
				<span className="align-middle">middle</span>
				<span className="align-bottom">bottom</span>
				<span className="align-text-top">text-top</span>
				<span className="align-text-bottom">text-bottom</span>
			</div>
		</div>
		<label>{description}</label>
		<div className="d-flex justify-content-center">
			<img src={`https://source.unsplash.com/${thumbnail}`} />
		</div>
		<div className="d-flex justify-content-between mt-2 mb-2 mr-4 ml-4">
			<div className="note">
				<i className="fas fa-star"></i>
				<i className="fas fa-star"></i>
				<i className="fas fa-star"></i>
				<i className="far fa-star"></i>
				<i className="far fa-star"></i>
				<label className="ml-2">(3/5)</label>
			</div>

			<button className="btn btn-success">Commentaires</button>
		</div>
	</div>
);

export default Publication;
