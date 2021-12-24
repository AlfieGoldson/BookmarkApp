import { ChangeEventHandler, FormEventHandler } from 'react';
import { useFetchBookmark } from '../hooks/useFetchBookmark';
import { Bookmark } from '../types/BookmarkTypes';
import styles from './AddBookmarkForm.module.css';
import { Loader } from './Loader';

interface Props {
	onBookmarkAdded: (bookmark: Bookmark) => void;
}

export const AddBookmarkForm = ({ onBookmarkAdded }: Props) => {
	const { bookmarkUrl, setBookmarkUrl, fetchBookmark, isLoading } =
		useFetchBookmark();

	const handleUrlChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setBookmarkUrl(e.target.value);
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		const target = e.target as HTMLFormElement;
		const isFormValid = target.checkValidity();

		// If the form is invalid, don't submit
		// Should add a visual feedback for the user
		if (!isFormValid) return;

		fetchBookmark()
			.then((bookmark) => onBookmarkAdded(bookmark))
			.catch((error) => console.error(error));
	};

	return (
		<form
			className={styles.bookmarkForm}
			onSubmit={handleSubmit}
			aria-label='Add Bookmark Form'
		>
			<label htmlFor='bookmark-url-input'>Add a new Bookmark</label>
			<div className={styles.inputContainer}>
				<input
					id='bookmark-url-input'
					aria-label='Bookmark URL'
					className={styles.urlInput}
					type='text'
					placeholder='Url'
					value={bookmarkUrl}
					onChange={handleUrlChange}
					required
				/>
				{isLoading ? (
					<Loader />
				) : (
					<button
						className={styles.submitButton}
						type='submit'
						disabled={isLoading || !bookmarkUrl}
						aria-label='Submit Bookmark URL'
					>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M13 13V19H11V13H5V11H11V5H13V11H19V13H13Z'
								fill='currentColor'
							/>
						</svg>
					</button>
				)}
			</div>
		</form>
	);
};
