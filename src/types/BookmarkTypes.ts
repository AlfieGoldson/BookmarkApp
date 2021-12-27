export interface BookmarkBase {
	id: string;
	title: string;
	url: string;
	thumbnail: string;
	author: {
		name: string;
		url: string;
	};
	uploaded: string;
	created: number;
}

export interface BookmarkVimeo extends BookmarkBase {
	provider: 'Vimeo';
	duration: number;
}

export interface BookmarkFlickr extends BookmarkBase {
	provider: 'Flickr';
	width: number;
	height: number;
}

export type Bookmark = BookmarkVimeo | BookmarkFlickr;
