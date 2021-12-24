import { useFetchEmbedData } from '../hooks/useFetchEmbedData';
import { validateEmbedData } from '../lib/validateEmbedData';
import { Bookmark } from '../types/BookmarkTypes';
import styles from './AddBookmarkForm.module.css';
import { Loader } from './Loader';

interface Props {
	onBookmarkAdded: (bookmark: Bookmark) => void;
}

export const AddBookmarkForm = ({ onBookmarkAdded }: Props) => {
	const { embedUrl, setEmbedUrl, fetchEmbedData, isLoading } =
		useFetchEmbedData(
			'https://www.flickr.com/photos/feuilllu/45771361701/'
		);

	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmbedUrl(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		fetchEmbedData()
			.then((data) => validateEmbedData(data))
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
					value={embedUrl}
					onChange={handleUrlChange}
				/>
				<button
					className={styles.submitButton}
					type='submit'
					disabled={isLoading}
				>
					{isLoading ? (
						<Loader />
					) : (
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
					)}
				</button>
			</div>
		</form>
	);
};
