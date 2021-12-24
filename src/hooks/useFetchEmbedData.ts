import { useState } from 'react';
import { NoEmbedResponse } from '../types/APITypes';

const NOEMBED_BASE_URL = 'https://noembed.com/embed?url=';

export const useFetchEmbedData = (defaultEmbedUrl?: string) => {
	const [embedUrl, setEmbedUrl] = useState(defaultEmbedUrl ?? '');
	const [isLoading, setLoading] = useState(false);

	/**
	 * Fetch the embed data for a given URL, via noembed.com.
	 * @param url URL to fetch the embed data from.
	 * @returns Embed data.
	 */
	const fetchEmbedData = async (): Promise<NoEmbedResponse> => {
		setLoading(true);
		try {
			const encodedUrl = encodeURIComponent(embedUrl);
			const response = await fetch(`${NOEMBED_BASE_URL}${encodedUrl}`);
			const data = await response.json();

			setLoading(false);
			return data;
		} catch (error) {
			setLoading(false);
			throw error;
		}
	};

	return {
		embedUrl,
		setEmbedUrl,
		fetchEmbedData,
		isLoading,
	};
};
