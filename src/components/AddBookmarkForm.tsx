import { useState } from 'react';
import { NoEmbedResponse } from '../types/APITypes';
import { Bookmark, BookmarkBase } from '../types/BookmarkTypes';
import styles from './AddBookmarkForm.module.css';

const NOEMBED_BASE_URL = 'https://noembed.com/embed?url=';

/**
 * Fetch the embed data for a given URL, via noembed.com.
 * @param url URL to fetch the embed data from.
 * @returns Embed data.
 */
const fetchEmbedData = (url: string) =>
	new Promise<NoEmbedResponse>(async (resolve, reject) => {
		try {
			const encodedUrl = encodeURIComponent(url);
			const response = await fetch(`${NOEMBED_BASE_URL}${encodedUrl}`);
			const data = await response.json();
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});

/**
 * Parse the embed data for a given URL into a bookmark.
 * @param embedData - Embed Data to parse to a Bookmark.
 * @returns
 */
const parseEmbedData = (embedData: NoEmbedResponse): Bookmark => {
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

interface Props {
	onBookmarkAdded: (bookmark: Bookmark) => void;
}

export const AddBookmarkForm = ({ onBookmarkAdded }: Props) => {
	const [urlValue, setUrlValue] = useState(
		'https://www.flickr.com/photos/feuilllu/45771361701/'
	);

	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUrlValue(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		fetchEmbedData(urlValue)
			.then((data) => parseEmbedData(data))
			.then((bookmark) => onBookmarkAdded(bookmark));
	};

	return (
		<form className={styles.bookmarkForm} onSubmit={handleSubmit}>
			<label htmlFor='bookmarkUrlInput'>Add a new Bookmark</label>
			<div className={styles.inputContainer}>
				<input
					id='bookmarkUrlInput'
					className={styles.urlInput}
					type='text'
					placeholder='Url'
					value={urlValue}
					onChange={handleUrlChange}
				/>
				<button className={styles.submitButton} type='submit'>
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM4 12.172C4.04732 16.5732 7.64111 20.1095 12.0425 20.086C16.444 20.0622 19.9995 16.4875 19.9995 12.086C19.9995 7.68451 16.444 4.10977 12.0425 4.086C7.64111 4.06246 4.04732 7.59876 4 12V12.172ZM13 17H11V13H7V11H11V7H13V11H17V13H13V17Z'
							fill='currentColor'
						/>
					</svg>
				</button>
			</div>
		</form>
	);
};
