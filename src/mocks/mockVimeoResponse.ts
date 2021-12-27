import { NoEmbedResponse } from '../types/APITypes';
import { BookmarkVimeo } from '../types/BookmarkTypes';

export const mockVimeoResponse: NoEmbedResponse = {
	provider_name: 'Vimeo',
	title: 'Sylvain Lhommée @ Nation Entreprenante - Episode #5',
	url: 'https://vimeo.com/565486457',
	author_name: 'BARTERLINK',
	author_url: 'https://vimeo.com/barterlink',
	thumbnail_url:
		'https://i.vimeocdn.com/video/1169280957-6513b97be812eac51f6ba090b2f34ab5a63bfc220076c0118950fcf4c227fdce-d_295x166',
	thumbnail_width: 295,
	thumbnail_height: 166,
	duration: 1070,
	upload_date: '2021-06-21 02:42:24',
};

export const mockVimeoBookmark: BookmarkVimeo = {
	uploaded: '2021-06-21 02:42:24',
	id: 'https://vimeo.com/565486457',
	title: 'Sylvain Lhommée @ Nation Entreprenante - Episode #5',
	url: 'https://vimeo.com/565486457',
	author: { name: 'BARTERLINK', url: 'https://vimeo.com/barterlink' },
	thumbnail:
		'https://i.vimeocdn.com/video/1169280957-6513b97be812eac51f6ba090b2f34ab5a63bfc220076c0118950fcf4c227fdce-d_295x166',
	created: 1640271254862,
	provider: 'Vimeo',
	duration: 1070,
};
