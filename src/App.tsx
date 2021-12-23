import './App.css';
import { BookmarkItem } from './components/BookmarkItem';
import { AddBookmarkForm } from './components/AddBookmarkForm';
import { useBookmarks } from './hooks/useBookmarks';

export const App = () => {
	const { addBookmark, bookmarks, removeBookmark } = useBookmarks();

	return (
		<div className='App'>
			<h1>Bookmark App</h1>
			<AddBookmarkForm
				onBookmarkAdded={(bookmark) => {
					addBookmark(bookmark);
				}}
			/>
			<div>
				<h2>Bookmarks</h2>
				{bookmarks.map((bookmark) => (
					<BookmarkItem
						key={bookmark.id}
						bookmark={bookmark}
						onRemoveBookmark={removeBookmark}
					/>
				))}
			</div>
		</div>
	);
};

export default App;
