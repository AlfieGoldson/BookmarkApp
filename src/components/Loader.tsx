import styles from './Loader.module.css';

export const Loader = () => {
	return (
		<div
			className={styles.ldsRing}
			role='alert'
			aria-busy='true'
			aria-live='polite'
			aria-label='Loading'
		>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};
