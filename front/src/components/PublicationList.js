import { useEffect, useState } from 'react';
import Publication from './Publication';
import '../../css/Publication.css';
import tokenHeader from '../services/token-header.js';

export default function PublicationList(props) {
	const [publications, setPublications] = useState([]);

	function fetchPublications() {
		fetch('http://localhost:8080/api/timeline', {
			method: 'GET',
			headers: tokenHeader(),
		})
			.then(response => response.json())
			.then(data => setPublications(data));
	}

	useEffect(fetchPublications, [setPublications]);

	const classNames = `videoList ${publications?.length ? '' : 'is-loading'}`;
	return (
		<div className={classNames}>
			{publications.map(publication => (
				<Publication publication={publication} key={publication.id} />
			))}
		</div>
	);
}
