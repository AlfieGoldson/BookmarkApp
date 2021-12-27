import { useState } from 'react';
import { validateEmbedData } from '../lib/validateEmbedData';
import { NoEmbedResponse } from '../types/APITypes';
import { Bookmark } from '../types/BookmarkTypes';

const NOEMBED_BASE_URL = 'https://noembed.com/embed?url=';

export const useFetchBookmark = (defaultEmbedUrl?: string) => {
	const [bookmarkUrl, setBookmarkUrl] = useState(defaultEmbedUrl ?? '');
	const [isLoading, setLoading] = useState(false);

	/**
	 * Fetch the bookmark data for a given URL, via noembed.com.
	 * @param url URL to fetch the bookmark data from.
	 * @returns Bookmark data.
	 */
	const fetchBookmark = async (): Promise<Bookmark> => {
		if (isLoading) throw new Error('Already loading embed data.');

		setLoading(true);
		const encodedUrl = encodeURIComponent(bookmarkUrl);
		try {
			const response = await fetch(`${NOEMBED_BASE_URL}${encodedUrl}`);
			if (!response.ok) throw new Error('No embed data found.');

			const data = (await response.json()) as NoEmbedResponse;
			const bookmarkData = validateEmbedData(data);

			setLoading(false);
			setBookmarkUrl('');
			return bookmarkData;
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};

	return {
		bookmarkUrl,
		setBookmarkUrl,
		fetchBookmark,
		isLoading,
	};
};
