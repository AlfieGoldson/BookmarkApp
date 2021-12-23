/**
 * Parse a date string into a Date object.
 * @param date Date to convert
 * @returns  Date object
 */
export const parseDate = (date: string): Date => new Date(date);

/**
 * Parse a timestamp into a Date object.
 * @param timestamp Timestamp to convert
 * @returns Date object
 */
export const parseTimestamp = (timestamp: number): Date => new Date(timestamp);

/**
 * Get the time since a timestamp.
 * @param timestamp Timestamp to convert
 * @returns Time since timestamp
 */
export const getTimeSinceTimestamp = (timestamp: number) => {
	const now = new Date();
	const then = new Date(timestamp);

	const diff = now.getTime() - then.getTime();

	const seconds = Math.floor(diff / 1000);
	if (seconds < 60) return `${seconds} seconde${seconds === 1 ? '' : 's'}`;

	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'}`;

	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours} heure${hours === 1 ? '' : 's'}`;

	const days = Math.floor(hours / 24);
	if (days < 30) return `${days} jour${days === 1 ? '' : 's'}`;

	const months = Math.floor(days / 30);
	if (months < 12) return `${months} mois`;

	const years = Math.floor(months / 12);
	return `${years} an${years === 1 ? '' : 's'}`;
};

export const parseDuration = (duration: number): string => {
	const seconds = duration % 60;
	const minutes = Math.floor(duration / 60) % 60;
	const hours = Math.floor(duration / 3600) % 24;

	const parts = [];
	if (hours) parts.push(hours);
	if (minutes) parts.push(minutes);
	if (seconds) parts.push(seconds);

	return parts.join(':');
};
