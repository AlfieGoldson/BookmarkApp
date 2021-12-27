import { validateEmbedData } from './validateEmbedData';

it('throws when provider name is missing', () => {
	expect(() =>
		validateEmbedData({
			provider_name: undefined,
		})
	).toThrowError('No provider name provided.');
});

it('throws when provider name is invalid', () => {
	expect(() =>
		validateEmbedData({
			provider_name: 'test' as any,
		})
	).toThrowError('Unknown provider name.');
});

// TODO: Add more tests for other properties.
