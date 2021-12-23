import { getTimeSinceTimestamp, parseDuration } from '../lib/parseDate';
import { Bookmark } from '../types/BookmarkTypes';
import styles from './BookmarkItem.module.css';

interface Props {
	bookmark: Bookmark;
	onRemoveBookmark: (bookmarkId: string) => void;
}

export const BookmarkItem = ({ bookmark, onRemoveBookmark }: Props) => {
	const { title, author, created, provider, thumbnail, uploaded, url } =
		bookmark;

	const handleRemoveBookmark = () => {
		onRemoveBookmark(bookmark.id);
	};

	return (
		<article
			className='bookmark-item'
			style={{
				display: 'flex',
			}}
		>
			<a href={url} target='_blank' rel='noreferrer'>
				<figure style={{ padding: 0, margin: 0 }}>
					<img
						src={thumbnail.url}
						alt={title}
						width='160'
						height='120'
						className={styles.bookmarkThumbnail}
					/>
				</figure>
			</a>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					flex: '1',
				}}
			>
				<h3 className={styles.bookmarkTitle}>
					<a href={url} target='_blank' rel='noreferrer'>
						{title}
					</a>
				</h3>
				<p>
					<a href={author.url} target='_blank' rel='noreferrer'>
						{author.name}
					</a>
				</p>
				<p>
					{provider === 'Vimeo'
						? `${parseDuration(bookmark.duration)}`
						: `${bookmark.width}x${bookmark.height}`}{' '}
					• Ajouté il y a {getTimeSinceTimestamp(created)}.
				</p>
			</div>
			<button
				onClick={handleRemoveBookmark}
				style={{
					backgroundColor: 'transparent',
					border: 'none',
					cursor: 'pointer',
				}}
			>
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M17 22H7C5.89543 22 5 21.1046 5 20V7H3V5H7V4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V5H21V7H19V20C19 21.1046 18.1046 22 17 22ZM7 7V20H17V7H7ZM9 4V5H15V4H9ZM15 18H13V9H15V18ZM11 18H9V9H11V18Z'
						fill='currentColor'
					/>
				</svg>
			</button>
		</article>
	);
};
