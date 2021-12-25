import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { mockVimeoResponse } from '../../mocks/mockVimeoResponse';
import { AddBookmarkForm } from '.';

const setup = () => {
	const onBookmarkAdded = jest.fn();

	const utils = render(<AddBookmarkForm onBookmarkAdded={onBookmarkAdded} />);

	const form = screen.getByRole<HTMLFormElement>('form', {
		name: /Add Bookmark Form/i,
	});

	const input = screen.getByRole<HTMLInputElement>('textbox', {
		name: /Bookmark URL/i,
	});

	const submitButton = screen.getByRole<HTMLButtonElement>('button', {
		name: /Submit Bookmark URL/i,
	});

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
		json: jest.fn().mockResolvedValue(mockVimeoResponse),
	} as any);

	fireEvent.change(input, {
		target: { value: 'https://vimeo.com/565486457' },
	});
	expect(input.value).toBe('https://vimeo.com/565486457');

	fireEvent.click(submitButton);

	await waitFor(() => expect(submitButton.disabled).toBe(true));

	await waitFor(() => expect(onBookmarkAdded).toHaveBeenCalledTimes(1));

	expect(input.value).toBe('');
	expect(submitButton.disabled).toBe(true);

	jest.restoreAllMocks();
});

it('renders the loader', async () => {
	const { input, submitButton } = setup();

	jest.spyOn(global, 'fetch').mockResolvedValue({
		json: jest.fn().mockResolvedValue({}),
	} as any);

	fireEvent.change(input, {
		target: { value: 'https://vimeo.com/565486457' },
	});
	expect(input.value).toBe('https://vimeo.com/565486457');

	const loaderBeforeClick = screen.queryByRole<HTMLDivElement>('alert', {
		name: /Loading/i,
	});

	expect(loaderBeforeClick).toBeNull();

	fireEvent.click(submitButton);

	const loaderAfterClick = screen.queryByRole<HTMLDivElement>('alert', {
		name: /Loading/i,
	});

	expect(loaderAfterClick).toBeInTheDocument();

	await waitFor(() => expect(loaderAfterClick).not.toBeInTheDocument());
});

it("doesn't add a bookmark if the url is invalid", async () => {
	const { input, submitButton, onBookmarkAdded } = setup();

	jest.spyOn(global, 'fetch').mockResolvedValue({
		json: jest.fn().mockResolvedValue({}),
	} as any);

	fireEvent.change(input, {
		target: { value: 'https://example.com' },
	});

	fireEvent.click(submitButton);

	await waitFor(() => expect(submitButton.disabled).toBe(true));

	await waitFor(() => expect(onBookmarkAdded).toHaveBeenCalledTimes(0));

	expect(input.value).toBe('https://example.com');
	expect(submitButton.disabled).toBe(false);

	jest.restoreAllMocks();
});
