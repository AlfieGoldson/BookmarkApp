import { useState } from 'react';
import { Bookmark } from '../types/BookmarkTypes';

/**
 * Hook that manages bookmarks.
 */
export const useBookmarks = (): {
	bookmarks: Bookmark[];
	addBookmark: (bookmark: Bookmark) => void;
	removeBookmark: (id: string) => void;
} => {
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

	/**
	 * Add a bookmark to the list of bookmarks.
	 * @param bookmark Bookmark to add
	 * @returns True if the bookmark was added, false if it was already there
	 */
	const addBookmark = (bookmark: Bookmark): boolean => {
		const existingBookmark = bookmarks.find((bk) => bk.id === bookmark.id);

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
