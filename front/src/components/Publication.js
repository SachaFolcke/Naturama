import { Component } from 'react';
import '../../css/Publication.css';

const Publication = ({ video: { title, description, thumbnail } }) => (
	<div className="Publication">
		<div className="">Nom Prénom</div>
		<p>{description}</p>
		<div className="d-flex justify-content-center">
			<img src={`https://source.unsplash.com/${thumbnail}`} />
		</div>
		<div className="d-flex">
			<label>{title}</label>
			<button className="btn btn-success">Commentaires</button>
		</div>
	</div>
);

export default Publication;
