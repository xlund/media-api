import { api } from '../../helpers/_api';
import type { RequestHandler } from './__types';

export const get: RequestHandler = async () => {
	// locals.userid comes from src/hooks.js
	const response = await api('get', `videos`);

	if (response.status === 404) {
		// user hasn't created a todo list.
		// start with an empty array
		return {
			body: {
				videos: []
			}
		};
	}

	if (response.status === 200) {
		return {
			body: {
				videos: await response.json()
			}
		};
	}

	return {
		status: response.status
	};
};
