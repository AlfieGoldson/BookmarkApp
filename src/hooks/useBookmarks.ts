import { useCallback, useState } from 'react';
import { Bookmark } from '../types/BookmarkTypes';

/**
 * Hook that manages bookmarks.
 */
export const useBookmarks = (): {
	bookmarks: Bookmark[];
	addBookmark: (bookmark: Bookmark) => void;
	removeBookmark: (id: string) => void;
} => {
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([
		{
			uploaded: '2021-06-21 02:42:24',
			id: 'https://vimeo.com/565486457',
			title: 'Sylvain Lhommée @ Nation Entreprenante - Episode #5',
			url: 'https://vimeo.com/565486457',
			author: { name: 'BARTERLINK', url: 'https://vimeo.com/barterlink' },
			thumbnail: {
				url: 'https://i.vimeocdn.com/video/1169280957-6513b97be812eac51f6ba090b2f34ab5a63bfc220076c0118950fcf4c227fdce-d_295x166',
				width: 295,
				height: 166,
			},
			created: 1640271254862,
			provider: 'Vimeo',
			duration: 1070,
		},
		{
			uploaded: '',
			id: 'https://www.flickr.com/photos/80210243@N06/7179848249/',
			title: 'Alhambra',
			url: 'https://www.flickr.com/photos/80210243@N06/7179848249/',
			author: {
				name: 'COSTAGROUPINTERNATIONAL',
				url: 'https://www.flickr.com/photos/80210243@N06/',
			},
			thumbnail: {
				url: 'https://live.staticflickr.com/7074/7179848249_e3bc8944c7_q.jpg',
				width: 150,
				height: 150,
			},
			created: 1640271473108,
			provider: 'Flickr',
			width: 800,
			height: 267,
		},
	]);

	/**
	 * Add a bookmark to the list of bookmarks.
	 * @param bookmark Bookmark to add
	 * @returns True if the bookmark was added, false if it was already there
	 */
	const addBookmark = (bookmark: Bookmark): boolean => {
		const existingBookmark = bookmarks.find((bk) => bk.id === bookmark.id);

		console.log({ existingBookmark });

		if (existingBookmark) return false;

		setBookmarks((prevBookmarks) => {
			return [...prevBookmarks, bookmark];
		});

		return true;
	};

	/**
	 * Remove a bookmark from the list of bookmarks.
	 * @param bookmarkId ID of the bookmark to remove
	 */
	const removeBookmark = (bookmarkId: string) => {
		setBookmarks((prevBookmarks) =>
			prevBookmarks.filter((bookmark) => bookmark.id !== bookmarkId)
		);
	};

	return {
		bookmarks,
		addBookmark,
		removeBookmark,
	};
};
