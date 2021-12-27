import { NoEmbedResponse } from '../types/APITypes';
import { BookmarkFlickr } from '../types/BookmarkTypes';

export const mockFlickrResponse: NoEmbedResponse = {
	provider_name: 'Flickr',
	title: 'Alhambra',
	url: 'https://www.flickr.com/photos/80210243@N06/7179848249/',
	author_name: 'COSTAGROUPINTERNATIONAL',
	author_url: 'https://www.flickr.com/photos/80210243@N06/',
	thumbnail_url:
		'https://live.staticflickr.com/7074/7179848249_e3bc8944c7_q.jpg',
	thumbnail_width: 150,
	thumbnail_height: 150,
	width: 800,
	height: 267,
	upload_date: '2021-06-21 02:42:24',
};

export const mockFlickrBookmark: BookmarkFlickr = {
	uploaded: '',
	id: 'https://www.flickr.com/photos/80210243@N06/7179848249/',
	title: 'Alhambra',
	url: 'https://www.flickr.com/photos/80210243@N06/7179848249/',
	author: {
		name: 'COSTAGROUPINTERNATIONAL',
		url: 'https://www.flickr.com/photos/80210243@N06/',
	},
	thumbnail: 'https://live.staticflickr.com/7074/7179848249_e3bc8944c7_q.jpg',
	created: 1640271473108,
	provider: 'Flickr',
	width: 800,
	height: 267,
};
