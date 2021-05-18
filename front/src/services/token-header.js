import authHeader from './auth-header.js';

export default function getTokenHeader() {
	const header = new Headers();
	header.append(Object.keys(authHeader())[0], authHeader()['x-access-token']);
	return header;
}

export function getEncodedHeader() {
	const header = {
		'x-access-token': authHeader()['x-access-token'],
		'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
	};
	return header;
}
