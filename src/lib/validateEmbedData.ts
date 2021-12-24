import { NoEmbedResponse } from '../types/APITypes';
import { Bookmark, BookmarkBase } from '../types/BookmarkTypes';

/**
 * Parse the embed data for a given URL into a bookmark.
 * @param embedData - Embed Data to parse to a Bookmark.
 * @returns
 */
//TODO: Validate the embed data
export const validateEmbedData = (embedData: NoEmbedResponse): Bookmark => {
	const baseBookmark: BookmarkBase = {
		uploaded: embedData.upload_date ?? '', //TODO: Flickr doesn't seem to have this.
		id: embedData.url,
		title: embedData.title,
		url: embedData.url,
		author: {
			name: embedData.author_name,
			url: embedData.author_url,
		},
		thumbnail: {
			url: embedData.thumbnail_url,
			width: embedData.thumbnail_width,
			height: embedData.thumbnail_height,
		},
		created: Date.now(),
	};

	if (embedData.provider_name === 'Flickr') {
		return {
			...baseBookmark,
			provider: 'Flickr',
			width: embedData.width,
			height: embedData.height,
		};
	}

	if (embedData.provider_name === 'Vimeo') {
		return {
			...baseBookmark,
			provider: 'Vimeo',
			duration: embedData.duration,
		};
	}

	throw new Error('Unknown provider');
};
