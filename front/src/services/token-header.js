import authHeader from './auth-header.js';

export default function getTokenHeader() {
	const header = new Headers();
	header.append(Object.keys(authHeader())[0], authHeader()['x-access-token']);
	return header;
}
