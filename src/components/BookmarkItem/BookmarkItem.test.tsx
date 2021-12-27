import { render, screen, fireEvent } from '@testing-library/react';
import { BookmarkItem } from '.';
import { mockFlickrBookmark } from '../../mocks/mockFlickrResponse';
import { mockVimeoBookmark } from '../../mocks/mockVimeoResponse';

it('renders bookmark', () => {
	const onBookmarkRemoved = jest.fn();

	render(
		<BookmarkItem
			bookmark={mockVimeoBookmark}
			onRemoveBookmark={onBookmarkRemoved}
		/>
	);

	// Thumbnail
	const thumbnailLink = screen.getByRole<HTMLAnchorElement>('link', {
		name: /Thumbnail Link/i,
	});

	expect(thumbnailLink).toBeInTheDocument();
	expect(thumbnailLink).toHaveAttribute('href', mockVimeoBookmark.url);

	const thumbnailImage = screen.getByRole<HTMLAnchorElement>('img', {
		name: /Thumbnail/i,
	});

	expect(thumbnailImage).toBeInTheDocument();
	expect(thumbnailImage).toHaveAttribute('alt', mockVimeoBookmark.title);
	expect(thumbnailImage).toHaveAttribute('src', mockVimeoBookmark.thumbnail);

	// Heading
	const headingLink = screen.getByRole<HTMLAnchorElement>('link', {
		name: /Heading Link/i,
	});

	expect(headingLink).toBeInTheDocument();
	expect(headingLink).toHaveAttribute('href', mockVimeoBookmark.url);
	expect(headingLink).toHaveTextContent(mockVimeoBookmark.title);

	// Author
	const authorLink = screen.getByRole<HTMLAnchorElement>('link', {
		name: /Author Link/i,
	});

	expect(authorLink).toBeInTheDocument();
	expect(authorLink).toHaveTextContent(mockVimeoBookmark.author.name);

	// Remove bookmark button
	const removeButton = screen.getByRole<HTMLButtonElement>('button', {
		name: /Remove Bookmark/i,
	});

	expect(removeButton).toBeInTheDocument();

	// Bookmark created date
	const bookmarkCreated = screen.getByText(/Bookmark ajouté il y a/i);

	expect(bookmarkCreated).toBeInTheDocument();
});

it('renders Vimeo bookmark', () => {
	const onBookmarkRemoved = jest.fn();

	render(
		<BookmarkItem
			bookmark={mockVimeoBookmark}
			onRemoveBookmark={onBookmarkRemoved}
		/>
	);

	const duration = screen.getByText(/\d{2}:\d{2}:\d{2}/);

	expect(duration).toBeInTheDocument();
	expect(duration).toHaveTextContent('00:17:50');
});

it('renders Flickr bookmark', () => {
	const onBookmarkRemoved = jest.fn();

	render(
		<BookmarkItem
			bookmark={mockFlickrBookmark}
			onRemoveBookmark={onBookmarkRemoved}
		/>
	);

	const dimensions = screen.getByText(/\d{3}x\d{3}/);

	expect(dimensions).toBeInTheDocument();
	expect(dimensions).toHaveTextContent('800x267');
});

it('deletes bookmark', () => {
	const onBookmarkRemoved = jest.fn();

	render(
		<BookmarkItem
			bookmark={mockVimeoBookmark}
			onRemoveBookmark={onBookmarkRemoved}
		/>
	);

	const removeButton = screen.getByRole<HTMLButtonElement>('button', {
		name: /Remove Bookmark/i,
	});

	expect(removeButton).toBeInTheDocument();

	fireEvent.click(removeButton);

	expect(onBookmarkRemoved).toHaveBeenCalledTimes(1);
	expect(onBookmarkRemoved).toHaveBeenCalledWith(mockVimeoBookmark.id);
});
