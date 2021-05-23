import { useEffect, useState } from 'react';
import Publication from './Publication';
import '../../css/Publication.css';
import tokenHeader from '../services/token-header.js';
import axios from 'axios';
import auth from "../services/auth.service";

export default function PublicationList(props) {
	const [publications, setPublications] = useState([]);

	function fetchPublications() {
		if(props.mode === "tag") {
			axios.get('http://localhost:8080/api/tag/posts', {
				params: {
					id: props.idtag
				},
				headers: {
					'x-access-token': auth.getToken()
				}
			}).then(response => setPublications(response.data))


		} else {
			fetch('http://localhost:8080/api/timeline', {
				method: 'GET',
				headers: tokenHeader(),
			})
				.then(response => response.json())
				.then(data => setPublications(data));
		}
	}

	useEffect(fetchPublications, [setPublications]);
	useEffect(() => {fetchPublications()},[props.idtag])

	return (
		<div>
			{publications.map(publication => (
				<Publication publication={publication} key={publication.id} />
			))}
		</div>
	);
}
