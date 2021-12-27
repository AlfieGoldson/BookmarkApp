import { NoEmbedResponse, providerNames } from '../types/APITypes';
import { Bookmark, BookmarkBase } from '../types/BookmarkTypes';

/**
 * Parse the embed data for a given URL into a bookmark.
 * @param embedData - Embed Data to parse to a Bookmark.
 * @returns
 */
export const validateEmbedData = (embedData: NoEmbedResponse): Bookmark => {
	let errors: string[] = [];
	if (!embedData) throw new Error('No embed data provided.');

	if (!embedData.provider_name || typeof embedData.provider_name !== 'string')
		throw new Error('No provider name provided.');

	if (!providerNames.includes(embedData.provider_name))
		throw new Error('Unknown provider name.');

	if (!embedData.url || typeof embedData.url !== 'string')
		throw new Error('No URL provided.');

	if (!embedData.title || typeof embedData.title !== 'string')
		throw new Error('No title provided.');

	if (!embedData.author_name || typeof embedData.author_name !== 'string')
		throw new Error('No author name provided.');

	if (!embedData.author_url || typeof embedData.author_url !== 'string')
		throw new Error('No author URL provided.');

	const baseBookmark: BookmarkBase = {
		uploaded: embedData.upload_date ?? '',
		id: embedData.url,
		title: embedData.title,
		url: embedData.url,
		author: {
			name: embedData.author_name,
			url: embedData.author_url,
		},
		thumbnail: embedData.thumbnail_url ?? '',
		created: Date.now(),
	};

	if (embedData.provider_name === 'Flickr') {
		if (!embedData.width || typeof embedData.width !== 'number')
			throw new Error('No width provided.');

		if (!embedData.height || typeof embedData.height !== 'number')
			throw new Error('No height provided.');

		return {
			...baseBookmark,
			provider: 'Flickr',
			width: embedData.width,
			height: embedData.height,
		};
	}

	if (embedData.provider_name === 'Vimeo') {
		if (!embedData.duration || typeof embedData.duration !== 'number')
			throw new Error('No duration provided.');

		return {
			...baseBookmark,
			provider: 'Vimeo',
			duration: embedData.duration,
		};
	}

	throw new Error(errors.join('\n'));
};
