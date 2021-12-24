import { render, screen, fireEvent } from '@testing-library/react';
import { mockVimeoResponse } from '../mocks/mockVimeoResponse';
import { mockFlickrResponse } from '../mocks/mockFlickrResponse';
import { AddBookmarkForm } from './AddBookmarkForm';

const setup = () => {
	const onBookmarkAdded = jest.fn();

	const utils = render(<AddBookmarkForm onBookmarkAdded={onBookmarkAdded} />);

	const form = screen.getByRole('form', {
		name: /Add Bookmark Form/i,
	}) as HTMLFormElement;

	const input = screen.getByRole('textbox', {
		name: /Bookmark URL/i,
	}) as HTMLInputElement;

	const submitButton = screen.getByRole('button', {
		name: /Submit Bookmark URL/i,
	}) as HTMLButtonElement;

	return {
		...utils,
		form,
		input,
		submitButton,
		onBookmarkAdded,
	};
};

it('should render the form', () => {
	const { form, input, submitButton } = setup();

	expect(form).toBeInTheDocument();
	expect(input).toBeInTheDocument();
	expect(submitButton).toBeInTheDocument();
});

it("can't add a bookmark if url is empty", () => {
	const { form, input, submitButton } = setup();

	fireEvent.submit(form);

	expect(input.value).toBe('');
	expect(submitButton.disabled).toBe(true);
	expect(form.checkValidity()).toBe(false);
});

it("updates the input value and can add a bookmark if url isn't empty", async () => {
	const { form, input, submitButton } = setup();

	fireEvent.change(input, {
		target: { value: 'https://vimeo.com/565486457' },
	});
	expect(input.value).toBe('https://vimeo.com/565486457');

	expect(submitButton.disabled).toBe(false);
	expect(form.checkValidity()).toBe(true);
});

it('updates the input value and submits the form', async () => {
	const { input, submitButton, onBookmarkAdded } = setup();

	jest.spyOn(global, 'fetch').mockResolvedValue({
		json: jest
			.fn()
			.mockResolvedValueOnce(mockVimeoResponse)
			.mockResolvedValueOnce(mockFlickrResponse),
	} as any);

	fireEvent.change(input, {
		target: { value: 'https://vimeo.com/565486457' },
	});
	expect(input.value).toBe('https://vimeo.com/565486457');

	fireEvent.click(submitButton);

	// Loader is shown
	const loader = await screen.findByRole('alert', {
		name: /Loading/i,
	});

	console.log({ loader });

	expect(loader).toBeInTheDocument();

	// Loader is hidden and the form is reset
	await screen.findByRole('button', {
		name: /Add Bookmark/i,
	});

	expect(loader).not.toBeInTheDocument();

	expect(input.value).toBe('');

	expect(onBookmarkAdded).toHaveBeenCalledTimes(1);

	jest.restoreAllMocks();
});

// TODO: Add tests for the error state
